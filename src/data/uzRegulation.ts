// Uzbek legal acts that reference FIDIC.
//
// Compiled from a lex.uz full-text search for "FIDIC" (22 hits across the three
// language versions of each act, so eight distinct instruments). Metadata —
// number, date, issuing body, title, document id — is taken from the lex.uz
// record for each act.
//
// `verified` marks entries whose FIDIC provision was read against the primary
// text rather than inferred from the title. Where it is false the page says only
// that the act references FIDIC and links to the source; it does not paraphrase
// a provision nobody checked. Keep it that way: a regulation page that guesses
// is worse than no regulation page.

import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;

export interface RegulationAct {
  /** Reference as published, e.g. "ПП-330". */
  number: string;
  /** ISO date of adoption. */
  date: string;
  /** lex.uz document id for the Russian version where one exists. */
  docId: string;
  body: L;
  form: L;
  title: L;
  /** What the act does about FIDIC. Only written where verified. */
  note?: L;
  verified: boolean;
}

export const regulationActs: RegulationAct[] = [
  {
    number: 'ПП-4035',
    date: '2018-11-27',
    docId: '4082603',
    verified: true,
    body: { ru: 'Президент Республики Узбекистан', en: 'President of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Prezidenti' },
    form: { ru: 'Постановление', en: 'Decree', uz: 'Qaror' },
    title: {
      ru: 'О мерах по внедрению передовых зарубежных методов организации работ в сфере строительства и эксплуатации автомобильных дорог',
      en: 'On measures to introduce advanced foreign methods of organising work in road construction and maintenance',
      uz: 'Avtomobil yoʻllarini qurish va ekspluatatsiya qilish sohasida ilgʻor xorijiy usullarni joriy etish chora-tadbirlari toʻgʻrisida',
    },
    note: {
      ru: 'Точка отсчёта. В дорожной карте акта — пункт о внесении предложений о вступлении Республики Узбекистан в Международную федерацию инженеров-консультантов (FIDIC), с проработкой в течение 2019 года. Речь ещё не о применении контрактных форм, а о членстве в организации.',
      en: 'The starting point. The act’s roadmap includes submitting proposals for the Republic of Uzbekistan to join the International Federation of Consulting Engineers (FIDIC), to be worked through during 2019. This is about membership of the organisation, not yet about adopting its contract forms.',
      uz: 'Sanoq nuqtasi. Hujjatning yoʻl xaritasida Oʻzbekiston Respublikasining Xalqaro maslahatchi muhandislar federatsiyasiga (FIDIC) aʼzo boʻlishi haqida takliflar kiritish bandi bor, 2019 yil davomida ishlab chiqilishi bilan. Gap hali shartnoma shakllarini qoʻllash haqida emas, tashkilotga aʼzolik haqida.',
    },
  },
  {
    number: 'УП-5890',
    date: '2019-12-09',
    docId: '4634789',
    verified: false,
    body: { ru: 'Президент Республики Узбекистан', en: 'President of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Prezidenti' },
    form: { ru: 'Указ', en: 'Decree', uz: 'Farmon' },
    title: {
      ru: 'О мерах по глубокому реформированию системы дорожного хозяйства Республики Узбекистан',
      en: 'On measures for deep reform of the road sector of the Republic of Uzbekistan',
      uz: 'Oʻzbekiston Respublikasi yoʻl xoʻjaligi tizimini chuqur isloh qilish chora-tadbirlari toʻgʻrisida',
    },
  },
  {
    number: 'УП-94',
    date: '2023-06-14',
    docId: '6496126',
    verified: false,
    body: { ru: 'Президент Республики Узбекистан', en: 'President of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Prezidenti' },
    form: { ru: 'Указ', en: 'Decree', uz: 'Farmon' },
    title: {
      ru: 'О мерах по эффективной организации государственного управления в сфере транспорта в рамках административных реформ',
      en: 'On the effective organisation of state administration in transport within the administrative reforms',
      uz: 'Maʼmuriy islohotlar doirasida transport sohasida davlat boshqaruvini samarali tashkil qilish chora-tadbirlari toʻgʻrisida',
    },
  },
  {
    number: 'ПП-330',
    date: '2023-10-10',
    docId: '6634311',
    verified: true,
    body: { ru: 'Президент Республики Узбекистан', en: 'President of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Prezidenti' },
    form: { ru: 'Постановление', en: 'Decree', uz: 'Qaror' },
    title: {
      ru: 'О мерах по дальнейшему совершенствованию сферы дорожного хозяйства',
      en: 'On measures for further improvement of the road sector',
      uz: 'Yoʻl xoʻjaligi sohasini yanada takomillashtirish chora-tadbirlari toʻgʻrisida',
    },
    note: {
      ru: 'Ключевой акт. Фиксирует, что независимые инженерные консультанты ведут инженерное управление проектом и технический контроль на дорожно-строительных объектах по практике и документам FIDIC. И устанавливает: с 1 января 2025 года на новых дорожно-строительных объектах эти работы выполняются независимыми организациями, включая частный сектор, на условиях аутсорсинга. Роль Инженера перестаёт быть внутренней функцией заказчика и становится отдельным закупаемым контрактом.',
      en: 'The operative act. It records that independent engineering consultants carry out project engineering management and technical supervision on road construction sites in accordance with FIDIC practice and documents. And it provides that from 1 January 2025, on new road construction projects, that work is performed by independent organisations, including the private sector, on an outsourcing basis. The Engineer’s role stops being an internal employer function and becomes a separately procured contract.',
      uz: 'Asosiy hujjat. U mustaqil muhandis-konsultantlar yoʻl-qurilish obyektlarida loyihani muhandislik boshqaruvi va texnik nazoratni FIDIC amaliyoti va hujjatlariga muvofiq amalga oshirishini qayd etadi. Va belgilaydi: 2025 yil 1 yanvardan yangi yoʻl-qurilish obyektlarida bu ishlar mustaqil tashkilotlar, shu jumladan xususiy sektor tomonidan autsorsing shartlarida bajariladi. Muhandis roli buyurtmachining ichki funksiyasi boʻlishdan toʻxtab, alohida xarid qilinadigan shartnomaga aylanadi.',
    },
  },
  {
    number: 'ПП-343',
    date: '2023-10-24',
    docId: '6648585',
    verified: false,
    body: { ru: 'Президент Республики Узбекистан', en: 'President of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Prezidenti' },
    form: { ru: 'Постановление', en: 'Decree', uz: 'Qaror' },
    title: {
      ru: 'О дополнительных мерах по дальнейшему совершенствованию системы питьевого водоснабжения и канализации',
      en: 'On additional measures to further improve the drinking water supply and sewerage system',
      uz: 'Ichimlik suv taʼminoti va oqova suv tizimini yanada takomillashtirish boʻyicha qoʻshimcha chora-tadbirlar toʻgʻrisida',
    },
  },
  {
    number: 'ПП-157',
    date: '2024-04-15',
    docId: '6885789',
    verified: false,
    body: { ru: 'Президент Республики Узбекистан', en: 'President of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Prezidenti' },
    form: { ru: 'Постановление', en: 'Decree', uz: 'Qaror' },
    title: {
      ru: 'О мерах по реализации проекта «Строительство внутренних дорог с цементобетонным покрытием» с участием Азиатского банка развития',
      en: 'On implementing the “Construction of internal roads with cement-concrete pavement” project with the Asian Development Bank',
      uz: 'Osiyo taraqqiyot banki ishtirokida “Sement-beton qoplamali ichki yoʻllarni qurish” loyihasini amalga oshirish chora-tadbirlari toʻgʻrisida',
    },
  },
  {
    number: 'ПП-28',
    date: '2025-01-27',
    docId: '7342176',
    verified: false,
    body: { ru: 'Президент Республики Узбекистан', en: 'President of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Prezidenti' },
    form: { ru: 'Постановление', en: 'Decree', uz: 'Qaror' },
    title: {
      ru: 'О мерах по дальнейшему развитию транспортно-логистической системы Республики Узбекистан',
      en: 'On measures for further development of the transport and logistics system of the Republic of Uzbekistan',
      uz: 'Oʻzbekiston Respublikasining transport-logistika tizimini yanada rivojlantirish chora-tadbirlari toʻgʻrisida',
    },
  },
  {
    number: '673',
    date: '2025-10-24',
    docId: '7789312',
    verified: false,
    body: { ru: 'Кабинет Министров Республики Узбекистан', en: 'Cabinet of Ministers of the Republic of Uzbekistan', uz: 'Oʻzbekiston Respublikasi Vazirlar Mahkamasi' },
    form: { ru: 'Постановление', en: 'Resolution', uz: 'Qaror' },
    title: {
      ru: 'О мерах по формированию рынка энергосервисных услуг и стимулированию повышения энергоэффективности жилья населения',
      en: 'On forming an energy service market and incentivising energy efficiency in residential housing',
      uz: 'Energiya servis xizmatlari bozorini shakllantirish hamda aholi uy-joylarining energiya samaradorligi oshirilishini ragʻbatlantirish chora-tadbirlari toʻgʻrisida',
    },
  },
];

export function lexUrl(act: RegulationAct, lang: Lang): string {
  // lex.uz serves Russian and Uzbek interfaces; the document id is the same.
  const iface = lang === 'uz' ? 'uz' : 'ru';
  return `https://lex.uz/${iface}/docs/${act.docId}`;
}

/** Newest first — the page reads as a reverse timeline. */
export function actsByDateDesc(): RegulationAct[] {
  return [...regulationActs].sort((a, b) => b.date.localeCompare(a.date));
}
