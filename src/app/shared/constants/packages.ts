export const PACKAGE_STANDARD = {
  id: 'standard',
  name: 'Pakiet Standard',
  price: 4500,
  path: '/pakiet-standard',
} as const;

export const PACKAGE_PREMIUM = {
  id: 'premium',
  name: 'Pakiet Premium',
  price: 6500,
  path: '/pakiet-premium',
} as const;

export const PACKAGES = [PACKAGE_STANDARD, PACKAGE_PREMIUM] as const;
