import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;

export interface MdbCase {
  slug: string;
  bank: 'World Bank' | 'ADB' | 'EBRD';
  country: string;
  sector: L;
  title: L;
  summary: L;
  contractModel: string;
  focus: L[];
  clauses: string[];
}

export const mdbCases: MdbCase[] = [
  {
    slug: 'world-bank-road-rehabilitation-central-asia',
    bank: 'World Bank',
    country: 'Central Asia',
    sector: { ru: 'Дороги и транспорт', en: 'Roads and transport', uz: 'Yo‘llar va transport' },
    title: {
      ru: 'Реабилитация дорог по правилам Всемирного банка',
      en: 'Road rehabilitation under World Bank procurement',
      uz: 'Jahon banki qoidalari bo‘yicha yo‘l rekonstruksiyasi',
    },
    summary: {
      ru: 'Типовой кейс для подрядчика: Pink Book/MDB, измеряемые объемы, строгие notice-сроки и постоянный риск variations по фактическим условиям площадки.',
      en: 'A typical contractor case: Pink Book/MDB, re-measurement, strict notice deadlines and recurring variation risk from actual site conditions.',
      uz: 'Pudratchi uchun tipik holat: Pink Book/MDB, re-measurement, qatʼiy notice muddatlari va maydon sharoitlari bo‘yicha variation riski.',
    },
    contractModel: 'Pink Book / Red Book MDB',
    focus: [
      { ru: 'Contract Data и особые условия банка', en: 'Contract Data and bank Particular Conditions', uz: 'Contract Data va bankning Maxsus shartlari' },
      { ru: 'Уведомления по 20.2 и contemporary records', en: '20.2 notices and contemporary records', uz: '20.2 notices va contemporary records' },
      { ru: 'Переизмерение объемов и variations', en: 'Re-measurement and variations', uz: 'Re-measurement va variations' },
    ],
    clauses: ['claims-20-2', 'variations-13', 'unforeseeable-conditions-4-12', 'payment-14'],
  },
  {
    slug: 'adb-water-supply-programme-uzbekistan',
    bank: 'ADB',
    country: 'Uzbekistan',
    sector: { ru: 'Водоснабжение', en: 'Water supply', uz: 'Suv taʼminoti' },
    title: {
      ru: 'Водоснабжение по проекту АБР: платежи, ESHS и claims file',
      en: 'ADB water supply project: payments, ESHS and claim file',
      uz: 'ADB suv taʼminoti loyihasi: payments, ESHS va claim file',
    },
    summary: {
      ru: 'Практический фокус для команды проекта: как не потерять оплату, EOT и доказательства при множестве участков, разрешений и коммунальных пересечений.',
      en: 'Practical project-team focus: how not to lose payment, EOT and evidence across many sites, permits and utility interfaces.',
      uz: 'Amaliy fokus: ko‘p uchastka, ruxsatlar va kommunal kesishuvlarda payment, EOT va dalillarni yo‘qotmaslik.',
    },
    contractModel: 'FIDIC MDB / Red Book',
    focus: [
      { ru: 'IPC и подтверждение объемов', en: 'IPC and quantity substantiation', uz: 'IPC va hajmlarni asoslash' },
      { ru: 'Разрешения, доступ на площадку и EOT', en: 'Permits, site access and EOT', uz: 'Ruxsatlar, site access va EOT' },
      { ru: 'ESHS-obligations как источник риска', en: 'ESHS obligations as a risk source', uz: 'ESHS majburiyatlari risk manbai sifatida' },
    ],
    clauses: ['payment-14', 'extension-of-time-8-5', 'claims-20-2', 'advance-warning-8-4'],
  },
  {
    slug: 'ebrd-energy-epc-central-asia',
    bank: 'EBRD',
    country: 'Central Asia',
    sector: { ru: 'Энергетика и EPC', en: 'Energy and EPC', uz: 'Energetika va EPC' },
    title: {
      ru: 'EPC-проект ЕБРР: performance, tests и распределение риска',
      en: 'EBRD EPC project: performance, tests and risk allocation',
      uz: 'EBRD EPC loyihasi: performance, tests va risk taqsimoti',
    },
    summary: {
      ru: 'Кейс для инвесторских EPC/turnkey проектов: подрядчик отвечает за дизайн, performance tests и дату, а спор часто начинается с scope gaps.',
      en: 'A case for investor EPC/turnkey projects: the contractor owns design, performance tests and date certainty; disputes often start with scope gaps.',
      uz: 'Investor EPC/turnkey loyihalari uchun holat: pudratchi design, performance tests va muddat uchun javobgar; nizo ko‘pincha scope gapsdan boshlanadi.',
    },
    contractModel: 'Silver Book / EPC',
    focus: [
      { ru: 'Fit for purpose и design responsibility', en: 'Fit for purpose and design responsibility', uz: 'Fit for purpose va design responsibility' },
      { ru: 'Tests on Completion / after Completion', en: 'Tests on Completion / after Completion', uz: 'Tests on Completion / after Completion' },
      { ru: 'Delay damages и cap', en: 'Delay damages and cap', uz: 'Delay damages va cap' },
    ],
    clauses: ['delay-damages-8-8', 'performance-security-4-2', 'taking-over-10-1', 'defects-period-11'],
  },
];
