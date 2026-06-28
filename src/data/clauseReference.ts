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
  {
    slug: 'agreement-determination-3-7',
    number: '3.7',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'claims',
    keywords: 'FIDIC 3.7, определение инженера, agreement or determination, нейтральность инженера, 3.7.1, 3.7.2',
    title: {
      ru: 'Sub-Clause 3.7 — Согласование или определение (Engineer)',
      en: 'Sub-Clause 3.7 — Agreement or Determination',
      uz: 'Sub-Clause 3.7 — Kelishuv yoki qaror (Engineer)',
    },
    summary: {
      ru: 'Инженер сначала добивается соглашения сторон, а при его отсутствии выносит справедливое определение.',
      en: 'The Engineer first seeks agreement and, failing that, makes a fair determination.',
      uz: 'Engineer avval kelishuvga erishadi, boʻlmasa adolatli qaror chiqaradi.',
    },
    explanation: {
      ru: 'Издание 2017 ввело двухэтапный механизм: по любому вопросу или претензии Инженер сначала консультируется со сторонами для достижения соглашения (3.7.1), а если соглашение не достигнуто в срок — выносит справедливое определение (3.7.2). Инженер обязан действовать нейтрально, а не как представитель Заказчика. Определение обязательно к исполнению, пока не оспорено через Notice of Dissatisfaction и DAAB. В Silver Book эту роль выполняет Заказчик.',
      en: 'The 2017 edition introduced a two-step mechanism: for any matter or claim the Engineer first consults the parties to reach agreement (3.7.1) and, failing agreement in time, makes a fair determination (3.7.2). The Engineer must act neutrally, not as the Employer’s agent. A determination is binding until revised through a Notice of Dissatisfaction and the DAAB. In the Silver Book this role is performed by the Employer.',
      uz: '2017 nashri ikki bosqichli mexanizmni joriy etdi: har qanday masala yoki daʼvo boʻyicha Engineer avval tomonlar bilan kelishuvga erishishga harakat qiladi (3.7.1), kelishuv boʻlmasa — adolatli qaror chiqaradi (3.7.2). Engineer betaraf ish koʻrishi shart. Qaror NOD va DAAB orqali oʻzgartirilgunga qadar majburiy. Silver Book da bu rolni Buyurtmachi bajaradi.',
    },
    keyPoints: {
      ru: [
        'Сначала соглашение (3.7.1), затем определение (3.7.2).',
        'Инженер действует нейтрально, не как сторона Заказчика.',
        'Сроки на консультации и определение установлены пунктом.',
        'Несогласие — через NOD и далее DAAB (Clause 21).',
      ],
      en: [
        'Agreement first (3.7.1), then determination (3.7.2).',
        'The Engineer acts neutrally, not as the Employer’s side.',
        'The clause sets time limits for consultation and determination.',
        'Disagreement goes via NOD and then the DAAB (Clause 21).',
      ],
      uz: [
        'Avval kelishuv (3.7.1), keyin qaror (3.7.2).',
        'Engineer betaraf, Buyurtmachi tomoni emas.',
        'Band konsultatsiya va qaror muddatlarini belgilaydi.',
        'Norozilik — NOD va keyin DAAB (Clause 21) orqali.',
      ],
    },
    v1999: {
      ru: 'Определения выносились по Sub-Clause 3.5 без явного этапа соглашения.',
      en: 'Determinations were made under Sub-Clause 3.5 without an explicit agreement step.',
      uz: 'Qarorlar Sub-Clause 3.5 boʻyicha, aniq kelishuv bosqichisiz chiqarilardi.',
    },
    v2017: {
      ru: 'Введён двухэтапный механизм 3.7 (соглашение → определение) и требование нейтральности.',
      en: 'A two-step 3.7 mechanism (agreement → determination) and a neutrality duty were introduced.',
      uz: 'Ikki bosqichli 3.7 mexanizmi va betaraflik talabi joriy etildi.',
    },
    v2022: {
      ru: 'Reprint 2022 уточнил сроки и процедуру 3.7.',
      en: 'The 2022 reprint clarified the 3.7 timing and procedure.',
      uz: '2022 reprint 3.7 muddatlari va tartibini aniqlashtirdi.',
    },
    related: ['claims-20-2', 'daab-disputes-21'],
  },
  {
    slug: 'performance-security-4-2',
    number: '4.2',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'security',
    keywords: 'FIDIC 4.2, performance security, банковская гарантия, обеспечение исполнения, release trigger',
    title: {
      ru: 'Sub-Clause 4.2 — Обеспечение исполнения (Performance Security)',
      en: 'Sub-Clause 4.2 — Performance Security',
      uz: 'Sub-Clause 4.2 — Ijro kafolati (Performance Security)',
    },
    summary: {
      ru: 'Гарантия исполнения обязательств Подрядчика: форма, сумма, срок и условия предъявления.',
      en: 'Security for the Contractor’s performance: form, amount, validity and conditions for a call.',
      uz: 'Pudratchi majburiyatlari kafolati: shakl, summa, muddat va talab qilish sharti.',
    },
    explanation: {
      ru: 'Подрядчик предоставляет Performance Security (обычно банковскую гарантию) на сумму и в форме из Contract Data в течение 28 дней после Letter of Acceptance. Заказчик может предъявить её только в перечисленных случаях (4.2.2) — это защищает Подрядчика от необоснованного списания. Гарантия действует до выдачи Performance Certificate и затем возвращается. Нестандартные условия и неясный release trigger — частый тендерный риск.',
      en: 'The Contractor provides Performance Security (usually a bank guarantee) in the amount and form set in the Contract Data within 28 days of the Letter of Acceptance. The Employer may call it only in the listed cases (4.2.2), which protects the Contractor from an unjustified call. It remains valid until the Performance Certificate and is then returned. Non-standard terms and an unclear release trigger are a common tender risk.',
      uz: 'Pudratchi Letter of Acceptance dan 28 kun ichida Contract Data dagi summa va shaklda Performance Security (odatda bank kafolati) taqdim etadi. Buyurtmachi uni faqat sanab oʻtilgan hollarda (4.2.2) talab qilishi mumkin. Kafolat Performance Certificate gacha amal qiladi va qaytariladi. Nostandart shartlar va noaniq release trigger — keng tarqalgan tender riski.',
    },
    keyPoints: {
      ru: [
        'Предоставляется в течение 28 дней после Letter of Acceptance.',
        'Сумма и форма — из Contract Data.',
        'Предъявление только по основаниям 4.2.2.',
        'Действует до Performance Certificate, затем возвращается.',
      ],
      en: [
        'Provided within 28 days of the Letter of Acceptance.',
        'Amount and form per the Contract Data.',
        'A call is allowed only on the 4.2.2 grounds.',
        'Valid until the Performance Certificate, then returned.',
      ],
      uz: [
        'Letter of Acceptance dan 28 kun ichida taqdim etiladi.',
        'Summa va shakl — Contract Data dan.',
        'Talab faqat 4.2.2 asoslari boʻyicha.',
        'Performance Certificate gacha amal qiladi.',
      ],
    },
    v1999: {
      ru: 'Регулировалось Sub-Clause 4.2 с похожими требованиями к гарантии.',
      en: 'Governed by Sub-Clause 4.2 with similar security requirements.',
      uz: 'Sub-Clause 4.2 da oʻxshash talablar bilan edi.',
    },
    v2017: {
      ru: 'Добавлены чёткие основания предъявления и привязка к датам/событиям.',
      en: 'Clear grounds for a call and links to dates/events were added.',
      uz: 'Aniq talab asoslari va sana/hodisalarga bogʻlash qoʻshildi.',
    },
    v2022: {
      ru: 'Reprint 2022 обновил ссылки на типовые формы гарантий в приложениях.',
      en: 'The 2022 reprint updated references to the annexed guarantee forms.',
      uz: '2022 reprint ilovadagi kafolat shakllariga havolalarni yangiladi.',
    },
    related: ['payment-14', 'claims-20-2'],
  },
  {
    slug: 'unforeseeable-conditions-4-12',
    number: '4.12',
    books: ['Red', 'Yellow'],
    theme: 'risk',
    keywords: 'FIDIC 4.12, unforeseeable physical conditions, непредвиденные физические условия, подземные условия, claim',
    title: {
      ru: 'Sub-Clause 4.12 — Непредвиденные физические условия',
      en: 'Sub-Clause 4.12 — Unforeseeable Physical Conditions',
      uz: 'Sub-Clause 4.12 — Oldindan koʻrib boʻlmaydigan jismoniy sharoitlar',
    },
    summary: {
      ru: 'Право Подрядчика на EOT и/или затраты при непредвиденных физических условиях на площадке.',
      en: 'The Contractor’s entitlement to EOT and/or Cost for unforeseeable physical conditions on site.',
      uz: 'Maydondagi oldindan koʻrib boʻlmaydigan sharoitlar uchun EOT va/yoki Cost huquqi.',
    },
    explanation: {
      ru: 'Если Подрядчик сталкивается с физическими условиями (обычно подземными), которые были Unforeseeable — опытный подрядчик не мог их предвидеть на дату подачи Tender, — он уведомляет Инженера и может претендовать на EOT и/или Cost по Sub-Clause 20.2. Условие применяется в Red и Yellow Book; в Silver Book риск физических условий, как правило, переложен на Подрядчика, что важно проверять до подачи цены.',
      en: 'If the Contractor encounters physical conditions (usually sub-surface) that were Unforeseeable — an experienced contractor could not have foreseen them by the Tender date — it notifies the Engineer and may claim EOT and/or Cost under Sub-Clause 20.2. The clause applies in the Red and Yellow Book; in the Silver Book the risk of physical conditions is usually shifted to the Contractor, which must be checked before pricing.',
      uz: 'Agar Pudratchi Tender sanasiga tajribali pudratchi koʻra olmaydigan (Unforeseeable) jismoniy sharoitlarga (odatda yer osti) duch kelsa, Engineerni ogohlantiradi va Sub-Clause 20.2 boʻyicha EOT va/yoki Cost talab qilishi mumkin. Band Red va Yellow Book da qoʻllaniladi; Silver Book da bu risk odatda Pudratchiga oʻtkaziladi.',
    },
    keyPoints: {
      ru: [
        'Условия должны быть Unforeseeable для опытного подрядчика.',
        'Уведомление Инженера + claim по порядку 20.2.',
        'Право на EOT и/или Cost (без profit).',
        'В Silver Book риск обычно переложен на Подрядчика.',
      ],
      en: [
        'Conditions must be Unforeseeable for an experienced contractor.',
        'Notify the Engineer and claim under 20.2.',
        'Entitlement to EOT and/or Cost (without profit).',
        'In the Silver Book the risk is usually on the Contractor.',
      ],
      uz: [
        'Sharoit tajribali pudratchi uchun Unforeseeable boʻlishi kerak.',
        'Engineerni ogohlantirish + 20.2 boʻyicha daʼvo.',
        'EOT va/yoki Cost huquqi (profitsiz).',
        'Silver Book da risk odatda Pudratchida.',
      ],
    },
    v1999: {
      ru: 'Sub-Clause 4.12 с похожим тестом «unforeseeable».',
      en: 'Sub-Clause 4.12 with a similar “unforeseeable” test.',
      uz: 'Sub-Clause 4.12 oʻxshash «unforeseeable» testi bilan.',
    },
    v2017: {
      ru: 'Уточнён порядок уведомления и связь с единым claim-механизмом 20.2.',
      en: 'The notice process and the link to the unified 20.2 claim mechanism were clarified.',
      uz: 'Ogohlantirish tartibi va 20.2 bilan bogʻliqlik aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['claims-20-2', 'extension-of-time-8-5'],
  },
  {
    slug: 'advance-warning-8-4',
    number: '8.4',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'time',
    keywords: 'FIDIC 8.4, advance warning, заблаговременное предупреждение, early warning, 2017',
    title: {
      ru: 'Sub-Clause 8.4 — Заблаговременное предупреждение (Advance Warning)',
      en: 'Sub-Clause 8.4 — Advance Warning',
      uz: 'Sub-Clause 8.4 — Oldindan ogohlantirish (Advance Warning)',
    },
    summary: {
      ru: 'Обязанность сторон заранее предупреждать о вероятных будущих событиях, влияющих на работы, цену или сроки.',
      en: 'A duty to warn in advance of probable future events affecting the works, price or time.',
      uz: 'Ishlar, narx yoki muddatga taʼsir etuvchi boʻlajak hodisalar haqida oldindan ogohlantirish majburiyati.',
    },
    explanation: {
      ru: 'Sub-Clause 8.4 — новелла издания 2017. Каждая сторона (и Инженер) обязана заблаговременно уведомлять другую о известных вероятных будущих событиях, которые могут негативно повлиять на работу персонала, повысить Цену контракта или задержать выполнение. Это инструмент раннего предупреждения для совместного снижения рисков. Прямого санкционного срока нет, но игнорирование может учитываться при последующей оценке claim.',
      en: 'Sub-Clause 8.4 is new in the 2017 edition. Each party (and the Engineer) must give advance notice of known probable future events that may adversely affect the work of the personnel, increase the Contract Price or delay execution. It is an early-warning tool for jointly reducing risk. There is no direct sanction period, but ignoring it may be taken into account when a claim is later assessed.',
      uz: 'Sub-Clause 8.4 — 2017 nashri yangiligi. Har bir tomon (va Engineer) ishga salbiy taʼsir etuvchi, Contract Price ni oshiruvchi yoki kechiktiruvchi maʼlum boʻlajak hodisalar haqida oldindan ogohlantirishi shart. Bu birgalikda riskni kamaytirish vositasi.',
    },
    keyPoints: {
      ru: [
        'Новелла издания 2017 (early warning).',
        'Касается вероятных будущих событий.',
        'Применяется к обеим сторонам и Инженеру.',
        'Поддерживает культуру совместного управления рисками.',
      ],
      en: [
        'New in the 2017 edition (early warning).',
        'Concerns probable future events.',
        'Applies to both parties and the Engineer.',
        'Supports a collaborative risk-management culture.',
      ],
      uz: [
        '2017 nashri yangiligi (early warning).',
        'Boʻlajak ehtimoliy hodisalarga tegishli.',
        'Ikkala tomon va Engineerga tegishli.',
        'Birgalikda risk boshqaruvini qoʻllab-quvvatlaydi.',
      ],
    },
    v1999: {
      ru: 'Прямого аналога не было.',
      en: 'There was no direct equivalent.',
      uz: 'Toʻgʻridan-toʻgʻri ekvivalenti yoʻq edi.',
    },
    v2017: {
      ru: 'Введён новый Sub-Clause 8.4 Advance Warning.',
      en: 'A new Sub-Clause 8.4 Advance Warning was introduced.',
      uz: 'Yangi Sub-Clause 8.4 Advance Warning joriy etildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['extension-of-time-8-5', 'claims-20-2'],
  },
  {
    slug: 'taking-over-10-1',
    number: '10.1',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'time',
    keywords: 'FIDIC 10.1, taking-over certificate, приёмка работ, taking over, sections',
    title: {
      ru: 'Sub-Clause 10.1 — Приёмка работ (Taking-Over Certificate)',
      en: 'Sub-Clause 10.1 — Taking-Over Certificate',
      uz: 'Sub-Clause 10.1 — Ishni qabul qilish (Taking-Over Certificate)',
    },
    summary: {
      ru: 'Когда работы считаются завершёнными и принятыми, и какие последствия это влечёт.',
      en: 'When the works are treated as complete and taken over, and what follows.',
      uz: 'Ishlar qachon yakunlangan va qabul qilingan hisoblanadi va oqibatlari.',
    },
    explanation: {
      ru: 'Работы принимаются, когда они завершены в соответствии с контрактом (включая прохождение Tests on Completion) и Инженер выдаёт Taking-Over Certificate. С этой даты: переходит ответственность за уход за работами, начинается Defects Notification Period (DNP), останавливается начисление delay damages, обычно высвобождается часть retention. Возможна приёмка по частям (Sections) и «подразумеваемая» приёмка, если Заказчик начал пользоваться объектом.',
      en: 'The works are taken over when they are complete in accordance with the contract (including passing the Tests on Completion) and the Engineer issues the Taking-Over Certificate. From that date: responsibility for care of the works passes, the Defects Notification Period (DNP) starts, delay damages stop accruing, and part of the retention is usually released. Taking over by Sections and “deemed” taking over (if the Employer uses the works) are possible.',
      uz: 'Ishlar shartnomaga muvofiq (Tests on Completion dan oʻtgan holda) yakunlanganda va Engineer Taking-Over Certificate berganda qabul qilinadi. Shu sanadan: ishlarni saqlash javobgarligi oʻtadi, Defects Notification Period (DNP) boshlanadi, delay damages toʻxtaydi, retentionning bir qismi qaytariladi.',
    },
    keyPoints: {
      ru: [
        'Выдаётся после завершения и Tests on Completion.',
        'Стартует Defects Notification Period (Clause 11).',
        'Останавливает начисление delay damages.',
        'Возможна приёмка частями (Sections).',
      ],
      en: [
        'Issued after completion and the Tests on Completion.',
        'Starts the Defects Notification Period (Clause 11).',
        'Stops delay damages accruing.',
        'Taking over by Sections is possible.',
      ],
      uz: [
        'Yakunlash va Tests on Completion dan keyin beriladi.',
        'Defects Notification Period (Clause 11) ni boshlaydi.',
        'Delay damages hisoblanishini toʻxtatadi.',
        'Boʻlaklab (Sections) qabul qilish mumkin.',
      ],
    },
    v1999: {
      ru: 'Clause 10 с похожим механизмом приёмки и Taking-Over Certificate.',
      en: 'Clause 10 with a similar taking-over mechanism.',
      uz: 'Clause 10 oʻxshash qabul qilish mexanizmi bilan.',
    },
    v2017: {
      ru: 'Уточнены сроки заявки/выдачи и последствия «deemed» taking over.',
      en: 'Application/issue timing and “deemed” taking over were clarified.',
      uz: 'Soʻrov/berish muddatlari va «deemed» qabul qilish aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['delay-damages-8-8', 'defects-period-11'],
  },
  {
    slug: 'defects-period-11',
    number: '11',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'risk',
    keywords: 'FIDIC 11, defects notification period, DNP, дефекты, performance certificate, 11.1, 11.9',
    title: {
      ru: 'Clause 11 — Дефекты после приёмки (DNP)',
      en: 'Clause 11 — Defects after Taking Over (DNP)',
      uz: 'Clause 11 — Qabuldan keyingi nuqsonlar (DNP)',
    },
    summary: {
      ru: 'Период уведомления о дефектах: устранение недостатков после Taking-Over до Performance Certificate.',
      en: 'The Defects Notification Period: remedying defects after taking over until the Performance Certificate.',
      uz: 'Nuqsonlar bildirish davri: qabuldan keyin Performance Certificate gacha tuzatish.',
    },
    explanation: {
      ru: 'После Taking-Over начинается Defects Notification Period (DNP), длительность которого указана в Contract Data (часто 365 дней). В этот период Подрядчик за свой счёт устраняет дефекты и повреждения, если их причина — его обязательства. После завершения DNP и устранения дефектов Инженер выдаёт Performance Certificate (11.9), который означает выполнение обязательств Подрядчиком. DNP может продлеваться по 11.3, если дефект мешает использованию.',
      en: 'After taking over, the Defects Notification Period (DNP) begins, with a length set in the Contract Data (often 365 days). During it the Contractor remedies defects and damage at its own cost where the cause is its obligations. After the DNP and the remedying of defects, the Engineer issues the Performance Certificate (11.9), which signifies completion of the Contractor’s obligations. The DNP may be extended under 11.3 where a defect prevents use.',
      uz: 'Qabuldan keyin Defects Notification Period (DNP) boshlanadi, davomiyligi Contract Data da (koʻpincha 365 kun). Pudratchi sababi oʻz majburiyatlari boʻlgan nuqsonlarni oʻz hisobidan tuzatadi. DNP va tuzatishdan keyin Engineer Performance Certificate (11.9) beradi. DNP 11.3 boʻyicha uzaytirilishi mumkin.',
    },
    keyPoints: {
      ru: [
        'DNP начинается с Taking-Over (длина — из Contract Data).',
        'Подрядчик устраняет дефекты за свой счёт (11.1–11.2).',
        'Performance Certificate (11.9) — финал обязательств.',
        'DNP может продлеваться (11.3).',
      ],
      en: [
        'The DNP starts at taking over (length per Contract Data).',
        'The Contractor remedies defects at its own cost (11.1–11.2).',
        'The Performance Certificate (11.9) ends the obligations.',
        'The DNP can be extended (11.3).',
      ],
      uz: [
        'DNP qabuldan boshlanadi (davomiyligi Contract Data dan).',
        'Pudratchi nuqsonlarni oʻz hisobidan tuzatadi (11.1–11.2).',
        'Performance Certificate (11.9) — majburiyatlar yakuni.',
        'DNP uzaytirilishi mumkin (11.3).',
      ],
    },
    v1999: {
      ru: 'Clause 11 с DNP и Performance Certificate.',
      en: 'Clause 11 with the DNP and Performance Certificate.',
      uz: 'Clause 11 DNP va Performance Certificate bilan.',
    },
    v2017: {
      ru: 'Уточнён порядок устранения дефектов и продления DNP.',
      en: 'The remedying process and DNP extension were clarified.',
      uz: 'Nuqsonlarni tuzatish va DNP uzaytirish aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['taking-over-10-1', 'performance-security-4-2'],
  },
  {
    slug: 'termination-by-employer-15',
    number: '15',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'risk',
    keywords: 'FIDIC 15, termination by employer, расторжение заказчиком, notice to correct, 15.2, termination for convenience',
    title: {
      ru: 'Clause 15 — Расторжение Заказчиком',
      en: 'Clause 15 — Termination by Employer',
      uz: 'Clause 15 — Buyurtmachi tomonidan bekor qilish',
    },
    summary: {
      ru: 'Основания и порядок расторжения договора Заказчиком — по вине Подрядчика и по усмотрению.',
      en: 'Grounds and procedure for the Employer to terminate — for default and for convenience.',
      uz: 'Buyurtmachining shartnomani bekor qilish asoslari va tartibi.',
    },
    explanation: {
      ru: 'Clause 15 даёт Заказчику право расторгнуть договор при существенном нарушении Подрядчика — после Notice to Correct (15.1) и при наступлении оснований 15.2, — а также по своему усмотрению (termination for convenience, 15.5). Процедура строгая: уведомления, сроки, оценка стоимости на дату расторжения. Неправильное расторжение само становится нарушением Заказчика, поэтому точное соблюдение процедуры критично.',
      en: 'Clause 15 lets the Employer terminate for the Contractor’s material default — after a Notice to Correct (15.1) and on the 15.2 grounds — and also for convenience (15.5). The procedure is strict: notices, time limits and a valuation at the termination date. A wrongful termination itself becomes the Employer’s breach, so following the procedure precisely is critical.',
      uz: 'Clause 15 Buyurtmachiga Pudratchining jiddiy buzilishi uchun (Notice to Correct (15.1) va 15.2 asoslari boʻyicha) hamda oʻz xohishi bilan (15.5) bekor qilish huquqini beradi. Tartib qatʼiy. Notoʻgʻri bekor qilish Buyurtmachining oʻzi buzilishiga aylanadi.',
    },
    keyPoints: {
      ru: [
        'Notice to Correct (15.1) перед расторжением за нарушение.',
        'Termination for Contractor’s Default — 15.2.',
        'Termination for convenience — 15.5.',
        'Несоблюдение процедуры = риск встречного claim.',
      ],
      en: [
        'Notice to Correct (15.1) before terminating for default.',
        'Termination for Contractor’s Default — 15.2.',
        'Termination for convenience — 15.5.',
        'Procedural failure = risk of a counter-claim.',
      ],
      uz: [
        'Buzilish uchun bekor qilishdan oldin Notice to Correct (15.1).',
        'Termination for Contractor’s Default — 15.2.',
        'Termination for convenience — 15.5.',
        'Tartibni buzish = qarshi daʼvo riski.',
      ],
    },
    v1999: {
      ru: 'Clause 15 с похожими основаниями расторжения.',
      en: 'Clause 15 with similar termination grounds.',
      uz: 'Clause 15 oʻxshash bekor qilish asoslari bilan.',
    },
    v2017: {
      ru: 'Уточнены сроки уведомлений и порядок оценки на дату расторжения.',
      en: 'Notice timing and the termination-date valuation were clarified.',
      uz: 'Ogohlantirish muddatlari va baholash tartibi aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['daab-disputes-21', 'payment-14'],
  },
  {
    slug: 'exceptional-events-18',
    number: '18',
    books: ['Red', 'Yellow', 'Silver'],
    theme: 'risk',
    keywords: 'FIDIC 18, exceptional events, force majeure, форс-мажор, исключительные события, 18.5',
    title: {
      ru: 'Clause 18 — Исключительные события (Exceptional Events)',
      en: 'Clause 18 — Exceptional Events',
      uz: 'Clause 18 — Favqulodda hodisalar (Exceptional Events)',
    },
    summary: {
      ru: 'Бывший Force Majeure: события вне контроля сторон, дающие право на освобождение, EOT и иногда Cost.',
      en: 'Formerly Force Majeure: events beyond a party’s control giving relief, EOT and sometimes Cost.',
      uz: 'Avvalgi Force Majeure: tomon nazoratidan tashqari hodisalar, EOT va baʼzan Cost beradi.',
    },
    explanation: {
      ru: 'Clause 18 (в 1999 — Force Majeure) описывает Exceptional Events — исключительные события вне разумного контроля стороны, которые она не могла предотвратить (война, мятеж, террор, стихийные бедствия и т.д.). Пострадавшая сторона уведомляет в течение 14 дней; возникает право на EOT, а для части событий — на Cost. Если событие длится дольше установленного срока (в сумме более 84 дней), любая сторона может расторгнуть договор (18.5).',
      en: 'Clause 18 (Force Majeure in 1999) covers Exceptional Events — events beyond a party’s reasonable control that it could not have prevented (war, rebellion, terrorism, natural catastrophes, etc.). The affected party gives notice within 14 days; an entitlement to EOT arises, and to Cost for some events. If an event continues beyond the set period (more than 84 days in total), either party may terminate (18.5).',
      uz: 'Clause 18 (1999 da Force Majeure) Exceptional Events ni — tomonning oqilona nazoratidan tashqari, oldini ololmagan hodisalarni (urush, qoʻzgʻolon, terror, tabiiy ofatlar) qamraydi. Jabrlangan tomon 14 kun ichida ogohlantiradi; EOT huquqi, baʼzi hodisalar uchun Cost paydo boʻladi. Uzoq davom etsa (jami 84 kundan ortiq) — bekor qilish mumkin (18.5).',
    },
    keyPoints: {
      ru: [
        'Уведомление в течение 14 дней (18.2).',
        'Право на EOT; на Cost — для части событий.',
        'Длительное событие (>84 дней) → возможно расторжение (18.5).',
        'Ранее называлось Force Majeure (1999).',
      ],
      en: [
        'Notice within 14 days (18.2).',
        'Entitlement to EOT; to Cost for some events.',
        'Long event (>84 days) → termination possible (18.5).',
        'Formerly called Force Majeure (1999).',
      ],
      uz: [
        '14 kun ichida ogohlantirish (18.2).',
        'EOT huquqi; baʼzi hodisalar uchun Cost.',
        'Uzoq hodisa (>84 kun) → bekor qilish mumkin (18.5).',
        'Avval Force Majeure deb atalgan (1999).',
      ],
    },
    v1999: {
      ru: 'Называлось Force Majeure (Clause 19).',
      en: 'Was called Force Majeure (Clause 19).',
      uz: 'Force Majeure deb atalgan (Clause 19).',
    },
    v2017: {
      ru: 'Переименовано в Exceptional Events (Clause 18), уточнён перечень и последствия.',
      en: 'Renamed Exceptional Events (Clause 18); the list and consequences were clarified.',
      uz: 'Exceptional Events (Clause 18) ga oʻzgartirildi; roʻyxat aniqlashtirildi.',
    },
    v2022: {
      ru: 'Reprint 2022 без существенных изменений.',
      en: 'No substantive change in the 2022 reprint.',
      uz: '2022 reprintda jiddiy oʻzgarish yoʻq.',
    },
    related: ['extension-of-time-8-5', 'claims-20-2'],
  },
];

export function clauseRefBySlug(slug: string): ClauseRef | undefined {
  return clauseRefs.find((c) => c.slug === slug);
}
