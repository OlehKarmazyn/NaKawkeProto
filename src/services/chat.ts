import type { ChatMessage } from '@/types/chat';

/**
 * Fetches current rate-limit usage from proxy (GET). Use on load so "questions left" matches server.
 * Returns null when proxy is not configured.
 */
export async function getChatUsage(): Promise<{ used: number; max: number } | null> {
  const proxyUrl = (import.meta.env.VITE_CHAT_PROXY_URL as string | undefined)?.trim();
  if (!proxyUrl) return null;

  const response = await fetch(proxyUrl, { method: 'GET' });
  if (!response.ok) return null;

  const data = (await response.json()) as { used?: number; max?: number };
  if (
    typeof data.used !== 'number' ||
    typeof data.max !== 'number'
  ) {
    return null;
  }
  return { used: data.used, max: data.max };
}

/**
 * Sends chat history to proxy (if VITE_CHAT_PROXY_URL) or directly to OpenAI.
 * Proxy builds system prompt from PocketBase config; frontend sends only user history.
 * Returns raw model content; the hook appends contact block after the first reply.
 */
export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const proxyUrl = (import.meta.env.VITE_CHAT_PROXY_URL as string | undefined)?.trim();
  const directKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

  // Sanitize history
  const sanitized = history.map((m) => ({
    role: m.role,
    content: m.content
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      .slice(0, 500),
  }));

  // --- Proxy mode (production) ---
  if (proxyUrl) {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: sanitized,
        // isFirstMessage tells proxy which system prompt to use
        isFirstMessage: sanitized.length === 1,
      }),
    });

    if (response.status === 429) throw new Error('RATE_LIMIT');
    if (!response.ok) throw new Error('Proxy error');

    const data = (await response.json()) as { content?: string };
    if (typeof data.content !== 'string') throw new Error('Invalid proxy response');
    return data.content;
  }

  // --- Direct mode (local dev fallback) ---
  // NOTE: in direct mode there is no document context — for testing only.
  if (!directKey) {
    throw new Error('No VITE_CHAT_PROXY_URL and no VITE_OPENAI_API_KEY');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${directKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 400,
      temperature: 0.3,
      messages: [
        { role: 'system', content: 'You are a helpful assistant for Na Kawkę.' },
        ...sanitized,
      ],
    }),
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => ({}))) as { error?: { message?: string } };
    throw new Error(err?.error?.message ? `OpenAI API: ${err.error.message}` : 'OpenAI API error');
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== 'string') throw new Error('Invalid OpenAI response');
  return content;
}
