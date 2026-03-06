/**
 * Chat proxy: rate-limit by IP (hash) via PocketBase, then forward to OpenAI.
 * Deploy as Vercel serverless (api/chat.ts) or any Node server with request IP.
 *
 * Env: OPENAI_API_KEY, POCKETBASE_URL, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD
 * Optional: RATE_LIMIT_SALT (for IP hash), RATE_LIMIT_MAX=20, RATE_LIMIT_WINDOW_MS=600000
 */

import { createHash } from 'crypto';

/** Compatible with VercelRequest; use when @vercel/node is not available. */
interface ChatRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}
/** Compatible with VercelResponse; use when @vercel/node is not available. */
interface ChatResponse {
  status: (code: number) => ChatResponse;
  json: (body: Record<string, unknown>) => void;
}

const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000;
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 20;

function getClientIp(req: ChatRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return String(forwarded[0]).trim();
  }
  const real = req.headers['x-real-ip'];
  if (typeof real === 'string') return real.trim();
  return 'unknown';
}

function hashIp(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT || 'chat-rate-limit';
  return createHash('sha256').update(salt + ip).digest('hex');
}

async function checkAndIncrementRateLimit(ipHash: string): Promise<boolean> {
  const pbUrl = process.env.POCKETBASE_URL;
  const email = process.env.POCKETBASE_ADMIN_EMAIL;
  const password = process.env.POCKETBASE_ADMIN_PASSWORD;
  if (!pbUrl || !email || !password) {
    return true;
  }

  const { default: PocketBase } = await import('pocketbase');
  const pb = new PocketBase(pbUrl);
  await pb.admins.authWithPassword(email, password);

  const now = new Date().toISOString();
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const existing = await pb
    .collection('rate_limits')
    .getList(1, 1, { filter: `ip_hash = "${ipHash}"` })
    .catch(() => ({ items: [] }));

  const raw = existing.items[0];
  const record = raw as unknown as
    | { id: string; count: number; window_start: string }
    | undefined;

  if (!record) {
    await pb.collection('rate_limits').create({
      ip_hash: ipHash,
      count: 1,
      window_start: now,
    });
    return true;
  }

  const start = record.window_start;
  if (start < windowStart) {
    await pb.collection('rate_limits').update(record.id, {
      count: 1,
      window_start: now,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  await pb.collection('rate_limits').update(record.id, {
    count: record.count + 1,
  });
  return true;
}

/**
 * Reads from PocketBase the record by ip_hash without incrementing.
 * Returns { used, max }; max = RATE_LIMIT_MAX.
 * If no record or window expired — used: 0.
 * If PocketBase not configured or any error — { used: 0, max }.
 */
async function getRateLimitUsage(ipHash: string): Promise<{ used: number; max: number }> {
  const max = RATE_LIMIT_MAX;
  try {
    const pbUrl = process.env.POCKETBASE_URL;
    const email = process.env.POCKETBASE_ADMIN_EMAIL;
    const password = process.env.POCKETBASE_ADMIN_PASSWORD;
    if (!pbUrl || !email || !password) {
      return { used: 0, max };
    }

    const { default: PocketBase } = await import('pocketbase');
    const pb = new PocketBase(pbUrl);
    await pb.admins.authWithPassword(email, password);

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

    const existing = await pb
      .collection('rate_limits')
      .getList(1, 1, { filter: `ip_hash = "${ipHash}"` });

    const raw = existing.items[0];
    const record = raw as unknown as
      | { count: number; window_start: string }
      | undefined;

    if (!record || record.window_start < windowStart) {
      return { used: 0, max };
    }

    return { used: record.count, max };
  } catch {
    return { used: 0, max };
  }
}

export default async function handler(
  req: ChatRequest,
  res: ChatResponse
): Promise<void> {
  const ip = getClientIp(req);
  const ipHash = hashIp(ip);

  // GET — return current usage for this IP (so client can show correct "questions left" after reload)
  if (req.method === 'GET') {
    const usage = await getRateLimitUsage(ipHash);
    res.status(200).json(usage);
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'OpenAI API key not configured' });
    return;
  }

  let body: { messages?: Array<{ role: string; content: string }> };
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body ?? {};
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages array required' });
    return;
  }

  const allowed = await checkAndIncrementRateLimit(ipHash);
  if (!allowed) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 400,
      temperature: 0.3,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    res
      .status(response.status)
      .json({ error: (err as { error?: { message?: string } })?.error?.message ?? 'OpenAI error' });
    return;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content ?? '';
  if (typeof content !== 'string') {
    res.status(502).json({ error: 'Invalid OpenAI response' });
    return;
  }

  res.status(200).json({ content });
}
