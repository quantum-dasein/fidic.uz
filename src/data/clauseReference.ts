// FIDIC clause REFERENCE registry — powers SEO pages at /clauses/<slug>/
// (trilingual). Add entries to grow the reference; the template, index and
// sitemap pick them up automatically. Reference-level content — should be
// reviewed by a FIDIC specialist before being relied on.
import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
type LList = Record<Lang, string[]>;

export interface ClauseRef {
  slug: string;
  number: string;
  books: string[];
  theme: ClauseThemeKey;
  title: L;
  summary: L;
  explanation: L;
  keyPoints: LList;
  v1999: L;
  v2017: L;
  v2022: L;
  related: string[];
  keywords: string;
}

export type ClauseThemeKey = 'claims' | 'time' | 'payment' | 'variations' | 'security' | 'risk';

export const clauseThemes: Record<ClauseThemeKey, L> = {
  claims: { ru: 'Претензии и споры', en: 'Claims & disputes', uz: 'Daʼvolar va nizolar' },
  time: { ru: 'Сроки и EOT', en: 'Time & EOT', uz: 'Muddatlar va EOT' },
  payment: { ru: 'Оплата', en: 'Payment', uz: 'Toʻlov' },
  variations: { ru: 'Изменения (Variations)', en: 'Variations', uz: 'Oʻzgartirishlar' },
  security: { ru: 'Гарантии и обеспечение', en: 'Securities', uz: 'Kafolatlar' },
  risk: { ru: 'Риски и события', en: 'Risk & events', uz: 'Risklar va hodisalar' },
};

export const themeOrder: ClauseThemeKey[] = ['claims', 'time', 'payment', 'variations', 'security', 'risk'];

export const clauseRefs: ClauseRef[] = [
  {
    slug: 'claims-20-2',
    number: '20.2',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'claims',
    keywords: 'FIDIC 20.2, claims FIDIC, порядок претензий, notice of claim, time-bar, 28 дней, 84 дня',
    title: {
      ru: 'Sub-Clause 20.2 — Порядок претензий (Claims)',
      en: 'Sub-Clause 20.2 — Claims procedure',
      uz: 'Sub-Clause 20.2 — Daʼvolar tartibi (Claims)',
    },
    summary: {
      ru: 'Единый порядок претензий обеих сторон: уведомление за 28 дней и детальное обоснование за 84 дня.',
      en: 'A single claims procedure for both parties: 28-day notice and 84-day fully detailed claim.',
      uz: 'Ikkala tomon uchun yagona daʼvo tartibi: 28 kunlik bildirishnoma va 84 kunlik batafsil daʼvo.',
    },
    explanation: {
      ru: 'Издание 2017 ввело единый процедурный механизм для претензий и Подрядчика, и Заказчика на дополнительное время (EOT) и/или деньги. Сторона обязана подать Notice of Claim в течение 28 дней с момента, когда узнала или должна была узнать о событии. Пропуск этого срока ведёт к утрате права (time-bar). Затем подаётся полностью детализированная претензия в течение 84 дней, и Инженер действует по Sub-Clause 3.7 (Agreement or Determination).',
      en: 'The 2017 edition introduced a single procedural mechanism for claims by both the Contractor and the Employer for extra time (EOT) and/or money. A party must give a Notice of Claim within 28 days of becoming aware (or of when it should have become aware) of the event. Missing this period bars the claim (time-bar). A fully detailed claim follows within 84 days, and the Engineer acts under Sub-Clause 3.7 (Agreement or Determination).',
      uz: '2017 nashri Pudratchi ham, Buyurtmachi ham qoʻshimcha vaqt (EOT) va/yoki pul boʻyicha daʼvo qilishi uchun yagona protsessual mexanizmni joriy etdi. Tomon hodisadan xabardor boʻlgan (yoki boʻlishi kerak boʻlgan) kundan 28 kun ichida Notice of Claim berishi shart. Bu muddatni oʻtkazib yuborish daʼvo huquqini yoʻqotadi (time-bar). Soʻngra 84 kun ichida batafsil daʼvo beriladi va Engineer Sub-Clause 3.7 boʻyicha ish koʻradi.',
    },
    keyPoints: {
      ru: [
        'Notice of Claim — 28 дней с момента осведомлённости (20.2.1).',
        'Пропуск 28 дней = утрата права (time-bar), если не оспорено успешно.',
        'Fully detailed claim — в течение 84 дней (20.2.4).',
        'Механизм применяется к обеим сторонам — Подрядчику и Заказчику.',
      ],
      en: [
        'Notice of Claim — 28 days from awareness (20.2.1).',
        'Missing 28 days bars the claim unless successfully challenged.',
        'Fully detailed claim — within 84 days (20.2.4).',
        'The mechanism applies to both the Contractor and the Employer.',
      ],
      uz: [
        'Notice of Claim — xabardorlikdan 28 kun (20.2.1).',
        '28 kunni oʻtkazib yuborish daʼvoni bekor qiladi (muvaffaqiyatli eʼtiroz boʻlmasa).',
        'Batafsil daʼvo — 84 kun ichida (20.2.4).',
        'Mexanizm ikkala tomonga ham tegishli.',
      ],
    },
    v1999: {
      ru: 'Только Sub-Clause 20.1 и только для претензий Подрядчика; претензии Заказчика шли по Sub-Clause 2.5.',
      en: 'Only Sub-Clause 20.1 and only for the Contractor; the Employer’s claims went through Sub-Clause 2.5.',
      uz: 'Faqat Sub-Clause 20.1 va faqat Pudratchi uchun; Buyurtmachi daʼvolari Sub-Clause 2.5 orqali edi.',
    },
    v2017: {
      ru: 'Единый механизм 20.2 для обеих сторон, чёткие сроки 28/84 дня и прямой time-bar.',
      en: 'A single 20.2 mechanism for both parties, clear 28/84-day periods and an explicit time-bar.',
      uz: 'Ikkala tomon uchun yagona 20.2 mexanizmi, aniq 28/84 kun muddatlari va toʻgʻridan-toʻgʻri time-bar.',
    },
    v2022: {
      ru: 'Reprint 2022 сохранил структуру 2017 с редакционными уточнениями формулировок.',
      en: 'The 2022 reprint kept the 2017 structure with editorial clarifications.',
      uz: '2022 reprint 2017 tuzilmasini tahririy aniqliklar bilan saqladi.',
    },
    related: ['extension-of-time-8-5', 'delay-damages-8-8', 'daab-disputes-21'],
  },
  {
    slug: 'extension-of-time-8-5',
    number: '8.5',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'time',
    keywords: 'FIDIC 8.5, extension of time, EOT, продление срока, критический путь, delay analysis',
    title: {
      ru: 'Sub-Clause 8.5 — Продление срока (Extension of Time)',
      en: 'Sub-Clause 8.5 — Extension of Time',
      uz: 'Sub-Clause 8.5 — Muddatni uzaytirish (EOT)',
    },
    summary: {
      ru: 'Право Подрядчика на продление Time for Completion при задержках по перечисленным причинам.',
      en: 'The Contractor’s entitlement to extend the Time for Completion for listed causes of delay.',
      uz: 'Pudratchining sanab oʻtilgan sabablarga koʻra Time for Completion ni uzaytirish huquqi.',
    },
    explanation: {
      ru: 'Sub-Clause 8.5 даёт Подрядчику право на продление срока завершения (EOT), если завершение задержано по причинам из закрытого перечня: Variations, исключительно неблагоприятные климатические условия, задержки со стороны Заказчика/Инженера и др. EOT увязывается с порядком претензий по Sub-Clause 20.2, а обоснование требует анализа влияния на критический путь.',
      en: 'Sub-Clause 8.5 entitles the Contractor to an Extension of Time (EOT) where completion is delayed by listed causes: Variations, exceptionally adverse climatic conditions, delays caused by the Employer/Engineer, and others. EOT runs through the claims procedure in Sub-Clause 20.2 and must be supported by a critical-path delay analysis.',
      uz: 'Sub-Clause 8.5 Pudratchiga sanab oʻtilgan sabablar (Variations, favqulodda noqulay iqlim sharoiti, Buyurtmachi/Engineer kechikishlari va boshqalar) tufayli yakunlash kechiksa, muddatni uzaytirish (EOT) huquqini beradi. EOT Sub-Clause 20.2 daʼvo tartibi orqali oʻtadi va critical path tahlili bilan asoslanishi kerak.',
    },
    keyPoints: {
      ru: [
        'EOT — только по причинам из закрытого перечня 8.5.',
        'Заявляется через порядок претензий 20.2 (следите за сроком notice).',
        'Нужен анализ влияния на критический путь (delay analysis).',
        'EOT защищает от delay damages по 8.8 за этот период.',
      ],
      en: [
        'EOT only for the closed list of causes in 8.5.',
        'Claimed via the 20.2 claims procedure (mind the notice).',
        'Requires a critical-path delay analysis.',
        'EOT protects against delay damages under 8.8 for that period.',
      ],
      uz: [
        'EOT faqat 8.5 dagi yopiq roʻyxat sabablari boʻyicha.',
        '20.2 daʼvo tartibi orqali talab qilinadi (notice muddatiga eʼtibor).',
        'Critical path delay analysis talab qilinadi.',
        'EOT shu davr uchun 8.8 boʻyicha delay damagesdan himoya qiladi.',
      ],
    },
    v1999: {
      ru: 'EOT регулировался Sub-Clause 8.4 с похожим перечнем причин.',
      en: 'EOT was governed by Sub-Clause 8.4 with a similar list of causes.',
      uz: 'EOT oʻxshash sabablar roʻyxati bilan Sub-Clause 8.4 da edi.',
    },
    v2017: {
      ru: 'Перенумерован в 8.5; жёстко увязан с единым порядком претензий 20.2.',
      en: 'Renumbered to 8.5 and tightly linked to the unified 20.2 claims procedure.',
      uz: '8.5 ga raqamlandi va yagona 20.2 daʼvo tartibiga bogʻlandi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений по существу EOT.',
      en: 'The 2022 reprint made no substantive change to EOT.',
      uz: '2022 reprint EOT mohiyatini oʻzgartirmadi.',
    },
    related: ['claims-20-2', 'delay-damages-8-8', 'variations-13'],
  },
  {
    slug: 'delay-damages-8-8',
    number: '8.8',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'time',
    keywords: 'FIDIC 8.8, delay damages, liquidated damages, неустойка за просрочку, предел cap',
    title: {
      ru: 'Sub-Clause 8.8 — Неустойка за просрочку (Delay Damages)',
      en: 'Sub-Clause 8.8 — Delay Damages',
      uz: 'Sub-Clause 8.8 — Kechikish uchun toʻlov (Delay Damages)',
    },
    summary: {
      ru: 'Заранее оценённые убытки за просрочку завершения: ставка за день в пределах cap.',
      en: 'Pre-agreed damages for late completion: a daily rate capped by the Contract Data.',
      uz: 'Kechikish uchun oldindan kelishilgan toʻlov: kunlik stavka, Contract Data dagi cap bilan.',
    },
    explanation: {
      ru: 'Если Подрядчик не завершает работы в срок (с учётом EOT), он платит delay damages по ставке из Contract Data за каждый день просрочки, но не выше предела (cap). Это исключительное средство Заказчика за задержку (кроме случаев расторжения). Поэтому EOT по 8.5 прямо влияет на размер: правильно полученное продление уменьшает период просрочки.',
      en: 'If the Contractor fails to complete on time (after any EOT), it pays delay damages at the rate in the Contract Data for each day of delay, up to a cap. These are the Employer’s sole remedy for delay (other than termination). EOT under 8.5 therefore drives the amount: a properly granted extension reduces the period of culpable delay.',
      uz: 'Agar Pudratchi (EOT hisobga olingan holda) oʻz vaqtida yakunlamasa, har bir kechikish kuni uchun Contract Data dagi stavka boʻyicha delay damages toʻlaydi, lekin capdan oshmaydi. Bu Buyurtmachining kechikish uchun yagona vositasi (bekor qilishdan tashqari). Shuning uchun 8.5 boʻyicha EOT summaga taʼsir qiladi.',
    },
    keyPoints: {
      ru: [
        'Ставка и cap указываются в Contract Data.',
        'Исключительное средство за просрочку (помимо расторжения).',
        'EOT по 8.5 уменьшает период начисления.',
        'Посчитать можно в калькуляторе LD на сайте.',
      ],
      en: [
        'Rate and cap are stated in the Contract Data.',
        'Sole remedy for delay (apart from termination).',
        'EOT under 8.5 reduces the chargeable period.',
        'Use the LD calculator on this site to estimate it.',
      ],
      uz: [
        'Stavka va cap Contract Data da koʻrsatiladi.',
        'Kechikish uchun yagona vosita (bekor qilishdan tashqari).',
        '8.5 boʻyicha EOT hisoblash davrini kamaytiradi.',
        'Saytdagi LD kalkulyatorida hisoblang.',
      ],
    },
    v1999: {
      ru: 'Регулировалось Sub-Clause 8.7 («Delay Damages»).',
      en: 'Governed by Sub-Clause 8.7 (“Delay Damages”).',
      uz: 'Sub-Clause 8.7 da edi («Delay Damages»).',
    },
    v2017: {
      ru: 'Перенумеровано в 8.8; формулировки уточнены.',
      en: 'Renumbered to 8.8 with clarified wording.',
      uz: '8.8 ga raqamlandi, matn aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['extension-of-time-8-5', 'claims-20-2'],
  },
  {
    slug: 'variations-13',
    number: '13',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'variations',
    keywords: 'FIDIC 13, variations, изменения, value engineering, оценка изменений, 13.3',
    title: {
      ru: 'Clause 13 — Изменения и корректировки (Variations)',
      en: 'Clause 13 — Variations and Adjustments',
      uz: 'Clause 13 — Oʻzgartirishlar (Variations)',
    },
    summary: {
      ru: 'Право Инженера инициировать изменения и порядок их оценки и оплаты.',
      en: 'The Engineer’s power to instruct Variations and how they are valued and paid.',
      uz: 'Engineerning oʻzgartirish kiritish huquqi va ularni baholash tartibi.',
    },
    explanation: {
      ru: 'Clause 13 позволяет Инженеру инициировать Variation (изменение объёма, качества, последовательности работ) до выдачи Taking-Over Certificate. Variation оформляется инструкцией (13.3.1) или запросом предложения (13.3.2). Стоимость оценивается по согласованным ставкам/расценкам, а изменение может также давать право на EOT по 8.5. Variation — частая причина claim, поэтому важно фиксировать инструкции и records.',
      en: 'Clause 13 lets the Engineer instruct a Variation (change in scope, quality or sequence) before the Taking-Over Certificate. A Variation is made by instruction (13.3.1) or by request for proposal (13.3.2). It is valued using agreed rates/prices, and may also give an entitlement to EOT under 8.5. Variations are a frequent source of claims, so instructions and records must be captured.',
      uz: 'Clause 13 Engineerga Taking-Over Certificate berilgunga qadar Variation (hajm, sifat yoki ketma-ketlikni oʻzgartirish) kiritish imkonini beradi. Variation koʻrsatma (13.3.1) yoki taklif soʻrovi (13.3.2) bilan rasmiylashtiriladi. Qiymat kelishilgan stavkalar boʻyicha baholanadi va 8.5 boʻyicha EOT huquqini ham berishi mumkin.',
    },
    keyPoints: {
      ru: [
        'Инициируется инструкцией Инженера (13.3.1) или RFP (13.3.2).',
        'Оценка — по согласованным ставкам и расценкам.',
        'Может давать право на EOT (8.5) и дополнительную оплату.',
        'Фиксируйте инструкции и contemporary records.',
      ],
      en: [
        'Instructed by the Engineer (13.3.1) or via RFP (13.3.2).',
        'Valued using agreed rates and prices.',
        'May give entitlement to EOT (8.5) and extra payment.',
        'Capture instructions and contemporary records.',
      ],
      uz: [
        'Engineer koʻrsatmasi (13.3.1) yoki RFP (13.3.2) bilan kiritiladi.',
        'Kelishilgan stavkalar boʻyicha baholanadi.',
        'EOT (8.5) va qoʻshimcha toʻlov huquqini berishi mumkin.',
        'Koʻrsatmalar va contemporary records ni qayd eting.',
      ],
    },
    v1999: {
      ru: 'Clause 13 с похожей структурой; механизм value engineering присутствовал.',
      en: 'Clause 13 with a similar structure; value engineering existed.',
      uz: 'Clause 13 oʻxshash tuzilma bilan; value engineering mavjud edi.',
    },
    v2017: {
      ru: 'Уточнён порядок 13.3 (инструкция vs запрос предложения) и связь с 3.7.',
      en: 'The 13.3 process (instruction vs request for proposal) and the link to 3.7 were clarified.',
      uz: '13.3 tartibi va 3.7 bilan bogʻliqlik aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['claims-20-2', 'extension-of-time-8-5', 'payment-14'],
  },
  {
    slug: 'payment-14',
    number: '14',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'payment',
    keywords: 'FIDIC 14, payment, IPC, interim payment certificate, retention, advance payment, 14.6, 14.7',
    title: {
      ru: 'Clause 14 — Цена контракта и оплата (Payment)',
      en: 'Clause 14 — Contract Price and Payment',
      uz: 'Clause 14 — Shartnoma narxi va toʻlov (Payment)',
    },
    summary: {
      ru: 'Механизм платежей: авансы, промежуточные платежи (IPC), удержание и окончательный расчёт.',
      en: 'The payment mechanism: advance, interim payments (IPC), retention and final account.',
      uz: 'Toʻlov mexanizmi: avans, oraliq toʻlovlar (IPC), retention va yakuniy hisob.',
    },
    explanation: {
      ru: 'Clause 14 описывает денежный поток проекта: advance payment (14.2), ежемесячные заявки и промежуточные платёжные сертификаты — IPC (14.3–14.6), удержание (retention), сроки оплаты (14.7) и Final Statement. Просрочка оплаты даёт право на проценты (14.8) и, при существенной просрочке, основания по Clause 16. Несовпадение payment milestones с реальным cash-flow — типичный тендерный риск.',
      en: 'Clause 14 sets out the project cash flow: advance payment (14.2), monthly statements and Interim Payment Certificates — IPC (14.3–14.6), retention, payment timing (14.7) and the Final Statement. Late payment entitles the Contractor to financing charges (14.8) and, if serious, to remedies under Clause 16. A mismatch between payment milestones and real cash flow is a classic tender risk.',
      uz: 'Clause 14 loyiha pul oqimini belgilaydi: avans (14.2), oylik soʻrovlar va Interim Payment Certificates — IPC (14.3–14.6), retention, toʻlov muddati (14.7) va Final Statement. Kech toʻlov foiz huquqini (14.8) va jiddiy holatda Clause 16 boʻyicha asoslarni beradi.',
    },
    keyPoints: {
      ru: [
        'Advance payment и его погашение — 14.2.',
        'IPC выпускается Инженером после проверки заявки — 14.6.',
        'Сроки оплаты — 14.7; проценты за просрочку — 14.8.',
        'Посчитать IPC можно в калькуляторе на сайте.',
      ],
      en: [
        'Advance payment and its repayment — 14.2.',
        'The IPC is issued by the Engineer after review — 14.6.',
        'Payment timing — 14.7; financing charges — 14.8.',
        'Use the IPC calculator on this site.',
      ],
      uz: [
        'Avans va uni qoplash — 14.2.',
        'IPC tekshiruvdan keyin Engineer tomonidan beriladi — 14.6.',
        'Toʻlov muddati — 14.7; foizlar — 14.8.',
        'Saytdagi IPC kalkulyatoridan foydalaning.',
      ],
    },
    v1999: {
      ru: 'Clause 14 с близкой структурой платежей и сертификации.',
      en: 'Clause 14 with a similar payment and certification structure.',
      uz: 'Clause 14 oʻxshash toʻlov va sertifikatlash tuzilmasi bilan.',
    },
    v2017: {
      ru: 'Уточнены сроки, содержание Statement и порядок выпуска IPC.',
      en: 'Timing, the Statement content and IPC issue were clarified.',
      uz: 'Muddatlar, Statement mazmuni va IPC berish tartibi aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['claims-20-2', 'variations-13'],
  },
  {
    slug: 'daab-disputes-21',
    number: '21',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'claims',
    keywords: 'FIDIC 21, DAAB, dispute, разрешение споров, notice of dissatisfaction, арбитраж, 21.4',
    title: {
      ru: 'Clause 21 — Споры и DAAB (Disputes)',
      en: 'Clause 21 — Disputes and the DAAB',
      uz: 'Clause 21 — Nizolar va DAAB',
    },
    summary: {
      ru: 'Многоступенчатый порядок: DAAB → уведомление о несогласии → мирное урегулирование → арбитраж.',
      en: 'A multi-tier route: DAAB → notice of dissatisfaction → amicable settlement → arbitration.',
      uz: 'Koʻp bosqichli tartib: DAAB → norozilik bildirishnomasi → tinch hal qilish → arbitraj.',
    },
    explanation: {
      ru: 'Издание 2017 сделало DAAB постоянным (Dispute Avoidance/Adjudication Board), а не разовым. Спор передаётся в DAAB, который выносит решение в течение 84 дней (21.4.3). Несогласная сторона подаёт Notice of Dissatisfaction в течение 28 дней (21.4.4); далее — период мирного урегулирования 28 дней (21.5) и затем арбитраж (21.6). Сроки удобно проверять в калькуляторе DAAB на сайте.',
      en: 'The 2017 edition made the DAAB a standing board (Dispute Avoidance/Adjudication Board) rather than ad hoc. A dispute is referred to the DAAB, which decides within 84 days (21.4.3). A dissatisfied party serves a Notice of Dissatisfaction within 28 days (21.4.4); an amicable-settlement period of 28 days follows (21.5), then arbitration (21.6). Use the DAAB timeline calculator on this site to check the dates.',
      uz: '2017 nashri DAAB ni doimiy (Dispute Avoidance/Adjudication Board) qildi. Nizo DAABga topshiriladi, u 84 kun ichida qaror chiqaradi (21.4.3). Norozi tomon 28 kun ichida Notice of Dissatisfaction beradi (21.4.4); soʻngra 28 kunlik tinch hal qilish davri (21.5) va arbitraj (21.6). Sanalarni saytdagi DAAB kalkulyatorida tekshiring.',
    },
    keyPoints: {
      ru: [
        'DAAB — постоянный орган (2017), а не разовый.',
        'Решение DAAB — 84 дня с передачи (21.4.3).',
        'Notice of Dissatisfaction — 28 дней (21.4.4).',
        'Затем мирное урегулирование (21.5) и арбитраж (21.6).',
      ],
      en: [
        'The DAAB is a standing board (2017), not ad hoc.',
        'DAAB decision — 84 days from referral (21.4.3).',
        'Notice of Dissatisfaction — 28 days (21.4.4).',
        'Then amicable settlement (21.5) and arbitration (21.6).',
      ],
      uz: [
        'DAAB doimiy organ (2017), bir martalik emas.',
        'DAAB qarori — topshirishdan 84 kun (21.4.3).',
        'Notice of Dissatisfaction — 28 kun (21.4.4).',
        'Soʻngra tinch hal qilish (21.5) va arbitraj (21.6).',
      ],
    },
    v1999: {
      ru: 'Споры — Clause 20 (DAB), часто ad hoc, с похожими сроками решения.',
      en: 'Disputes were in Clause 20 (DAB), often ad hoc, with similar decision periods.',
      uz: 'Nizolar Clause 20 (DAB) da, koʻpincha ad hoc, oʻxshash muddatlar bilan.',
    },
    v2017: {
      ru: 'Вынесено в отдельный Clause 21; DAAB сделан постоянным, добавлен Dispute Avoidance.',
      en: 'Moved to a separate Clause 21; the DAAB became standing, with dispute avoidance added.',
      uz: 'Alohida Clause 21 ga chiqarildi; DAAB doimiy boʻldi, dispute avoidance qoʻshildi.',
    },
    v2022: {
      ru: 'Reprint 2022 уточнил процедуру DAAB и сроки без смены сути.',
      en: 'The 2022 reprint clarified DAAB procedure and timing without changing substance.',
      uz: '2022 reprint DAAB tartibi va muddatlarini mohiyatini oʻzgartirmay aniqlashtirdi.',
    },
    related: ['claims-20-2', 'extension-of-time-8-5'],
  },
];

export function clauseRefBySlug(slug: string): ClauseRef | undefined {
  return clauseRefs.find((c) => c.slug === slug);
}
