// Context block rendered below the printable sheet on /resources/* lead magnets.
//
// These pages are conversion surfaces built around a PDF-ready artifact, so the
// sheet itself must stay clean. This layer sits underneath it and is excluded
// from print: it explains who the resource is for and how to run it, which the
// bare checklist cannot do on its own.

import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
type LList = Record<Lang, string[]>;

export interface ResourceUsage {
  /** Why this artifact exists and what problem it solves. */
  why: L;
  /** Roles that get value from it. */
  audience: LList;
  /** How to actually run it on a project. */
  howTo: LList;
  faq: { q: L; a: L }[];
}

export const resourceUsage: Record<string, ResourceUsage> = {
  'notice-register-28-84': {
    why: {
      ru: 'Претензии по FIDIC теряются не из-за слабых аргументов, а из-за пропущенных дат. Sub-Clause 20.2 даёт 28 дней на уведомление и 84 дня на детальное обоснование, и оба срока отсчитываются от события, а не от момента, когда команда решила заняться claim. Реестр нужен для того, чтобы дата осведомлённости фиксировалась в момент события, а не восстанавливалась потом по переписке.',
      en: 'FIDIC claims are lost to missed dates far more often than to weak arguments. Sub-Clause 20.2 allows 28 days for the notice and 84 for the fully detailed claim, and both run from the event rather than from the moment the team decided to deal with it. The register exists so that the awareness date is captured when the event happens instead of being reconstructed later from correspondence.',
      uz: 'FIDIC boʻyicha daʼvolar zaif dalillar tufayli emas, oʻtkazib yuborilgan sanalar tufayli yoʻqoladi. Sub-Clause 20.2 bildirishnoma uchun 28 kun va batafsil asoslash uchun 84 kun beradi, ikkala muddat ham jamoa claim bilan shugʻullanishga qaror qilgan paytdan emas, hodisadan sanaladi. Reestr xabardorlik sanasi keyinchalik yozishmalar boʻyicha tiklanmasdan, hodisa paytida qayd etilishi uchun kerak.',
    },
    audience: {
      ru: [
        'Contract manager и claims-специалист — ведут реестр и отвечают за сроки.',
        'Планировщик — связывает событие с программой и критическим путём.',
        'Руководитель проекта — видит по реестру, где проект накапливает необъявленные риски.',
      ],
      en: [
        'Contract manager and claims specialist — own the register and the deadlines.',
        'Planner — links each event to the programme and the critical path.',
        'Project manager — sees from the register where the project is accumulating unnotified exposure.',
      ],
      uz: [
        'Contract manager va claims mutaxassisi — reestrni yuritadi va muddatlar uchun javob beradi.',
        'Rejalashtiruvchi — hodisani programme va kritik yoʻl bilan bogʻlaydi.',
        'Loyiha rahbari — reestr boʻyicha loyiha qayerda eʼlon qilinmagan risklarni toʻplayotganini koʻradi.',
      ],
    },
    howTo: {
      ru: [
        'Заводите строку в день события, а не в день решения подавать claim.',
        'В поле даты пишите дату осведомлённости, подтверждаемую документом: запись в журнале, входящее письмо, протокол.',
        'Проверяйте реестр на еженедельном совещании — просроченная строка должна быть видна раньше, чем истечёт срок.',
        'Связывайте каждую строку с конкретным пунктом контракта: без ссылки на пункт уведомление может не быть засчитано.',
      ],
      en: [
        'Open a row on the day of the event, not on the day someone decides to claim.',
        'In the date field record the awareness date you can evidence: a diary entry, an incoming letter, a minute.',
        'Review the register at the weekly meeting — an at-risk row must surface before the period expires.',
        'Tie each row to a specific clause: without a clause reference a notice may not be treated as one.',
      ],
      uz: [
        'Qatorni claim topshirishga qaror qilingan kuni emas, hodisa kuni oching.',
        'Sana maydoniga hujjat bilan tasdiqlanadigan xabardorlik sanasini yozing: jurnaldagi yozuv, kiruvchi xat, bayonnoma.',
        'Reestrni haftalik majlisda tekshiring — muddati yaqinlashgan qator muddat tugashidan oldin koʻrinishi kerak.',
        'Har bir qatorni aniq shartnoma bandiga bogʻlang: bandga havolasiz bildirishnoma hisobga olinmasligi mumkin.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Заменяет ли реестр сами уведомления?',
          en: 'Does the register replace the notices themselves?',
          uz: 'Reestr bildirishnomalarning oʻrnini bosadimi?',
        },
        a: {
          ru: 'Нет. Реестр — инструмент контроля сроков, а не форма уведомления. Уведомление должно быть направлено отдельно, способом и по адресу, которые задаёт Sub-Clause 1.3, и обозначено как уведомление со ссылкой на пункт. Реестр лишь гарантирует, что вы об этом вспомните вовремя.',
          en: 'No. The register is a deadline-control tool, not a form of notice. The notice must be served separately, by the method and to the address set in Sub-Clause 1.3, identified as a notice and citing the clause. The register only ensures you remember to do it in time.',
          uz: 'Yoʻq. Reestr — muddatlarni nazorat qilish vositasi, bildirishnoma shakli emas. Bildirishnoma alohida, Sub-Clause 1.3 belgilagan usul va manzil boʻyicha yuborilishi, bildirishnoma deb belgilanishi va bandga havola qilishi kerak. Reestr faqat buni oʻz vaqtida eslashingizni taʼminlaydi.',
        },
      },
      {
        q: {
          ru: 'Что делать со строками, по которым срок уже пропущен?',
          en: 'What about rows where the period has already been missed?',
          uz: 'Muddati allaqachon oʻtkazib yuborilgan qatorlar bilan nima qilish kerak?',
        },
        a: {
          ru: 'Не удалять. Издание 2017 предусматривает механизм оспаривания утраты права, и для него нужна фактическая хронология: когда событие произошло, что о нём знал Инженер и понёс ли Заказчик ущерб от позднего уведомления. Удалённая строка лишает вас именно этих данных.',
          en: 'Do not delete them. The 2017 edition provides a route to challenge a time bar, and that route needs the factual chronology: when the event occurred, what the Engineer knew of it, and whether late notice caused the Employer prejudice. A deleted row removes exactly that evidence.',
          uz: 'Oʻchirmang. 2017 nashri huquq yoʻqolishiga eʼtiroz bildirish mexanizmini nazarda tutadi va buning uchun faktik xronologiya kerak: hodisa qachon boʻlgan, Muhandis u haqda nimani bilgan va Buyurtmachi kech bildirishnomadan zarar koʻrganmi. Oʻchirilgan qator sizni aynan shu maʼlumotlardan mahrum qiladi.',
        },
      },
    ],
  },

  'mdb-tender-checklist': {
    why: {
      ru: 'В проектах МФО цена подаётся до того, как большинство рисков становится очевидным, и переиграть распределение рисков после подачи невозможно. Чеклист нужен для одной задачи: пройти tender package до расчёта цены и найти места, где банковские условия, Particular Conditions и местное право расходятся с базовым FIDIC. Каждое такое расхождение — либо вопрос на стадии разъяснений, либо резерв в цене.',
      en: 'On MDB projects the price is submitted before most risks become visible, and the risk allocation cannot be renegotiated afterwards. The checklist serves one purpose: to work through the tender package before pricing and find where the bank’s conditions, the Particular Conditions and local law diverge from base FIDIC. Every such divergence is either a clarification question or a contingency in the price.',
      uz: 'XTB loyihalarida narx risklarning koʻpchiligi koʻrinadigan boʻlishidan oldin topshiriladi va topshirgandan keyin risklar taqsimotini qayta oʻynab boʻlmaydi. Cheklist bitta vazifa uchun kerak: narxni hisoblashdan oldin tender package ni koʻrib chiqish va bank shartlari, Particular Conditions hamda mahalliy huquq bazaviy FIDIC dan farq qiladigan joylarni topish. Har bir bunday farq — yo tushuntirish bosqichidagi savol, yo narxdagi zaxira.',
    },
    audience: {
      ru: [
        'Тендерный отдел — проходит чеклист до расчёта цены, а не после.',
        'Юрист проекта — проверяет стык Particular Conditions с применимым правом и закупочными правилами банка.',
        'Contract manager — принимает пакет в работу и знает, какие риски уже заложены в цену.',
      ],
      en: [
        'Tender team — runs the checklist before pricing, not after.',
        'Project counsel — checks how the Particular Conditions meet the governing law and the bank’s procurement rules.',
        'Contract manager — takes the package over knowing which risks are already priced in.',
      ],
      uz: [
        'Tender boʻlimi — cheklistni narx hisoblashdan keyin emas, oldin oʻtadi.',
        'Loyiha yuristi — Particular Conditions ning qoʻllaniladigan huquq va bank xarid qoidalari bilan tutashuvini tekshiradi.',
        'Contract manager — paketni qaysi risklar narxga kiritilganini bilgan holda ishga oladi.',
      ],
    },
    howTo: {
      ru: [
        'Начинайте с Contract Data и COPA, а не с General Conditions: правки живут именно там.',
        'Каждое найденное расхождение записывайте в две колонки — вопрос на clarification или резерв в цене.',
        'Проверяйте, выпустит ли ваш банк требуемые гарантии в требуемой форме, до подачи, а не после award.',
        'Отдельно пройдите ESHS-требования: они требуют реальных ресурсов и персонала, которые нужно заложить в цену.',
      ],
      en: [
        'Start with the Contract Data and COPA, not the General Conditions: the edits live there.',
        'Log each divergence in one of two columns — a clarification question or a contingency in the price.',
        'Check that your bank will issue the required guarantees in the required form before bidding, not after award.',
        'Work the ESHS requirements separately: they need real resources and personnel that have to be priced.',
      ],
      uz: [
        'General Conditions dan emas, Contract Data va COPA dan boshlang: tuzatishlar aynan shu yerda.',
        'Topilgan har bir farqni ikki ustunga yozing — clarification savoli yoki narxdagi zaxira.',
        'Bankingiz talab qilingan kafolatlarni talab qilingan shaklda berishini award dan keyin emas, topshirishdan oldin tekshiring.',
        'ESHS talablarini alohida koʻrib chiqing: ular narxga kiritilishi kerak boʻlgan real resurs va xodimlarni talab qiladi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Можно ли править General Conditions в оферте?',
          en: 'Can the General Conditions be amended in a bid?',
          uz: 'Ofertada General Conditions ni tuzatish mumkinmi?',
        },
        a: {
          ru: 'В закупках МФО, как правило, нет: участник подаёт предложение на условиях банка, а любые отклонения могут привести к отклонению оферты. Именно поэтому единственный рабочий момент для влияния на условия — стадия разъяснений, и вопросы там стоят дешевле, чем claims на исполнении.',
          en: 'In MDB procurement, generally not: bidders submit on the bank’s terms and deviations can render a bid non-responsive. That is exactly why the clarification stage is the only working window to influence the conditions, and questions there cost far less than claims during execution.',
          uz: 'XTB xaridlarida odatda yoʻq: ishtirokchi bank shartlarida taklif topshiradi va har qanday ogʻish ofertaning rad etilishiga olib kelishi mumkin. Aynan shuning uchun shartlarga taʼsir qilish uchun yagona ishlaydigan payt — tushuntirish bosqichi va u yerdagi savollar ijro davridagi claims dan arzonroq turadi.',
        },
      },
      {
        q: {
          ru: 'Чем закупки банка отличаются от национальной процедуры?',
          en: 'How does bank procurement differ from the national procedure?',
          uz: 'Bank xaridlari milliy protseduradan nimasi bilan farq qiladi?',
        },
        a: {
          ru: 'По кредитному соглашению с банком развития закупка идёт по правилам банка: свои критерии оценки, свои формы, свои требования к квалификации и integrity. Закон Узбекистана о госзакупках прямо предусматривает приоритет международного договора, поэтому первое, что нужно установить по конкретному пакету, — под каким режимом он проводится.',
          en: 'Under a loan agreement with a development bank, procurement follows the bank’s rules: its own evaluation criteria, forms, qualification and integrity requirements. Uzbek public procurement law expressly gives priority to an international treaty, so the first thing to establish on a given package is which regime it runs under.',
          uz: 'Taraqqiyot banki bilan kredit bitimi boʻyicha xarid bank qoidalari asosida boradi: oʻz baholash mezonlari, oʻz shakllari, malaka va integrity boʻyicha oʻz talablari. Oʻzbekiston davlat xaridlari toʻgʻrisidagi qonun xalqaro shartnoma ustunligini bevosita nazarda tutadi, shuning uchun muayyan paket boʻyicha birinchi aniqlash kerak boʻlgan narsa — u qaysi rejimda oʻtkazilayotgani.',
        },
      },
    ],
  },

  'red-yellow-silver-decision-tree': {
    why: {
      ru: 'Выбор книги — решение, которое дороже любой последующей правки Particular Conditions. Оно определяет, кто проектирует, как оценивается работа, кто несёт георискатегорию и есть ли в проекте независимый Инженер. Дерево решений нужно, чтобы это решение принималось от модели проекта, а не от того, какой шаблон оказался под рукой у юриста заказчика.',
      en: 'Choosing the book is the decision that costs more than any later Particular Conditions fix. It determines who designs, how work is valued, who carries ground risk and whether the project has an independent Engineer at all. The decision tree exists so that the choice follows the delivery model rather than whichever template the Employer’s lawyer happened to have.',
      uz: 'Kitob tanlash — keyingi har qanday Particular Conditions tuzatishidan qimmatroq qaror. U kim loyihalashtirishini, ish qanday baholanishini, georiskni kim koʻtarishini va loyihada mustaqil Muhandis borligini belgilaydi. Qarorlar daraxti bu qaror buyurtmachi yuristining qoʻli ostidagi shablondan emas, loyiha modelidan kelib chiqishi uchun kerak.',
    },
    audience: {
      ru: [
        'Заказчик и его консультант — на стадии структурирования проекта, до подготовки тендера.',
        'Подрядчик — чтобы понять, соответствует ли выбранная форма реальной модели работ.',
        'Юрист — чтобы увидеть, какие Particular Conditions потребуются при выбранной книге.',
      ],
      en: [
        'The Employer and its adviser — at project structuring stage, before the tender is prepared.',
        'The Contractor — to see whether the chosen form matches the real delivery model.',
        'Counsel — to see which Particular Conditions the chosen book will require.',
      ],
      uz: [
        'Buyurtmachi va uning konsultanti — tender tayyorlashdan oldin, loyihani tuzish bosqichida.',
        'Pudratchi — tanlangan forma ishlarning real modeliga mos kelishini tushunish uchun.',
        'Yurist — tanlangan kitobda qanday Particular Conditions kerak boʻlishini koʻrish uchun.',
      ],
    },
    howTo: {
      ru: [
        'Начните с вопроса о проектировании: кто его выполняет и на какой стадии готовности оно находится к тендеру.',
        'Затем определите способ оценки: обмер по BoQ или твёрдая сумма с вехами.',
        'Проверьте георискатегорию отдельно: если геология не изучена, Silver Book почти всегда неверный выбор.',
        'Сверьте результат с ролью Инженера: если нужен независимый администратор контракта, Silver Book выпадает.',
      ],
      en: [
        'Start with design: who performs it and how developed it is at tender stage.',
        'Then settle the valuation method: re-measurement against a BoQ, or a lump sum with milestones.',
        'Test ground risk separately: where the geology is unexplored, the Silver Book is almost always the wrong answer.',
        'Cross-check against the Engineer’s role: if an independent contract administrator is needed, the Silver Book drops out.',
      ],
      uz: [
        'Loyihalashdan boshlang: uni kim bajaradi va tender bosqichida u qanday tayyorlik darajasida.',
        'Keyin baholash usulini aniqlang: BoQ boʻyicha qayta oʻlchov yoki bosqichlar bilan qatʼiy summa.',
        'Georiskni alohida tekshiring: geologiya oʻrganilmagan boʻlsa, Silver Book deyarli har doim notoʻgʻri tanlov.',
        'Natijani Muhandis roli bilan solishtiring: mustaqil shartnoma administratori kerak boʻlsa, Silver Book chiqib ketadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что выбрать, если проектирование частично готово?',
          en: 'What to choose when the design is only partly complete?',
          uz: 'Agar loyihalash qisman tayyor boʻlsa, nimani tanlash kerak?',
        },
        a: {
          ru: 'Смешанные ситуации решаются не выбором «средней» книги, а чётким разделением ответственности в Employer\'s Requirements: что именно проектирует Подрядчик и по каким функциональным критериям это принимается. Худший вариант — Yellow Book с требованиями, наполовину состоящими из готовых предписывающих решений: ответственность за результат в таком документе размывается.',
          en: 'Mixed cases are not solved by picking a middle book but by drawing a clear line in the Employer’s Requirements: exactly what the Contractor designs and against which functional criteria it is accepted. The worst outcome is a Yellow Book whose requirements are half prescriptive solutions — responsibility for the outcome then blurs.',
          uz: 'Aralash holatlar «oʻrtacha» kitob tanlash bilan emas, Employer\'s Requirements da javobgarlikni aniq ajratish bilan hal qilinadi: Pudratchi aynan nimani loyihalashtiradi va u qanday funksional mezonlar boʻyicha qabul qilinadi. Eng yomon variant — talablari yarmi tayyor koʻrsatma yechimlardan iborat Yellow Book: bunday hujjatda natija uchun javobgarlik xiralashadi.',
        },
      },
      {
        q: {
          ru: 'Почему Silver Book не подходит для проектов МФО?',
          en: 'Why is the Silver Book a poor fit for MDB projects?',
          uz: 'Nega Silver Book XTB loyihalari uchun mos emas?',
        },
        a: {
          ru: 'Банки развития строят закупки вокруг прозрачного контрактного администрирования и независимого Инженера, а Silver Book эту фигуру убирает и переносит почти весь риск на подрядчика. На проектах с публичным финансированием и обязательной отчётностью такая модель плохо совместима с требованиями к контролю, поэтому в тендерах МФО обычно встречаются Pink Book или адаптированные Red и Yellow Book.',
          en: 'Development banks build procurement around transparent contract administration and an independent Engineer, while the Silver Book removes that role and shifts almost all risk to the Contractor. On publicly funded projects with mandatory reporting that model sits badly with the control requirements, which is why MDB tenders normally use the Pink Book or adapted Red and Yellow Books.',
          uz: 'Taraqqiyot banklari xaridlarni shaffof shartnoma administratsiyasi va mustaqil Muhandis atrofida quradi, Silver Book esa bu figurani olib tashlaydi va deyarli barcha riskni pudratchiga oʻtkazadi. Majburiy hisobotli davlat moliyalashtiruvi loyihalarida bunday model nazorat talablari bilan yomon mos keladi, shuning uchun XTB tenderlarida odatda Pink Book yoki moslashtirilgan Red va Yellow Book uchraydi.',
        },
      },
    ],
  },
};
