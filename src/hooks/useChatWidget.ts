import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { sendChatMessage, getChatUsage } from '@/services/chat';
import type { ChatMessage, ChatWidgetState } from '@/types/chat';

const MAX_QUESTIONS = 20;
/** Session TTL: after first message, chat is limited to this window (60 min). */
const SESSION_TTL_MS = 60 * 60 * 1000;
/** Minimum delay between two sent messages (anti‑spam). */
const COOLDOWN_MS = 3000;

const proxyUrl = (import.meta.env.VITE_CHAT_PROXY_URL as string | undefined)?.trim();

/**
 * Detect question language so contact block matches (pl / en / uk).
 * Falls back to current UI language when script is ambiguous (e.g. "Gotowy biznes?" has no diacritics).
 */
function detectQuestionLanguage(
  text: string,
  fallbackLang: string
): 'pl' | 'en' | 'uk' {
  const trimmed = text.trim();
  if (/[\u0400-\u04FF]/.test(trimmed)) return 'uk'; // Cyrillic
  if (/[ąęółńćźżĄĘÓŁŃĆŹŻ]/.test(trimmed)) return 'pl'; // Polish diacritics
  // Ambiguous (e.g. "Gotowy biznes?"): use current page language
  if (fallbackLang === 'uk') return 'uk';
  if (fallbackLang === 'pl') return 'pl';
  return 'en';
}

export function useChatWidget() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<ChatWidgetState>({
    isOpen: false,
    messages: [],
    input: '',
    status: 'idle',
    questionCount: 0,
    sessionStartedAt: null,
    lastSentAt: 0,
    rateLimitReached: false,
  });

  const now = Date.now();
  const sessionExpired =
    state.sessionStartedAt !== null && now - state.sessionStartedAt > SESSION_TTL_MS;
  const cooldownRemaining = Math.max(0, COOLDOWN_MS - (now - state.lastSentAt));
  const inCooldown = state.lastSentAt > 0 && cooldownRemaining > 0;

  // Sync questionCount with proxy usage on load (so after reload we show correct "questions left")
  useEffect(() => {
    if (!proxyUrl) return;
    getChatUsage().then((usage) => {
      if (usage) {
        setState((s) => ({ ...s, questionCount: usage.used }));
      }
    });
  }, []);

  const toggle = useCallback(() => {
    setState((s) => ({ ...s, isOpen: !s.isOpen }));
  }, []);

  const sendMessage = useCallback(async () => {
    if (!state.input.trim() || state.status === 'loading') return;
    if (state.questionCount >= MAX_QUESTIONS) return;
    if (state.rateLimitReached) return;
    const nowMs = Date.now();
    if (
      state.sessionStartedAt !== null &&
      nowMs - state.sessionStartedAt > SESSION_TTL_MS
    )
      return;
    if (state.lastSentAt > 0 && nowMs - state.lastSentAt < COOLDOWN_MS) return;

    const userMessage: ChatMessage = { role: 'user', content: state.input.trim() };
    const newHistory = [...state.messages, userMessage];
    const isFirstSend = state.questionCount === 0;

    setState((s) => ({
      ...s,
      messages: newHistory,
      input: '',
      status: 'loading',
      questionCount: s.questionCount + 1,
      sessionStartedAt: isFirstSend ? Date.now() : s.sessionStartedAt,
      lastSentAt: Date.now(),
      rateLimitReached: false,
    }));

    try {
      let reply = await sendChatMessage(newHistory);
      // Contact block only after first reply; use question language or current UI language as fallback
      if (newHistory.length === 1) {
        const currentLang = i18n.language?.split('-')[0] ?? 'pl';
        const questionLang = detectQuestionLanguage(userMessage.content, currentLang);
        const tQuestion = i18n.getFixedT(questionLang);
        const contactBlockSuffix = tQuestion('chat.contactBlock', {
          phone: tQuestion('footer.phone'),
          email: tQuestion('footer.email'),
        });
        if (contactBlockSuffix.trim()) {
          reply = `${reply.trim()}\n\n---\n${contactBlockSuffix.trim()}`;
        }
      }
      setState((s) => ({
        ...s,
        messages: [...s.messages, { role: 'assistant', content: reply }],
        status: 'idle',
      }));
    } catch (err) {
      const isRateLimit =
        err instanceof Error && err.message === 'RATE_LIMIT';
      setState((s) => ({
        ...s,
        status: 'error',
        rateLimitReached: isRateLimit,
        questionCount: s.questionCount - 1,
        messages: s.messages.slice(0, -1),
      }));
    }
  }, [
    state.input,
    state.messages,
    state.questionCount,
    state.status,
    state.rateLimitReached,
    state.sessionStartedAt,
    state.lastSentAt,
    t,
  ]);

  const setInput = useCallback((input: string) => {
    setState((s) => ({ ...s, input }));
  }, []);

  return {
    state,
    toggle,
    sendMessage,
    setInput,
    sessionExpired,
    inCooldown,
    cooldownRemainingMs: Math.max(0, COOLDOWN_MS - (Date.now() - state.lastSentAt)),
  };
}
