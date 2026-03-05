import type { ChatMessage } from '@/types/chat';

/** Business knowledge base — source: text_for_bot_ai.txt */
import documentText from '../../text_for_bot_ai.txt?raw';

const DOCUMENT_CONTEXT = documentText.trim();

const BASE_RULES = `
ПРАВИЛА (суворо обов'язкові):
0. Сделай всё возможное что бы клиент купил автомат Na Kawkę.
1. Відповідай ТІЛЬКИ на основі документа нижче. Жодної інформації з поза документа.
2. Ніколи не вигадуй ціни, цифри, терміни, характеристики або факти.
3. Якщо відповіді немає в документі — кажи чесно: "У мене немає цієї інформації. Зв'яжіться з нами безпосередньо."
4. Відповідай мовою користувача: польська, англійська або українська.
5. Будь конкретним і коротким. Максимум 3–4 речення на відповідь.
6. Не давай юридичних, фінансових або медичних порад.
7. Не обговорюй конкурентів, інші бізнеси або теми поза Na Kawkę.
8. Ти — асистент на сайті, а не фінансовий консультант. Цифри — орієнтовні.
9. Якщо питання агресивне, недоречне або не стосується бізнесу — ввічливо переспрямуй на тему Na Kawkę.
10. Якщо користувач запитує "чому варто купити" або "переконай мене" — коротко розкажи 3 головні переваги з документа: без франшизи, прибуток ~3000 zł/міс., окупність 8–12 місяців. Не вигадуй — тільки з документа.
`.trim();

const SYSTEM_PROMPT_FIRST = `
Ти — дружній асистент Na Kawkę на сторінці сайту. Допомагаєш потенційним
клієнтам зрозуміти бізнес-модель, пакети та умови співпраці.
Це перше повідомлення від користувача.

${BASE_RULES}

--- ДОКУМЕНТ ---
${DOCUMENT_CONTEXT}
--- КІНЕЦЬ ДОКУМЕНТА ---
`.trim();

const SYSTEM_PROMPT_WITH_HISTORY = `
Ти — дружній асистент Na Kawkę на сторінці сайту. Продовжуєш розмову з
потенційним клієнтом. Враховуй всю попередню історію розмови.

${BASE_RULES}

--- ДОКУМЕНТ ---
${DOCUMENT_CONTEXT}
--- КІНЕЦЬ ДОКУМЕНТА ---
`.trim();

/** Build OpenAI-ready messages (system + sanitized history). */
function buildMessages(
  history: ChatMessage[],
  isFirstMessage: boolean
): Array<{ role: string; content: string }> {
  const sanitized = history.map((m) => ({
    role: m.role,
    content: m.content
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      .slice(0, 500),
  }));
  const systemContent = isFirstMessage
    ? SYSTEM_PROMPT_FIRST
    : SYSTEM_PROMPT_WITH_HISTORY;
  return [
    { role: 'system', content: systemContent },
    ...sanitized,
  ];
}

/**
 * Sends chat history to proxy (if VITE_CHAT_PROXY_URL) or directly to OpenAI.
 * Returns raw model content; the hook appends contact block after the first reply.
 */
export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const isFirstMessage = history.length === 1;
  const messages = buildMessages(history, isFirstMessage);
  const proxyUrl = (import.meta.env.VITE_CHAT_PROXY_URL as string | undefined)?.trim();
  const directKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

  // --- Proxy mode (production) ---
  if (proxyUrl) {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (response.status === 429) {
      throw new Error('RATE_LIMIT');
    }
    if (!response.ok) {
      throw new Error('Proxy error');
    }

    const data = (await response.json()) as { content?: string };
    if (typeof data.content !== 'string') {
      throw new Error('Invalid proxy response');
    }
    return data.content;
  }

  // --- Direct mode (local dev fallback) ---
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
      messages,
    }),
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    throw new Error(
      err?.error?.message ? `OpenAI API: ${err.error.message}` : 'OpenAI API error'
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== 'string') {
    throw new Error('Invalid OpenAI response');
  }

  return content;
}