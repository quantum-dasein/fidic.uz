// Central site configuration. Contacts inherited from Bridge Consult, the
// firm that powers fidic.uz.

export const site = {
  name: 'FIDIC.uz',
  tagline: 'Infrastructure Contracts Knowledge Hub',
  taglineRu: 'Центр знаний по инфраструктурным контрактам',
  description:
    'FIDIC.uz — независимый центр знаний по контрактам FIDIC, EPC, claims, DAAB и проектам МФО в Узбекистане и Центральной Азии. Статьи, интерактивная радужная серия, глоссарий и подготовка к сертификации.',
  url: 'https://fidic.uz',
  poweredBy: 'Bridge Consult',
  poweredByUrl: 'https://www.bridgeconsult.uz',
  contacts: {
    phone: '+998 33 000 15 30',
    phoneHref: 'tel:+998330001530',
    email: 'info@bridgeconsult.uz',
    telegram: 'https://t.me/fidicuzb',
    telegramHandle: '@fidicuzb',
    linkedin: 'https://www.linkedin.com/in/larissalk',
    address: 'г. Ташкент, Юнусабадский район, ул. Ахмада Дониша, 12 квартал, дом 20А',
    city: 'Ташкент, Узбекистан',
  },
};

// href is the CANONICAL (ru-root) path; components localize it per language.
export const nav = [
  { key: 'nav.suite', href: '/#suite' },
  { key: 'nav.knowledge', href: '/knowledge' },
  { key: 'nav.glossary', href: '/glossary' },
  { key: 'nav.certification', href: '/certification' },
  { key: 'nav.ask', href: '/#ask' },
];
