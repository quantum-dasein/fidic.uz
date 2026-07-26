// Named experts behind the content. Google and AI answer engines weight
// legal/technical material far more heavily when it carries an identifiable
// author with verifiable credentials than when it is attributed to a company.
//
// Source of record: "Belousova L.K. BIO 18072026" (trilingual), supplied by
// BRIDGE Consult. Keep credentials in sync with that document — do not invent
// or extrapolate qualifications here.

import type { Lang } from '../i18n/ui';

export interface AuthorProfile {
  slug: string;
  /** Display name per language. */
  name: Record<Lang, string>;
  /** Role at the firm, per language. */
  jobTitle: Record<Lang, string>;
  /** One-line positioning shown under the name. */
  headline: Record<Lang, string>;
  /** Two-to-three paragraph biography. */
  bio: Record<Lang, string[]>;
  /** Post-nominals rendered as chips and fed to schema.org `hasCredential`. */
  credentials: string[];
  /** Committee seats and memberships, per language. */
  memberships: Record<Lang, string[]>;
  /** Dispute-resolution appointments, per language. */
  disputeRoles: Record<Lang, string[]>;
  /** schema.org `knowsAbout`. */
  knowsAbout: string[];
  email: string;
  linkedin: string;
}

export const larisaBelousova: AuthorProfile = {
  slug: 'larisa-belousova',
  name: {
    ru: 'Лариса Белоусова',
    en: 'Larisa Belousova',
    uz: 'Larisa Belousova',
  },
  jobTitle: {
    ru: 'Основатель и директор BRIDGE Consult LLC',
    en: 'Founder and Director, BRIDGE Consult LLC',
    uz: 'BRIDGE Consult LLC asoschisi va direktori',
  },
  headline: {
    ru: 'Инфраструктурные контракты · FIDIC · EPC/EPC+F · закупки · claims · dispute avoidance · международный арбитраж',
    en: 'Infrastructure contracts · FIDIC · EPC and EPC+F · procurement · claims · dispute avoidance · international arbitration',
    uz: 'Infratuzilma shartnomalari · FIDIC · EPC va EPC+F · xaridlar · da’volar · nizolarning oldini olish · xalqaro arbitraj',
  },
  bio: {
    ru: [
      'Эксперт по инфраструктурным контрактам, закупкам, строительным требованиям и разрешению споров. 27 лет управленческого опыта в производстве и строительстве, логистике и закупках, включая более 15 лет специализированной работы с контрактами FIDIC и инфраструктурными проектами, финансируемыми международными финансовыми институтами.',
      'Опыт охватывает автомобильные дороги, мосты и тоннели, транспортную и аэропортовую инфраструктуру, городскую инфраструктуру, водоснабжение и канализацию, энергетику и другие крупные инфраструктурные объекты.',
      'Специализируется на администрировании контрактов FIDIC, структурировании моделей EPC и EPC+F, подготовке закупочной и тендерной документации, управлении изменениями, требованиями, сроками, стоимостью и договорными рисками, а также на предупреждении и разрешении строительных споров. Как основатель и директор BRIDGE Consult LLC консультирует государственные органы, заказчиков, подрядчиков, инженеров и инженерно-консультационные организации в странах Центральной Азии.',
    ],
    en: [
      'International infrastructure contracts, procurement and construction disputes specialist with 27 years of management experience in manufacturing, construction, logistics and procurement, including more than 15 years of specialised experience in FIDIC contract management and IFI-financed infrastructure projects.',
      'Sector experience covers roads and highways, bridges and tunnels, transport and airport infrastructure, urban and public infrastructure, water supply and wastewater, energy and other major infrastructure projects.',
      'Specialises in FIDIC contract administration, EPC and EPC+F contract structuring, procurement and tender documentation, variation and claims management, delay and quantum analysis, contractual and commercial risk management, dispute avoidance and construction dispute resolution. As Founder and Director of BRIDGE Consult LLC, she advises government authorities, employers, contractors, engineers and consulting firms across Central Asia.',
    ],
    uz: [
      'Infratuzilma shartnomalari, xaridlar va qurilish nizolari bo‘yicha xalqaro ekspert. Ishlab chiqarish, qurilish, logistika va xaridlar sohalarida 27 yillik boshqaruv tajribasiga, shu jumladan FIDIC shartnomalarini boshqarish va xalqaro moliya institutlari tomonidan moliyalashtiriladigan infratuzilma loyihalarida 15 yildan ortiq ixtisoslashgan tajribaga ega.',
      'Tarmoq tajribasi avtomobil yo‘llari, ko‘priklar va tunnellar, transport va aeroport infratuzilmasi, shahar va ijtimoiy infratuzilma, suv ta’minoti va oqova suv tizimlari, energetika hamda boshqa yirik infratuzilma loyihalarini qamrab oladi.',
      'FIDIC shartnomalarini boshqarish, EPC va EPC+F shartnomalarini tuzish, xarid va tender hujjatlarini tayyorlash, o‘zgartirishlar va da’volarni boshqarish, kechikishlar va da’volar qiymatini tahlil qilish, shartnomaviy va tijorat risklarini boshqarish, nizolarning oldini olish va qurilish nizolarini hal etishga ixtisoslashgan. BRIDGE Consult LLC asoschisi va direktori sifatida Markaziy Osiyoda davlat organlari, buyurtmachilar, pudratchilar, muhandislar va konsalting kompaniyalariga maslahat beradi.',
    ],
  },
  credentials: ['FCCE', 'FCCP', 'MCIArb', 'PCQI', 'ICP'],
  memberships: {
    ru: [
      'член FCCE Certification Committee, FIDIC Credentialing',
      'член FIDIC Integrity Management Committee',
      'FCCE — FIDIC Certified Consulting Engineer',
      'FCCP — FIDIC Certified Consulting Professional',
      'ADB Accredited Contract Management and Dispute Avoidance Specialist',
      'полноправный член Казахстанской национальной ассоциации профессиональных инженеров и консультантов (KNAPEK)',
      'член Правления Ассоциации дорожников Узбекистана',
      'член Project Management Institute (PMI)',
      'PCQI — Practitioner of the Chartered Quality Institute, CQI, UK',
      'ICAgile Certified Professional (ICP)',
    ],
    en: [
      'Member of the FCCE Certification Committee, FIDIC Credentialing',
      'Member of the FIDIC Integrity Management Committee',
      'FCCE — FIDIC Certified Consulting Engineer',
      'FCCP — FIDIC Certified Consulting Professional',
      'ADB Accredited Contract Management and Dispute Avoidance Specialist',
      'Full Member of the Kazakhstan National Association of Professional Engineers and Consultants (KNAPEK)',
      'Board Member of the Uzbekistan Road Association',
      'Member of the Project Management Institute (PMI)',
      'PCQI — Practitioner of the Chartered Quality Institute, CQI, United Kingdom',
      'ICAgile Certified Professional (ICP)',
    ],
    uz: [
      'FCCE Certification Committee, FIDIC Credentialing a’zosi',
      'FIDIC Integrity Management Committee a’zosi',
      'FCCE — FIDIC Certified Consulting Engineer',
      'FCCP — FIDIC Certified Consulting Professional',
      'ADB Accredited Contract Management and Dispute Avoidance Specialist',
      'Qozog‘iston Professional Muhandislar va Konsultantlar Milliy Assotsiatsiyasi (KNAPEK) to‘liq a’zosi',
      'O‘zbekiston Yo‘l Assotsiatsiyasi Boshqaruvi a’zosi',
      'Project Management Institute (PMI) a’zosi',
      'PCQI — Practitioner of the Chartered Quality Institute, CQI, Buyuk Britaniya',
      'ICAgile Certified Professional (ICP)',
    ],
  },
  disputeRoles: {
    ru: [
      'член Chartered Institute of Arbitrators (MCIArb)',
      'член LCIA European Users’ Council',
      'член ICAA Next Generation',
      'арбитр Международного коммерческого арбитражного суда при ТПП Республики Узбекистан (ICAC Uzbekistan)',
      'член Austrian Arbitration Association',
      'DRBF Emerging Markets Licensed Professional and Dispute Board Practitioner',
      'независимый медиатор, зарегистрированный Министерством юстиции Республики Узбекистан',
    ],
    en: [
      'Member of the Chartered Institute of Arbitrators (MCIArb)',
      'Member of the LCIA European Users’ Council',
      'Member of ICAA Next Generation',
      'Arbitrator at the International Commercial Arbitration Court under the Chamber of Commerce and Industry of the Republic of Uzbekistan (ICAC Uzbekistan)',
      'Member of the Austrian Arbitration Association',
      'DRBF Emerging Markets Licensed Professional and Dispute Board Practitioner',
      'Independent Mediator registered with the Ministry of Justice of the Republic of Uzbekistan',
    ],
    uz: [
      'Chartered Institute of Arbitrators a’zosi (MCIArb)',
      'LCIA European Users’ Council a’zosi',
      'ICAA Next Generation a’zosi',
      'O‘zbekiston Respublikasi Savdo-sanoat palatasi huzuridagi Xalqaro tijorat arbitraj sudi arbitri (ICAC Uzbekistan)',
      'Austrian Arbitration Association a’zosi',
      'DRBF Emerging Markets Licensed Professional and Dispute Board Practitioner',
      'O‘zbekiston Respublikasi Adliya vazirligida ro‘yxatdan o‘tgan mustaqil mediator',
    ],
  },
  knowsAbout: [
    'FIDIC contract administration',
    'FIDIC Red Book',
    'FIDIC Yellow Book',
    'FIDIC Silver Book',
    'FIDIC MDB Harmonised Edition',
    'EPC and EPC+F contract structuring',
    'Public procurement',
    'Construction claims',
    'Extension of time and delay analysis',
    'Quantum analysis',
    'Dispute avoidance',
    'Dispute boards (DAB and DAAB)',
    'Construction arbitration',
    'Mediation',
  ],
  email: 'mail@lkbelousova.ru',
  linkedin: 'https://www.linkedin.com/in/larissalk/',
};

export const authors: Record<string, AuthorProfile> = {
  [larisaBelousova.slug]: larisaBelousova,
};

/** Articles carry an author slug; anything unrecognised falls back to the firm's principal. */
export function getAuthor(slug?: string): AuthorProfile {
  return (slug && authors[slug]) || larisaBelousova;
}

export function authorPath(profile: AuthorProfile): string {
  return `/about/${profile.slug}`;
}
