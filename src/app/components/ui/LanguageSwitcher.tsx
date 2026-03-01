import React from 'react';
import { useTranslation } from 'react-i18next';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'pl', label: 'PL' },
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UK' },
] as const;

/** Language switcher: dropdown with PL / EN / UK. Touch target ≥ 44×44px. SPA switch, no reload. */
export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const current =
    LANGUAGES.find(({ code }) => i18n.language?.startsWith(code)) ?? LANGUAGES[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="min-w-[44px] min-h-[44px] px-3 flex items-center gap-1.5 rounded-md font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors border border-[#C0C0C0]/20"
          aria-label={t('nav.languageAria')}
          aria-haspopup="listbox"
        >
          <span>{current.label}</span>
          <ChevronDown className="w-4 h-4 shrink-0 opacity-80" aria-hidden />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[120px] rounded-md bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#C0C0C0]/20 shadow-xl py-1 z-50"
          sideOffset={6}
          align="end"
          role="listbox"
          aria-label={t('nav.languageAria')}
        >
          {LANGUAGES.map(({ code, label }) => {
            const isActive = current.code === code;
            return (
              <DropdownMenu.Item
                key={code}
                onSelect={() => i18n.changeLanguage(code)}
                className="min-h-[44px] px-4 flex items-center cursor-pointer outline-none font-medium text-white/90 hover:text-white hover:bg-white/10 focus:bg-white/10 data-[highlight]:bg-white/10 transition-colors"
                role="option"
                aria-selected={isActive}
                aria-label={t('nav.languageOption', { label })}
              >
                {label}
                {isActive && (
                  <span className="ml-2 text-xs text-[var(--gold-accent)]" aria-hidden>
                    ✓
                  </span>
                )}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
