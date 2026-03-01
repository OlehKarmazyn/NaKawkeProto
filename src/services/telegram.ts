const TELEGRAM_API = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? ''}`;

export interface LeadPayload {
  name: string;
  phone: string;
  message?: string;
  packageType?: 'standard' | 'premium';
  /** Active language at submission (pl / en / uk). */
  lang?: string;
}

function formatLeadMessage(payload: LeadPayload): string {
  const escape = (s: string) => s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] ?? c));
  return [
    '<b>🆕 Nowa zgłoszenie — Na Kawkę</b>',
    `👤 Imię: ${escape(payload.name)}`,
    `📞 Telefon: ${escape(payload.phone)}`,
    payload.packageType ? `📦 Pakiet: ${payload.packageType}` : '',
    payload.message ? `💬 Wiadomość: ${escape(payload.message)}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export async function sendLeadToTelegram(payload: LeadPayload): Promise<void> {
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!chatId || !import.meta.env.VITE_TELEGRAM_BOT_TOKEN) {
    return;
  }
  const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(payload),
      parse_mode: 'HTML',
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Telegram API error: ${(err as { description?: string }).description ?? response.statusText}`);
  }
}
