// Editorial copy for the /knowledge/<category>/ hub pages.
//
// The category keys already existed in article frontmatter but had no landing
// pages, so mid-tail queries like "FIDIC claims" or "тендеры МФО FIDIC" had
// nothing on the site to match beyond individual articles. Each hub explains
// what the cluster covers and why it groups together, so it is a page in its own
// right rather than a bare list.

import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
type LList = Record<Lang, string[]>;

export interface CategoryPage {
  /** Matches the `category` value in article frontmatter. */
  key: string;
  title: L;
  description: L;
  intro: L;
  /** What a reader should take away from the cluster as a whole. */
  covers: LList;
  /** Canonical paths of the most relevant tools for this cluster. */
  tools: string[];
}

export const categoryPages: CategoryPage[] = [
  {
    key: 'claims',
    title: {
      ru: 'Claims и споры по FIDIC',
      en: 'FIDIC claims and disputes',
      uz: 'FIDIC boʻyicha claims va nizolar',
    },
    description: {
      ru: 'Претензии, сроки 28 и 84 дня, обоснование, анализ задержек, DAAB и арбитраж по контрактам FIDIC — практические разборы для проектных команд.',
      en: 'Claims, the 28 and 84-day periods, substantiation, delay analysis, the DAAB and arbitration under FIDIC contracts — practical material for project teams.',
      uz: 'Daʼvolar, 28 va 84 kunlik muddatlar, asoslash, kechikishlar tahlili, DAAB va arbitraj — loyiha jamoalari uchun amaliy tahlillar.',
    },
    intro: {
      ru: 'Претензии по FIDIC проигрываются не в споре о толковании пункта, а раньше: на пропущенном сроке, на неподтверждённой дате осведомлённости, на программе без принятого baseline. Материалы этого раздела идут по цепочке от уведомления к доказательствам и дальше к DAAB — в том порядке, в каком это разворачивается на проекте.',
      en: 'FIDIC claims are rarely lost arguing over the meaning of a clause. They are lost earlier: on a missed period, an unevidenced awareness date, a programme with no accepted baseline. This cluster follows the chain from notice to evidence to the DAAB, in the order it actually unfolds on a project.',
      uz: 'FIDIC boʻyicha daʼvolar band talqini boʻyicha bahsda emas, undan oldin yutqaziladi: oʻtkazib yuborilgan muddatda, tasdiqlanmagan xabardorlik sanasida, qabul qilingan baseline siz programme da. Bu boʻlim materiallari bildirishnomadan dalillarga va keyin DAAB ga — loyihada qanday kechsa, shu tartibda boradi.',
    },
    covers: {
      ru: [
        'Порядок претензий по Sub-Clause 20.2: уведомление за 28 дней и детальное обоснование за 84.',
        'Contemporaneous records: что именно нужно фиксировать и с какого дня.',
        'Продление срока и анализ задержек, включая параллельные задержки.',
        'Затраты на продление и disruption: чем они отличаются и как считаются.',
        'DAAB, Notice of Dissatisfaction и путь в арбитраж.',
      ],
      en: [
        'The Sub-Clause 20.2 procedure: 28-day notice and 84-day fully detailed claim.',
        'Contemporaneous records: what to capture, and from which day.',
        'Extension of time and delay analysis, concurrency included.',
        'Prolongation cost and disruption: how they differ and how each is computed.',
        'The DAAB, the Notice of Dissatisfaction and the route to arbitration.',
      ],
      uz: [
        'Sub-Clause 20.2 boʻyicha tartib: 28 kunlik bildirishnoma va 84 kunlik batafsil daʼvo.',
        'Contemporaneous records: aynan nimani va qaysi kundan qayd etish kerak.',
        'Muddatni uzaytirish va kechikishlar tahlili, parallel kechikishlar bilan.',
        'Uzaytirish xarajatlari va disruption: farqi va qanday hisoblanishi.',
        'DAAB, Notice of Dissatisfaction va arbitrajga yoʻl.',
      ],
    },
    tools: ['/tools/calculators/time-bar', '/tools/claim-readiness', '/tools/notice-deadline', '/resources/notice-register-28-84'],
  },
  {
    key: 'mdb',
    title: {
      ru: 'FIDIC в проектах международных банков развития',
      en: 'FIDIC on multilateral development bank projects',
      uz: 'Xalqaro taraqqiyot banklari loyihalarida FIDIC',
    },
    description: {
      ru: 'Всемирный банк, АБР и ЕБРР: Pink Book, Section VIII Contract Data, COPA, ESHS-требования и закупочные правила банков для FIDIC-проектов в Центральной Азии.',
      en: 'World Bank, ADB and EBRD: the Pink Book, Section VIII Contract Data, COPA, ESHS requirements and lender procurement rules for FIDIC projects in Central Asia.',
      uz: 'Jahon banki, ADB va EBRD: Pink Book, Section VIII Contract Data, COPA, ESHS talablari va Markaziy Osiyodagi FIDIC loyihalari uchun bank xarid qoidalari.',
    },
    intro: {
      ru: 'Инфраструктура Центральной Азии строится преимущественно на деньги банков развития, а значит по их закупочным документам на базе FIDIC. Ключевое отличие от частного контракта в том, что General Conditions править нельзя: все отклонения живут в Particular Conditions и Contract Data, и именно их нужно читать первыми.',
      en: 'Central Asian infrastructure is built largely with development bank money, which means bidding documents built on FIDIC. The key difference from a private contract is that the General Conditions cannot be amended: every deviation lives in the Particular Conditions and the Contract Data, and those are what to read first.',
      uz: 'Markaziy Osiyo infratuzilmasi asosan taraqqiyot banklari mablagʻiga quriladi, demak ularning FIDIC asosidagi xarid hujjatlari boʻyicha. Xususiy shartnomadan asosiy farqi shundaki, General Conditions ni tuzatib boʻlmaydi: barcha ogʻishlar Particular Conditions va Contract Data da yashaydi va birinchi navbatda ularni oʻqish kerak.',
    },
    covers: {
      ru: [
        'Pink Book и гармонизированные редакции для банков развития.',
        'Section VIII Contract Data во всемирнобанковских пакетах: что и в каком порядке читать.',
        'Критерии оценки АБР и требования к квалификации.',
        'ESHS-обязательства: почему они требуют реальных ресурсов в цене.',
        'Contract Management Plan и постконтрактное администрирование.',
      ],
      en: [
        'The Pink Book and the harmonised editions for development banks.',
        'Section VIII Contract Data in World Bank packages: what to read and in what order.',
        'ADB evaluation criteria and qualification requirements.',
        'ESHS obligations: why they demand real resources in the price.',
        'The Contract Management Plan and post-award administration.',
      ],
      uz: [
        'Pink Book va taraqqiyot banklari uchun uygʻunlashtirilgan nashrlar.',
        'Jahon banki paketlarida Section VIII Contract Data: nimani va qanday tartibda oʻqish kerak.',
        'ADB baholash mezonlari va malaka talablari.',
        'ESHS majburiyatlari: nega ular narxda real resurslarni talab qiladi.',
        'Contract Management Plan va shartnomadan keyingi boshqaruv.',
      ],
    },
    tools: ['/tenders', '/resources/mdb-tender-checklist', '/tools/tender-risk-lab', '/tools/tender-clarification-generator'],
  },
  {
    key: 'suite',
    title: {
      ru: 'Радужная серия FIDIC: книги и редакции',
      en: 'The FIDIC Rainbow Suite: books and editions',
      uz: 'FIDIC kamalak seriyasi: kitoblar va nashrlar',
    },
    description: {
      ru: 'Red, Yellow, Silver, Green, Pink и Emerald Book: кто проектирует, как распределён риск, чем различаются редакции 1999, 2017 и 2022 годов.',
      en: 'Red, Yellow, Silver, Green, Pink and Emerald Book: who designs, how risk is allocated, and how the 1999, 2017 and 2022 editions differ.',
      uz: 'Red, Yellow, Silver, Green, Pink va Emerald Book: kim loyihalashtiradi, risk qanday taqsimlanadi, 1999, 2017 va 2022 nashrlari nimasi bilan farq qiladi.',
    },
    intro: {
      ru: 'Выбор книги — решение, которое дороже любой последующей правки Particular Conditions: оно определяет, кто проектирует, как оценивается работа, кто несёт георискатегорию и есть ли в проекте независимый Инженер. Этот раздел о том, как выбирать от модели проекта, а не от привычки.',
      en: 'Choosing the book costs more than any later Particular Conditions fix: it determines who designs, how work is valued, who carries ground risk and whether the project has an independent Engineer at all. This cluster is about choosing from the delivery model rather than from habit.',
      uz: 'Kitob tanlash — keyingi har qanday Particular Conditions tuzatishidan qimmatroq qaror: u kim loyihalashtirishini, ish qanday baholanishini, georiskni kim koʻtarishini va loyihada mustaqil Muhandis borligini belgilaydi. Bu boʻlim odatdan emas, loyiha modelidan kelib chiqib tanlash haqida.',
    },
    covers: {
      ru: [
        'Red, Yellow и Silver Book: проектирование, оценка и распределение риска.',
        'Green Book для малых работ и Emerald Book для подземных.',
        'Что изменилось от редакции 1999 к 2017 и что уточнили в 2022.',
        'Когда «под ключ» оправдан, а когда создаёт спор на исполнении.',
      ],
      en: [
        'Red, Yellow and Silver Book: design, valuation and risk allocation.',
        'The Green Book for minor works and the Emerald Book for underground work.',
        'What changed from the 1999 edition to 2017, and what the 2022 reprints clarified.',
        'When turnkey is justified and when it manufactures a dispute during execution.',
      ],
      uz: [
        'Red, Yellow va Silver Book: loyihalash, baholash va risk taqsimoti.',
        'Kichik ishlar uchun Green Book va yer osti ishlari uchun Emerald Book.',
        '1999 nashridan 2017 ga nima oʻzgardi va 2022 da nima aniqlashtirildi.',
        '«Kalit topshirish» qachon oʻrinli va qachon ijroda nizo yaratadi.',
      ],
    },
    tools: ['/tools/book-selector', '/tools/book-comparison', '/knowledge/editions-1999-2017-2022', '/resources/red-yellow-silver-decision-tree'],
  },
  {
    key: 'practice',
    title: {
      ru: 'Практика применения FIDIC',
      en: 'FIDIC in practice',
      uz: 'FIDIC ni qoʻllash amaliyoti',
    },
    description: {
      ru: 'Роль Инженера, платежи, гарантии, приёмка и период дефектов, госзакупки и стык FIDIC с правом Узбекистана и Казахстана.',
      en: 'The Engineer’s role, payment, securities, taking-over and the defects period, public procurement and how FIDIC meets Uzbek and Kazakh law.',
      uz: 'Muhandis roli, toʻlovlar, kafolatlar, qabul va nuqson davri, davlat xaridlari hamda FIDIC ning Oʻzbekiston va Qozogʻiston huquqi bilan tutashuvi.',
    },
    intro: {
      ru: 'FIDIC — проформа, а не источник права: общие условия работают ровно настолько, насколько это допускает применимое право. Этот раздел о том, что происходит при столкновении международной формы с местным регулированием, разрешительной системой и банковской практикой.',
      en: 'FIDIC is a standard form, not a source of law: the General Conditions work exactly as far as the governing law allows. This cluster is about what happens where an international form meets local regulation, permitting and banking practice.',
      uz: 'FIDIC — huquq manbai emas, standart forma: General Conditions qoʻllaniladigan huquq ruxsat bergan darajadagina ishlaydi. Bu boʻlim xalqaro forma mahalliy tartibga solish, ruxsat tizimi va bank amaliyoti bilan toʻqnashganda nima boʻlishi haqida.',
    },
    covers: {
      ru: [
        'FIDIC в Узбекистане и Казахстане: регулирование и что ломает контракт.',
        'Роль Инженера и определения по Sub-Clause 3.7.',
        'Платежи по Clause 14, гарантии и удержания.',
        'Приёмка, период дефектов и Performance Certificate.',
        'Госзакупки и приоритет правил банка над национальной процедурой.',
      ],
      en: [
        'FIDIC in Uzbekistan and Kazakhstan: the regulation and what breaks a contract.',
        'The Engineer’s role and determinations under Sub-Clause 3.7.',
        'Payment under Clause 14, securities and retention.',
        'Taking-over, the defects period and the Performance Certificate.',
        'Public procurement and the priority of lender rules over the national procedure.',
      ],
      uz: [
        'Oʻzbekiston va Qozogʻistonda FIDIC: tartibga solish va shartnomani nima buzadi.',
        'Muhandis roli va Sub-Clause 3.7 boʻyicha qarorlar.',
        'Clause 14 boʻyicha toʻlovlar, kafolatlar va ushlab qolishlar.',
        'Qabul, nuqson davri va Performance Certificate.',
        'Davlat xaridlari va bank qoidalarining milliy protseduradan ustunligi.',
      ],
    },
    tools: ['/tools/contract-risk-score', '/tools/calculators/interim-payment', '/tools/contract-map', '/clauses'],
  },
  {
    key: 'certification',
    title: {
      ru: 'Сертификация FIDIC: FCCE и FCCP',
      en: 'FIDIC certification: FCCE and FCCP',
      uz: 'FIDIC sertifikatsiyasi: FCCE va FCCP',
    },
    description: {
      ru: 'FIDIC Certified Consulting Engineer и Certified Consulting Professional: требования, отличия, подготовка и как выбрать подходящую квалификацию.',
      en: 'FIDIC Certified Consulting Engineer and Certified Consulting Professional: requirements, differences, preparation and how to choose between them.',
      uz: 'FIDIC Certified Consulting Engineer va Certified Consulting Professional: talablar, farqlar, tayyorgarlik va qaysi malakani tanlash.',
    },
    intro: {
      ru: 'FIDIC Credentialing администрирует две основные квалификации с разными требованиями к опыту и образованию. Раздел о том, какая из них кому подходит и что реально нужно знать к экзамену.',
      en: 'FIDIC Credentialing administers two principal credentials with different experience and education requirements. This cluster covers which suits whom and what you actually need to know for the assessment.',
      uz: 'FIDIC Credentialing tajriba va taʼlim talablari har xil boʻlgan ikkita asosiy malakani boshqaradi. Bu boʻlim qaysi biri kimga mos va imtihonga nimani bilish kerakligi haqida.',
    },
    covers: {
      ru: [
        'FCCE и FCCP: требования к опыту, образованию и лицензии.',
        'Чем квалификации отличаются и почему это не ступени одной лестницы.',
        'Что входит в оцениваемый материал, включая ценности FIDIC.',
        'Как готовиться и с чего начинать.',
      ],
      en: [
        'FCCE and FCCP: experience, education and licence requirements.',
        'How the credentials differ and why they are not steps on one ladder.',
        'What the assessed material covers, FIDIC’s values included.',
        'How to prepare and where to start.',
      ],
      uz: [
        'FCCE va FCCP: tajriba, taʼlim va litsenziya talablari.',
        'Malakalar nimasi bilan farq qiladi va nega ular bitta zinapoyaning bosqichlari emas.',
        'Baholanadigan materialga nima kiradi, FIDIC qadriyatlari bilan birga.',
        'Qanday tayyorlanish va nimadan boshlash kerak.',
      ],
    },
    tools: ['/certification', '/glossary', '/knowledge/fidic-certification-path', '/about/larisa-belousova'],
  },
];

export function categoryPageByKey(key: string): CategoryPage | undefined {
  return categoryPages.find((c) => c.key === key);
}
