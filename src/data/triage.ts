// Situation-first entry points for the homepage.
//
// The primary visitor is a contractor with a live problem, not someone browsing
// a knowledge base. They do not want to know what the site contains — they want
// to find themselves. Each entry names a situation in the words a project team
// would use, tags it with the clause that governs it, and goes straight to the
// tool that does the work.
//
// Every `href` must point at something that exists; the build asserts this.

import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;

export interface TriageEntry {
  /** Clause number or short marker shown in the badge. */
  mark: string;
  /** The situation, phrased from the project's side. */
  situation: L;
  /** What opens, phrased as the action not the page name. */
  action: L;
  href: string;
}

export const triageEntries: TriageEntry[] = [
  {
    mark: '20.2',
    href: '/tools/calculators/time-bar',
    situation: {
      ru: 'На площадке произошло событие — нужна претензия',
      en: 'Something happened on site and a claim is needed',
      uz: 'Obyektda hodisa yuz berdi — daʼvo kerak',
    },
    action: {
      ru: 'Калькулятор time-bar · 28 и 84 дня',
      en: 'Time-bar calculator · 28 and 84 days',
      uz: 'Time-bar kalkulyatori · 28 va 84 kun',
    },
  },
  {
    mark: '8.8',
    href: '/tools/calculators/liquidated-damages',
    situation: {
      ru: 'Заказчик заявил об удержании неустойки',
      en: 'The Employer is proposing to deduct delay damages',
      uz: 'Buyurtmachi jarima ushlab qolish haqida bildirdi',
    },
    action: {
      ru: 'Расчёт delay damages · проверка cap',
      en: 'Delay damages calculation · cap check',
      uz: 'Delay damages hisobi · cap tekshiruvi',
    },
  },
  {
    mark: '8.5',
    href: '/tools/calculators/eot-delay',
    situation: {
      ru: 'Инженер отклонил продление срока',
      en: 'The Engineer refused an extension of time',
      uz: 'Muhandis muddat uzaytirishni rad etdi',
    },
    action: {
      ru: 'Калькулятор EOT · анализ задержки',
      en: 'EOT calculator · delay analysis',
      uz: 'EOT kalkulyatori · kechikish tahlili',
    },
  },
  {
    mark: '14',
    href: '/tools/calculators/interim-payment',
    situation: {
      ru: 'Платёж задерживают или срезали сумму',
      en: 'Payment is late or the certified amount was cut',
      uz: 'Toʻlov kechiktirilyapti yoki summa qisqartirilgan',
    },
    action: {
      ru: 'Калькулятор IPC · порядок по 16.1',
      en: 'IPC calculator · the 16.1 route',
      uz: 'IPC kalkulyatori · 16.1 boʻyicha tartib',
    },
  },
  {
    mark: '4.12',
    href: '/clauses/unforeseeable-conditions-4-12',
    situation: {
      ru: 'Вскрыли грунты, которых не было в изысканиях',
      en: 'Ground conditions differ from the tender data',
      uz: 'Izlanishlarda boʻlmagan tuproq sharoitlari ochildi',
    },
    action: {
      ru: 'Непредвиденные условия · что фиксировать',
      en: 'Unforeseeable conditions · what to record',
      uz: 'Kutilmagan sharoitlar · nimani qayd etish kerak',
    },
  },
  {
    mark: '21',
    href: '/tools/calculators/daab-timeline',
    situation: {
      ru: 'Спор идёт в DAAB',
      en: 'A dispute has been referred to the DAAB',
      uz: 'Nizo DAAB ga topshirildi',
    },
    action: {
      ru: 'Таймлайн DAAB · срок NOD',
      en: 'DAAB timeline · the NOD deadline',
      uz: 'DAAB taymlayni · NOD muddati',
    },
  },
  {
    mark: 'МФО',
    href: '/tools/tender-risk-lab',
    situation: {
      ru: 'Готовлю оферту на тендер банка развития',
      en: 'Preparing a bid for a development bank tender',
      uz: 'Taraqqiyot banki tenderiga oferta tayyorlayapman',
    },
    action: {
      ru: 'Tender Risk Lab · чеклист · открытые тендеры',
      en: 'Tender Risk Lab · checklist · open tenders',
      uz: 'Tender Risk Lab · cheklist · ochiq tenderlar',
    },
  },
  {
    mark: '?',
    href: '/tools/book-selector',
    situation: {
      ru: 'Не знаю, какая книга нужна проекту',
      en: 'Not sure which book the project needs',
      uz: 'Loyihaga qaysi kitob kerakligini bilmayman',
    },
    action: {
      ru: 'Book Selector · сравнение форм',
      en: 'Book Selector · form comparison',
      uz: 'Book Selector · shakllarni solishtirish',
    },
  },
];

export const triageCopy: Record<Lang, { eyebrow: string; h2: string; sub: string; all: string; legend: string }> = {
  ru: {
    eyebrow: 'Начните отсюда',
    h2: 'Что происходит на проекте?',
    sub: 'Выберите ситуацию — откроется нужный пункт контракта и расчёт под него.',
    all: 'Все инструменты',
    legend: 'Справочный расчёт. Particular Conditions вашего контракта могут менять сроки и пределы.',
  },
  en: {
    eyebrow: 'Start here',
    h2: 'What is happening on the project?',
    sub: 'Pick the situation — it opens the governing clause and the calculation for it.',
    all: 'All tools',
    legend: 'Reference calculation. Your contract’s Particular Conditions can change the periods and caps.',
  },
  uz: {
    eyebrow: 'Shu yerdan boshlang',
    h2: 'Loyihada nima boʻlyapti?',
    sub: 'Vaziyatni tanlang — tegishli shartnoma bandi va unga mos hisob ochiladi.',
    all: 'Barcha vositalar',
    legend: 'Maʼlumot uchun hisob. Shartnomangizning Particular Conditions muddat va chegaralarni oʻzgartirishi mumkin.',
  },
};
