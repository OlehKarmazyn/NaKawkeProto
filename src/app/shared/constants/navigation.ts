/**
 * Navigation constants: header and footer links, section ids for scroll-spy and anchors.
 * Single source of truth — used in Navigation and Footer.
 */

export const SECTION_IDS = {
  about: 'o-nas',
  benefits: 'zalety',
  economics: 'ekonomia',
  pricing: 'cennik',
  contact: 'kontakt',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** Link id matches nav.* translation key. */
export const NAV_LINKS: { id: keyof typeof SECTION_IDS; href: `#${SectionId}` }[] = [
  { id: 'about', href: '#o-nas' },
  { id: 'benefits', href: '#zalety' },
  { id: 'economics', href: '#ekonomia' },
  { id: 'pricing', href: '#cennik' },
  { id: 'contact', href: '#kontakt' },
];
