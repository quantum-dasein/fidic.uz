// FIDIC terminology library. The English `term` is universal; the short `label`
// and the `definition` are localized, and the category is translated on output.
import type { Lang } from '../i18n/ui';

type CatKey = 'roles' | 'procedures' | 'payments' | 'disputes' | 'time' | 'documents';

const catLabels: Record<CatKey, Record<Lang, string>> = {
  roles: { ru: 'Роли', en: 'Roles', uz: 'Rollar' },
  procedures: { ru: 'Процедуры', en: 'Procedures', uz: 'Tartiblar' },
  payments: { ru: 'Платежи', en: 'Payments', uz: "To‘lovlar" },
  disputes: { ru: 'Споры', en: 'Disputes', uz: 'Nizolar' },
  time: { ru: 'Время', en: 'Time', uz: 'Vaqt' },
  documents: { ru: 'Документы', en: 'Documents', uz: 'Hujjatlar' },
};

export interface GlossaryTerm {
  term: string;
  label: string;
  category: string;
  definition: string;
}

interface RawTerm {
  term: string;
  cat: CatKey;
  label: Record<Lang, string>;
  def: Record<Lang, string>;
}

const raw: RawTerm[] = [
  { term: 'Engineer', cat: 'roles',
    label: { ru: 'Инженер', en: 'Engineer', uz: 'Muhandis' },
    def: {
      ru: 'Лицо, назначенное Заказчиком для администрирования контракта (Red/Yellow). При определениях обязан действовать нейтрально (Sub-Clause 3.7).',
      en: 'A person appointed by the Employer to administer the contract (Red/Yellow). Must act neutrally when making determinations (Sub-Clause 3.7).',
      uz: 'Shartnomani yuritish uchun Buyurtmachi tomonidan tayinlangan shaxs (Red/Yellow). Qaror chiqarishda neytral harakat qilishi shart (Sub-Clause 3.7).',
    } },
  { term: 'Employer', cat: 'roles',
    label: { ru: 'Заказчик', en: 'Employer', uz: 'Buyurtmachi' },
    def: {
      ru: 'Сторона, заказывающая работы и несущая платёжные обязательства; в Silver Book действует через Представителя Заказчика.',
      en: 'The party commissioning the works and carrying the payment obligations; in the Silver Book it acts through the Employer’s Representative.',
      uz: 'Ishlarga buyurtma beruvchi va to‘lov majburiyatlarini bajaruvchi tomon; Silver Book’da Buyurtmachi vakili orqali harakat qiladi.',
    } },
  { term: 'Contractor', cat: 'roles',
    label: { ru: 'Подрядчик', en: 'Contractor', uz: 'Pudratchi' },
    def: {
      ru: 'Сторона, выполняющая работы; в Yellow/Silver также отвечает за проектирование.',
      en: 'The party carrying out the works; in Yellow/Silver also responsible for the design.',
      uz: 'Ishlarni bajaruvchi tomon; Yellow/Silver’da loyihalash uchun ham javobgar.',
    } },
  { term: "Employer's Representative", cat: 'roles',
    label: { ru: 'Представитель Заказчика', en: 'Employer’s Representative', uz: 'Buyurtmachi vakili' },
    def: {
      ru: 'Управляет контрактом в Silver Book вместо независимого Инженера; действует в интересах Заказчика.',
      en: 'Manages the contract in the Silver Book instead of an independent Engineer; acts in the Employer’s interest.',
      uz: 'Silver Book’da mustaqil Muhandis o‘rniga shartnomani boshqaradi; Buyurtmachi manfaatida harakat qiladi.',
    } },
  { term: 'DAAB', cat: 'disputes',
    label: { ru: 'Совет по спорам', en: 'Dispute Avoidance/Adjudication Board', uz: 'Nizolar bo‘yicha kengash' },
    def: {
      ru: 'Dispute Avoidance/Adjudication Board — постоянный орган для предотвращения и решения споров; его решения обязательны к немедленному исполнению.',
      en: 'Dispute Avoidance/Adjudication Board — a standing body to avoid and resolve disputes; its decisions are binding with immediate effect.',
      uz: 'Dispute Avoidance/Adjudication Board — nizolarni oldini olish va hal qilish uchun doimiy organ; qarorlari darhol ijro etilishi shart.',
    } },
  { term: 'Notice of Dissatisfaction (NOD)', cat: 'disputes',
    label: { ru: 'Уведомление о несогласии', en: 'Notice of Dissatisfaction', uz: 'Rozilik bildirmaslik xabari' },
    def: {
      ru: 'Формальное уведомление о несогласии с решением DAAB, открывающее путь к арбитражу. Пропуск срока делает решение окончательным.',
      en: 'A formal notice of disagreement with a DAAB decision, opening the way to arbitration. Missing the deadline makes the decision final.',
      uz: 'DAAB qarori bilan rozi emasligi haqida rasmiy xabar bo‘lib, arbitrajga yo‘l ochadi. Muddat o‘tkazib yuborilsa, qaror yakuniy bo‘ladi.',
    } },
  { term: 'Variation', cat: 'procedures',
    label: { ru: 'Изменение', en: 'Variation', uz: "O‘zgartirish" },
    def: {
      ru: 'Изменение в Работах, инициированное Инженером/Заказчиком по Clause 13; оценивается и может корректировать цену и срок.',
      en: 'A change to the Works initiated by the Engineer/Employer under Clause 13; valued, and may adjust price and time.',
      uz: 'Clause 13 bo‘yicha Muhandis/Buyurtmachi tashabbusi bilan Ishlardagi o‘zgarish; baholanadi va narx hamda muddatni tuzatishi mumkin.',
    } },
  { term: 'Claim', cat: 'disputes',
    label: { ru: 'Претензия', en: 'Claim', uz: "Da’vo" },
    def: {
      ru: 'Требование одной стороны к другой о доп. оплате, продлении срока или ином праве. В 2017 — единый порядок для обеих сторон (Clause 20).',
      en: 'One party’s request to the other for additional payment, time or another entitlement. In 2017, a single procedure for both parties (Clause 20).',
      uz: 'Bir tomonning ikkinchisidan qo‘shimcha to‘lov, muddat yoki boshqa huquq talab qilishi. 2017-yilda — har ikki tomon uchun yagona tartib (Clause 20).',
    } },
  { term: 'Extension of Time (EOT)', cat: 'time',
    label: { ru: 'Продление срока', en: 'Extension of Time', uz: 'Muddatni uzaytirish' },
    def: {
      ru: 'Право Подрядчика на продление срока завершения при задержках, за которые он не отвечает (Sub-Clause 8.5).',
      en: 'The Contractor’s entitlement to extend the completion time for delays it is not responsible for (Sub-Clause 8.5).',
      uz: 'Pudratchi javobgar bo‘lmagan kechikishlar uchun yakunlash muddatini uzaytirish huquqi (Sub-Clause 8.5).',
    } },
  { term: 'Time-bar (28 days)', cat: 'time',
    label: { ru: 'Пресекательный срок 28 дней', en: '28-day time-bar', uz: '28 kunlik muddat' },
    def: {
      ru: 'Срок подачи уведомления о претензии. Пропуск может лишить стороны права на претензию (Sub-Clause 20.2.1).',
      en: 'The deadline to give a notice of claim. Missing it can forfeit the party’s right to the claim (Sub-Clause 20.2.1).',
      uz: 'Da’vo to‘g‘risida xabar berish muddati. O‘tkazib yuborish da’vo huquqidan mahrum qilishi mumkin (Sub-Clause 20.2.1).',
    } },
  { term: 'Taking-Over Certificate', cat: 'documents',
    label: { ru: 'Акт приёмки', en: 'Taking-Over Certificate', uz: 'Qabul qilish dalolatnomasi' },
    def: {
      ru: 'Подтверждает, что Работы завершены и приняты Заказчиком; запускает период уведомления о дефектах (Clause 10).',
      en: 'Confirms the Works are complete and taken over by the Employer; starts the Defects Notification Period (Clause 10).',
      uz: 'Ishlar yakunlangani va Buyurtmachi tomonidan qabul qilinganini tasdiqlaydi; nuqsonlar to‘g‘risida xabar berish davrini boshlaydi (Clause 10).',
    } },
  { term: 'Defects Notification Period (DNP)', cat: 'time',
    label: { ru: 'Период уведомления о дефектах', en: 'Defects Notification Period', uz: 'Nuqsonlar xabar berish davri' },
    def: {
      ru: 'Период после приёмки, в течение которого Подрядчик обязан устранять выявленные дефекты (Clause 11).',
      en: 'The period after taking-over during which the Contractor must remedy notified defects (Clause 11).',
      uz: 'Qabul qilingandan keyin Pudratchi aniqlangan nuqsonlarni bartaraf etishi shart bo‘lgan davr (Clause 11).',
    } },
  { term: 'Performance Certificate', cat: 'documents',
    label: { ru: 'Сертификат исполнения', en: 'Performance Certificate', uz: 'Bajarilish sertifikati' },
    def: {
      ru: 'Выдаётся после устранения дефектов и завершения DNP; означает выполнение обязательств Подрядчика.',
      en: 'Issued after defects are remedied and the DNP ends; signifies that the Contractor’s obligations are fulfilled.',
      uz: 'Nuqsonlar bartaraf etilib, DNP tugaganidan keyin beriladi; Pudratchi majburiyatlari bajarilganini bildiradi.',
    } },
  { term: 'Performance Security', cat: 'payments',
    label: { ru: 'Обеспечение исполнения', en: 'Performance Security', uz: 'Bajarilish ta’minoti' },
    def: {
      ru: 'Банковская гарантия/обеспечение, предоставляемое Подрядчиком как гарантия исполнения (Sub-Clause 4.2).',
      en: 'A bank guarantee/security provided by the Contractor as a performance guarantee (Sub-Clause 4.2).',
      uz: 'Pudratchi tomonidan bajarilish kafolati sifatida taqdim etiladigan bank kafolati/ta’minot (Sub-Clause 4.2).',
    } },
  { term: 'Interim Payment Certificate (IPC)', cat: 'payments',
    label: { ru: 'Промежуточный платёжный сертификат', en: 'Interim Payment Certificate', uz: 'Oraliq to‘lov sertifikati' },
    def: {
      ru: 'Сертификат Инженера на промежуточный платёж за выполненные объёмы и поставленные материалы (Clause 14).',
      en: 'The Engineer’s certificate for an interim payment for completed work and delivered materials (Clause 14).',
      uz: 'Bajarilgan hajmlar va yetkazilgan materiallar uchun oraliq to‘lov bo‘yicha Muhandis sertifikati (Clause 14).',
    } },
  { term: 'Provisional Sum', cat: 'payments',
    label: { ru: 'Условная сумма', en: 'Provisional Sum', uz: 'Shartli summa' },
    def: {
      ru: 'Сумма, заложенная в цену для работ/поставок, определяемых позднее; расходуется по указанию Инженера.',
      en: 'A sum included in the price for work/supply to be defined later; spent on the Engineer’s instruction.',
      uz: 'Keyinroq belgilanadigan ishlar/yetkazib berish uchun narxga kiritilgan summa; Muhandis ko‘rsatmasi bo‘yicha sarflanadi.',
    } },
  { term: 'Bill of Quantities (BoQ)', cat: 'documents',
    label: { ru: 'Ведомость объёмов', en: 'Bill of Quantities', uz: 'Hajmlar qaydnomasi' },
    def: {
      ru: 'Перечень объёмов работ с расценками; основа оплаты в Red/Pink Book (re-measurement).',
      en: 'A priced schedule of work quantities; the basis of payment in the Red/Pink Book (re-measurement).',
      uz: 'Narxlangan ish hajmlari ro‘yxati; Red/Pink Book’da to‘lov asosi (re-measurement).',
    } },
  { term: 'Tests on Completion', cat: 'procedures',
    label: { ru: 'Испытания при завершении', en: 'Tests on Completion', uz: 'Yakunlashda sinovlar' },
    def: {
      ru: 'Испытания перед приёмкой, подтверждающие соответствие Работ требованиям (Clause 9).',
      en: 'Tests before taking-over confirming the Works meet the requirements (Clause 9).',
      uz: 'Qabul qilishdan oldin Ishlar talablarga mosligini tasdiqlovchi sinovlar (Clause 9).',
    } },
  { term: 'Tests after Completion', cat: 'procedures',
    label: { ru: 'Испытания после завершения', en: 'Tests after Completion', uz: 'Yakunlashdan keyingi sinovlar' },
    def: {
      ru: 'Эксплуатационные испытания после приёмки (Yellow/Silver, Clause 12), подтверждающие проектные показатели.',
      en: 'Operational tests after taking-over (Yellow/Silver, Clause 12) confirming design performance.',
      uz: 'Qabul qilingandan keyingi ekspluatatsion sinovlar (Yellow/Silver, Clause 12), loyiha ko‘rsatkichlarini tasdiqlaydi.',
    } },
  { term: 'Exceptional Event', cat: 'procedures',
    label: { ru: 'Исключительное событие', en: 'Exceptional Event', uz: 'Istisno hodisa' },
    def: {
      ru: 'Событие вне контроля сторон (в 1999 — Force Majeure), дающее право на освобождение от ответственности (Clause 18).',
      en: 'An event beyond the parties’ control (Force Majeure in 1999), giving relief from liability (Clause 18).',
      uz: 'Tomonlar nazoratidan tashqari hodisa (1999-yilda — Force Majeure), javobgarlikdan ozod qilish huquqini beradi (Clause 18).',
    } },
  { term: 'Delay Damages', cat: 'payments',
    label: { ru: 'Неустойка за просрочку', en: 'Delay Damages', uz: 'Kechikish uchun jarima' },
    def: {
      ru: 'Заранее оценённые убытки за задержку завершения (liquidated damages), обычно с предельным размером.',
      en: 'Pre-assessed damages for delayed completion (liquidated damages), usually capped.',
      uz: 'Yakunlash kechikkani uchun oldindan baholangan zararlar (liquidated damages), odatda chegaralangan.',
    } },
  { term: 'Final Statement', cat: 'payments',
    label: { ru: 'Итоговый расчёт', en: 'Final Statement', uz: 'Yakuniy hisob-kitob' },
    def: {
      ru: 'Расчёт Подрядчика по завершении для окончательного определения причитающихся сумм (Clause 14).',
      en: 'The Contractor’s statement at completion to finally determine the amounts due (Clause 14).',
      uz: 'Tegishli summalarni yakuniy aniqlash uchun Pudratchining yakunlashdagi hisob-kitobi (Clause 14).',
    } },
  { term: 'Programme', cat: 'documents',
    label: { ru: 'Программа работ', en: 'Programme', uz: 'Ishlar dasturi' },
    def: {
      ru: 'Детальный график исполнения, представляемый Подрядчиком; основа контроля сроков (Sub-Clause 8.3).',
      en: 'The detailed execution schedule submitted by the Contractor; the basis for time control (Sub-Clause 8.3).',
      uz: 'Pudratchi taqdim etadigan batafsil bajarilish jadvali; muddatlarni nazorat qilish asosi (Sub-Clause 8.3).',
    } },
  { term: 'Unforeseeable Conditions', cat: 'procedures',
    label: { ru: 'Непредвиденные условия', en: 'Unforeseeable Conditions', uz: 'Oldindan ko‘rib bo‘lmaydigan sharoitlar' },
    def: {
      ru: 'Физические условия площадки, которые опытный Подрядчик не мог предвидеть (Sub-Clause 4.12); распределение риска зависит от книги.',
      en: 'Physical site conditions an experienced Contractor could not foresee (Sub-Clause 4.12); risk allocation depends on the book.',
      uz: 'Tajribali Pudratchi oldindan ko‘ra olmaydigan maydonning jismoniy sharoitlari (Sub-Clause 4.12); xavf taqsimoti kitobga bog‘liq.',
    } },
  { term: 'Determination', cat: 'procedures',
    label: { ru: 'Определение Инженера', en: 'Determination', uz: 'Muhandis qarori' },
    def: {
      ru: 'Решение Инженера по согласованию или определению вопроса при отсутствии договорённости сторон (Sub-Clause 3.7).',
      en: 'The Engineer’s decision to agree or determine a matter where the parties have not agreed (Sub-Clause 3.7).',
      uz: 'Tomonlar kelishmagan masalani kelishish yoki aniqlash bo‘yicha Muhandis qarori (Sub-Clause 3.7).',
    } },
  { term: 'Pink Book / MDB', cat: 'documents',
    label: { ru: 'Гармонизированная форма МФО', en: 'MDB Harmonised form', uz: 'XTB uyg‘unlashtirilgan shakli' },
    def: {
      ru: 'Версия Red Book, согласованная с банками развития (World Bank, ADB, EBRD) для финансируемых ими проектов.',
      en: 'A Red Book version harmonised with the development banks (World Bank, ADB, EBRD) for projects they finance.',
      uz: 'Taraqqiyot banklari (World Bank, ADB, EBRD) bilan ular moliyalashtiradigan loyihalar uchun kelishilgan Red Book versiyasi.',
    } },
];

export function getGlossary(lang: Lang): GlossaryTerm[] {
  return raw.map((t) => ({
    term: t.term,
    label: t.label[lang],
    category: catLabels[t.cat][lang],
    definition: t.def[lang],
  }));
}

export function getGlossaryCategories(lang: Lang): string[] {
  const seen = new Set<string>();
  raw.forEach((t) => seen.add(catLabels[t.cat][lang]));
  return Array.from(seen);
}
