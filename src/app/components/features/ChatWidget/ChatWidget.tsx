import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useChatWidget } from '@/hooks/useChatWidget';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

const MAX_QUESTIONS = 20;

function LoadingDots() {
  return (
    <div className="flex gap-1" aria-hidden="true">
      <span className="w-2 h-2 rounded-full bg-[#C0C0C0] animate-bounce [animation-delay:0ms]" />
      <span className="w-2 h-2 rounded-full bg-[#C0C0C0] animate-bounce [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-[#C0C0C0] animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      role="listitem"
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? 'bg-[#C0C0C0] text-[#0A0A0A] rounded-br-md'
            : 'bg-white/10 text-white border border-[#C0C0C0]/30 rounded-bl-md'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
}

/** Floating chat widget: button + dialog with document-based Q&A. */
export const ChatWidget: React.FC = () => {
  const { t } = useTranslation();
  const {
    state,
    toggle,
    sendMessage,
    setInput,
    sessionExpired,
    inCooldown,
  } = useChatWidget();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [bottomOffset, setBottomOffset] = useState(24); // px

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.status]);

  // Prevent chat widget from overlapping the footer on scroll.
  useEffect(() => {
    const updatePosition = () => {
      const footer = document.querySelector('footer');
      if (!footer) {
        setBottomOffset(24);
        return;
      }

      const rect = footer.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;

      if (rect.top < viewportHeight) {
        const overlap = viewportHeight - rect.top;
        setBottomOffset(24 + overlap);
      } else {
        setBottomOffset(24);
      }
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  const questionsLeft = MAX_QUESTIONS - state.questionCount;
  const limitReached = state.questionCount >= MAX_QUESTIONS;
  const inputBlocked =
    limitReached || sessionExpired || state.rateLimitReached;
  const sendDisabled =
    !state.input.trim() ||
    state.status === 'loading' ||
    limitReached ||
    sessionExpired ||
    state.rateLimitReached ||
    inCooldown;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
      style={{ bottom: bottomOffset }}
    >
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              flex flex-col fixed inset-0 sm:relative sm:inset-auto
              sm:w-[360px] sm:h-[500px] sm:bottom-full sm:mb-4
              rounded-none sm:rounded-2xl border-0 sm:border border-[#C0C0C0]/40
              bg-gradient-to-b from-[#1a1a1e] via-[#16161a] to-[#1a1a1e] shadow-[0_0_40px_rgba(192,192,192,0.15)] overflow-hidden
            "
            aria-label={t('chat.title')}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-[#C0C0C0]/30 bg-[#C0C0C0]/5">
              <h2 className="text-lg font-medium text-white">
                {t('chat.title')}
              </h2>
              <button
                type="button"
                onClick={toggle}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#C0C0C0] hover:bg-[#C0C0C0]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]"
                aria-label={t('common.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {state.messages.length === 0 && state.status !== 'loading' && (
                <div className="text-[#C0C0C0]/90 text-sm rounded-2xl rounded-bl-md bg-white/5 border border-[#C0C0C0]/20 px-4 py-2.5 max-w-[85%] self-start">
                  {t('chat.welcome')}
                </div>
              )}
              {state.messages.map((msg) => (
                <MessageBubble key={`${msg.role}-${msg.content.slice(0, 20)}`} message={msg} />
              ))}
              {state.status === 'loading' && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white/10 border border-[#C0C0C0]/30 px-4 py-3 min-h-[44px] flex items-center">
                    <LoadingDots />
                  </div>
                </div>
              )}
              {state.status === 'error' && (
                <div
                  className="rounded-2xl rounded-bl-md bg-destructive/20 text-destructive border border-destructive/30 px-4 py-2.5 text-sm max-w-[85%] self-start"
                  role="alert"
                >
                  {state.rateLimitReached
                    ? t('chat.rateLimitReached')
                    : t('chat.errorMessage')}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Question counter */}
            <div className="flex-shrink-0 px-4 py-1 text-xs text-[#C0C0C0]/70">
              {t('chat.questionsLeft', { count: questionsLeft })}
            </div>

            {/* Input area — always show field; block (disable) when limit/rate/session, error text only in messages list */}
            <div className="flex-shrink-0 p-4 pt-0">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={state.input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.placeholder')}
                  rows={1}
                  className="
                    flex-1 min-h-[44px] max-h-24 py-2.5 px-3 rounded-xl
                    bg-white/5 border border-[#C0C0C0]/30 text-white
                    placeholder:text-[#C0C0C0]/60 resize-none
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]/50
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                  aria-label={t('chat.placeholder')}
                  aria-disabled={inputBlocked}
                  disabled={state.status === 'loading' || inputBlocked}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={sendDisabled}
                  title={inCooldown ? t('chat.waitCooldown') : undefined}
                  className="
                    flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center
                    rounded-xl bg-[#C0C0C0] text-[#0A0A0A] hover:bg-[#a8a8a8]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]
                  "
                  aria-label={t('chat.send')}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={toggle}
        className={`
          relative min-w-[56px] min-h-[56px] items-center justify-center
          rounded-full bg-[#C0C0C0] text-[#0A0A0A] shadow-[0_0_24px_rgba(192,192,192,0.4)]
          hover:bg-[#a8a8a8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C0C0C0]
          ${state.isOpen ? 'hidden sm:flex' : 'flex'}
        `}
        aria-label={t('chat.ariaLabel')}
      >
        {state.isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        {!state.isOpen && state.messages.length > 0 && (
          <span
            className="absolute top-1 right-1 w-3 h-3 rounded-full bg-destructive"
            aria-hidden="true"
          />
        )}
      </motion.button>
    </div>
  );
};
