// Константы сайта

// URL сайта
export const SITE_URL = 'https://wellknowncleaning.com';

// Название сайта
export const SITE_NAME = 'WellKnown Cleaning';

// Описание сайта
export const SITE_DESCRIPTION = 'Professional cleaning services for your home and office';

// Телефон
export const CONTACT_PHONE = '(215) 555-0199';

// Email
export const CONTACT_EMAIL = 'info@wellknowncleaning.com';

// Адрес
export const CONTACT_ADDRESS = '315 N 12th St, Philadelphia, PA 19107';

// Цвета
export const COLORS = {
  primary: '#5d3ebc', // фиолетовый
  primaryHover: '#4a309a',
  secondary: '#10b981', // emerald
  background: '#f5f3f9',
  dark: '#1f2937',
  light: '#f9fafb',
  white: '#ffffff',
  black: '#000000',
};

// Пути страниц
export const PAGES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PRICING: '/pricing',
  BOOKING: '/booking',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-conditions',
};

// Изображения
export const IMAGES = {
  LOGO: '/logo.png',
  FAVICON: '/favicon.svg',
};

// Настройки SEO
export const SEO_DEFAULT_TITLE = 'WellKnown Cleaning - Professional Cleaning Services';
export const SEO_DEFAULT_DESCRIPTION = 'Professional cleaning services for your home and office. Get a free quote today.';

// Время (в миллисекундах)
export const TIME = {
  MILLISECONDS: {
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000,
  }
};

// Медиа-запросы
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};

// HTTP статусы
export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// Регулярные выражения
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\(\d{3}\) \d{3}-\d{4}$/,
  ZIP_CODE: /^\d{5}$/,
};

// Метаданные
export const META = {
  AUTHOR: 'WellKnown Cleaning',
  THEME_COLOR: '#5d3ebc',
  OG_TYPE: 'website',
  TWITTER_CARD: 'summary_large_image',
};