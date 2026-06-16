// Clause structure of the FIDIC 2017 second editions (Red / Yellow / Silver
// share this 21-clause architecture). Plain-language summaries for teaching.
// In the 1999 first editions there were 20 clauses with different numbering —
// most notably Claims & Disputes lived in Clause 20.

export interface FidicClause {
  no: number;
  title: string;
  summary: string;
  key?: string; // a notable sub-clause or concept
}

export const clauses2017: FidicClause[] = [
  { no: 1, title: 'General Provisions', summary: 'Определения, толкование, уведомления, приоритет документов, конфиденциальность и уступка.', key: 'Sub-Clause 1.3 — Notices' },
  { no: 2, title: 'The Employer', summary: 'Обязанности Заказчика: доступ к площадке, разрешения, финансовые механизмы и предоставление данных.', key: '2.4 — Employer\'s Financial Arrangements' },
  { no: 3, title: 'The Engineer', summary: 'Полномочия и обязанности Инженера, в т.ч. требование действовать нейтрально при определениях.', key: '3.7 — Agreement or Determination' },
  { no: 4, title: 'The Contractor', summary: 'Общие обязательства Подрядчика, обеспечение исполнения, программа работ, площадочные данные и непредвиденные условия.', key: '4.2 — Performance Security' },
  { no: 5, title: 'Subcontracting / Design', summary: 'В Red — субподряд; в Yellow/Silver — обязательства Подрядчика по проектированию и его пригодности для цели.', key: 'Yellow: Design' },
  { no: 6, title: 'Staff and Labour', summary: 'Найм персонала, условия труда, охрана труда, рабочее время и нормы поведения на площадке.' },
  { no: 7, title: 'Plant, Materials and Workmanship', summary: 'Качество материалов и работ, инспекции, испытания, отклонение брака и право на проверку.' },
  { no: 8, title: 'Commencement, Delays and Suspension', summary: 'Дата начала, программа, продление сроков (EOT), задержки и приостановка работ.', key: '8.5 — Extension of Time' },
  { no: 9, title: 'Tests on Completion', summary: 'Испытания при завершении: процедура, повторные испытания и последствия непрохождения.' },
  { no: 10, title: 'Employer\'s Taking Over', summary: 'Приёмка объекта или его частей, выдача Taking-Over Certificate, приёмка по частям.', key: '10.1 — Taking-Over Certificate' },
  { no: 11, title: 'Defects after Taking Over', summary: 'Период уведомления о дефектах (DNP), устранение дефектов и Performance Certificate.', key: '11.1 — Defects Notification Period' },
  { no: 12, title: 'Measurement / Tests after Completion', summary: 'Red: измерение и оценка объёмов. Yellow/Silver: испытания после завершения (эксплуатационные показатели).', key: 'Red: Measurement' },
  { no: 13, title: 'Variations and Adjustments', summary: 'Изменения, право Инженера/Заказчика на Variation, оценка изменений, корректировки цены.', key: '13.3 — Variation Procedure' },
  { no: 14, title: 'Contract Price and Payment', summary: 'Договорная цена, авансы, промежуточные платежи (IPC), удержания и окончательный расчёт.', key: '14.6 — Interim Payment Certificates' },
  { no: 15, title: 'Termination by Employer', summary: 'Уведомление об исправлении, основания расторжения по вине Подрядчика и расторжение по усмотрению Заказчика.', key: '15.2 — Termination for Contractor\'s Default' },
  { no: 16, title: 'Suspension and Termination by Contractor', summary: 'Право Подрядчика приостановить работы и расторгнуть договор (например, при неоплате).' },
  { no: 17, title: 'Care of the Works and Indemnities', summary: 'Ответственность за сохранность работ, возмещение убытков и пределы ответственности.', key: '17.x — Limitation of Liability' },
  { no: 18, title: 'Exceptional Events', summary: 'Исключительные события (в 1999 — Force Majeure): определение, последствия и право на освобождение.', key: 'ранее Force Majeure' },
  { no: 19, title: 'Insurance', summary: 'Страхование работ, оборудования, ответственности перед третьими лицами и персонала.' },
  { no: 20, title: 'Employer\'s and Contractor\'s Claims', summary: 'Единый порядок претензий обеих сторон: уведомление в течение 28 дней и детальное обоснование.', key: '20.2 — 28-дневное уведомление' },
  { no: 21, title: 'Disputes and Arbitration', summary: 'Совет по урегулированию споров (DAAB), полюбовное урегулирование и международный арбитраж.', key: '21 — DAAB → Arbitration' },
];

// The dispute-resolution staircase under the 2017 editions (titles stay English;
// descriptions are localized).
import type { Lang } from '../i18n/ui';

const disputeRaw: { step: string; title: string; desc: Record<Lang, string> }[] = [
  { step: '01', title: "Engineer's Determination", desc: {
    ru: 'Спор начинается с определения Инженера по Sub-Clause 3.7 (кроме Silver Book).',
    en: 'A dispute starts with the Engineer’s determination under Sub-Clause 3.7 (except the Silver Book).',
    uz: 'Nizo Sub-Clause 3.7 bo‘yicha Muhandis qarori bilan boshlanadi (Silver Book bundan mustasno).',
  } },
  { step: '02', title: 'Reference to the DAAB', desc: {
    ru: 'Передача спора в постоянный Dispute Avoidance/Adjudication Board.',
    en: 'Referral of the dispute to the standing Dispute Avoidance/Adjudication Board.',
    uz: 'Nizoni doimiy Dispute Avoidance/Adjudication Board’ga topshirish.',
  } },
  { step: '03', title: 'DAAB Decision', desc: {
    ru: 'DAAB выносит решение; оно обязательно к исполнению немедленно.',
    en: 'The DAAB issues a decision; it is binding with immediate effect.',
    uz: 'DAAB qaror chiqaradi; u darhol ijro etilishi shart.',
  } },
  { step: '04', title: 'Notice of Dissatisfaction', desc: {
    ru: 'Несогласная сторона подаёт NOD в установленный срок.',
    en: 'A dissatisfied party files an NOD within the set time limit.',
    uz: 'Rozi bo‘lmagan tomon belgilangan muddatda NOD topshiradi.',
  } },
  { step: '05', title: 'Amicable Settlement', desc: {
    ru: 'Период попытки мирного урегулирования до арбитража.',
    en: 'A period to attempt an amicable settlement before arbitration.',
    uz: 'Arbitrajgacha tinch yo‘l bilan kelishishga urinish davri.',
  } },
  { step: '06', title: 'International Arbitration', desc: {
    ru: 'Финальная стадия — арбитраж (как правило по правилам ICC).',
    en: 'The final stage — arbitration (typically under the ICC rules).',
    uz: 'Yakuniy bosqich — arbitraj (odatda ICC qoidalari bo‘yicha).',
  } },
];

export function getDisputeLadder(lang: Lang) {
  return disputeRaw.map((s) => ({ step: s.step, title: s.title, desc: s.desc[lang] }));
}
