import { pb } from '@/lib/pocketbase';

export type LangMap = Record<string, string>;

export interface ContentTranslations {
  pl: LangMap;
  en: LangMap;
  uk: LangMap;
}

interface ContentRecord {
  key: string;
  pl?: string;
  en?: string;
  uk?: string;
}

export async function fetchContentTranslations(): Promise<ContentTranslations> {
  const records = await pb
    .collection('content')
    .getFullList<ContentRecord>({ fields: 'key,pl,en,uk' });

  const result: ContentTranslations = {
    pl: {},
    en: {},
    uk: {},
  };

  for (const record of records) {
    if (!record.key) continue;

    if (typeof record.pl === 'string' && record.pl.length > 0) {
      result.pl[record.key] = record.pl;
    }

    if (typeof record.en === 'string' && record.en.length > 0) {
      result.en[record.key] = record.en;
    }

    if (typeof record.uk === 'string' && record.uk.length > 0) {
      result.uk[record.key] = record.uk;
    }
  }

  return result;
}

