export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatWidgetState {
  isOpen: boolean;
  messages: ChatMessage[];
  input: string;
  status: 'idle' | 'loading' | 'error';
  questionCount: number;
  /** Timestamp when first message was sent in this session (for 10‑min TTL). */
  sessionStartedAt: number | null;
  /** Timestamp of last sent message (for 3‑s cooldown). */
  lastSentAt: number;
  /** True when server returned 429 (IP rate limit). */
  rateLimitReached: boolean;
}
