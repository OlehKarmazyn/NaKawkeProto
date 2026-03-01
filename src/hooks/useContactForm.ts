import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { sendLeadToTelegram } from '@/services/telegram';
import { saveLeadToPocketBase } from '@/services/leads';
import type { LeadPayload } from '@/services/telegram';

const contactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(6),
  message: z.string().optional(),
  packageType: z.enum(['standard', 'premium']).optional(),
});

export type ContactFormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
};

function getValidationErrorKey(path: (string | number)[]): string {
  const field = path[0];
  if (field === 'name') return 'form.validationName';
  if (field === 'phone') return 'form.validationPhone';
  return 'form.errorFields';
}

export function useContactForm() {
  const { i18n, t } = useTranslation();
  const [state, setState] = useState<ContactFormState>({ status: 'idle', errorMessage: null });

  const submit = useCallback(async (payload: LeadPayload) => {
    const parsed = contactSchema.safeParse({
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      message: payload.message?.trim(),
      packageType: payload.packageType,
    });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const key = firstIssue ? getValidationErrorKey(firstIssue.path) : 'form.errorFields';
      setState({ status: 'error', errorMessage: t(key) });
      return;
    }
    const { name, phone, message, packageType } = parsed.data;
    const lang = i18n.language?.slice(0, 2) ?? 'pl';
    const data: LeadPayload = { name, phone, message, packageType, lang };

    setState({ status: 'loading', errorMessage: null });
    const [telegramResult, pbResult] = await Promise.allSettled([
      sendLeadToTelegram(data),
      import.meta.env.VITE_POCKETBASE_URL ? saveLeadToPocketBase(data) : Promise.resolve(null),
    ]);
    if (telegramResult.status === 'rejected') {
      console.error('[useContactForm] Telegram failed:', telegramResult.reason);
    }
    if (pbResult.status === 'rejected') {
      console.error('[useContactForm] PocketBase failed:', pbResult.reason);
    }
    if (telegramResult.status === 'rejected' && pbResult.status === 'rejected') {
      setState({ status: 'error', errorMessage: t('form.errorGeneric') });
      return;
    }
    setState({ status: 'success', errorMessage: null });
  }, [t]);

  return { ...state, submit };
}
