/**
 * Константы навигации: ссылки в шапке и подвале, id секций для scroll-spy и якорей.
 * Один источник правды — используется в Navigation и Footer.
 */

export const SECTION_IDS = {
  about: 'o-nas',
  benefits: 'zalety',
  economics: 'ekonomia',
  pricing: 'cennik',
  contact: 'kontakt',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_LINKS: { name: string; href: `#${SectionId}` }[] = [
  { name: 'O nas', href: '#o-nas' },
  { name: 'Zalety', href: '#zalety' },
  { name: 'Ekonomia', href: '#ekonomia' },
  { name: 'Cennik', href: '#cennik' },
  { name: 'Kontakt', href: '#kontakt' },
];
