import 'dotenv/config';
import PocketBase from 'pocketbase';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

type FlatTranslations = Record<string, string>;

interface LocaleMaps {
  pl: FlatTranslations;
  en: FlatTranslations;
  uk: FlatTranslations;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POCKETBASE_URL = process.env.VITE_POCKETBASE_URL ?? '';
const PB_ADMIN_EMAIL = process.env.PB_ADMIN_EMAIL ?? '';
const PB_ADMIN_PASSWORD = process.env.PB_ADMIN_PASSWORD ?? '';

if (!POCKETBASE_URL) {
  console.error('Missing VITE_POCKETBASE_URL in environment.');
  process.exit(1);
}

if (!PB_ADMIN_EMAIL || !PB_ADMIN_PASSWORD) {
  console.error('Missing PB_ADMIN_EMAIL or PB_ADMIN_PASSWORD in environment.');
  process.exit(1);
}

function flattenTranslations(
  obj: unknown,
  parentKey = '',
  result: FlatTranslations = {},
): FlatTranslations {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return result;
  }

  const entries = Object.entries(obj as Record<string, unknown>);

  for (const [key, value] of entries) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenTranslations(value, fullKey, result);
    } else if (typeof value === 'string') {
      result[fullKey] = value;
    }
  }

  return result;
}

async function loadLocale(locale: 'pl' | 'en' | 'uk'): Promise<FlatTranslations> {
  const filePath = path.resolve(
    __dirname,
    '..',
    'src',
    'locales',
    locale,
    'translation.json',
  );

  const raw = await readFile(filePath, 'utf-8');
  const json = JSON.parse(raw) as unknown;

  return flattenTranslations(json);
}

async function loadAllLocales(): Promise<LocaleMaps> {
  const [pl, en, uk] = await Promise.all([
    loadLocale('pl'),
    loadLocale('en'),
    loadLocale('uk'),
  ]);

  return { pl, en, uk };
}

async function seedContent() {
  console.log('Seeding PocketBase content collection from translation files...');

  const pb = new PocketBase(POCKETBASE_URL);

  await pb.admins.authWithPassword(PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD);

  const { pl, en, uk } = await loadAllLocales();

  const allKeys = new Set<string>([
    ...Object.keys(pl),
    ...Object.keys(en),
    ...Object.keys(uk),
  ]);

  const existingRecords = await pb
    .collection('content')
    .getFullList<{ id: string; key: string }>({
      fields: 'id,key',
      perPage: 200,
    });

  const existingKeys = new Set(existingRecords.map((record) => record.key));

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const key of allKeys) {
    if (existingKeys.has(key)) {
      console.log(`→ skipped ${key} (exists)`);
      skipped += 1;
      continue;
    }

    const record = {
      key,
      pl: pl[key] ?? '',
      en: en[key] ?? '',
      uk: uk[key] ?? '',
    };

    try {
      await pb.collection('content').create(record);
      console.log(`✓ created ${key}`);
      created += 1;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`✗ failed ${key}: ${message}`);
      failed += 1;
    }
  }

  console.log('---');
  console.log(`Seed completed. Created: ${created}, skipped: ${skipped}, failed: ${failed}.`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

seedContent().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Unexpected error during seed:', message);
  process.exit(1);
});

