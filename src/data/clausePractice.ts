// Practice layer for the /clauses/<slug>/ reference pages.
//
// The reference entries in clauseReference.ts say what a clause *is*. These say
// what actually happens to it on a live project: how it fails, what evidence it
// demands, and which Particular Conditions edits quietly change its meaning.
//
// This exists because the clause pages were structurally identical ~450-word
// templates whose FAQ answers were recycled from other fields on the same page.
// Every entry below must be specific enough that it could not be moved to a
// different clause without becoming wrong.
//
// Reference-level material, not legal advice — review by a FIDIC specialist
// before relying on it for a live contract.

import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
type LList = Record<Lang, string[]>;

export interface ClausePractice {
  /** How the clause behaves in practice; 1–2 paragraphs. */
  practice: L;
  /** Clause-specific traps, usually introduced through Particular Conditions. */
  pitfalls: LList;
  /** Genuine questions, not restatements of the summary. */
  faq: { q: L; a: L }[];
}

export const clausePractice: Record<string, ClausePractice> = {
  'claims-20-2': {
    practice: {
      ru: 'На практике претензии проигрываются не в споре о толковании, а на первом шаге: сторона не может доказать, когда именно она узнала о событии. Инженер отсчитывает 28 дней от даты, которую считает датой осведомлённости, а подрядчик — от более поздней. Побеждает тот, у кого есть журнал событий, входящая корреспонденция с датами и протоколы совещаний. Второе типовое поражение — путаница между уведомлением о претензии и просто письмом с описанием проблемы: письмо, не названное Notice of Claim и не ссылающееся на 20.2, Инженер вправе не засчитать.',
      en: 'Claims are rarely lost on interpretation. They are lost at step one, when a party cannot prove when it actually became aware of the event. The Engineer counts 28 days from the date it considers awareness; the Contractor counts from a later one. Whoever holds a dated event log, incoming correspondence and minutes wins that argument. The second common failure is confusing a Notice of Claim with an ordinary letter describing a problem: a letter that is not labelled as a notice and does not cite 20.2 can legitimately be disregarded.',
      uz: 'Amalda daʼvolar talqin bahsida emas, birinchi qadamda yutqaziladi: tomon hodisadan qachon xabar topganini isbotlay olmaydi. Muhandis 28 kunni oʻzi xabardorlik sanasi deb hisoblagan kundan sanaydi, pudratchi esa kechroq sanadan. Sanalari qayd etilgan hodisalar jurnali, kiruvchi xat-xabar va majlis bayonnomalari bor tomon yutadi. Ikkinchi tipik magʻlubiyat — daʼvo bildirishnomasini muammoni tasvirlovchi oddiy xat bilan aralashtirish: Notice of Claim deb nomlanmagan va 20.2 ga havola qilmagan xatni Muhandis hisobga olmasligi mumkin.',
    },
    pitfalls: {
      ru: [
        'Particular Conditions сокращают 28 дней до 14 или 7 — проверьте это до подписания, а не после события.',
        'Уведомление отправлено не тому адресату или не тем способом, который задан в Sub-Clause 1.3 — срок считается пропущенным.',
        'Одно уведомление на длящееся событие вместо серии: по продолжающимся обстоятельствам нужны промежуточные claims.',
      ],
      en: [
        'Particular Conditions cut the 28 days to 14 or 7 — check this before signing, not after the event.',
        'The notice goes to the wrong addressee or by a method other than the one set in Sub-Clause 1.3, and the period is treated as missed.',
        'A single notice for a continuing event instead of a series: continuing circumstances require interim claims.',
      ],
      uz: [
        'Particular Conditions 28 kunni 14 yoki 7 kunga qisqartiradi — buni hodisadan keyin emas, imzolashdan oldin tekshiring.',
        'Bildirishnoma notoʻgʻri manzilga yoki Sub-Clause 1.3 da belgilangan usuldan boshqa yoʻl bilan yuborilgan — muddat oʻtkazib yuborilgan hisoblanadi.',
        'Davom etayotgan hodisa uchun seriya oʻrniga bitta bildirishnoma: davomli holatlar boʻyicha oraliq claims kerak.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что считается моментом «осведомлённости» для отсчёта 28 дней?',
          en: 'What counts as the moment of awareness for the 28-day count?',
          uz: '28 kunni sanash uchun «xabardorlik» payti nima hisoblanadi?',
        },
        a: {
          ru: 'Момент, когда сторона узнала или должна была узнать о событии. Второе — объективный тест: если обстоятельство было очевидно на площадке или отражено в документах, ссылка на то, что руководство не знало, не поможет. Поэтому дата первой записи в журнале или первого письма по теме обычно и становится точкой отсчёта в споре.',
          en: 'The point at which the party became aware, or should have become aware, of the event. The second limb is an objective test: if the circumstance was obvious on site or recorded in project documents, arguing that management did not know will not help. In a dispute the first diary entry or first letter on the subject usually becomes the effective start date.',
          uz: 'Tomon hodisadan xabar topgan yoki xabar topishi kerak boʻlgan payt. Ikkinchisi — obyektiv test: agar holat obyektda koʻrinib turgan yoki hujjatlarda qayd etilgan boʻlsa, rahbariyat bilmagan degan havola yordam bermaydi. Shuning uchun nizoda jurnaldagi birinchi yozuv yoki mavzu boʻyicha birinchi xat sanasi sanash nuqtasiga aylanadi.',
        },
      },
      {
        q: {
          ru: 'Можно ли спасти претензию, если 28 дней пропущены?',
          en: 'Can a claim be saved if the 28 days were missed?',
          uz: 'Agar 28 kun oʻtkazib yuborilgan boʻlsa, daʼvoni saqlab qolish mumkinmi?',
        },
        a: {
          ru: 'Иногда. Издание 2017 предусматривает механизм, при котором сторона может оспорить утрату права, а Инженер обязан рассмотреть обстоятельства — например, знал ли он о событии и понёс ли ущерб от позднего уведомления. Но это исключение, а не запасной план: строить стратегию на нём нельзя, и в континентальных юрисдикциях исход дополнительно зависит от применимого права.',
          en: 'Sometimes. The 2017 edition provides a route for a party to challenge the time bar, and the Engineer must consider the circumstances — including whether it already knew of the event and whether late notice caused prejudice. But this is an exception, not a fallback plan: it cannot carry a strategy, and in civil law jurisdictions the outcome also turns on the governing law.',
          uz: 'Baʼzan. 2017 nashri tomon huquq yoʻqolishiga eʼtiroz bildirishi mumkin boʻlgan mexanizmni nazarda tutadi va Muhandis holatlarni koʻrib chiqishi shart — masalan, u hodisadan xabardor boʻlganmi va kech bildirishnomadan zarar koʻrganmi. Lekin bu zaxira reja emas, istisno: unga strategiya qurib boʻlmaydi, kontinental yurisdiksiyalarda esa natija qoʻllaniladigan huquqqa ham bogʻliq.',
        },
      },
    ],
  },

  'extension-of-time-8-5': {
    practice: {
      ru: 'EOT почти никогда не отклоняют словами «задержки не было». Отклоняют потому, что подрядчик не показал влияние события на критический путь. Если программа не принята Инженером, не обновляется или вообще не имеет логических связей, доказать сдвиг завершения нечем — остаётся спор о том, чья таблица правдоподобнее. Именно поэтому дисциплина по Sub-Clause 8.3 напрямую определяет судьбу претензий по 8.5. Отдельная ловушка — параллельные задержки: событие заказчика и собственное отставание подрядчика в одном окне обычно дают время, но не деньги.',
      en: 'An EOT claim is almost never refused on the basis that no delay occurred. It is refused because the Contractor has not shown the effect on the critical path. If the programme was never accepted by the Engineer, is not updated, or carries no logic links, there is nothing to demonstrate a shift in completion — only a contest over whose spreadsheet looks more plausible. That is why discipline under Sub-Clause 8.3 decides the fate of 8.5 claims. A separate trap is concurrency: an Employer event and the Contractor’s own slippage in the same window usually yield time but not money.',
      uz: 'EOT deyarli hech qachon «kechikish boʻlmagan» degan soʻz bilan rad etilmaydi. U pudratchi hodisaning kritik yoʻlga taʼsirini koʻrsatmagani uchun rad etiladi. Agar programme Muhandis tomonidan qabul qilinmagan, yangilanmayotgan yoki mantiqiy bogʻlanishlarga ega boʻlmasa, yakunlanish siljishini isbotlash uchun hech narsa yoʻq — faqat kimning jadvali ishonarliroq degan bahs qoladi. Shuning uchun Sub-Clause 8.3 boʻyicha intizom 8.5 daʼvolari taqdirini belgilaydi. Alohida tuzoq — parallel kechikishlar: bir oynada buyurtmachi hodisasi va pudratchining oʻz orqada qolishi odatda vaqt beradi, pul emas.',
    },
    pitfalls: {
      ru: [
        'Программа без baseline и без принятия Инженером — анализ задержки не на что опереть.',
        'Метод анализа выбран задним числом под нужный результат; выбирайте метод и фиксируйте его до начала спора.',
        'Particular Conditions вводят условие о «единственной причине» задержки, фактически отсекая любые параллельные события.',
      ],
      en: [
        'A programme with no baseline and no acceptance by the Engineer leaves the delay analysis with nothing to sit on.',
        'The analysis method is chosen retrospectively to produce the desired answer; pick the method and record it before the dispute starts.',
        'Particular Conditions introduce a sole-cause requirement, which in effect removes any concurrent event from consideration.',
      ],
      uz: [
        'Baseline siz va Muhandis qabul qilmagan programme — kechikish tahlilini tayanadigan narsa yoʻq.',
        'Tahlil usuli kerakli natija uchun keyinchalik tanlangan; usulni tanlang va nizo boshlanishidan oldin qayd eting.',
        'Particular Conditions kechikishning «yagona sababi» sharti kiritadi va bu amalda har qanday parallel hodisani chiqarib tashlaydi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Даёт ли EOT автоматически право на дополнительные деньги?',
          en: 'Does an EOT automatically carry entitlement to money?',
          uz: 'EOT avtomatik ravishda qoʻshimcha pul huquqini beradimi?',
        },
        a: {
          ru: 'Нет. Время и деньги — разные права с разными основаниями. EOT снимает риск неустойки за просрочку, но затраты на продление (prolongation costs) требуют отдельного обоснования: какие именно ресурсы простаивали, в какой период и по чьей вине. Часть событий по FIDIC даёт только время — например, при параллельной задержке.',
          en: 'No. Time and money are separate entitlements with separate tests. An EOT removes exposure to delay damages, but prolongation costs need their own substantiation: which resources stood idle, over what period and on whose account. Some FIDIC events give time only — concurrency being the classic case.',
          uz: 'Yoʻq. Vaqt va pul — turli asoslarga ega turli huquqlar. EOT kechikish uchun jarima riskini olib tashlaydi, lekin uzaytirish xarajatlari (prolongation costs) alohida asoslashni talab qiladi: qaysi resurslar, qaysi davrda va kimning hisobiga boʻsh turgan. FIDIC boʻyicha baʼzi hodisalar faqat vaqt beradi — masalan, parallel kechikishda.',
        },
      },
      {
        q: {
          ru: 'Что делать, если Инженер не отвечает на заявку об EOT?',
          en: 'What if the Engineer does not respond to an EOT claim?',
          uz: 'Agar Muhandis EOT arizasiga javob bermasa, nima qilish kerak?',
        },
        a: {
          ru: 'Молчание Инженера не отменяет обязанности подрядчика вести процедуру. Продолжайте подавать промежуточные обоснования, обновлять программу и фиксировать records. По истечении сроков, установленных для определения по Sub-Clause 3.7, вопрос переходит на следующую ступень — в DAAB. Прекращать документирование до этого момента нельзя: именно накопленные records и станут доказательственной базой.',
          en: 'The Engineer’s silence does not relieve the Contractor of running the procedure. Keep filing interim substantiation, updating the programme and keeping records. Once the periods for a determination under Sub-Clause 3.7 have run, the matter moves up to the DAAB. Do not stop documenting before that point: the accumulated records are exactly what the evidential case will rest on.',
          uz: 'Muhandisning sukuti pudratchini protsedurani yuritish majburiyatidan ozod qilmaydi. Oraliq asoslashlarni topshirishda, programme ni yangilashda va records yuritishda davom eting. Sub-Clause 3.7 boʻyicha qaror uchun belgilangan muddatlar oʻtgach, masala keyingi bosqichga — DAAB ga oʻtadi. Shu paytgacha hujjatlashtirishni toʻxtatib boʻlmaydi: aynan toʻplangan records dalil bazasiga aylanadi.',
        },
      },
    ],
  },

  'delay-damages-8-8': {
    practice: {
      ru: 'Спор о неустойке за просрочку почти всегда сводится к двум вопросам: правильно ли посчитана дата завершения с учётом всех предоставленных EOT и не превышен ли предел (cap). Заказчики нередко удерживают LD из промежуточных платежей до того, как определены все продления, — формально это возможно, но при последующем удовлетворении EOT удержание подлежит возврату. Второе: если работы частично приняты по Sub-Clause 10.2, размер неустойки должен быть пропорционально уменьшен, и об этом регулярно забывают.',
      en: 'A delay damages dispute almost always reduces to two questions: whether the completion date has been calculated correctly after every EOT granted, and whether the cap has been exceeded. Employers frequently deduct LDs from interim payments before all extensions have been determined — formally possible, but the deduction must be returned if the EOT is later allowed. Second: where parts of the works have been taken over under Sub-Clause 10.2, the damages must be reduced proportionally, and this is routinely overlooked.',
      uz: 'Kechikish uchun jarima bahsi deyarli har doim ikki savolga keladi: barcha berilgan EOT hisobga olingan holda yakunlanish sanasi toʻgʻri hisoblanganmi va chegara (cap) oshib ketmaganmi. Buyurtmachilar koʻpincha barcha uzaytirishlar aniqlangunga qadar LD ni oraliq toʻlovlardan ushlab qoladi — rasman bu mumkin, lekin keyinchalik EOT qanoatlantirilsa, ushlab qolingan mablagʻ qaytarilishi kerak. Ikkinchisi: agar ishlar Sub-Clause 10.2 boʻyicha qisman qabul qilingan boʻlsa, jarima miqdori mutanosib kamaytirilishi kerak, buni esa muntazam unutishadi.',
    },
    pitfalls: {
      ru: [
        'Cap удалён из Contract Data или поднят до уровня, при котором перестаёт быть защитой.',
        'LD оформлены как «штраф» в переводной версии — в ряде юрисдикций это меняет судьбу оговорки.',
        'Не учтена частичная приёмка: неустойка продолжает начисляться на весь объём после передачи части объекта Заказчику.',
      ],
      en: [
        'The cap is deleted from the Contract Data, or raised to a level where it stops being a protection.',
        'LDs are rendered as a penalty in the translated version — in several jurisdictions that changes how the provision is treated.',
        'Sectional taking-over is ignored and damages keep accruing on the whole works after part of the site has gone back to the Employer.',
      ],
      uz: [
        'Cap Contract Data dan olib tashlangan yoki himoya boʻlishdan toʻxtaydigan darajaga koʻtarilgan.',
        'LD tarjima versiyasida «jarima» sifatida rasmiylashtirilgan — bir qator yurisdiksiyalarda bu bandning taqdirini oʻzgartiradi.',
        'Qisman qabul hisobga olinmagan: obyektning bir qismi Buyurtmachiga topshirilgandan keyin ham jarima butun hajmga hisoblanadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Может ли Заказчик требовать реальные убытки сверх неустойки?',
          en: 'Can the Employer claim actual losses on top of delay damages?',
          uz: 'Buyurtmachi jarimadan tashqari real zararni talab qila oladimi?',
        },
        a: {
          ru: 'По стандартной конструкции FIDIC неустойка за просрочку — исчерпывающее средство защиты за задержку завершения, кроме случаев расторжения. То есть заказчик не может получить и LD, и возмещение тех же убытков. Но Particular Conditions иногда убирают слово «исключительное», и тогда конструкция меняется — это одна из правок, которую нужно искать целенаправленно.',
          en: 'Under the standard FIDIC structure, delay damages are the sole remedy for late completion, save on termination. The Employer cannot recover both LDs and the same loss again. Particular Conditions sometimes delete the exclusivity wording, which changes the position entirely — this is one of the edits worth hunting for deliberately.',
          uz: 'Standart FIDIC konstruksiyasida kechikish uchun jarima — yakunlanish kechikishi uchun yagona himoya vositasi, shartnomani bekor qilish holatlaridan tashqari. Yaʼni buyurtmachi ham LD, ham oʻsha zararning oʻrnini qoplashni ololmaydi. Lekin Particular Conditions baʼzan «istisno» soʻzini olib tashlaydi va konstruksiya oʻzgaradi — bu maqsadli qidirish kerak boʻlgan tuzatishlardan biri.',
        },
      },
      {
        q: {
          ru: 'С какой даты начисляется неустойка при частичной приёмке?',
          en: 'From what date do damages run where there is sectional taking-over?',
          uz: 'Qisman qabulda jarima qaysi sanadan hisoblanadi?',
        },
        a: {
          ru: 'С даты, установленной для завершения соответствующей части, а размер уменьшается пропорционально стоимости уже принятой части. Практическая сложность в том, что пропорция должна быть выводима из контрактных документов: если Contract Data не содержит разбивки по секциям, стороны получают спор о методике расчёта на пустом месте.',
          en: 'From the date fixed for completion of the relevant section, with the rate reduced in proportion to the value of the part already taken over. The practical difficulty is that the proportion must be derivable from the contract documents: if the Contract Data holds no sectional breakdown, the parties inherit an avoidable argument about methodology.',
          uz: 'Tegishli qismni yakunlash uchun belgilangan sanadan, miqdor esa allaqachon qabul qilingan qism qiymatiga mutanosib kamayadi. Amaliy qiyinchilik shundaki, nisbat shartnoma hujjatlaridan kelib chiqishi kerak: agar Contract Data da boʻlimlar boʻyicha taqsimot boʻlmasa, tomonlar boʻsh joyda hisoblash uslubi boʻyicha nizoga ega boʻladi.',
        },
      },
    ],
  },

  'variations-13': {
    practice: {
      ru: 'Самая дорогая ошибка по Clause 13 — выполнить работу по устному указанию или по чертежу «в рабочем порядке», а потом искать основание для оплаты. Изменение должно быть оформлено как Variation: инструкция Инженера либо согласованное предложение. Если работа выполнена без этого, спор переходит в плоскость доказывания фактического указания и обогащения заказчика, что заметно тяжелее. Второй узел — оценка: стороны спорят не о факте изменения, а о применимых расценках, и здесь решает то, насколько аккуратно велись обмеры и учёт ресурсов в момент выполнения.',
      en: 'The most expensive mistake under Clause 13 is doing the work on a verbal instruction or a drawing passed over informally, then looking for a payment route afterwards. A change must be constituted as a Variation: an Engineer’s instruction or an agreed proposal. Without that, the argument shifts to proving an instruction in fact and the Employer’s benefit, which is materially harder. The second flashpoint is valuation: the parties rarely dispute that a change occurred, they dispute the applicable rates — and that turns on how carefully measurement and resource records were kept at the time.',
      uz: 'Clause 13 boʻyicha eng qimmat xato — ishni ogʻzaki koʻrsatma yoki «ish tartibida» berilgan chizma boʻyicha bajarib, keyin toʻlov asosini qidirish. Oʻzgarish Variation sifatida rasmiylashtirilishi kerak: Muhandis koʻrsatmasi yoki kelishilgan taklif. Agar ish busiz bajarilsa, bahs amaldagi koʻrsatmani va buyurtmachining boyishini isbotlash tekisligiga oʻtadi, bu esa sezilarli darajada ogʻirroq. Ikkinchi tugun — baholash: tomonlar oʻzgarish fakti haqida emas, qoʻllaniladigan narxlar haqida bahslashadi va bu yerda bajarish paytida oʻlchov va resurs hisobi qanchalik puxta yuritilgani hal qiladi.',
    },
    pitfalls: {
      ru: [
        'Устные указания на площадке без последующего письменного подтверждения по Sub-Clause 3.5.',
        'Particular Conditions вводят порог, ниже которого изменение не оплачивается, — мелкие Variation накапливаются в существенную сумму.',
        'Отсутствие фиксации фактических ресурсов в момент работ: через полгода восстановить состав звена и часы уже невозможно.',
      ],
      en: [
        'Verbal site instructions with no follow-up confirmation in writing under Sub-Clause 3.5.',
        'Particular Conditions introduce a threshold below which a change is not paid — small Variations then accumulate into a material sum.',
        'No contemporaneous record of actual resources: six months later the gang composition and hours cannot be reconstructed.',
      ],
      uz: [
        'Obyektda ogʻzaki koʻrsatmalar, Sub-Clause 3.5 boʻyicha keyingi yozma tasdiqsiz.',
        'Particular Conditions oʻzgarish toʻlanmaydigan chegara kiritadi — kichik Variation lar sezilarli summaga toʻplanadi.',
        'Ish paytida haqiqiy resurslarni qayd etmaslik: olti oydan keyin brigada tarkibi va soatlarni tiklab boʻlmaydi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Обязан ли Подрядчик выполнять Variation, если не согласен с оценкой?',
          en: 'Must the Contractor carry out a Variation if it disagrees with the valuation?',
          uz: 'Agar baholash bilan rozi boʻlmasa, Pudratchi Variation ni bajarishi shartmi?',
        },
        a: {
          ru: 'Как правило да: инструкция об изменении подлежит исполнению, а разногласие по цене разрешается отдельно через определение Инженера и, при необходимости, DAAB. Исключения ограничены — например, если необходимые материалы недоступны или изменение выходит за пределы предусмотренного контрактом. Отказ выполнять инструкцию по мотиву несогласия с ценой — рискованная позиция.',
          en: 'Generally yes: an instruction to vary must be carried out, and the disagreement over price is resolved separately through the Engineer’s determination and, if needed, the DAAB. The exceptions are narrow — for example where the required goods are not readily obtainable, or the change falls outside what the contract contemplates. Refusing to comply because the price is disputed is a risky position.',
          uz: 'Odatda ha: oʻzgarish haqidagi koʻrsatma bajarilishi kerak, narx boʻyicha kelishmovchilik esa Muhandis qarori va zarur boʻlsa DAAB orqali alohida hal qilinadi. Istisnolar cheklangan — masalan, kerakli materiallar mavjud boʻlmasa yoki oʻzgarish shartnomada nazarda tutilgan doiradan chiqsa. Narx bilan rozi emasligi sababli koʻrsatmani bajarishdan bosh tortish — xavfli pozitsiya.',
        },
      },
      {
        q: {
          ru: 'Когда применяются контрактные расценки, а когда новые?',
          en: 'When do contract rates apply and when are new rates used?',
          uz: 'Qachon shartnoma narxlari, qachon yangi narxlar qoʻllanadi?',
        },
        a: {
          ru: 'Базово применяются расценки контракта. Новая расценка обосновывается, когда работа существенно отличается по характеру или условиям выполнения либо когда изменение объёма выходит за установленные пределы и делает исходную расценку неадекватной. Ключ к успеху здесь — не аргументация, а данные: сравнение фактической выработки и состава ресурсов до и после изменения.',
          en: 'Contract rates apply by default. A new rate becomes arguable where the work differs materially in character or conditions of execution, or where a change in quantity crosses the stated thresholds and makes the original rate inappropriate. What decides it is not argument but data: a comparison of actual output and resource composition before and after the change.',
          uz: 'Asosan shartnoma narxlari qoʻllanadi. Yangi narx ish xarakteri yoki bajarish sharoitlari boʻyicha sezilarli farq qilganda yoki hajm oʻzgarishi belgilangan chegaradan chiqib, dastlabki narxni nomunosib qilganda asoslanadi. Bu yerda muvaffaqiyat kaliti — dalillar emas, maʼlumotlar: oʻzgarishdan oldin va keyin haqiqiy ishlab chiqarish va resurs tarkibini solishtirish.',
        },
      },
    ],
  },

  'payment-14': {
    practice: {
      ru: 'Платёжный цикл ломается в двух местах. Первое — заявка подана не по форме и не с теми приложениями, которые требует контракт: Инженер вправе не сертифицировать, и срок начинает течь заново. Второе — заказчик задерживает оплату уже сертифицированной суммы, а подрядчик не оформляет это как нарушение, продолжая финансировать проект за свой счёт. По FIDIC у неоплаты есть последствия: проценты за просрочку, право приостановить работы по Sub-Clause 16.1 и, при длительной неоплате, право на расторжение. Но все они включаются только через уведомления.',
      en: 'The payment cycle breaks in two places. First, the application is not in the required form or lacks the supporting documents the contract calls for: the Engineer is entitled not to certify, and the clock restarts. Second, the Employer pays a certified amount late and the Contractor never treats it as a breach, continuing to finance the project itself. FIDIC attaches consequences to non-payment: financing charges, a right to suspend under Sub-Clause 16.1 and, if it persists, a right to terminate. All of them switch on only through notices.',
      uz: 'Toʻlov sikli ikki joyda buziladi. Birinchisi — ariza shartnoma talab qilgan shakl va ilovalarsiz topshirilgan: Muhandis sertifikatlamaslikka haqli va muddat qaytadan boshlanadi. Ikkinchisi — buyurtmachi allaqachon sertifikatlangan summani kechiktiradi, pudratchi esa buni buzilish sifatida rasmiylashtirmay, loyihani oʻz hisobidan moliyalashtirishda davom etadi. FIDIC boʻyicha toʻlamaslikning oqibatlari bor: kechikish uchun foizlar, Sub-Clause 16.1 boʻyicha ishlarni toʻxtatish huquqi va uzoq davom etsa, bekor qilish huquqi. Lekin ularning barchasi faqat bildirishnomalar orqali ishga tushadi.',
    },
    pitfalls: {
      ru: [
        'Состав приложений к заявке не согласован в начале проекта — каждый месяц новые требования и новые задержки.',
        'Particular Conditions удлиняют срок оплаты до 90+ дней, ломая денежный поток подрядчика при неизменной цене оферты.',
        'Проценты за просрочку не начисляются и не заявляются: право есть, но без уведомления оно не реализуется.',
      ],
      en: [
        'The set of documents accompanying an application is never agreed at project start — new requirements and new delays every month.',
        'Particular Conditions stretch the payment period to 90+ days, breaking the Contractor’s cash flow at an unchanged tender price.',
        'Financing charges are neither computed nor claimed: the right exists, but without notice it is never realised.',
      ],
      uz: [
        'Arizaga ilovalar tarkibi loyiha boshida kelishilmagan — har oy yangi talablar va yangi kechikishlar.',
        'Particular Conditions toʻlov muddatini 90+ kunga uzaytiradi va oferta narxi oʻzgarmagan holda pudratchining pul oqimini buzadi.',
        'Kechikish uchun foizlar hisoblanmaydi va talab qilinmaydi: huquq bor, lekin bildirishnomasiz u amalga oshmaydi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что делать, если Инженер занижает сертифицируемую сумму?',
          en: 'What if the Engineer certifies less than the amount applied for?',
          uz: 'Agar Muhandis sertifikatlanadigan summani kamaytirsa, nima qilish kerak?',
        },
        a: {
          ru: 'Сначала получить письменное обоснование: какие позиции и по какой причине не приняты. Далее это либо вопрос обмера и подтверждающих документов — тогда его закрывают данными, — либо разногласие по контрактному основанию, которое идёт через определение по Sub-Clause 3.7 и при необходимости в DAAB. Продолжать подавать заявки нужно в любом случае: непрерывность цикла сама по себе доказательственный факт.',
          en: 'First get the reasons in writing: which items were cut and why. From there it is either a measurement and documentation question — closed with data — or a disagreement on contractual entitlement, which runs through a determination under Sub-Clause 3.7 and, if needed, to the DAAB. Keep submitting applications either way: the continuity of the cycle is itself evidence.',
          uz: 'Avval yozma asoslash oling: qaysi pozitsiyalar va qanday sabab bilan qabul qilinmagan. Keyin bu yo oʻlchov va tasdiqlovchi hujjatlar masalasi — u holda maʼlumotlar bilan yopiladi — yoki Sub-Clause 3.7 boʻyicha qaror va zarur boʻlsa DAAB orqali oʻtadigan shartnomaviy asos boʻyicha kelishmovchilik. Har holda arizalarni topshirishda davom etish kerak: siklning uzluksizligi oʻzi dalil.',
        },
      },
      {
        q: {
          ru: 'Через какой срок неоплата даёт право приостановить работы?',
          en: 'How long must non-payment run before work can be suspended?',
          uz: 'Toʻlamaslik qancha vaqtdan keyin ishlarni toʻxtatish huquqini beradi?',
        },
        a: {
          ru: 'Срок задан в контракте и в Contract Data, и его нужно смотреть в конкретном документе, а не по памяти. Механика при этом одинакова: сначала уведомление о намерении приостановить, затем выдержка установленного периода, и только потом приостановка. Приостановка без предварительного уведомления сама превращается в нарушение и даёт заказчику встречные основания.',
          en: 'The period is set in the contract and the Contract Data, and must be read there rather than from memory. The mechanics are constant: notice of intention to suspend, then the stated period must run, and only then suspension. Suspending without the prior notice becomes a breach in itself and hands the Employer counter-grounds.',
          uz: 'Muddat shartnomada va Contract Data da belgilangan, uni xotiradan emas, aniq hujjatdan koʻrish kerak. Mexanikasi esa bir xil: avval toʻxtatish niyati haqida bildirishnoma, keyin belgilangan davrni kutish va faqat shundan keyin toʻxtatish. Oldindan bildirishnomasiz toʻxtatish oʻzi buzilishga aylanadi va buyurtmachiga qarshi asoslar beradi.',
        },
      },
    ],
  },

  'daab-disputes-21': {
    practice: {
      ru: 'Главная проблема Clause 21 в регионе — не качество решений DAAB, а то, что совет вообще не сформирован. Стороны подписывают контракт, откладывают согласование кандидатур «до появления спора», и к моменту разногласия механизм не работает: нужно согласовывать состав, а согласовывать уже некому и некогда. Второе — решение DAAB обязательно к немедленному исполнению даже при поданном Notice of Dissatisfaction. Сторона, которая не исполняет решение и ждёт арбитража, обычно ухудшает свою позицию.',
      en: 'The main problem with Clause 21 in the region is not the quality of DAAB decisions but that the board is never constituted at all. The parties sign, defer agreeing members until a dispute appears, and by the time one does the mechanism does not work: members must be agreed, and by then there is neither goodwill nor time. Second, a DAAB decision is binding with immediate effect even where a Notice of Dissatisfaction has been served. A party that withholds compliance and waits for arbitration usually worsens its position.',
      uz: 'Mintaqada Clause 21 ning asosiy muammosi — DAAB qarorlari sifati emas, kengashning umuman tuzilmagani. Tomonlar shartnoma imzolaydi, nomzodlarni kelishishni «nizo paydo boʻlgunga qadar» qoldiradi va kelishmovchilik paytida mexanizm ishlamaydi: tarkibni kelishish kerak, kelishadigan odam ham, vaqt ham yoʻq. Ikkinchisi — DAAB qarori Notice of Dissatisfaction topshirilgan boʻlsa ham darhol ijro etilishi shart. Qarorni bajarmay, arbitrajni kutayotgan tomon odatda oʻz pozitsiyasini yomonlashtiradi.',
    },
    pitfalls: {
      ru: [
        'DAAB не сформирован в срок, установленный Contract Data, — Clause 21 остаётся декларацией.',
        'Бюджет на работу совета не заложен, и стороны де-факто саботируют визиты и слушания.',
        'Notice of Dissatisfaction подан с нарушением срока или без указания предмета несогласия — право на арбитраж под вопросом.',
      ],
      en: [
        'The DAAB is not constituted within the period set in the Contract Data, leaving Clause 21 as decoration.',
        'No budget is allocated for the board, so the parties in effect sabotage visits and hearings.',
        'A Notice of Dissatisfaction is served late or without identifying what is disputed — the right to arbitrate is then exposed.',
      ],
      uz: [
        'DAAB Contract Data da belgilangan muddatda tuzilmagan — Clause 21 deklaratsiya boʻlib qoladi.',
        'Kengash ishiga byudjet ajratilmagan va tomonlar amalda tashriflar va tinglovlarni sabotaj qiladi.',
        'Notice of Dissatisfaction muddat buzilgan holda yoki kelishmovchilik predmetini koʻrsatmasdan topshirilgan — arbitraj huquqi shubha ostida.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Нужно ли исполнять решение DAAB, если вы с ним не согласны?',
          en: 'Must a DAAB decision be complied with if you disagree with it?',
          uz: 'Agar rozi boʻlmasangiz, DAAB qarorini bajarish kerakmi?',
        },
        a: {
          ru: 'Да. Решение обязательно к немедленному исполнению независимо от подачи Notice of Dissatisfaction; несогласие открывает путь к арбитражу, но не приостанавливает исполнение. Неисполнение само по себе может стать предметом отдельного разбирательства, и в арбитраже сторона, проигнорировавшая решение, объясняется уже по двум фронтам.',
          en: 'Yes. The decision is binding with immediate effect regardless of a Notice of Dissatisfaction; disagreement opens the route to arbitration but does not suspend compliance. Non-compliance can itself become the subject of separate proceedings, and in arbitration the party that ignored the decision ends up defending on two fronts.',
          uz: 'Ha. Qaror Notice of Dissatisfaction topshirilganidan qatʼi nazar darhol ijro etilishi shart; rozilik bermaslik arbitrajga yoʻl ochadi, lekin ijroni toʻxtatmaydi. Bajarmaslik oʻzi alohida ish predmetiga aylanishi mumkin va arbitrajda qarorni eʼtiborsiz qoldirgan tomon ikki jabhada tushuntirish beradi.',
        },
      },
      {
        q: {
          ru: 'Чем DAAB отличается от арбитража по существу?',
          en: 'How does a DAAB differ from arbitration in substance?',
          uz: 'DAAB arbitrajdan mohiyatan nimasi bilan farq qiladi?',
        },
        a: {
          ru: 'DAAB работает с живым проектом: совет знает площадку, видит развитие событий и может помочь сторонам избежать спора ещё до его формализации. Арбитраж рассматривает уже сложившийся конфликт по документам, стоит существенно дороже и занимает годы. Именно поэтому функция dispute avoidance в DAAB важнее adjudication: спор, снятый на визите совета, не доходит до стадии, где считают юридические расходы.',
          en: 'A DAAB works with a live project: it knows the site, watches events develop and can help the parties avoid a dispute before it is ever formalised. Arbitration examines a crystallised conflict on documents, costs materially more and takes years. That is why the dispute-avoidance function matters more than adjudication: an issue resolved during a board visit never reaches the stage where legal costs are counted.',
          uz: 'DAAB tirik loyiha bilan ishlaydi: kengash obyektni biladi, voqealar rivojini koʻradi va tomonlarga nizo rasmiylashtirilgunga qadar undan qochishga yordam bera oladi. Arbitraj esa allaqachon shakllangan mojaroni hujjatlar boʻyicha koʻrib chiqadi, sezilarli qimmatroq turadi va yillar oladi. Shuning uchun DAAB da dispute avoidance funksiyasi adjudication dan muhimroq: kengash tashrifida hal qilingan masala yuridik xarajatlar sanaladigan bosqichga yetmaydi.',
        },
      },
    ],
  },

  'agreement-determination-3-7': {
    practice: {
      ru: 'Sub-Clause 3.7 — это точка, где контракт требует от Инженера действовать нейтрально, а коммерческая реальность толкает его в сторону нанимателя. На проектах, где Инженер финансируется как технадзор и подчинён заказчику организационно, определения либо запаздывают, либо дублируют позицию заказчика. Для подрядчика это означает практическое правило: строить позицию не на ожидании справедливого определения, а на документах, которые сохранят силу и в DAAB. Пропуск установленных сроков консультаций и определения сам по себе даёт основание идти дальше по лестнице спора.',
      en: 'Sub-Clause 3.7 is where the contract requires the Engineer to act neutrally while commercial reality pulls towards the paying party. On projects where the Engineer is funded as technical supervision and sits organisationally under the Employer, determinations either arrive late or simply restate the Employer’s position. The practical consequence for a Contractor is to build its case not around an expectation of a fair determination but around records that will still stand up before the DAAB. A failure to meet the consultation and determination periods is itself grounds to move up the ladder.',
      uz: 'Sub-Clause 3.7 — shartnoma Muhandisdan neytral harakat qilishni talab qiladigan, tijorat haqiqati esa uni ish beruvchi tomonga itaradigan nuqta. Muhandis texnik nazorat sifatida moliyalashtiriladigan va buyurtmachiga tashkiliy boʻysunadigan loyihalarda qarorlar yo kechikadi, yo buyurtmachi pozitsiyasini takrorlaydi. Pudratchi uchun bu amaliy qoidani anglatadi: pozitsiyani adolatli qaror kutish ustiga emas, DAAB da ham kuchini saqlaydigan hujjatlar ustiga qurish. Maslahatlashuv va qaror uchun belgilangan muddatlarni oʻtkazib yuborish oʻzi nizo zinapoyasi boʻyicha yuqoriga koʻtarilish asosini beradi.',
    },
    pitfalls: {
      ru: [
        'Particular Conditions требуют одобрения заказчика перед выдачей определения — нейтральность исчезает как конструкция.',
        'Стадия консультаций формально пропущена: определение выдано без попытки достичь соглашения.',
        'Определение выдано без мотивировки — оспаривать его в DAAB сложнее, требуйте обоснование письменно.',
      ],
      en: [
        'Particular Conditions require the Employer’s approval before a determination is issued — neutrality disappears as a construct.',
        'The consultation stage is skipped: a determination is issued with no attempt to reach agreement first.',
        'The determination carries no reasons — harder to challenge before the DAAB, so ask for the reasoning in writing.',
      ],
      uz: [
        'Particular Conditions qaror chiqarishdan oldin buyurtmachi roziligini talab qiladi — neytrallik konstruksiya sifatida yoʻqoladi.',
        'Maslahatlashuv bosqichi rasman oʻtkazib yuborilgan: qaror kelishuvga erishishga urinmasdan chiqarilgan.',
        'Qaror asoslashsiz chiqarilgan — uni DAAB da eʼtiroz bildirish qiyinroq, asoslashni yozma talab qiling.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что происходит, если Инженер не выдал определение в срок?',
          en: 'What happens if the Engineer misses the determination period?',
          uz: 'Agar Muhandis qarorni muddatida chiqarmasa, nima boʻladi?',
        },
        a: {
          ru: 'По изданиям 2017 пропуск срока трактуется как отказ, и вопрос считается разногласием, которое можно передать в DAAB. Это важный практический рычаг: молчание Инженера не блокирует процесс, а открывает следующую ступень. Условие одно — сроки и факт неполучения определения должны быть задокументированы, иначе спор начнётся с выяснения дат.',
          en: 'Under the 2017 editions, missing the period is treated as a deemed rejection, and the matter becomes a dispute that can be referred to the DAAB. That is a useful practical lever: the Engineer’s silence does not block the process, it unlocks the next rung. The one condition is that the periods and the absence of a determination must be documented, or the dispute will start with an argument about dates.',
          uz: '2017 nashrlarida muddatni oʻtkazib yuborish rad etish sifatida talqin qilinadi va masala DAAB ga topshirilishi mumkin boʻlgan kelishmovchilik hisoblanadi. Bu muhim amaliy richag: Muhandisning sukuti jarayonni bloklamaydi, keyingi bosqichni ochadi. Shart bitta — muddatlar va qaror olinmagani hujjatlashtirilgan boʻlishi kerak, aks holda nizo sanalarni aniqlashdan boshlanadi.',
        },
      },
      {
        q: {
          ru: 'Есть ли Sub-Clause 3.7 в Silver Book?',
          en: 'Does the Silver Book have a Sub-Clause 3.7?',
          uz: 'Silver Book da Sub-Clause 3.7 bormi?',
        },
        a: {
          ru: 'В Silver Book классической фигуры независимого Инженера нет — там действует представитель Заказчика, и механизм согласования или определения устроен иначе. Это одна из причин, по которой Silver Book не следует брать по умолчанию: вместе с Инженером исчезает и промежуточный нейтральный фильтр между позицией заказчика и спором.',
          en: 'The Silver Book has no independent Engineer in the classic sense — an Employer’s Representative acts instead, and the agreement-or-determination mechanism is structured differently. This is one reason not to adopt the Silver Book by default: losing the Engineer also removes the neutral filter that sits between the Employer’s position and a dispute.',
          uz: 'Silver Book da mustaqil Muhandisning klassik figurasi yoʻq — u yerda Buyurtmachi vakili ishlaydi va kelishuv yoki qaror mexanizmi boshqacha tuzilgan. Bu Silver Book ni sukut boʻyicha olmaslik sabablaridan biri: Muhandis bilan birga buyurtmachi pozitsiyasi va nizo oʻrtasidagi neytral filtr ham yoʻqoladi.',
        },
      },
    ],
  },

  'performance-security-4-2': {
    practice: {
      ru: 'Гарантия исполнения превращается в проблему в двух ситуациях. Первая — срок действия гарантии истекает раньше, чем закрывается период дефектов, и подрядчик получает требование о продлении под угрозой немедленного востребования. Вторая — заказчик выставляет требование по гарантии по требованию, не доказывая нарушения: банк платит по формальным признакам, а подрядчик возвращает деньги уже через спор. Поэтому в Particular Conditions критично смотреть основания востребования и наличие обязанности предварительно уведомить.',
      en: 'Performance security turns into a problem in two situations. First, the guarantee expires before the defects period closes, and the Contractor faces a demand to extend under threat of an immediate call. Second, the Employer calls an on-demand instrument without proving breach: the bank pays against formal compliance, and the Contractor recovers the money only through a dispute. That is why the grounds for calling, and whether prior notice is required, are the critical items to read in the Particular Conditions.',
      uz: 'Ijro kafolati ikki holatda muammoga aylanadi. Birinchisi — kafolat muddati nuqson davri yopilishidan oldin tugaydi va pudratchi darhol talab qilish tahdidi ostida uzaytirish talabini oladi. Ikkinchisi — buyurtmachi buzilishni isbotlamasdan talab boʻyicha kafolat boʻyicha talab qoʻyadi: bank rasmiy belgilar boʻyicha toʻlaydi, pudratchi esa pulni faqat nizo orqali qaytaradi. Shuning uchun Particular Conditions da talab qilish asoslari va oldindan xabar berish majburiyati borligini koʻrish juda muhim.',
    },
    pitfalls: {
      ru: [
        'Срок гарантии не покрывает весь DNP с учётом возможных продлений — планируйте запас.',
        'Формулировка «по первому требованию» без обязанности обосновать нарушение делает инструмент почти безусловным.',
        'Гарантия выпущена банком, не приемлемым для заказчика по контракту, — риск обнаруживается уже после подписания.',
      ],
      en: [
        'The validity period does not cover the whole DNP allowing for extensions — build in headroom.',
        'On-first-demand wording with no obligation to substantiate a breach makes the instrument close to unconditional.',
        'The guarantee is issued by a bank the contract does not accept — the risk surfaces only after signature.',
      ],
      uz: [
        'Kafolat muddati mumkin boʻlgan uzaytirishlarni hisobga olib butun DNP ni qoplamaydi — zaxira rejalashtiring.',
        '«Birinchi talab boʻyicha» formulasi buzilishni asoslash majburiyatisiz vositani deyarli shartsiz qiladi.',
        'Kafolat shartnoma boʻyicha buyurtmachi uchun maqbul boʻlmagan bank tomonidan berilgan — risk imzolashdan keyin aniqlanadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Можно ли остановить неправомерное востребование гарантии?',
          en: 'Can an unjustified call on the guarantee be stopped?',
          uz: 'Kafolatni asossiz talab qilishni toʻxtatib boʻladimi?',
        },
        a: {
          ru: 'Теоретически да — через обеспечительные меры, — но практически это сложно и зависит от права места выдачи гарантии и от её формулировок. По независимым гарантиям банк платит против документов, не вникая в спор по основному контракту. Реалистичнее работать на упреждение: закрепить в Particular Conditions обязанность заказчика уведомить и обосновать требование до обращения в банк.',
          en: 'In theory yes, through injunctive relief, but in practice it is difficult and depends on the law of the place of issue and the instrument’s wording. Under an independent guarantee the bank pays against documents without examining the underlying dispute. The realistic play is preventive: fix an obligation in the Particular Conditions for the Employer to notify and substantiate before approaching the bank.',
          uz: 'Nazariy jihatdan ha — taʼminlash choralari orqali — lekin amalda bu qiyin va kafolat berilgan joy huquqiga hamda uning matniga bogʻliq. Mustaqil kafolatlar boʻyicha bank asosiy shartnoma boʻyicha nizoga kirmasdan hujjatlarga qarshi toʻlaydi. Oldindan ishlash realroq: Particular Conditions da buyurtmachining bankka murojaat qilishdan oldin xabar berish va talabni asoslash majburiyatini mustahkamlash.',
        },
      },
      {
        q: {
          ru: 'Когда гарантия исполнения должна быть возвращена?',
          en: 'When must the performance security be returned?',
          uz: 'Ijro kafolati qachon qaytarilishi kerak?',
        },
        a: {
          ru: 'После выполнения обязательств, к которым она привязана, — как правило это выдача Performance Certificate по завершении периода дефектов. На практике возврат затягивают, ссылаясь на незакрытые мелкие замечания. Работающий приём — заранее согласовать в контракте перечень условий возврата и вести реестр устранённых дефектов с подтверждением Инженера, чтобы не спорить об этом в конце.',
          en: 'Once the obligations it secures are discharged — typically on issue of the Performance Certificate at the end of the defects period. In practice return is dragged out by reference to minor open items. What works is agreeing the release conditions in the contract up front and keeping a register of rectified defects signed off by the Engineer, so it is not argued at the end.',
          uz: 'U bogʻlangan majburiyatlar bajarilgandan keyin — odatda nuqson davri tugagach Performance Certificate berilishi. Amalda qaytarish yopilmagan mayda eʼtirozlarga havola qilib choʻziladi. Ishlaydigan usul — shartnomada qaytarish shartlari roʻyxatini oldindan kelishish va Muhandis tasdigʻi bilan bartaraf etilgan nuqsonlar reestrini yuritish, toki oxirida bu haqda bahslashmaslik uchun.',
        },
      },
    ],
  },

  'unforeseeable-conditions-4-12': {
    practice: {
      ru: 'Спор о непредвиденных физических условиях выигрывается или проигрывается на площадке в первые дни, а не потом в переписке. Нужны фотофиксация с привязкой к пикету и дате, журналы, замеры, пробы и остановка работ с уведомлением до того, как условие будет засыпано или пройдено. Второй ключевой вопрос — тест «опытного подрядчика»: суд или DAAB смотрят не на то, что подрядчик не ожидал, а на то, чего разумно нельзя было предвидеть по данным, доступным на дату оферты. Поэтому состав тендерных геоданных и оговорки к ним имеют решающее значение.',
      en: 'A dispute about unforeseeable physical conditions is won or lost on site in the first days, not later in correspondence. It needs photographs tied to chainage and date, diaries, measurements, samples, and a notice before the condition is buried or worked through. The second decisive issue is the experienced-contractor test: a tribunal or DAAB looks not at what the Contractor did not expect, but at what could not reasonably have been foreseen from the data available at tender date. That makes the content of the tender ground data, and the disclaimers attached to it, decisive.',
      uz: 'Kutilmagan jismoniy sharoitlar boʻyicha nizo keyinchalik yozishmalarda emas, obyektda dastlabki kunlarda yutiladi yoki yutqaziladi. Piket va sanaga bogʻlangan foto qayd, jurnallar, oʻlchovlar, namunalar va sharoit koʻmilgunga yoki oʻtib ketilgunga qadar bildirishnoma bilan ishlarni toʻxtatish kerak. Ikkinchi asosiy savol — «tajribali pudratchi» testi: sud yoki DAAB pudratchi nimani kutmaganiga emas, oferta sanasida mavjud maʼlumotlar boʻyicha nimani oqilona oldindan koʻrish mumkin boʻlmaganiga qaraydi. Shuning uchun tender geomaʼlumotlari tarkibi va ularga izohlar hal qiluvchi ahamiyatga ega.',
    },
    pitfalls: {
      ru: [
        'Particular Conditions переносят весь георискатегорию на подрядчика оговоркой «данные предоставлены только для сведения».',
        'Условие пройдено и засыпано до уведомления — доказательственная база утрачена физически.',
        'Требование уведомить «немедленно» вместо разумного срока: на практике это означает в тот же день.',
      ],
      en: [
        'Particular Conditions push the whole ground risk onto the Contractor via a for-information-only disclaimer on the site data.',
        'The condition is worked through and covered up before notice is given — the evidence is physically gone.',
        'A requirement to notify immediately rather than within a reasonable period: in practice that means the same day.',
      ],
      uz: [
        'Particular Conditions «maʼlumotlar faqat maʼlumot uchun berilgan» izohi bilan butun georiskni pudratchiga oʻtkazadi.',
        'Sharoit bildirishnomadan oldin oʻtib ketilgan va koʻmilgan — dalil bazasi jismonan yoʻqolgan.',
        '«Darhol» xabar berish talabi oqilona muddat oʻrniga: amalda bu oʻsha kuni degani.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что именно считается «непредвиденным» по Sub-Clause 4.12?',
          en: 'What exactly counts as unforeseeable under Sub-Clause 4.12?',
          uz: 'Sub-Clause 4.12 boʻyicha aynan nima «kutilmagan» hisoblanadi?',
        },
        a: {
          ru: 'То, что опытный подрядчик не мог разумно предвидеть к дате подачи оферты. Это объективный стандарт, а не субъективное ожидание конкретной компании. На практике проверяют: какие геологические отчёты были в тендерном пакете, какие оговорки к ним прилагались, был ли доступ на площадку до оферты и что показали бы стандартные для отрасли изыскания.',
          en: 'What an experienced contractor could not reasonably have foreseen by the date of tender submission. It is an objective standard, not the subjective expectation of a particular company. In practice the enquiry is: what ground investigation reports were in the tender package, what disclaimers came with them, was there pre-tender site access, and what would industry-standard investigation have revealed.',
          uz: 'Tajribali pudratchi oferta topshirish sanasiga qadar oqilona oldindan koʻra olmagan narsa. Bu muayyan kompaniyaning subyektiv kutishi emas, obyektiv standart. Amalda tekshiriladi: tender paketida qanday geologik hisobotlar bor edi, ularga qanday izohlar ilova qilingan, oferta oldidan obyektga kirish boʻlganmi va tarmoq uchun standart izlanishlar nimani koʻrsatgan boʻlardi.',
        },
      },
      {
        q: {
          ru: 'Почему Sub-Clause 4.12 отсутствует в Silver Book?',
          en: 'Why is there no Sub-Clause 4.12 in the Silver Book?',
          uz: 'Nega Silver Book da Sub-Clause 4.12 yoʻq?',
        },
        a: {
          ru: 'Silver Book построен на идее, что подрядчик принимает на себя практически весь риск, включая георискатегорию, и закладывает его в твёрдую цену. Это осознанный выбор модели, а не упущение. Проблема возникает, когда Silver Book берут для проекта с неизученной геологией и коротким тендерным периодом: подрядчик физически не может оценить риск, который принимает, и цена либо завышается, либо проект приходит к спору.',
          en: 'The Silver Book is built on the premise that the Contractor takes on substantially all risk, ground risk included, and prices it into a fixed lump sum. That is a deliberate model choice, not an omission. The problem appears when the Silver Book is adopted for a project with unexplored geology and a short tender period: the Contractor cannot physically assess the risk it is assuming, so either the price inflates or the project ends in dispute.',
          uz: 'Silver Book pudratchi deyarli barcha riskni, shu jumladan georiskni oʻz zimmasiga olishi va uni qatʼiy narxga kiritishi gʻoyasiga qurilgan. Bu eʼtiborsizlik emas, ongli model tanlovi. Muammo Silver Book oʻrganilmagan geologiya va qisqa tender davri boʻlgan loyiha uchun olinganda paydo boʻladi: pudratchi oʻzi qabul qilayotgan riskni jismonan baholay olmaydi va narx yo oshiriladi, yo loyiha nizoga keladi.',
        },
      },
    ],
  },

  'advance-warning-8-4': {
    practice: {
      ru: 'Advance warning — новелла изданий 2017, и её систематически недооценивают. Это не претензия и не заменяет уведомление по 20.2: цель в том, чтобы стороны узнали о вероятном негативном событии заранее и успели смягчить последствия. На практике она работает в обе стороны как инструмент проектной гигиены и как доказательство добросовестности. Подрядчик, который заранее предупредил о рисках задержки поставки, в последующем споре выглядит принципиально иначе, чем тот, кто молчал до срыва срока.',
      en: 'Advance warning is a 2017 innovation and is systematically underused. It is not a claim and it does not replace a notice under 20.2: its purpose is to let the parties learn of a probable adverse event early enough to mitigate. In practice it works both ways, as project hygiene and as evidence of good faith. A Contractor that flagged a delivery risk in advance stands in a fundamentally different position in a later dispute than one that stayed silent until the date was missed.',
      uz: 'Advance warning — 2017 nashrlarining yangiligi va u muntazam ravishda yetarlicha baholanmaydi. Bu daʼvo emas va 20.2 boʻyicha bildirishnomani almashtirmaydi: maqsad tomonlar ehtimoliy salbiy hodisadan oldindan xabar topib, oqibatlarni yumshatishga ulgurishi. Amalda u ikki tomonga ham loyiha gigiyenasi vositasi va vijdonlilik dalili sifatida ishlaydi. Yetkazib berish kechikishi riski haqida oldindan ogohlantirgan pudratchi keyingi nizoda muddat buzilgunga qadar jim turganidan tubdan farq qiladi.',
    },
    pitfalls: {
      ru: [
        'Advance warning подан вместо Notice of Claim — сроки по 20.2 при этом продолжают течь.',
        'Предупреждение оформлено устно на совещании без протокола — доказательственной ценности почти нет.',
        'Particular Conditions превращают advance warning в условие допустимости последующей претензии, чего в базовом FIDIC нет.',
      ],
      en: [
        'An advance warning is filed instead of a Notice of Claim — meanwhile the 20.2 clock keeps running.',
        'The warning is given verbally at a meeting with no minutes, leaving it almost worthless as evidence.',
        'Particular Conditions convert advance warning into a condition precedent to a later claim, which the base FIDIC does not do.',
      ],
      uz: [
        'Advance warning Notice of Claim oʻrniga topshirilgan — 20.2 boʻyicha muddatlar esa oʻtishda davom etadi.',
        'Ogohlantirish majlisda ogʻzaki, bayonnomasiz berilgan — dalil qiymati deyarli yoʻq.',
        'Particular Conditions advance warning ni keyingi daʼvoning maqbulligi sharti qiladi, bazaviy FIDIC da bunday emas.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Обязательно ли подавать advance warning и что будет, если не подать?',
          en: 'Is advance warning mandatory, and what follows from not giving it?',
          uz: 'Advance warning berish shartmi va bermaslikdan nima kelib chiqadi?',
        },
        a: {
          ru: 'В базовой редакции это обязанность, но её неисполнение само по себе не лишает права на претензию. Однако последствие есть: при определении по Sub-Clause 3.7 и в DAAB могут учесть, что сторона не дала другой стороне возможности смягчить последствия. Это влияет на размер того, что удастся отсудить, даже если право на claim формально сохранилось.',
          en: 'In the base edition it is an obligation, but failing to give it does not of itself bar a claim. There is a consequence, though: a determination under Sub-Clause 3.7 and a DAAB may take into account that the other party was denied the chance to mitigate. That affects the quantum recovered, even where the right to claim formally survives.',
          uz: 'Bazaviy tahrirda bu majburiyat, lekin uni bajarmaslik oʻzi daʼvo huquqidan mahrum qilmaydi. Lekin oqibat bor: Sub-Clause 3.7 boʻyicha qarorda va DAAB da tomon boshqa tomonga oqibatlarni yumshatish imkonini bermagani hisobga olinishi mumkin. Bu daʼvo huquqi rasman saqlangan boʻlsa ham, undirib olinadigan miqdorga taʼsir qiladi.',
        },
      },
      {
        q: {
          ru: 'Чем advance warning отличается от early warning в NEC?',
          en: 'How does advance warning differ from the NEC early warning?',
          uz: 'Advance warning NEC dagi early warning dan nimasi bilan farq qiladi?',
        },
        a: {
          ru: 'Идея общая — раннее оповещение о рисках, — но механика в NEC жёстче: там есть реестр рисков и регулярные совещания, а последствия несвоевременного оповещения могут напрямую урезать компенсацию. FIDIC 2017 взял принцип, но оставил его мягче и без формального реестра. Многие проекты добровольно достраивают недостающее, вводя risk register в качестве проектной процедуры.',
          en: 'The idea is shared — early notification of risk — but NEC’s mechanics are tighter: it has a risk register and regular meetings, and late notification can directly cut compensation. FIDIC 2017 adopted the principle but kept it softer and without a formal register. Many projects fill the gap voluntarily by running a risk register as a project procedure.',
          uz: 'Gʻoya umumiy — risklar haqida erta xabar berish — lekin NEC da mexanika qatʼiyroq: u yerda risklar reestri va muntazam majlislar bor, oʻz vaqtida xabar bermaslik oqibatlari esa kompensatsiyani bevosita qisqartirishi mumkin. FIDIC 2017 prinsipni oldi, lekin uni yumshoqroq va rasmiy reestrsiz qoldirdi. Koʻp loyihalar yetishmaganini ixtiyoriy ravishda risk register ni loyiha protsedurasi sifatida joriy etib toʻldiradi.',
        },
      },
    ],
  },

  'taking-over-10-1': {
    practice: {
      ru: 'Taking-Over Certificate переключает сразу несколько режимов: прекращается начисление неустойки за просрочку, риск сохранности объекта переходит к Заказчику, начинается период уведомления о дефектах и запускается возврат части удержаний. Именно поэтому вокруг даты приёмки идёт основная борьба. Типовой конфликт — заказчик фактически пользуется объектом, но сертификат не выдаёт, ссылаясь на незакрытые замечания. По FIDIC использование объекта заказчиком, как правило, само указывает на приёмку, и это аргумент, который стоит фиксировать документально в момент, когда эксплуатация началась.',
      en: 'The Taking-Over Certificate flips several regimes at once: delay damages stop accruing, care of the works passes to the Employer, the Defects Notification Period starts and part of the retention falls due. That is why the date of taking over is where the fight is. The classic conflict is an Employer using the works in fact while withholding the certificate on the basis of open snags. Under FIDIC, use of the works by the Employer generally points to taking over, and it is an argument worth documenting at the moment occupation begins.',
      uz: 'Taking-Over Certificate bir vaqtning oʻzida bir necha rejimni almashtiradi: kechikish uchun jarima hisoblanishi toʻxtaydi, obyekt saqlanishi riski Buyurtmachiga oʻtadi, nuqson haqida xabar berish davri boshlanadi va ushlab qolingan mablagʻning bir qismi qaytariladi. Shuning uchun qabul sanasi atrofida asosiy kurash boradi. Tipik mojaro — buyurtmachi obyektdan amalda foydalanadi, lekin yopilmagan eʼtirozlarga havola qilib sertifikat bermaydi. FIDIC boʻyicha buyurtmachining obyektdan foydalanishi odatda qabulni koʻrsatadi va bu ekspluatatsiya boshlangan paytda hujjatlashtirishga arziydigan dalil.',
    },
    pitfalls: {
      ru: [
        'Заказчик эксплуатирует объект без сертификата — фиксируйте факт использования актами, фото и датами.',
        'Snag list не разделён на препятствующие приёмке и непрепятствующие; мелкие замечания блокируют выдачу сертификата.',
        'Не состыкованы FIDIC-приёмка и государственная приёмка объекта — сертификат есть, а нормативно объект не закрыт.',
      ],
      en: [
        'The Employer occupies the works without a certificate — record the fact of use with acts, photographs and dates.',
        'The snag list is not split into items that prevent taking over and items that do not; minor defects then block the certificate.',
        'FIDIC taking over is not reconciled with statutory acceptance — the certificate exists but the asset is not closed out under local rules.',
      ],
      uz: [
        'Buyurtmachi obyektni sertifikatsiz ekspluatatsiya qiladi — foydalanish faktini dalolatnomalar, foto va sanalar bilan qayd eting.',
        'Snag list qabulga toʻsqinlik qiladigan va qilmaydigan eʼtirozlarga ajratilmagan; mayda nuqsonlar sertifikat berishni bloklaydi.',
        'FIDIC qabuli va obyektni davlat qabuli bogʻlanmagan — sertifikat bor, lekin obyekt normativ jihatdan yopilmagan.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Может ли Заказчик отказать в приёмке из-за мелких дефектов?',
          en: 'Can the Employer refuse taking over because of minor defects?',
          uz: 'Buyurtmachi mayda nuqsonlar sababli qabul qilishdan bosh tortishi mumkinmi?',
        },
        a: {
          ru: 'Как правило нет. Логика FIDIC в том, что объект принимается, если он завершён по существу и пригоден для использования по назначению, а оставшиеся мелкие работы и дефекты устраняются в период уведомления о дефектах. Чтобы этот аргумент работал, snag list должен быть заранее разделён на позиции, действительно препятствующие использованию, и все остальные.',
          en: 'Generally no. The FIDIC logic is that the works are taken over once substantially complete and fit for their intended use, with remaining minor work and defects cleared during the Defects Notification Period. For that argument to run, the snag list must be split in advance into items that genuinely prevent use and everything else.',
          uz: 'Odatda yoʻq. FIDIC mantiqi shundaki, obyekt mohiyatan yakunlangan va maqsadli foydalanishga yaroqli boʻlsa qabul qilinadi, qolgan mayda ishlar va nuqsonlar esa nuqson haqida xabar berish davrida bartaraf etiladi. Bu dalil ishlashi uchun snag list oldindan foydalanishga haqiqatan toʻsqinlik qiladigan pozitsiyalarga va qolganlariga ajratilishi kerak.',
        },
      },
      {
        q: {
          ru: 'Что происходит с рисками после выдачи сертификата?',
          en: 'What happens to risk once the certificate is issued?',
          uz: 'Sertifikat berilgandan keyin risklar bilan nima boʻladi?',
        },
        a: {
          ru: 'Ответственность за сохранность работ переходит к Заказчику, но это не снимает с Подрядчика обязанностей по устранению дефектов в течение DNP. Практическая тонкость — страхование: полисы, привязанные к периоду строительства, могут закончиться именно в этот момент, и нужно заранее проверить, чем покрывается период до выдачи Performance Certificate.',
          en: 'Care of the works passes to the Employer, but that does not release the Contractor from rectifying defects during the DNP. The practical subtlety is insurance: policies tied to the construction period may expire at exactly this point, so check in advance what covers the window up to issue of the Performance Certificate.',
          uz: 'Ishlarning saqlanishi uchun javobgarlik Buyurtmachiga oʻtadi, lekin bu Pudratchini DNP davomida nuqsonlarni bartaraf etish majburiyatidan ozod qilmaydi. Amaliy nozik jihat — sugʻurta: qurilish davriga bogʻlangan polislar aynan shu paytda tugashi mumkin, shuning uchun Performance Certificate berilgunga qadar boʻlgan davr nima bilan qoplanishini oldindan tekshirish kerak.',
        },
      },
    ],
  },

  'defects-period-11': {
    practice: {
      ru: 'Период уведомления о дефектах — это не гарантия в бытовом смысле, а срок, в течение которого Заказчик может уведомлять о дефектах, а Подрядчик обязан их устранять. Два практических узла. Первый — разграничение дефекта и нормального износа или неправильной эксплуатации: без фиксации режима работы объекта спор становится неразрешимым. Второй — продление DNP: по FIDIC период по конкретному элементу может продлеваться, если элемент не мог использоваться из-за дефекта, и это иногда становится для подрядчика неожиданностью в конце проекта.',
      en: 'The Defects Notification Period is not a warranty in the everyday sense but a window in which the Employer may notify defects and the Contractor must rectify them. Two practical knots. First, telling a defect apart from fair wear or misuse: with no record of how the asset was operated, the argument becomes unresolvable. Second, extension of the DNP: under FIDIC the period for a particular item can be extended where that item could not be used because of the defect, which sometimes surprises contractors at the very end of a project.',
      uz: 'Nuqson haqida xabar berish davri — maishiy maʼnodagi kafolat emas, Buyurtmachi nuqsonlar haqida xabar bera oladigan va Pudratchi ularni bartaraf etishi shart boʻlgan muddat. Ikki amaliy tugun. Birinchisi — nuqsonni normal eskirish yoki notoʻgʻri ekspluatatsiyadan ajratish: obyekt ish rejimi qayd etilmasa, nizo hal qilib boʻlmaydigan boʻladi. Ikkinchisi — DNP ni uzaytirish: FIDIC boʻyicha muayyan element boʻyicha davr, agar element nuqson tufayli foydalanib boʻlmagan boʻlsa, uzaytirilishi mumkin va bu baʼzan pudratchi uchun loyiha oxirida kutilmagan boʻladi.',
    },
    pitfalls: {
      ru: [
        'DNP продлевается по каждому переустановленному элементу, и общий срок ползёт далеко за плановую дату закрытия.',
        'Нет журнала эксплуатации: доказать, что поломка вызвана нарушением режима, нечем.',
        'Particular Conditions расширяют DNP до срока, сопоставимого с гарантией на скрытые дефекты по местному праву, — двойное покрытие за счёт подрядчика.',
      ],
      en: [
        'The DNP is extended for each replaced item and the overall period drifts well past the planned close-out date.',
        'There is no operating log, so there is nothing to show a failure was caused by misuse.',
        'Particular Conditions stretch the DNP to something comparable with the local statutory latent-defects period — double cover at the Contractor’s expense.',
      ],
      uz: [
        'DNP har bir qayta oʻrnatilgan element boʻyicha uzaytiriladi va umumiy muddat rejalashtirilgan yopilish sanasidan ancha uzoqlashadi.',
        'Ekspluatatsiya jurnali yoʻq: buzilish rejim buzilishidan kelib chiqqanini isbotlash uchun hech narsa yoʻq.',
        'Particular Conditions DNP ni mahalliy huquq boʻyicha yashirin nuqsonlar kafolatiga solishtirma muddatgacha kengaytiradi — pudratchi hisobidan ikki karra qoplash.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Кто платит за устранение, если причина дефекта спорна?',
          en: 'Who pays for rectification when the cause of the defect is disputed?',
          uz: 'Agar nuqson sababi bahsli boʻlsa, bartaraf etish uchun kim toʻlaydi?',
        },
        a: {
          ru: 'Если дефект возник по причине, за которую отвечает Подрядчик, работы выполняются за его счёт. Если причина лежит на стороне Заказчика — например, эксплуатация с нарушением инструкций, — устранение оплачивается как дополнительная работа. Спорные случаи разрешаются через определение по Sub-Clause 3.7, и исход обычно определяют данные мониторинга и эксплуатационные журналы, а не переписка.',
          en: 'Where the defect arises from a cause the Contractor is responsible for, rectification is at its own cost. Where the cause sits with the Employer — operation outside the manuals, for instance — the work is paid for as additional work. Contested cases go to a determination under Sub-Clause 3.7, and the outcome usually turns on monitoring data and operating logs rather than correspondence.',
          uz: 'Agar nuqson Pudratchi javobgar boʻlgan sabab tufayli yuzaga kelgan boʻlsa, ishlar uning hisobidan bajariladi. Agar sabab Buyurtmachi tomonida boʻlsa — masalan, koʻrsatmalarni buzgan holda ekspluatatsiya — bartaraf etish qoʻshimcha ish sifatida toʻlanadi. Bahsli holatlar Sub-Clause 3.7 boʻyicha qaror orqali hal qilinadi va natijani odatda yozishmalar emas, monitoring maʼlumotlari va ekspluatatsiya jurnallari belgilaydi.',
        },
      },
      {
        q: {
          ru: 'Чем Performance Certificate отличается от Taking-Over Certificate?',
          en: 'How does the Performance Certificate differ from the Taking-Over Certificate?',
          uz: 'Performance Certificate Taking-Over Certificate dan nimasi bilan farq qiladi?',
        },
        a: {
          ru: 'Taking-Over фиксирует приёмку объекта и открывает период дефектов. Performance Certificate выдаётся по завершении DNP и означает, что обязательства Подрядчика по контракту исполнены; именно он, а не приёмка, обычно служит триггером для возврата гарантии исполнения и остатка удержаний. Путаница между этими двумя документами — частая причина преждевременных требований о возврате обеспечения.',
          en: 'Taking over records acceptance of the works and starts the defects period. The Performance Certificate is issued at the end of the DNP and signifies that the Contractor’s obligations are discharged; it, rather than taking over, is normally the trigger for release of the performance security and the retention balance. Confusing the two is a common cause of premature demands for release of security.',
          uz: 'Taking-Over obyekt qabulini qayd etadi va nuqson davrini ochadi. Performance Certificate DNP tugagach beriladi va Pudratchining shartnoma boʻyicha majburiyatlari bajarilganini bildiradi; aynan u, qabul emas, odatda ijro kafolati va ushlab qolingan qoldiqni qaytarish uchun trigger boʻlib xizmat qiladi. Bu ikki hujjatni chalkashtirish taʼminotni qaytarish boʻyicha erta talablarning tez-tez uchraydigan sababi.',
        },
      },
    ],
  },

  'termination-by-employer-15': {
    practice: {
      ru: 'Расторжение по Clause 15 — процедура, а не решение. Порядок обычно такой: уведомление об устранении нарушения с разумным сроком, затем, при неустранении, уведомление о расторжении, затем оценка выполненного и расчёты. Нарушение последовательности — самая частая причина, по которой расторжение впоследствии признают неправомерным, и заказчик из позиции взыскателя переходит в позицию ответчика. Отдельно стоит расторжение по усмотрению Заказчика: оно возможно, но влечёт компенсацию подрядчику и не может использоваться, чтобы просто передать работы другому исполнителю на лучших условиях.',
      en: 'Termination under Clause 15 is a procedure, not a decision. The sequence is normally a notice to correct with a reasonable period, then, if the default persists, a notice of termination, then valuation and accounting. Breaking that sequence is the most common reason a termination is later held wrongful, flipping the Employer from claimant to respondent. Termination for convenience sits separately: it is available, but it carries compensation to the Contractor and cannot be used simply to hand the works to someone else on better terms.',
      uz: 'Clause 15 boʻyicha bekor qilish — qaror emas, protsedura. Tartib odatda shunday: oqilona muddat bilan buzilishni bartaraf etish haqida bildirishnoma, keyin bartaraf etilmasa, bekor qilish haqida bildirishnoma, keyin bajarilganini baholash va hisob-kitob. Ketma-ketlikni buzish — bekor qilish keyinchalik nohaq deb topilishining eng koʻp uchraydigan sababi va buyurtmachi undiruvchi pozitsiyasidan javobgar pozitsiyasiga oʻtadi. Alohida — Buyurtmachi ixtiyoriga koʻra bekor qilish: bu mumkin, lekin pudratchiga kompensatsiya keltiradi va ishlarni shunchaki boshqa ijrochiga yaxshiroq shartlarda topshirish uchun ishlatib boʻlmaydi.',
    },
    pitfalls: {
      ru: [
        'Уведомление о расторжении направлено без предшествующего notice to correct или до истечения предоставленного срока.',
        'Не зафиксировано состояние объекта, объёмы и материалы на дату расторжения — расчёты потом строятся на догадках.',
        'Расторжение по усмотрению замаскировано под расторжение по вине, чтобы избежать компенсации, — обычно распознаётся в арбитраже.',
      ],
      en: [
        'A notice of termination goes out without a prior notice to correct, or before the period given has expired.',
        'The state of the works, quantities and materials at the termination date are not recorded — the accounting is then guesswork.',
        'Termination for convenience is dressed up as termination for default to avoid compensation, which arbitration usually sees through.',
      ],
      uz: [
        'Bekor qilish haqida bildirishnoma oldingi notice to correct siz yoki berilgan muddat tugashidan oldin yuborilgan.',
        'Bekor qilish sanasida obyekt holati, hajmlar va materiallar qayd etilmagan — hisob-kitoblar keyin taxminlarga quriladi.',
        'Kompensatsiyadan qochish uchun ixtiyoriy bekor qilish aybga koʻra bekor qilish sifatida niqoblangan — arbitrajda odatda aniqlanadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Какие основания дают Заказчику право расторгнуть контракт?',
          en: 'What grounds entitle the Employer to terminate?',
          uz: 'Qanday asoslar Buyurtmachiga shartnomani bekor qilish huquqini beradi?',
        },
        a: {
          ru: 'Типичный набор: неустранение существенного нарушения после уведомления, отказ или неспособность продолжать работы, непредоставление или неподдержание гарантии исполнения, а также несостоятельность подрядчика. Отдельные основания связаны с коррупционными и мошенническими практиками — в проектах МФО эти положения обычно расширены требованиями банка.',
          en: 'The usual set: failure to remedy a substantial default after notice, abandonment or demonstrated inability to proceed, failure to provide or maintain the performance security, and insolvency. Separate grounds address corrupt and fraudulent practice — on MDB projects those provisions are normally expanded by the lender’s requirements.',
          uz: 'Odatiy toʻplam: bildirishnomadan keyin jiddiy buzilishni bartaraf etmaslik, ishlarni davom ettirishdan bosh tortish yoki qobiliyatsizlik, ijro kafolatini bermaslik yoki saqlamaslik, shuningdek pudratchining toʻlovga qobiliyatsizligi. Alohida asoslar korrupsiya va firibgarlik amaliyotlari bilan bogʻliq — XTB loyihalarida bu qoidalar odatda bank talablari bilan kengaytiriladi.',
        },
      },
      {
        q: {
          ru: 'Что происходит с гарантией исполнения при расторжении?',
          en: 'What happens to the performance security on termination?',
          uz: 'Bekor qilishda ijro kafolati bilan nima boʻladi?',
        },
        a: {
          ru: 'При правомерном расторжении по вине Подрядчика Заказчик обычно вправе обратиться к гарантии в объёме доказанных потерь. Но если расторжение впоследствии признают неправомерным, полученные по гарантии суммы подлежат возврату вместе с сопутствующими убытками. Именно поэтому востребование гарантии сразу после расторжения — шаг, который стоит делать только при уверенности в соблюдении всей процедуры.',
          en: 'On a valid termination for default, the Employer is normally entitled to call the security to the extent of its proven losses. If the termination is later held wrongful, sums drawn must be repaid together with consequential losses. That is why calling the security immediately after termination is a step to take only when the whole procedure is known to have been followed.',
          uz: 'Pudratchi aybi bilan qonuniy bekor qilishda Buyurtmachi odatda isbotlangan yoʻqotishlar hajmida kafolatga murojaat qilishga haqli. Lekin bekor qilish keyinchalik nohaq deb topilsa, kafolat boʻyicha olingan summalar tegishli zararlar bilan birga qaytarilishi kerak. Shuning uchun bekor qilishdan darhol keyin kafolatni talab qilish — butun protsedura bajarilganiga ishonch boʻlgandagina qilinadigan qadam.',
        },
      },
    ],
  },

  'exceptional-events-18': {
    practice: {
      ru: 'Ссылка на исключительное событие почти никогда не проходит «по факту события». Нужно показать цепочку: событие соответствует признакам Clause 18, оно находилось вне контроля стороны, его нельзя было предотвратить разумными мерами, и именно оно, а не собственная неготовность, помешало исполнению. Практически чаще всего спор упирается в третий элемент — что сторона сделала для смягчения. Ещё одна деталь: Clause 18 обычно даёт время и ограниченные затраты, но не полный набор убытков, и это разочаровывает тех, кто рассчитывает на него как на универсальную защиту.',
      en: 'Invoking an exceptional event almost never succeeds on the bare fact of the event. The chain has to be shown: the event meets the Clause 18 characteristics, it was beyond the party’s control, it could not be avoided by reasonable measures, and it — not the party’s own lack of readiness — prevented performance. In practice the argument usually turns on the third element, what the party did to mitigate. One more detail: Clause 18 typically yields time and limited cost, not a full damages package, which disappoints those treating it as a universal shield.',
      uz: 'Istisno hodisaga havola deyarli hech qachon «hodisa fakti boʻyicha» oʻtmaydi. Zanjirni koʻrsatish kerak: hodisa Clause 18 belgilariga mos, u tomon nazoratidan tashqarida boʻlgan, uni oqilona choralar bilan oldini olib boʻlmagan va aynan u, oʻz tayyor emasligi emas, ijroga toʻsqinlik qilgan. Amalda bahs koʻpincha uchinchi elementga — tomon yumshatish uchun nima qilganiga tayanadi. Yana bir tafsilot: Clause 18 odatda vaqt va cheklangan xarajat beradi, toʻliq zarar toʻplamini emas, va bu unga universal himoya sifatida umid qilganlarni hafsalasini pir qiladi.',
    },
    pitfalls: {
      ru: [
        'Уведомление подано с опозданием: у Clause 18 свои сроки, и они не совпадают с общим циклом 20.2.',
        'Не задокументированы меры по смягчению — именно на них разваливается большинство ссылок на форс-мажор.',
        'Particular Conditions сужают перечень событий или требуют, чтобы событие было прямо поименовано в списке.',
      ],
      en: [
        'Notice is served late: Clause 18 has its own periods and they do not coincide with the general 20.2 cycle.',
        'Mitigation measures are not documented — this is where most force-majeure arguments collapse.',
        'Particular Conditions narrow the list of qualifying events or require the event to be expressly named in it.',
      ],
      uz: [
        'Bildirishnoma kech topshirilgan: Clause 18 ning oʻz muddatlari bor va ular umumiy 20.2 sikli bilan mos kelmaydi.',
        'Yumshatish choralari hujjatlashtirilmagan — fors-major havolalarining koʻpchiligi aynan shunda parchalanadi.',
        'Particular Conditions hodisalar roʻyxatini toraytiradi yoki hodisa roʻyxatda bevosita nomlangan boʻlishini talab qiladi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Считается ли рост цен или дефицит материалов исключительным событием?',
          en: 'Do price rises or material shortages count as an exceptional event?',
          uz: 'Narxlarning oshishi yoki materiallar tanqisligi istisno hodisa hisoblanadimi?',
        },
        a: {
          ru: 'Сами по себе, как правило, нет: коммерческий риск и рыночные колебания — это то, что подрядчик принимает по умолчанию. Механизм для этого другой — корректировки по Clause 13, включая изменения законодательства и, если предусмотрено, ценовые формулы. Исключительным событием может быть первопричина (например, закрытие границ решением властей), но связь с невозможностью исполнения придётся доказывать отдельно.',
          en: 'On their own, generally no: commercial risk and market movement are what a contractor takes by default. The mechanism for that is different — adjustments under Clause 13, including changes in law and, where provided, price formulae. The underlying cause may qualify (a border closure by state decision, say), but the link to the inability to perform must be proved separately.',
          uz: 'Oʻz-oʻzidan odatda yoʻq: tijorat riski va bozor tebranishlari — pudratchi sukut boʻyicha qabul qiladigan narsa. Buning uchun mexanizm boshqa — Clause 13 boʻyicha tuzatishlar, shu jumladan qonunchilik oʻzgarishlari va nazarda tutilgan boʻlsa, narx formulalari. Istisno hodisa asosiy sabab boʻlishi mumkin (masalan, hokimiyat qarori bilan chegaralarni yopish), lekin ijro imkonsizligi bilan bogʻliqlikni alohida isbotlash kerak.',
        },
      },
      {
        q: {
          ru: 'Что изменилось по сравнению с Force Majeure в редакции 1999?',
          en: 'What changed compared with Force Majeure in the 1999 edition?',
          uz: '1999 tahriridagi Force Majeure ga nisbatan nima oʻzgardi?',
        },
        a: {
          ru: 'Главное изменение — терминологическое и понятийное: «Force Majeure» заменено на «Exceptional Events», чтобы уйти от привязки к национальным доктринам форс-мажора, которые в разных юрисдикциях означают разное. Структура при этом узнаваема: признаки события, уведомление, последствия, длительное препятствие и право на освобождение. Для практики это означает, что толковать пункт нужно по его тексту, а не по местному пониманию форс-мажора.',
          en: 'The main change is terminological and conceptual: Force Majeure became Exceptional Events, deliberately moving away from national force-majeure doctrines that mean different things in different jurisdictions. The structure remains recognisable: characteristics of the event, notice, consequences, prolonged prevention and release. In practice this means reading the clause on its own words rather than through a local understanding of force majeure.',
          uz: 'Asosiy oʻzgarish terminologik va tushunchaviy: «Force Majeure» «Exceptional Events» ga almashtirildi, bu turli yurisdiksiyalarda turlicha maʼno anglatadigan milliy fors-major doktrinalariga bogʻlanishdan uzoqlashish uchun. Tuzilma esa tanish: hodisa belgilari, bildirishnoma, oqibatlar, uzoq davom etgan toʻsiq va ozod qilish huquqi. Amaliyot uchun bu bandni mahalliy fors-major tushunchasi boʻyicha emas, oʻz matni boʻyicha talqin qilish kerakligini anglatadi.',
        },
      },
    ],
  },

  'notices-1-3': {
    practice: {
      ru: 'Sub-Clause 1.3 выглядит технической формальностью ровно до первого спора, где выясняется, что ключевое уведомление отправлено на почту руководителю проекта, а контракт требовал доставки по конкретному адресу с подтверждением. Издания 2017 ужесточили требования: уведомление должно быть обозначено как уведомление и содержать ссылку на пункт, по которому подаётся. Практический вывод простой — в начале проекта нужно один раз зафиксировать адреса, каналы, формы и вести единый исходящий реестр. Это дешевле любой реконструкции переписки задним числом.',
      en: 'Sub-Clause 1.3 looks like a technicality right up to the first dispute, where it emerges that the critical notice went to the project manager’s inbox while the contract required delivery to a specific address with acknowledgement. The 2017 editions tightened this: a notice must be identified as a notice and state the clause it is given under. The practical conclusion is simple — fix addresses, channels and forms once at project start and keep a single outgoing register. That is cheaper than reconstructing correspondence after the fact.',
      uz: 'Sub-Clause 1.3 birinchi nizogacha texnik rasmiyatchilikdek koʻrinadi, oʻsha yerda esa asosiy bildirishnoma loyiha rahbarining pochtasiga yuborilgani, shartnoma esa tasdiq bilan aniq manzilga yetkazishni talab qilgani maʼlum boʻladi. 2017 nashrlari talablarni qatʼiylashtirdi: bildirishnoma bildirishnoma sifatida belgilanishi va u qaysi band boʻyicha berilayotganiga havola qilishi kerak. Amaliy xulosa oddiy — loyiha boshida manzillar, kanallar, shakllarni bir marta qayd etish va yagona chiquvchi reestr yuritish kerak. Bu yozishmalarni keyinchalik tiklashdan arzonroq.',
    },
    pitfalls: {
      ru: [
        'Уведомление отправлено по электронной почте, когда контракт этого канала не предусматривает или требует дополнительного подтверждения.',
        'В письме нет пометки «Notice» и ссылки на пункт — получатель вправе не считать его уведомлением.',
        'Смена адресата или представителя не оформлена письменно, и уведомления уходят «в никуда».',
      ],
      en: [
        'A notice is sent by email where the contract does not provide for that channel or requires additional confirmation.',
        'The letter carries no notice label and no clause reference — the recipient is entitled not to treat it as a notice.',
        'A change of addressee or representative is never recorded in writing, and notices go nowhere.',
      ],
      uz: [
        'Bildirishnoma elektron pochta orqali yuborilgan, shartnoma esa bu kanalni nazarda tutmaydi yoki qoʻshimcha tasdiq talab qiladi.',
        'Xatda «Notice» belgisi va bandga havola yoʻq — qabul qiluvchi uni bildirishnoma deb hisoblamasligi mumkin.',
        'Manzil yoki vakil oʻzgarishi yozma rasmiylashtirilmagan va bildirishnomalar «hech qayerga» ketadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Действительно ли уведомление по электронной почте?',
          en: 'Is an emailed notice valid?',
          uz: 'Elektron pochta orqali bildirishnoma haqiqiymi?',
        },
        a: {
          ru: 'Зависит от того, что записано в контракте и в Contract Data. Если электронная почта прямо указана как допустимый канал с конкретными адресами — да. Если нет, письмо может быть признано не имеющим силы уведомления, даже если адресат его фактически прочитал. Безопасная практика на спорных проектах — дублировать критичные уведомления бумажным экземпляром с подтверждением вручения.',
          en: 'It depends on what the contract and Contract Data say. If email is expressly listed as a permitted channel with specific addresses, yes. If not, the message may carry no force as a notice even where the addressee in fact read it. On contentious projects the safe practice is to duplicate critical notices with a hard copy against acknowledgement of delivery.',
          uz: 'Shartnomada va Contract Data da nima yozilganiga bogʻliq. Agar elektron pochta aniq manzillar bilan maqbul kanal sifatida bevosita koʻrsatilgan boʻlsa — ha. Aks holda xat qabul qiluvchi uni amalda oʻqigan boʻlsa ham, bildirishnoma kuchiga ega emas deb topilishi mumkin. Bahsli loyihalarda xavfsiz amaliyot — muhim bildirishnomalarni topshirish tasdigʻi bilan qogʻoz nusxada takrorlash.',
        },
      },
      {
        q: {
          ru: 'Нужно ли писать «Notice under Sub-Clause…» в заголовке письма?',
          en: 'Does the letter need a "Notice under Sub-Clause…" heading?',
          uz: 'Xat sarlavhasida «Notice under Sub-Clause…» yozish kerakmi?',
        },
        a: {
          ru: 'По изданиям 2017 — да, это прямое требование: уведомление идентифицируется как уведомление и указывает пункт, по которому подаётся. Это не бюрократия, а защита обеих сторон: получатель понимает, что запущен процессуальный срок, а отправитель получает документ, который невозможно потом переквалифицировать в «обычную переписку».',
          en: 'Under the 2017 editions, yes — it is an express requirement that a notice be identified as such and state the clause it is given under. This is not bureaucracy but protection for both sides: the recipient understands a contractual clock has started, and the sender holds a document that cannot later be recharacterised as ordinary correspondence.',
          uz: '2017 nashrlari boʻyicha — ha, bu bevosita talab: bildirishnoma bildirishnoma sifatida aniqlanadi va u qaysi band boʻyicha berilayotganini koʻrsatadi. Bu byurokratiya emas, ikkala tomon himoyasi: qabul qiluvchi protsessual muddat boshlanganini tushunadi, yuboruvchi esa keyinchalik «oddiy yozishma» ga qayta tasniflab boʻlmaydigan hujjatga ega boʻladi.',
        },
      },
    ],
  },

  'employer-financing-2-4': {
    practice: {
      ru: 'Sub-Clause 2.4 — недооценённый инструмент подрядчика. Он даёт право запросить разумное подтверждение того, что у Заказчика есть финансирование для оплаты работ, и обязывает уведомить о существенных изменениях в финансовых механизмах. На проектах, где платежи начали задерживаться, это первый формальный шаг, который переводит разговор из плоскости обещаний в плоскость документов. При неполучении подтверждения открывается путь к приостановке по Clause 16. Использовать инструмент нужно рано: запрос после четырёх месяцев неоплаты выглядит хуже, чем при первых признаках.',
      en: 'Sub-Clause 2.4 is an underused contractor tool. It gives a right to request reasonable evidence that the Employer has the financing to pay, and obliges the Employer to notify material changes to its financial arrangements. On a project where payments have started slipping, this is the first formal step that moves the conversation from promises to documents. If the evidence does not arrive, it opens the route to suspension under Clause 16. Use it early: a request after four months of non-payment reads far worse than one at the first sign.',
      uz: 'Sub-Clause 2.4 — pudratchining yetarlicha baholanmagan vositasi. U Buyurtmachida ishlarni toʻlash uchun moliyalashtirish borligi haqida oqilona tasdiq soʻrash huquqini beradi va moliyaviy mexanizmlardagi jiddiy oʻzgarishlar haqida xabar berishga majbur qiladi. Toʻlovlar kechika boshlagan loyihalarda bu suhbatni vaʼdalar tekisligidan hujjatlar tekisligiga oʻtkazadigan birinchi rasmiy qadam. Tasdiq olinmasa, Clause 16 boʻyicha toʻxtatishga yoʻl ochiladi. Vositani erta ishlatish kerak: toʻrt oy toʻlanmagandan keyingi soʻrov dastlabki belgilardagidan yomonroq koʻrinadi.',
    },
    pitfalls: {
      ru: [
        'Particular Conditions полностью удаляют пункт — проверьте это в тендерном пакете, а не после первой задержки.',
        'Запрос сформулирован как жалоба, а не как формальный запрос по 2.4 со ссылкой на пункт.',
        'Полученный ответ не оценён: письмо «финансирование предусмотрено бюджетом» — это не всегда разумное подтверждение.',
      ],
      en: [
        'Particular Conditions delete the clause entirely — check this in the tender package, not after the first delay.',
        'The request is framed as a complaint rather than a formal request under 2.4 citing the clause.',
        'The response is not assessed: a letter saying financing is provided for in the budget is not always reasonable evidence.',
      ],
      uz: [
        'Particular Conditions bandni butunlay olib tashlaydi — buni birinchi kechikishdan keyin emas, tender paketida tekshiring.',
        'Soʻrov 2.4 boʻyicha bandga havola qilingan rasmiy soʻrov emas, shikoyat sifatida shakllantirilgan.',
        'Olingan javob baholanmagan: «moliyalashtirish byudjetda nazarda tutilgan» degan xat har doim ham oqilona tasdiq emas.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что считается разумным подтверждением финансирования?',
          en: 'What counts as reasonable evidence of financing?',
          uz: 'Moliyalashtirishning oqilona tasdigʻi nima hisoblanadi?',
        },
        a: {
          ru: 'Документ, из которого видно наличие источника средств на оставшуюся стоимость работ: кредитное соглашение с банком развития, подтверждение бюджетного ассигнования, гарантия материнской компании. Общая декларация о намерении платить таким подтверждением обычно не признаётся. В проектах МФО задача упрощается: наличие кредитного соглашения и графика выборки, как правило, доступно и проверяемо.',
          en: 'A document showing a source of funds for the remaining value of the works: a loan agreement with a development bank, confirmation of a budget appropriation, a parent company guarantee. A general declaration of intent to pay is normally not accepted as evidence. On MDB projects the task is easier: the loan agreement and disbursement schedule are usually available and verifiable.',
          uz: 'Ishlarning qolgan qiymati uchun mablagʻ manbai borligi koʻrinadigan hujjat: taraqqiyot banki bilan kredit bitimi, byudjet ajratmasi tasdigʻi, bosh kompaniya kafolati. Toʻlash niyati haqidagi umumiy deklaratsiya odatda bunday tasdiq deb tan olinmaydi. XTB loyihalarida vazifa osonlashadi: kredit bitimi va tanlab olish jadvali odatda mavjud va tekshiriladigan.',
        },
      },
      {
        q: {
          ru: 'Что делать, если Заказчик проигнорировал запрос по 2.4?',
          en: 'What if the Employer ignores a 2.4 request?',
          uz: 'Agar Buyurtmachi 2.4 boʻyicha soʻrovni eʼtiborsiz qoldirsa, nima qilish kerak?',
        },
        a: {
          ru: 'Непредоставление подтверждения — самостоятельное основание, которое в связке с Clause 16 может дать право приостановить работы, а при длительном сохранении ситуации — расторгнуть контракт. Порядок при этом строго процедурный: уведомление, выдержка срока, затем действие. Пропуск шагов превращает правомерную приостановку в собственное нарушение подрядчика.',
          en: 'Failure to provide the evidence is a standalone ground which, combined with Clause 16, can support suspension and — if the position persists — termination. The sequence is strictly procedural: notice, wait out the period, then act. Skipping steps turns a justified suspension into the Contractor’s own breach.',
          uz: 'Tasdiq bermaslik — mustaqil asos boʻlib, Clause 16 bilan birga ishlarni toʻxtatish, holat uzoq davom etsa esa shartnomani bekor qilish huquqini berishi mumkin. Tartib qatʼiy protsessual: bildirishnoma, muddatni kutish, keyin harakat. Qadamlarni oʻtkazib yuborish qonuniy toʻxtatishni pudratchining oʻz buzilishiga aylantiradi.',
        },
      },
    ],
  },

  'contractor-design-5': {
    practice: {
      ru: 'В Yellow и Silver Book подрядчик отвечает не за соответствие чертежам, а за результат — объект должен быть пригоден для цели, определённой в Employer\'s Requirements. Это принципиально более тяжёлое обязательство, и оно плохо страхуется: стандартные полисы профессиональной ответственности часто исключают fitness for purpose. Второй практический узел — качество Employer\'s Requirements. Если требования противоречивы или неполны, подрядчик оказывается в положении, когда он отвечает за результат по документу, который сам этот результат внятно не описывает.',
      en: 'Under the Yellow and Silver Books the Contractor is answerable not for conformity to drawings but for an outcome — the works must be fit for the purpose defined in the Employer’s Requirements. That is a materially heavier obligation and it insures badly: standard professional indemnity policies frequently exclude fitness for purpose. The second practical knot is the quality of the Employer’s Requirements. Where they are contradictory or incomplete, the Contractor ends up answerable for an outcome under a document that does not clearly describe that outcome.',
      uz: 'Yellow va Silver Book da pudratchi chizmalarga muvofiqlik uchun emas, natija uchun javob beradi — obyekt Employer\'s Requirements da belgilangan maqsadga yaroqli boʻlishi kerak. Bu tubdan ogʻirroq majburiyat va u yomon sugʻurtalanadi: standart kasbiy javobgarlik polislari koʻpincha fitness for purpose ni istisno qiladi. Ikkinchi amaliy tugun — Employer\'s Requirements sifati. Agar talablar ziddiyatli yoki toʻliq boʻlmasa, pudratchi shu natijani oʻzi aniq tasvirlamagan hujjat boʻyicha natija uchun javob beradigan holatga tushadi.',
    },
    pitfalls: {
      ru: [
        'Fitness for purpose не покрыт страхованием профответственности — проверьте полис до подписания, а не после дефекта.',
        'Employer\'s Requirements содержат и функциональные требования, и предписывающие решения: ответственность за результат размывается.',
        'Срок на проверку требований по контракту истёк, а противоречия не заявлены — риск переходит к подрядчику окончательно.',
      ],
      en: [
        'Fitness for purpose is not covered by the professional indemnity policy — check the cover before signing, not after a defect.',
        'The Employer’s Requirements mix functional requirements with prescriptive solutions, blurring responsibility for the outcome.',
        'The contractual period for scrutinising the requirements expires with no discrepancies raised, and the risk transfers for good.',
      ],
      uz: [
        'Fitness for purpose kasbiy javobgarlik sugʻurtasi bilan qoplanmagan — polisni nuqsondan keyin emas, imzolashdan oldin tekshiring.',
        'Employer\'s Requirements da ham funksional talablar, ham koʻrsatma yechimlar bor: natija uchun javobgarlik xiralashadi.',
        'Shartnoma boʻyicha talablarni tekshirish muddati tugagan, ziddiyatlar esa bildirilmagan — risk pudratchiga butunlay oʻtadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Чем fitness for purpose отличается от обычной профессиональной осмотрительности?',
          en: 'How does fitness for purpose differ from reasonable skill and care?',
          uz: 'Fitness for purpose oddiy kasbiy ehtiyotkorlikdan nimasi bilan farq qiladi?',
        },
        a: {
          ru: 'Reasonable skill and care — обязательство приложить усилия того уровня, который ожидается от компетентного профессионала. Fitness for purpose — обязательство достичь результата: если объект не выполняет заданную функцию, ответственность наступает даже при безупречном процессе проектирования. Разница критична для страхования и для оценки риска в цене оферты, и её нужно проверять в тексте, а не предполагать по типу книги.',
          en: 'Reasonable skill and care is an obligation to apply the standard expected of a competent professional. Fitness for purpose is an obligation to achieve a result: if the works do not perform the specified function, liability follows even where the design process was faultless. The distinction matters for insurance and for pricing risk into a bid, and it should be verified in the text rather than assumed from the book type.',
          uz: 'Reasonable skill and care — malakali mutaxassisdan kutiladigan darajada saʼy-harakat qilish majburiyati. Fitness for purpose — natijaga erishish majburiyati: agar obyekt belgilangan funksiyani bajarmasa, loyihalash jarayoni benuqson boʻlsa ham javobgarlik yuzaga keladi. Farq sugʻurta va oferta narxida riskni baholash uchun juda muhim, uni kitob turi boʻyicha taxmin qilmasdan matnda tekshirish kerak.',
        },
      },
      {
        q: {
          ru: 'Кто отвечает за ошибки в Employer\'s Requirements?',
          en: 'Who is responsible for errors in the Employer’s Requirements?',
          uz: 'Employer\'s Requirements dagi xatolar uchun kim javob beradi?',
        },
        a: {
          ru: 'По базовой конструкции Заказчик отвечает за определённые категории данных и требований, но контракт обычно устанавливает срок, в течение которого Подрядчик должен изучить документ и заявить о выявленных противоречиях. После истечения этого срока распределение риска смещается. Поэтому проверка Employer\'s Requirements на непротиворечивость — работа первых недель контракта, а не задача проектировщика на стадии рабочей документации.',
          en: 'Under the base structure the Employer is responsible for defined categories of data and requirements, but the contract normally sets a period within which the Contractor must scrutinise the document and give notice of discrepancies found. Once that period passes, the risk allocation shifts. Checking the Employer’s Requirements for internal consistency is therefore work for the first weeks of the contract, not a designer’s task at detailed-design stage.',
          uz: 'Bazaviy konstruksiyada Buyurtmachi maʼlumot va talablarning belgilangan toifalari uchun javob beradi, lekin shartnoma odatda Pudratchi hujjatni oʻrganib, aniqlangan ziddiyatlar haqida xabar berishi kerak boʻlgan muddatni belgilaydi. Bu muddat oʻtgach, risk taqsimoti siljiydi. Shuning uchun Employer\'s Requirements ni ziddiyatsizlikka tekshirish — ishchi hujjatlar bosqichidagi loyihachi vazifasi emas, shartnomaning dastlabki haftalari ishi.',
        },
      },
    ],
  },

  'programme-8-3': {
    practice: {
      ru: 'Программа — не отчётный документ, а главный инструмент доказывания в claims. Если она не соответствует требованиям контракта по составу, логике и уровню детализации, Инженер вправе её не принять, и подрядчик остаётся без базы для анализа задержек. Типовая ошибка — подать программу один раз в начале и больше не обновлять: спустя год фактическая последовательность работ не имеет ничего общего с baseline, и любой анализ становится уязвим. Практический минимум — принятый baseline, регулярные обновления в согласованном формате и сохранение всех версий с датами.',
      en: 'The programme is not a reporting document but the primary evidential tool in claims. If it does not meet the contract requirements on content, logic and level of detail, the Engineer may decline to accept it and the Contractor is left with no baseline for delay analysis. The classic mistake is submitting once at the start and never updating: a year on, the actual sequence bears no relation to the baseline and any analysis becomes vulnerable. The practical minimum is an accepted baseline, regular updates in the agreed format, and every version retained with its date.',
      uz: 'Programme — hisobot hujjati emas, claims da isbotlashning asosiy vositasi. Agar u tarkib, mantiq va tafsilot darajasi boʻyicha shartnoma talablariga mos kelmasa, Muhandis uni qabul qilmasligi mumkin va pudratchi kechikishlarni tahlil qilish uchun bazasiz qoladi. Tipik xato — programme ni boshida bir marta topshirib, keyin yangilamaslik: bir yildan keyin ishlarning haqiqiy ketma-ketligi baseline bilan hech qanday aloqasi qolmaydi va har qanday tahlil zaif boʻladi. Amaliy minimum — qabul qilingan baseline, kelishilgan formatda muntazam yangilanishlar va barcha versiyalarni sanalari bilan saqlash.',
    },
    pitfalls: {
      ru: [
        'Программа подана без логических связей и ресурсов — формально документ есть, для анализа задержки он бесполезен.',
        'Обновления не сохраняются: восстановить состояние на дату события через год невозможно.',
        'Particular Conditions требуют одобрения программы, а не просто отсутствия возражений, — без одобрения claims повисают.',
      ],
      en: [
        'The programme is submitted with no logic links and no resources — formally a document exists, but it is useless for delay analysis.',
        'Updates are not archived: reconstructing the position as at the date of an event a year later becomes impossible.',
        'Particular Conditions require approval of the programme rather than mere absence of objection — without approval, claims hang.',
      ],
      uz: [
        'Programme mantiqiy bogʻlanishlar va resurslarsiz topshirilgan — rasman hujjat bor, kechikish tahlili uchun foydasiz.',
        'Yangilanishlar saqlanmaydi: bir yildan keyin hodisa sanasidagi holatni tiklab boʻlmaydi.',
        'Particular Conditions programme ni shunchaki eʼtiroz yoʻqligini emas, tasdiqlashni talab qiladi — tasdiqsiz claims osilib qoladi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что означает, если Инженер не ответил на поданную программу?',
          en: 'What does it mean if the Engineer does not respond to a submitted programme?',
          uz: 'Agar Muhandis topshirilgan programme ga javob bermasa, bu nimani anglatadi?',
        },
        a: {
          ru: 'По базовой конструкции FIDIC отсутствие возражений в установленный срок обычно означает, что программа принимается к исполнению, но точная формулировка есть в контракте, и её нужно читать. Практическая рекомендация — при отсутствии реакции направить письмо с фиксацией факта: программа подана в такую-то дату, возражений в срок не поступило, программа считается действующей. Такое письмо позже избавляет от спора о том, какая версия была актуальной.',
          en: 'Under the base FIDIC structure, no objection within the stated period normally means the programme stands, but the precise wording is in the contract and must be read. The practical step is, on silence, to write recording the position: the programme was submitted on such a date, no objection was received in time, the programme is treated as current. That letter later removes any argument about which version applied.',
          uz: 'Bazaviy FIDIC konstruksiyasida belgilangan muddatda eʼtiroz boʻlmasligi odatda programme ijroga qabul qilinganini bildiradi, lekin aniq matn shartnomada va uni oʻqish kerak. Amaliy tavsiya — javob boʻlmasa, faktni qayd etuvchi xat yuborish: programme falon sanada topshirilgan, muddatda eʼtiroz kelmagan, programme amalda hisoblanadi. Bunday xat keyinchalik qaysi versiya dolzarb boʻlgani haqidagi bahsdan xalos qiladi.',
        },
      },
      {
        q: {
          ru: 'Обязан ли Подрядчик показывать резерв времени (float) в программе?',
          en: 'Must the Contractor show float in the programme?',
          uz: 'Pudratchi programme da vaqt zaxirasini (float) koʻrsatishi shartmi?',
        },
        a: {
          ru: 'Требования к раскрытию задаются контрактом, и здесь важнее другой вопрос: кому принадлежит резерв. FIDIC прямо этого обычно не решает, поэтому в Particular Conditions нередко вписывают, что float принадлежит проекту, а не подрядчику. Практическое следствие: заказчик может «съесть» резерв своими задержками без последствий, и подрядчику стоит понимать это до подачи оферты, а не при первом claim.',
          en: 'Disclosure requirements are set by the contract, but the more important question is who owns the float. FIDIC usually does not resolve this expressly, so Particular Conditions often provide that float belongs to the project rather than the Contractor. The practical consequence is that the Employer can absorb the float with its own delays without consequence — worth understanding before tender, not at the first claim.',
          uz: 'Oshkor qilish talablari shartnoma bilan belgilanadi, lekin bu yerda boshqa savol muhimroq: zaxira kimga tegishli. FIDIC buni odatda bevosita hal qilmaydi, shuning uchun Particular Conditions ga koʻpincha float pudratchiga emas, loyihaga tegishli deb yoziladi. Amaliy oqibat: buyurtmachi zaxirani oʻz kechikishlari bilan oqibatsiz «yeb qoʻyishi» mumkin va pudratchi buni birinchi claim da emas, oferta topshirishdan oldin tushunishi kerak.',
        },
      },
    ],
  },

  'tests-on-completion-9': {
    practice: {
      ru: 'Испытания при завершении — момент, где сходятся сроки, приёмка и деньги. Основная причина конфликтов не сами результаты, а неготовность инфраструктуры испытаний: нет подачи сырья, энергии, персонала заказчика или разрешений. Если задержка испытаний вызвана заказчиком, это основание для EOT и затрат, но только при своевременном уведомлении. Вторая типовая проблема — критерии приёмки сформулированы в Employer\'s Requirements неоднозначно, и стороны спорят не о показателях, а о методике их измерения. Методику стоит согласовать письменно до начала испытаний, а не после первого неудачного прогона.',
      en: 'Tests on Completion are where time, taking over and money converge. The usual cause of conflict is not the results but unreadiness of the test infrastructure: no feedstock, power, Employer’s personnel or permits. Where the delay to testing is the Employer’s, it grounds an EOT and cost — but only on timely notice. The second recurring problem is acceptance criteria written ambiguously in the Employer’s Requirements, leaving the parties arguing about measurement methodology rather than performance. Agree the methodology in writing before testing starts, not after the first failed run.',
      uz: 'Yakunlashda sinovlar — muddatlar, qabul va pul tutashadigan payt. Mojarolarning asosiy sababi natijalar emas, sinov infratuzilmasining tayyor emasligi: xomashyo, energiya, buyurtmachi xodimlari yoki ruxsatlar yoʻq. Agar sinovlar kechikishi buyurtmachi tufayli boʻlsa, bu EOT va xarajatlar asosi, lekin faqat oʻz vaqtida bildirishnoma bilan. Ikkinchi tipik muammo — qabul mezonlari Employer\'s Requirements da noaniq shakllantirilgan va tomonlar koʻrsatkichlar haqida emas, ularni oʻlchash uslubi haqida bahslashadi. Uslubni birinchi muvaffaqiyatsiz sinovdan keyin emas, sinovlar boshlanishidan oldin yozma kelishish kerak.',
    },
    pitfalls: {
      ru: [
        'Условия испытаний (сырьё, энергия, персонал Заказчика) не расписаны в контракте — виновника задержки установить нечем.',
        'Методика измерения не согласована заранее: результат есть, а интерпретация спорна.',
        'Повторные испытания за счёт Подрядчика без ограничения количества — расходы становятся неконтролируемыми.',
      ],
      en: [
        'Test conditions — feedstock, power, Employer’s personnel — are not set out in the contract, so responsibility for delay cannot be established.',
        'The measurement methodology is not agreed up front: there is a result, but its interpretation is contested.',
        'Retesting at the Contractor’s cost with no cap on the number of attempts makes the exposure open-ended.',
      ],
      uz: [
        'Sinov shartlari (xomashyo, energiya, Buyurtmachi xodimlari) shartnomada yozilmagan — kechikish aybdorini aniqlash uchun hech narsa yoʻq.',
        'Oʻlchash uslubi oldindan kelishilmagan: natija bor, talqin esa bahsli.',
        'Takroriy sinovlar Pudratchi hisobidan, soni cheklanmagan — xarajatlar nazoratsiz boʻlib qoladi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что если объект не проходит испытания при завершении?',
          en: 'What if the works fail the Tests on Completion?',
          uz: 'Agar obyekt yakunlashda sinovlardan oʻtmasa nima boʻladi?',
        },
        a: {
          ru: 'Контракт обычно даёт право на повторные испытания после устранения причин. Если объект не проходит и после повторов, у Заказчика появляются варианты: потребовать дальнейшего устранения, принять объект со снижением цены на согласованную величину либо, при существенном неисполнении, отказаться от соответствующей части работ. Конкретный набор последствий и их пороги задаются в Employer\'s Requirements и Contract Data.',
          en: 'The contract normally allows retesting once the causes are addressed. If the works still fail after repeats, the Employer has options: require further remedial work, accept the works with an agreed reduction in the Contract Price, or, where the failure is substantial, reject the relevant part of the works. The exact menu of consequences and their thresholds sit in the Employer’s Requirements and Contract Data.',
          uz: 'Shartnoma odatda sabablar bartaraf etilgandan keyin takroriy sinovlar huquqini beradi. Agar obyekt takrorlardan keyin ham oʻtmasa, Buyurtmachida variantlar paydo boʻladi: keyingi bartaraf etishni talab qilish, obyektni kelishilgan miqdorda narx pasaytirish bilan qabul qilish yoki jiddiy bajarilmaganda ishlarning tegishli qismidan voz kechish. Aniq oqibatlar toʻplami va ularning chegaralari Employer\'s Requirements va Contract Data da belgilanadi.',
        },
      },
      {
        q: {
          ru: 'Чем Tests on Completion отличаются от Tests after Completion?',
          en: 'How do Tests on Completion differ from Tests after Completion?',
          uz: 'Tests on Completion Tests after Completion dan nimasi bilan farq qiladi?',
        },
        a: {
          ru: 'Tests on Completion проводятся до приёмки и определяют, можно ли выдать Taking-Over Certificate. Tests after Completion — эксплуатационные испытания уже после передачи объекта, они проверяют показатели в реальном режиме работы и в Yellow и Silver Book живут в Clause 12. Разница важна практически: вторые проходят, когда объектом управляет заказчик, поэтому распределение ответственности за режим эксплуатации становится ключевым.',
          en: 'Tests on Completion run before taking over and determine whether the Taking-Over Certificate can issue. Tests after Completion are operational tests conducted after handover, checking performance in real operation, and in the Yellow and Silver Books they sit in Clause 12. The distinction matters practically: the latter take place while the Employer operates the asset, which makes responsibility for operating regime the central issue.',
          uz: 'Tests on Completion qabuldan oldin oʻtkaziladi va Taking-Over Certificate berish mumkinligini belgilaydi. Tests after Completion — obyekt topshirilgandan keyingi ekspluatatsion sinovlar, ular haqiqiy ish rejimidagi koʻrsatkichlarni tekshiradi va Yellow hamda Silver Book da Clause 12 da joylashgan. Farq amaliy jihatdan muhim: ikkinchisi obyektni buyurtmachi boshqarayotganda oʻtadi, shuning uchun ekspluatatsiya rejimi uchun javobgarlik taqsimoti asosiy masalaga aylanadi.',
        },
      },
    ],
  },

  'measurement-12': {
    practice: {
      ru: 'В Red Book оплата идёт по фактически выполненным объёмам, и вся конструкция держится на дисциплине совместных обмеров. Практика показывает: если обмер не проведён совместно и не подписан в момент, когда работа ещё доступна для проверки, спор потом решается не в пользу того, у кого лучше аргументы, а в пользу того, у кого есть подписанный документ. Второй момент — Bill of Quantities не является описанием объёма работ: количества там ориентировочные, и расхождение факта с BoQ само по себе не изменение, а обычная работа механизма перемера.',
      en: 'In the Red Book payment follows the quantities actually executed, and the whole structure rests on discipline in joint measurement. Practice is consistent: where measurement is not taken jointly and signed while the work is still open to inspection, the later dispute is decided not in favour of the better argument but in favour of whoever holds a signed record. Second, the Bill of Quantities is not a description of the scope: the quantities are estimates, and a divergence between actual and BoQ is not in itself a Variation but the re-measurement mechanism working normally.',
      uz: 'Red Book da toʻlov haqiqatda bajarilgan hajmlar boʻyicha boradi va butun konstruksiya birgalikdagi oʻlchov intizomiga tayanadi. Amaliyot koʻrsatadi: agar oʻlchov birgalikda oʻtkazilmasa va ish hali tekshirish uchun ochiq boʻlgan paytda imzolanmasa, keyingi nizo dalillari yaxshiroq boʻlgan foydasiga emas, imzolangan hujjati bor foydasiga hal qilinadi. Ikkinchi jihat — Bill of Quantities ish hajmi tavsifi emas: undagi miqdorlar taxminiy va faktning BoQ dan farq qilishi oʻzi oʻzgarish emas, qayta oʻlchov mexanizmining odatiy ishi.',
    },
    pitfalls: {
      ru: [
        'Обмер выполнен односторонне после закрытия работ — доказать объём скрытых конструкций почти невозможно.',
        'Не согласован метод обмера (стандарт измерения) — стороны считают одно и то же по-разному.',
        'Particular Conditions превращают BoQ в твёрдую цену, сохраняя при этом формулировки Red Book, — внутреннее противоречие контракта.',
      ],
      en: [
        'Measurement is taken unilaterally after the works are closed up — proving the quantity of buried elements becomes near impossible.',
        'The method of measurement (the measurement standard) is not agreed, so the parties compute the same thing differently.',
        'Particular Conditions turn the BoQ into a lump sum while leaving Red Book wording in place — an internal contradiction in the contract.',
      ],
      uz: [
        'Oʻlchov ishlar yopilgandan keyin bir tomonlama bajarilgan — yashirin konstruksiyalar hajmini isbotlash deyarli imkonsiz.',
        'Oʻlchov usuli (oʻlchov standarti) kelishilmagan — tomonlar bir narsani turlicha hisoblaydi.',
        'Particular Conditions BoQ ni qatʼiy narxga aylantiradi, Red Book matnini esa saqlab qoladi — shartnomaning ichki ziddiyati.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Является ли расхождение фактического объёма с BoQ основанием для Variation?',
          en: 'Is a divergence between actual quantity and the BoQ a Variation?',
          uz: 'Haqiqiy hajmning BoQ dan farqi Variation asosimi?',
        },
        a: {
          ru: 'Само по себе нет — это нормальная работа механизма перемера, и оплата просто идёт по факту. Но если отклонение превышает установленные контрактом пороги и при этом делает исходную расценку неадекватной, появляется основание для пересмотра расценки по Clause 12 или 13. Ключ здесь в двух условиях одновременно: превышение порога и доказанное влияние на стоимость единицы.',
          en: 'Not in itself — that is the re-measurement mechanism working, and payment simply follows the actual quantity. But where the deviation exceeds the thresholds set in the contract and, in addition, renders the original rate inappropriate, grounds arise to revisit the rate under Clause 12 or 13. The key is both conditions together: threshold exceeded and a demonstrated effect on unit cost.',
          uz: 'Oʻzi boʻyicha yoʻq — bu qayta oʻlchov mexanizmining odatiy ishi va toʻlov shunchaki fakt boʻyicha boradi. Lekin ogʻish shartnomada belgilangan chegaralardan oshsa va shu bilan birga dastlabki narxni nomunosib qilsa, Clause 12 yoki 13 boʻyicha narxni qayta koʻrib chiqish asosi paydo boʻladi. Bu yerda kalit — ikki shart bir vaqtda: chegaradan oshish va birlik narxiga isbotlangan taʼsir.',
        },
      },
      {
        q: {
          ru: 'Что делать, если Заказчик не является на совместный обмер?',
          en: 'What if the Employer does not attend a joint measurement?',
          uz: 'Agar Buyurtmachi birgalikdagi oʻlchovga kelmasa nima qilish kerak?',
        },
        a: {
          ru: 'Контракт обычно предусматривает, что при неявке после надлежащего уведомления обмер Подрядчика считается принятым. Практическая последовательность: письменное уведомление о дате и месте обмера заранее, фиксация неявки, проведение обмера с фото и видео, направление результата другой стороне. Без первого шага — уведомления в предусмотренной форме — вся конструкция не работает.',
          en: 'The contract normally provides that, on non-attendance after proper notice, the Contractor’s measurement is treated as accepted. The practical sequence is: written notice of date and place in advance, record of non-attendance, measurement taken with photographs and video, result sent to the other party. Without the first step — notice in the prescribed form — the whole structure fails.',
          uz: 'Shartnoma odatda tegishli bildirishnomadan keyin kelmaslikda Pudratchi oʻlchovi qabul qilingan hisoblanishini nazarda tutadi. Amaliy ketma-ketlik: oʻlchov sanasi va joyi haqida oldindan yozma bildirishnoma, kelmaslikni qayd etish, foto va video bilan oʻlchov oʻtkazish, natijani boshqa tomonga yuborish. Birinchi qadamsiz — nazarda tutilgan shaklda bildirishnomasiz — butun konstruksiya ishlamaydi.',
        },
      },
    ],
  },

  'advance-payment-14-2': {
    practice: {
      ru: 'Аванс — это заём, а не подарок, и три параметра определяют, будет ли он полезен: размер, график погашения и условия возврата гарантии. Типовая проблема на региональных проектах — аванс выплачивается с задержкой, а график его удержания из промежуточных платежей при этом не сдвигается: подрядчик фактически возвращает деньги, которых почти не получал. Второй момент — гарантия возврата аванса должна уменьшаться по мере погашения, иначе подрядчик всё время держит полное обеспечение под уже возвращённую сумму, оплачивая банку комиссию впустую.',
      en: 'An advance payment is a loan, not a gift, and three parameters decide whether it helps: the amount, the repayment schedule and the conditions for releasing the guarantee. A recurring problem on regional projects is that the advance is paid late while the schedule for recovering it from interim payments does not shift: the Contractor is effectively repaying money it barely received. Second, the advance payment guarantee should reduce as repayment progresses; otherwise the Contractor keeps full security in place against an already-repaid sum and pays bank commission for nothing.',
      uz: 'Avans — sovgʻa emas, qarz va uch parametr uning foydali boʻlishini belgilaydi: miqdor, qoplash jadvali va kafolatni qaytarish shartlari. Mintaqaviy loyihalardagi tipik muammo — avans kechikib toʻlanadi, uni oraliq toʻlovlardan ushlab qolish jadvali esa siljimaydi: pudratchi amalda deyarli olmagan pulini qaytaradi. Ikkinchi jihat — avansni qaytarish kafolati qoplash bilan birga kamayishi kerak, aks holda pudratchi allaqachon qaytarilgan summa uchun doim toʻliq taʼminot ushlab turadi va bankka bekorga komissiya toʻlaydi.',
    },
    pitfalls: {
      ru: [
        'График удержания привязан к календарю, а не к дате фактического получения аванса.',
        'Гарантия возврата аванса не уменьшается пропорционально погашению — переплата комиссии банку весь срок.',
        'Аванс обусловлен предоставлением документов, состав которых в контракте описан размыто, — выплата затягивается на месяцы.',
      ],
      en: [
        'The recovery schedule is tied to the calendar rather than to the date the advance was actually received.',
        'The advance payment guarantee does not reduce in step with repayment — bank commission is overpaid throughout.',
        'The advance is conditional on documents whose composition the contract describes only vaguely, and payment drags on for months.',
      ],
      uz: [
        'Ushlab qolish jadvali avans haqiqatda olingan sanaga emas, kalendarga bogʻlangan.',
        'Avansni qaytarish kafolati qoplashga mutanosib kamaymaydi — butun muddat davomida bankka komissiya ortiqcha toʻlanadi.',
        'Avans shartnomada tarkibi noaniq tasvirlangan hujjatlarni taqdim etishga bogʻliq — toʻlov oylarga choʻziladi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Как обычно погашается аванс?',
          en: 'How is an advance payment normally recovered?',
          uz: 'Avans odatda qanday qoplanadi?',
        },
        a: {
          ru: 'Чаще всего процентными удержаниями из каждого промежуточного платежа, начиная с момента, когда накопленная сумма сертификаций превысит установленный порог, и до полного погашения к определённой доле выполнения. Конкретные проценты и пороги — поля Contract Data, и именно они, а не общая теория, определяют денежный поток проекта. Считать их нужно на стадии оферты.',
          en: 'Most often by percentage deductions from each interim payment, starting once cumulative certified value passes a stated threshold and running until full recovery by a defined percentage of completion. The specific percentages and thresholds are Contract Data entries, and it is those, not general theory, that shape the project cash flow. Model them at tender stage.',
          uz: 'Koʻpincha har bir oraliq toʻlovdan foizli ushlab qolishlar bilan, sertifikatlangan summa belgilangan chegaradan oshgan paytdan boshlab va bajarilishning maʼlum ulushiga qadar toʻliq qoplangunga qadar. Aniq foizlar va chegaralar — Contract Data maydonlari va loyiha pul oqimini umumiy nazariya emas, aynan ular belgilaydi. Ularni oferta bosqichida hisoblash kerak.',
        },
      },
      {
        q: {
          ru: 'Что происходит с авансом при расторжении контракта?',
          en: 'What happens to the advance on termination?',
          uz: 'Shartnoma bekor qilinganda avans bilan nima boʻladi?',
        },
        a: {
          ru: 'Непогашенный остаток аванса обычно подлежит немедленному возврату и входит в итоговые расчёты сторон. Именно поэтому гарантия возврата аванса часто востребуется первой при расторжении. Практический вывод для подрядчика: отслеживать непогашенный остаток нужно постоянно, а не только в конце, — это прямая мера риска, которую проект несёт в каждый момент времени.',
          en: 'The unrepaid balance normally becomes immediately due and enters the final accounting between the parties. That is why the advance payment guarantee is often the first instrument called on termination. The practical lesson for a contractor is to track the outstanding balance continuously rather than only at the end: it is a direct measure of the risk the project carries at any given moment.',
          uz: 'Avansning qoplanmagan qoldigʻi odatda darhol qaytarilishi kerak va tomonlarning yakuniy hisob-kitobiga kiradi. Shuning uchun bekor qilishda avansni qaytarish kafolati koʻpincha birinchi boʻlib talab qilinadi. Pudratchi uchun amaliy xulosa: qoplanmagan qoldiqni faqat oxirida emas, doimiy kuzatib borish kerak — bu loyiha har qanday paytda koʻtarayotgan riskning bevosita oʻlchovi.',
        },
      },
    ],
  },

  'suspension-termination-16': {
    practice: {
      ru: 'Clause 16 — зеркало Clause 15, и работает он так же процедурно. Право приостановить возникает при неоплате сертифицированных сумм, непредоставлении подтверждения финансирования по 2.4 и ряде других нарушений Заказчика, но только после уведомления и выдержки установленного срока. Подрядчики регулярно теряют это право, действуя эмоционально: уходят с площадки без уведомления и превращают обоснованную позицию в собственное нарушение с риском расторжения по вине. Приостановка — сильный инструмент ровно настолько, насколько аккуратно оформлена.',
      en: 'Clause 16 mirrors Clause 15 and is just as procedural. A right to suspend arises on non-payment of certified sums, failure to provide evidence of financing under 2.4 and certain other Employer defaults — but only after notice and the stated period has run. Contractors routinely lose the right by acting emotionally: walking off site without notice and converting a sound position into their own breach, with exposure to termination for default. Suspension is a powerful instrument exactly to the extent that it is documented properly.',
      uz: 'Clause 16 — Clause 15 ning koʻzgusi va u ham xuddi shunday protsessual ishlaydi. Toʻxtatish huquqi sertifikatlangan summalar toʻlanmaganda, 2.4 boʻyicha moliyalashtirish tasdigʻi berilmaganda va Buyurtmachining bir qator boshqa buzilishlarida yuzaga keladi, lekin faqat bildirishnomadan va belgilangan muddat oʻtgandan keyin. Pudratchilar bu huquqni muntazam yoʻqotadi, hissiy harakat qilib: bildirishnomasiz obyektdan ketadi va asosli pozitsiyani ayb boʻyicha bekor qilish riski bilan oʻz buzilishiga aylantiradi. Toʻxtatish qanchalik puxta rasmiylashtirilgan boʻlsa, shunchalik kuchli vosita.',
    },
    pitfalls: {
      ru: [
        'Работы приостановлены до истечения срока, указанного в уведомлении, — приостановка становится неправомерной.',
        'Не зафиксированы затраты на период приостановки: охрана, хранение, простой техники, демобилизация.',
        'Уведомление о приостановке не отделено от уведомления о расторжении — стороны теряют промежуточную ступень для урегулирования.',
      ],
      en: [
        'Work stops before the period stated in the notice has expired, making the suspension itself wrongful.',
        'Costs during suspension are not recorded: security, storage, plant standing time, demobilisation.',
        'The notice of suspension is not separated from a notice of termination, so the parties lose the intermediate step for settlement.',
      ],
      uz: [
        'Ishlar bildirishnomada koʻrsatilgan muddat tugashidan oldin toʻxtatilgan — toʻxtatish nohaq boʻlib qoladi.',
        'Toʻxtatish davridagi xarajatlar qayd etilmagan: qoʻriqlash, saqlash, texnika boʻsh turishi, demobilizatsiya.',
        'Toʻxtatish haqidagi bildirishnoma bekor qilish bildirishnomasidan ajratilmagan — tomonlar kelishuv uchun oraliq bosqichni yoʻqotadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Можно ли приостановить работы сразу после первой задержки платежа?',
          en: 'Can work be suspended immediately after the first late payment?',
          uz: 'Birinchi toʻlov kechikishidan keyin darhol ishlarni toʻxtatish mumkinmi?',
        },
        a: {
          ru: 'Нет. Требуется уведомление и выдержка срока, установленного контрактом; только после этого приостановка правомерна. Единственное, что стоит делать сразу, — фиксировать факт просрочки письменно и начинать начисление процентов за задержку, если контракт это предусматривает. Ранняя формализация усиливает позицию к моменту, когда право на приостановку действительно возникнет.',
          en: 'No. Notice is required and the contractual period must run; only then is suspension lawful. The one thing worth doing immediately is recording the late payment in writing and starting to compute financing charges where the contract provides for them. Early formalisation strengthens the position by the time the right to suspend actually arises.',
          uz: 'Yoʻq. Bildirishnoma va shartnomada belgilangan muddatni kutish talab qilinadi; faqat shundan keyin toʻxtatish qonuniy. Darhol qilishga arziydigan yagona narsa — kechikish faktini yozma qayd etish va shartnoma nazarda tutgan boʻlsa, kechikish uchun foizlarni hisoblashni boshlash. Erta rasmiylashtirish toʻxtatish huquqi haqiqatan yuzaga kelgan paytga pozitsiyani kuchaytiradi.',
        },
      },
      {
        q: {
          ru: 'Какие затраты возмещаются за период приостановки?',
          en: 'Which costs are recoverable for a suspension period?',
          uz: 'Toʻxtatish davri uchun qanday xarajatlar qoplanadi?',
        },
        a: {
          ru: 'Как правило, разумные затраты, понесённые в связи с приостановкой: охрана и содержание площадки, хранение материалов и оборудования, простой техники и персонала, а также затраты на последующую ремобилизацию. Ключ не в перечне, а в доказательствах: без ежедневного учёта фактически задействованных ресурсов сумма превращается в оценку, которую легко оспорить.',
          en: 'Generally the reasonable costs incurred as a result of the suspension: site security and maintenance, storage of materials and equipment, standing time for plant and staff, and the cost of remobilisation afterwards. The key is not the list but the evidence: without a daily record of resources actually held, the figure becomes an estimate that is easy to attack.',
          uz: 'Odatda toʻxtatish bilan bogʻliq oqilona xarajatlar: obyektni qoʻriqlash va saqlash, materiallar va uskunalarni saqlash, texnika va xodimlarning boʻsh turishi, shuningdek keyingi remobilizatsiya xarajatlari. Kalit roʻyxatda emas, dalillarda: haqiqatda jalb qilingan resurslarni kundalik hisobga olmasdan summa osongina eʼtiroz bildiriladigan baholashga aylanadi.',
        },
      },
    ],
  },

  'care-of-works-17': {
    practice: {
      ru: 'Clause 17 отвечает на вопрос, кто несёт убыток, если объект повреждён до приёмки. По базовой конструкции риск сохранности работ лежит на Подрядчике до Taking-Over, но с изъятиями по рискам Заказчика — и именно перечень этих изъятий правят в Particular Conditions чаще всего. Второй практический слой — indemnities: взаимные обязательства возместить вред третьим лицам и персоналу. Здесь важно, чтобы объём indemnity был соотнесён со страховым покрытием по Clause 19; расхождение означает, что часть обязательства подрядчик несёт из собственного кармана.',
      en: 'Clause 17 answers who bears the loss if the works are damaged before taking over. Under the base structure care of the works sits with the Contractor until taking over, subject to carve-outs for Employer’s risks — and it is precisely that list of carve-outs that gets edited most often in Particular Conditions. The second layer is indemnities: mutual obligations to make good injury to third parties and personnel. What matters here is that the scope of the indemnity is matched to the insurance cover under Clause 19; any gap is a liability the Contractor carries out of its own pocket.',
      uz: 'Clause 17 obyekt qabuldan oldin shikastlangan boʻlsa, zararni kim koʻtarishiga javob beradi. Bazaviy konstruksiyada ishlarning saqlanishi riski Taking-Over gacha Pudratchida boʻladi, Buyurtmachi risklari boʻyicha istisnolar bilan — va aynan shu istisnolar roʻyxati Particular Conditions da eng koʻp tuzatiladi. Ikkinchi amaliy qatlam — indemnities: uchinchi shaxslar va xodimlarga yetkazilgan zararni qoplash boʻyicha oʻzaro majburiyatlar. Bu yerda indemnity hajmi Clause 19 boʻyicha sugʻurta qoplamasi bilan bogʻlangan boʻlishi muhim; farq pudratchi majburiyatning bir qismini oʻz cho‘ntagidan koʻtarishini anglatadi.',
    },
    pitfalls: {
      ru: [
        'Перечень рисков Заказчика урезан в Particular Conditions — подрядчик отвечает за события, которыми не управляет.',
        'Объём indemnity шире страхового покрытия: разрыв обнаруживается в момент страхового случая.',
        'Не согласован порядок действий при повреждении: кто фиксирует, кто уведомляет страховщика, в какой срок.',
      ],
      en: [
        'The list of Employer’s risks is trimmed in the Particular Conditions, leaving the Contractor answerable for events it does not control.',
        'The indemnity is wider than the insurance cover: the gap surfaces at the moment of a claim.',
        'No agreed procedure on damage: who records it, who notifies the insurer and within what period.',
      ],
      uz: [
        'Buyurtmachi risklari roʻyxati Particular Conditions da qisqartirilgan — pudratchi oʻzi boshqarmaydigan hodisalar uchun javob beradi.',
        'Indemnity hajmi sugʻurta qoplamasidan keng: farq sugʻurta hodisasi paytida aniqlanadi.',
        'Shikastlanishda harakat tartibi kelishilmagan: kim qayd etadi, kim sugʻurtachiga xabar beradi, qanday muddatda.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Кто несёт риск повреждения объекта до приёмки?',
          en: 'Who bears the risk of damage to the works before taking over?',
          uz: 'Qabuldan oldin obyekt shikastlanishi riskini kim koʻtaradi?',
        },
        a: {
          ru: 'По умолчанию Подрядчик — он обязан заботиться о работах до выдачи Taking-Over Certificate и устранять повреждения за свой счёт. Изъятие составляют риски Заказчика: например, последствия проектных решений, предоставленных Заказчиком, использование объекта Заказчиком или определённые внешние события. Точный перечень нужно смотреть в конкретном контракте — именно он, а не общая схема, определяет исход спора.',
          en: 'By default the Contractor: it must care for the works until the Taking-Over Certificate issues and make good damage at its own cost. The exceptions are the Employer’s risks — consequences of design supplied by the Employer, use of the works by the Employer, or defined external events. The precise list must be read in the specific contract, because it, not the general scheme, decides the outcome.',
          uz: 'Sukut boʻyicha Pudratchi — u Taking-Over Certificate berilgunga qadar ishlarga gʻamxoʻrlik qilishi va shikastlanishlarni oʻz hisobidan bartaraf etishi shart. Istisno — Buyurtmachi risklari: masalan, Buyurtmachi bergan loyiha yechimlari oqibatlari, Buyurtmachining obyektdan foydalanishi yoki belgilangan tashqi hodisalar. Aniq roʻyxatni muayyan shartnomada koʻrish kerak — nizo natijasini umumiy sxema emas, aynan u belgilaydi.',
        },
      },
      {
        q: {
          ru: 'Как соотносятся Clause 17 и ограничение ответственности?',
          en: 'How does Clause 17 interact with the limitation of liability?',
          uz: 'Clause 17 javobgarlikni cheklash bilan qanday bogʻlanadi?',
        },
        a: {
          ru: 'Ограничение ответственности задаёт потолок и исключает косвенные убытки, но обычно содержит перечень исключений, на которые лимит не распространяется, — и indemnities по Clause 17 нередко попадают именно в этот перечень. Практический шаг при проверке контракта: прочитать пункт об ограничении и пункт 17 вместе, а не по отдельности, и выписать, какие обязательства остаются без потолка.',
          en: 'The limitation clause sets a cap and excludes indirect loss, but it usually carries a list of carve-outs the cap does not reach — and Clause 17 indemnities frequently sit in that list. The practical step when reviewing a contract is to read the limitation clause and Clause 17 together rather than separately, and write down which obligations end up uncapped.',
          uz: 'Javobgarlikni cheklash shift belgilaydi va bilvosita zararlarni istisno qiladi, lekin odatda limit tarqalmaydigan istisnolar roʻyxatini oʻz ichiga oladi — Clause 17 boʻyicha indemnities esa koʻpincha aynan shu roʻyxatga tushadi. Shartnomani tekshirishda amaliy qadam: cheklash bandini va 17-bandni alohida emas, birga oʻqish va qaysi majburiyatlar shiftsiz qolishini yozib olish.',
        },
      },
    ],
  },

  'insurance-19': {
    practice: {
      ru: 'Страхование по Clause 19 проваливается не на этапе подписания, а на этапе страхового случая — когда выясняется, что франшиза съедает почти весь убыток, период покрытия закончился при выдаче Taking-Over Certificate, а Заказчик не включён в полис как со-страхователь. Практический подход простой: сверять не факт наличия полиса, а его параметры с требованиями контракта — лимиты, франшизы, исключения, перечень застрахованных лиц и период действия, включая DNP. Эту сверку нужно делать один раз в начале и повторять при каждом продлении.',
      en: 'Clause 19 insurance fails not at signature but at the moment of a claim — when it emerges that the deductible absorbs most of the loss, cover lapsed on issue of the Taking-Over Certificate, and the Employer was never added as a co-insured. The practical approach is simple: check not that a policy exists but that its parameters match the contract requirements — limits, deductibles, exclusions, the schedule of insured parties and the period of cover including the DNP. Do this once at the start and repeat it at every renewal.',
      uz: 'Clause 19 boʻyicha sugʻurta imzolash bosqichida emas, sugʻurta hodisasi bosqichida barbod boʻladi — franshiza zararning deyarli barchasini yeb qoʻygani, qoplama davri Taking-Over Certificate berilishida tugagani va Buyurtmachi polisga birga sugʻurtalanuvchi sifatida kiritilmagani maʼlum boʻlganda. Amaliy yondashuv oddiy: polis borligini emas, uning parametrlarini shartnoma talablari bilan solishtirish — limitlar, franshizalar, istisnolar, sugʻurtalangan shaxslar roʻyxati va DNP ni oʻz ichiga olgan amal qilish davri. Bu solishtirishni boshida bir marta qilib, har bir uzaytirishda takrorlash kerak.',
    },
    pitfalls: {
      ru: [
        'Период покрытия заканчивается при приёмке и не захватывает DNP — повреждения в период дефектов не застрахованы.',
        'Заказчик и субподрядчики не включены в перечень застрахованных лиц, хотя контракт этого требует.',
        'Франшиза установлена на уровне, при котором типичный убыток проекта не покрывается вообще.',
      ],
      en: [
        'Cover ends at taking over and does not extend through the DNP — damage during the defects period is uninsured.',
        'The Employer and subcontractors are not named as insured parties although the contract requires it.',
        'The deductible is set at a level where a typical project loss is not covered at all.',
      ],
      uz: [
        'Qoplama davri qabulda tugaydi va DNP ni qamrab olmaydi — nuqson davridagi shikastlanishlar sugʻurtalanmagan.',
        'Buyurtmachi va subpudratchilar sugʻurtalangan shaxslar roʻyxatiga kiritilmagan, shartnoma buni talab qilsa ham.',
        'Franshiza loyihaning tipik zarari umuman qoplanmaydigan darajada belgilangan.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что происходит, если Подрядчик не оформил требуемое страхование?',
          en: 'What happens if the Contractor fails to put the required insurance in place?',
          uz: 'Agar Pudratchi talab qilingan sugʻurtani rasmiylashtirmasa nima boʻladi?',
        },
        a: {
          ru: 'Контракт обычно даёт Заказчику право застраховать риск самостоятельно и удержать стоимость из платежей Подрядчику. Более серьёзное последствие в том, что при наступлении убытка Подрядчик несёт его целиком, включая ту часть, которую покрыл бы полис. Поэтому подтверждение действующего страхования — стандартное условие первого платежа, и это условие стоит соблюдать буквально.',
          en: 'The contract normally lets the Employer effect the insurance itself and recover the cost from payments due to the Contractor. The heavier consequence is that if a loss occurs, the Contractor bears all of it, including the portion a policy would have met. That is why evidence of insurance in force is a standard condition of the first payment, and it is a condition worth meeting literally.',
          uz: 'Shartnoma odatda Buyurtmachiga riskni mustaqil sugʻurtalash va qiymatini Pudratchiga toʻlovlardan ushlab qolish huquqini beradi. Jiddiyroq oqibat shundaki, zarar yuzaga kelganda Pudratchi uni toʻliq koʻtaradi, shu jumladan polis qoplagan qismini ham. Shuning uchun amaldagi sugʻurta tasdigʻi — birinchi toʻlovning standart sharti va bu shartni soʻzma-soʻz bajarishga arziydi.',
        },
      },
      {
        q: {
          ru: 'Покрывает ли строительное страхование дефекты проектирования?',
          en: 'Does construction insurance cover design defects?',
          uz: 'Qurilish sugʻurtasi loyihalash nuqsonlarini qoplaydimi?',
        },
        a: {
          ru: 'Стандартный полис CAR/EAR обычно исключает стоимость исправления самой дефектной проектной работы, хотя может покрывать вызванный ею ущерб другим частям объекта — объём зависит от выбранной оговорки о дефектах. Для проектных рисков по Yellow и Silver Book нужна отдельная профессиональная ответственность, и именно она чаще всего исключает fitness for purpose. Эти два полиса нужно читать вместе.',
          en: 'A standard CAR/EAR policy typically excludes the cost of putting right the defective design work itself, while it may cover resulting damage to other parts of the works — the extent depends on which defects clause was selected. Design risk under the Yellow and Silver Books needs separate professional indemnity cover, and that is precisely the policy that most often excludes fitness for purpose. The two policies have to be read together.',
          uz: 'Standart CAR/EAR polisi odatda nuqsonli loyiha ishining oʻzini tuzatish qiymatini istisno qiladi, lekin u keltirgan obyektning boshqa qismlariga zararni qoplashi mumkin — hajm tanlangan nuqsonlar bandiga bogʻliq. Yellow va Silver Book boʻyicha loyiha risklari uchun alohida kasbiy javobgarlik kerak va aynan u koʻpincha fitness for purpose ni istisno qiladi. Bu ikki polisni birga oʻqish kerak.',
        },
      },
    ],
  },

  'suspension-of-work-8-9': {
    practice: {
      ru: 'Приостановка по указанию Инженера — не то же самое, что приостановка Подрядчиком по Clause 16. Здесь работы останавливает Инженер, и вопрос в том, чем вызвана остановка: если причина не на стороне Подрядчика, у него возникает право на EOT и затраты. Практический узел — учёт. Затраты периода приостановки нужно фиксировать ежедневно и раздельно: простой техники, содержание персонала, охрана, хранение, консервация. Восстановить это через полгода по бухгалтерским проводкам почти невозможно, и claim разваливается не по праву, а по доказательствам.',
      en: 'Suspension on the Engineer’s instruction is not the same as the Contractor’s suspension under Clause 16. Here the Engineer stops the work, and the question is what caused it: if the cause does not lie with the Contractor, entitlement to EOT and cost arises. The practical knot is record-keeping. Costs during suspension must be captured daily and separately: plant standing, staff retention, security, storage, protection of the works. Reconstructing that six months later from accounting entries is near impossible, and the claim then fails on evidence rather than on entitlement.',
      uz: 'Muhandis koʻrsatmasi boʻyicha toʻxtatish — Pudratchining Clause 16 boʻyicha toʻxtatishi bilan bir xil emas. Bu yerda ishlarni Muhandis toʻxtatadi va savol toʻxtatish nima bilan bogʻliqligida: agar sabab Pudratchi tomonida boʻlmasa, unda EOT va xarajatlar huquqi yuzaga keladi. Amaliy tugun — hisob. Toʻxtatish davri xarajatlarini har kuni va alohida qayd etish kerak: texnika boʻsh turishi, xodimlarni saqlash, qoʻriqlash, saqlash, konservatsiya. Buni olti oydan keyin buxgalteriya yozuvlari boʻyicha tiklash deyarli imkonsiz va claim huquq boʻyicha emas, dalillar boʻyicha parchalanadi.',
    },
    pitfalls: {
      ru: [
        'Затраты периода приостановки не выделены в учёте и смешаны с общими накладными.',
        'Длительная приостановка не переведена в право на расторжение, хотя контракт это допускает по истечении срока.',
        'Не оформлена консервация: последующие повреждения относят на Подрядчика как неисполнение обязанности заботы о работах.',
      ],
      en: [
        'Suspension costs are not segregated in the accounts and are mixed into general overhead.',
        'A prolonged suspension is never converted into a right to terminate, although the contract allows it once the period has run.',
        'Protection of the works is not formalised, so later damage is attributed to the Contractor as a failure to care for the works.',
      ],
      uz: [
        'Toʻxtatish davri xarajatlari hisobda ajratilmagan va umumiy nakladnoylar bilan aralashtirilgan.',
        'Uzoq davom etgan toʻxtatish bekor qilish huquqiga oʻtkazilmagan, shartnoma muddat oʻtgach buni ruxsat etsa ham.',
        'Konservatsiya rasmiylashtirilmagan: keyingi shikastlanishlar ishlarga gʻamxoʻrlik qilish majburiyatini bajarmaslik sifatida Pudratchiga yuklanadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Кто оплачивает хранение и консервацию во время приостановки?',
          en: 'Who pays for storage and protection during a suspension?',
          uz: 'Toʻxtatish davrida saqlash va konservatsiya uchun kim toʻlaydi?',
        },
        a: {
          ru: 'Если приостановка не вызвана нарушением Подрядчика, затраты на защиту, хранение и содержание работ подлежат возмещению вместе с правом на EOT. Если же причина в самом Подрядчике — например, дефект качества, из-за которого работы остановлены, — расходы несёт он. Поэтому первое, что нужно зафиксировать при получении указания о приостановке, — это заявленная Инженером причина.',
          en: 'Where the suspension is not caused by the Contractor’s default, the cost of protecting, storing and maintaining the works is recoverable along with the EOT entitlement. Where the cause is the Contractor’s own — a quality defect that stopped the work, say — it bears the cost. So the first thing to capture on receiving an instruction to suspend is the reason the Engineer has stated.',
          uz: 'Agar toʻxtatish Pudratchining buzilishi bilan bogʻliq boʻlmasa, ishlarni himoya qilish, saqlash va saqlab turish xarajatlari EOT huquqi bilan birga qoplanadi. Agar sabab Pudratchining oʻzida boʻlsa — masalan, ishlar toʻxtatilgan sifat nuqsoni — xarajatlarni u koʻtaradi. Shuning uchun toʻxtatish haqida koʻrsatma olganda birinchi qayd etish kerak boʻlgan narsa — Muhandis bildirgan sabab.',
        },
      },
      {
        q: {
          ru: 'Что если приостановка затянулась на месяцы?',
          en: 'What if a suspension drags on for months?',
          uz: 'Agar toʻxtatish oylarga choʻzilsa nima qilish kerak?',
        },
        a: {
          ru: 'Контракт обычно даёт Подрядчику право после истечения установленного периода потребовать разрешения продолжить работы, а при отсутствии такого разрешения — рассматривать приостановленную часть как исключённую либо, если затронут весь объект, использовать механизм расторжения. Ключевое условие то же — последовательность уведомлений. Молчаливое ожидание месяцами ослабляет позицию и увеличивает невозмещаемые затраты.',
          en: 'The contract normally lets the Contractor, once the stated period has run, request permission to proceed and — absent that permission — treat the suspended part as omitted or, where the whole works are affected, invoke the termination mechanism. The key condition is the same: the sequence of notices. Waiting silently for months weakens the position and grows the unrecovered cost.',
          uz: 'Shartnoma odatda Pudratchiga belgilangan davr oʻtgach ishlarni davom ettirishga ruxsat talab qilish, bunday ruxsat boʻlmasa esa toʻxtatilgan qismni chiqarib tashlangan deb hisoblash yoki butun obyekt taʼsirlangan boʻlsa, bekor qilish mexanizmidan foydalanish huquqini beradi. Asosiy shart oʻsha — bildirishnomalar ketma-ketligi. Oylab jim kutish pozitsiyani zaiflashtiradi va qoplanmaydigan xarajatlarni oshiradi.',
        },
      },
    ],
  },

  'limitation-of-liability-1-15': {
    practice: {
      ru: 'Ограничение ответственности — короткий пункт, который определяет верхнюю границу коммерческого риска всего проекта. Читать его нужно вместе с исключениями: обычно лимит не распространяется на определённые категории — мошенничество, умышленное нарушение, indemnities по Clause 17, иногда неустойку за просрочку. Практическая проверка перед подписанием сводится к трём цифрам: каков общий лимит, что в него не входит и как он соотносится с cap по delay damages. Если общий лимит равен цене контракта, а исключений много, защита во многом номинальная.',
      en: 'Limitation of liability is a short clause that sets the ceiling on the commercial risk of the whole project. It must be read together with its carve-outs: the cap typically does not reach certain categories — fraud, deliberate default, Clause 17 indemnities, sometimes delay damages. The pre-signature check comes down to three figures: what the overall cap is, what sits outside it, and how it relates to the delay damages cap. Where the overall cap equals the Contract Price and the carve-out list is long, the protection is largely nominal.',
      uz: 'Javobgarlikni cheklash — butun loyihaning tijorat riski yuqori chegarasini belgilaydigan qisqa band. Uni istisnolar bilan birga oʻqish kerak: odatda limit maʼlum toifalarga tarqalmaydi — firibgarlik, qasddan buzish, Clause 17 boʻyicha indemnities, baʼzan kechikish uchun jarima. Imzolashdan oldingi amaliy tekshiruv uch raqamga keladi: umumiy limit qanday, unga nima kirmaydi va u delay damages cap bilan qanday bogʻlanadi. Agar umumiy limit shartnoma narxiga teng va istisnolar koʻp boʻlsa, himoya koʻp jihatdan nominal.',
    },
    pitfalls: {
      ru: [
        'Перечень исключений из лимита расширен в Particular Conditions так, что потолок теряет практический смысл.',
        'Исключение косвенных убытков удалено — подрядчик отвечает за упущенную выгоду Заказчика.',
        'Лимит выражен в валюте, отличной от валюты платежей, без механизма пересчёта.',
      ],
      en: [
        'The carve-out list is widened in the Particular Conditions to the point where the cap loses practical meaning.',
        'The exclusion of indirect loss is deleted, leaving the Contractor answerable for the Employer’s loss of profit.',
        'The cap is denominated in a currency other than the payment currency with no conversion mechanism.',
      ],
      uz: [
        'Limitdan istisnolar roʻyxati Particular Conditions da shift amaliy maʼnosini yoʻqotadigan darajada kengaytirilgan.',
        'Bilvosita zararlar istisnosi olib tashlangan — pudratchi Buyurtmachining boy bermagan foydasi uchun javob beradi.',
        'Limit toʻlov valyutasidan boshqa valyutada ifodalangan, qayta hisoblash mexanizmisiz.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Какой размер общего лимита считается рыночным?',
          en: 'What size of overall cap is considered market standard?',
          uz: 'Umumiy limitning qanday miqdori bozor standarti hisoblanadi?',
        },
        a: {
          ru: 'Универсальной цифры нет: она зависит от типа проекта, распределения рисков и требований финансирующей стороны. Практически важнее не абсолютная величина, а соотношение лимита с реальной подверженностью риску конкретного проекта и с исключениями. Лимит в размере цены контракта при широком списке исключений может защищать хуже, чем более низкий лимит с узким списком.',
          en: 'There is no universal figure: it depends on project type, risk allocation and lender requirements. What matters practically is not the absolute number but how the cap relates to the project’s real exposure and to the carve-outs. A cap set at the Contract Price with a broad exclusion list can protect less than a lower cap with a narrow one.',
          uz: 'Universal raqam yoʻq: u loyiha turi, risklar taqsimoti va moliyalashtiruvchi tomon talablariga bogʻliq. Amalda mutlaq qiymat emas, limitning muayyan loyihaning haqiqiy risk darajasi va istisnolar bilan nisbati muhimroq. Keng istisnolar roʻyxati bilan shartnoma narxi hajmidagi limit tor roʻyxatli pastroq limitdan yomonroq himoya qilishi mumkin.',
        },
      },
      {
        q: {
          ru: 'Работает ли ограничение ответственности по праву Узбекистана?',
          en: 'Does a limitation of liability hold up under Uzbek law?',
          uz: 'Javobgarlikni cheklash Oʻzbekiston huquqi boʻyicha ishlaydimi?',
        },
        a: {
          ru: 'Договорное ограничение действует в пределах, допускаемых применимым правом. В континентальных системах, включая Узбекистан, есть императивные нормы, которые ограничение не преодолевает, — прежде всего касающиеся умысла и причинения вреда жизни и здоровью. Поэтому формулировку нужно проверять правовым заключением по применимому праву, а не переносить из англоязычного шаблона как есть.',
          en: 'A contractual cap operates only within the limits the governing law allows. Civil law systems, Uzbekistan included, contain mandatory rules a cap cannot override — notably those on intentional wrongdoing and injury to life and health. The wording therefore needs a legal opinion under the governing law rather than a straight lift from an English-language template.',
          uz: 'Shartnomaviy cheklash qoʻllaniladigan huquq ruxsat bergan doirada amal qiladi. Kontinental tizimlarda, shu jumladan Oʻzbekistonda, cheklash yenga olmaydigan imperativ normalar bor — birinchi navbatda qasd va hayot hamda sogʻliqqa zarar yetkazishga oid. Shuning uchun matnni inglizcha shablondan koʻchirmasdan, qoʻllaniladigan huquq boʻyicha huquqiy xulosa bilan tekshirish kerak.',
        },
      },
    ],
  },

  'retention-money-14-3': {
    practice: {
      ru: 'Удержания — самый предсказуемый и одновременно самый недооценённый элемент денежного потока. Процент удержания, предельная сумма и порядок возврата двумя частями (при приёмке и при выдаче Performance Certificate) заданы в Contract Data, и их нужно моделировать ещё на стадии оферты: при трёхлетнем проекте это существенная сумма, замороженная на весь срок. Практическая проблема — вторая половина удержаний. Её возврат привязан к Performance Certificate, а тот, в свою очередь, к закрытию всех дефектов, поэтому реестр устранённых замечаний с подтверждением Инженера напрямую конвертируется в деньги.',
      en: 'Retention is the most predictable and simultaneously the most underestimated element of cash flow. The retention percentage, the limit and the two-stage release (at taking over and on the Performance Certificate) are Contract Data entries, and they should be modelled at tender stage: on a three-year project this is a material sum frozen for the duration. The practical problem is the second half. Its release is tied to the Performance Certificate, which in turn depends on closing out all defects — so a register of rectified items signed off by the Engineer converts directly into cash.',
      uz: 'Ushlab qolishlar — pul oqimining eng bashoratli va ayni paytda eng yetarlicha baholanmagan elementi. Ushlab qolish foizi, chegara summasi va ikki qismda qaytarish tartibi (qabulda va Performance Certificate berilganda) Contract Data da belgilangan va ularni oferta bosqichida modellashtirish kerak: uch yillik loyihada bu butun muddatga muzlatilgan sezilarli summa. Amaliy muammo — ushlab qolishlarning ikkinchi yarmi. Uni qaytarish Performance Certificate ga bogʻlangan, u esa oʻz navbatida barcha nuqsonlarni yopishga, shuning uchun Muhandis tasdigʻi bilan bartaraf etilgan eʼtirozlar reestri bevosita pulga aylanadi.',
    },
    pitfalls: {
      ru: [
        'Предельная сумма удержаний не установлена — удержания растут пропорционально стоимости без потолка.',
        'Возврат первой половины не оформлен при приёмке: без заявления деньги остаются у Заказчика.',
        'Замена удержаний банковской гарантией предусмотрена контрактом, но не использована — оборотные средства заморожены зря.',
      ],
      en: [
        'No limit on retention is set, so it grows in proportion to value with no ceiling.',
        'Release of the first half is not claimed at taking over: without an application the money stays with the Employer.',
        'The contract allows retention to be replaced by a bank guarantee but the option is never used — working capital is frozen for nothing.',
      ],
      uz: [
        'Ushlab qolishlarning chegara summasi belgilanmagan — ushlab qolishlar shiftsiz qiymatga mutanosib oʻsadi.',
        'Birinchi yarmini qaytarish qabulda rasmiylashtirilmagan: arizasiz pul Buyurtmachida qoladi.',
        'Ushlab qolishlarni bank kafolati bilan almashtirish shartnomada nazarda tutilgan, lekin ishlatilmagan — aylanma mablagʻlar bekorga muzlatilgan.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Можно ли заменить удержания банковской гарантией?',
          en: 'Can retention be replaced by a retention money guarantee?',
          uz: 'Ushlab qolishlarni bank kafolati bilan almashtirish mumkinmi?',
        },
        a: {
          ru: 'Да, если контракт это предусматривает — обычно через Retention Money Guarantee. Экономический смысл очевиден: подрядчик высвобождает оборотные средства, оплачивая банку комиссию, которая, как правило, значительно дешевле стоимости замороженного капитала. Проверять нужно два условия: допускает ли это Contract Data и в какой момент гарантия должна быть предоставлена.',
          en: 'Yes, where the contract provides for it — usually through a Retention Money Guarantee. The economics are straightforward: the Contractor frees working capital and pays a bank commission that is normally far cheaper than the cost of the frozen capital. Two things to check: whether the Contract Data permits it, and at what point the guarantee must be provided.',
          uz: 'Ha, agar shartnoma buni nazarda tutsa — odatda Retention Money Guarantee orqali. Iqtisodiy maʼnosi ravshan: pudratchi aylanma mablagʻlarni boʻshatadi va bankka odatda muzlatilgan kapital qiymatidan ancha arzon komissiya toʻlaydi. Ikki shartni tekshirish kerak: Contract Data buni ruxsat etadimi va kafolat qaysi paytda taqdim etilishi kerak.',
        },
      },
      {
        q: {
          ru: 'Когда возвращается вторая половина удержаний?',
          en: 'When is the second half of retention released?',
          uz: 'Ushlab qolishlarning ikkinchi yarmi qachon qaytariladi?',
        },
        a: {
          ru: 'По завершении периода уведомления о дефектах, вместе с выдачей Performance Certificate. Практическая рекомендация — не ждать конца проекта, а вести реестр дефектов с отметками об устранении и подтверждением Инженера в течение всего DNP. Тогда к моменту закрытия у вас есть документ, который снимает основания затягивать возврат, а не спор о том, что именно осталось не устранено.',
          en: 'At the end of the Defects Notification Period, alongside issue of the Performance Certificate. The practical advice is not to wait for the end of the project but to keep a defects register with rectification entries signed off by the Engineer throughout the DNP. By close-out you then hold a document that removes the grounds for delaying release, rather than an argument about what remains outstanding.',
          uz: 'Nuqson haqida xabar berish davri tugagach, Performance Certificate berilishi bilan birga. Amaliy tavsiya — loyiha oxirini kutmasdan, butun DNP davomida bartaraf etish belgilari va Muhandis tasdigʻi bilan nuqsonlar reestrini yuritish. Shunda yopilish paytiga sizda qaytarishni choʻzish asoslarini olib tashlaydigan hujjat boʻladi, nima bartaraf etilmagani haqidagi bahs emas.',
        },
      },
    ],
  },

  'value-engineering-13-2': {
    practice: {
      ru: 'Value engineering в теории выгоден обеим сторонам, на практике используется редко — потому что подрядчику непонятно, что он получит. Предложение требует инженерной проработки и денег на её подготовку, а механизм распределения выгоды в базовом FIDIC описан неконкретно и часто дополнительно правится в Particular Conditions. Практический подход: до подачи предложения выяснить письменно, как считается экономия, кто несёт риск за изменённое решение и в какой срок Заказчик обязан ответить. Без этих трёх ответов подготовка предложения — инвестиция с неизвестной отдачей.',
      en: 'Value engineering benefits both sides in theory and is rarely used in practice, because the Contractor cannot see what it will get. A proposal requires engineering work and money to prepare, while the mechanism for sharing the benefit is described loosely in base FIDIC and is often further edited in the Particular Conditions. The practical approach: before submitting, establish in writing how the saving is computed, who carries the risk for the changed solution, and within what period the Employer must respond. Without those three answers, preparing a proposal is an investment with an unknown return.',
      uz: 'Value engineering nazariyada ikkala tomonga foydali, amalda esa kam ishlatiladi — chunki pudratchiga nima olishi tushunarsiz. Taklif muhandislik ishlovi va uni tayyorlash uchun pul talab qiladi, foydani taqsimlash mexanizmi esa bazaviy FIDIC da noaniq tasvirlangan va koʻpincha Particular Conditions da qoʻshimcha tuzatiladi. Amaliy yondashuv: taklif berishdan oldin tejamkorlik qanday hisoblanishi, oʻzgartirilgan yechim uchun riskni kim koʻtarishi va Buyurtmachi qanday muddatda javob berishi shartligini yozma aniqlash. Bu uch javobsiz taklif tayyorlash — nomaʼlum qaytimli investitsiya.',
    },
    pitfalls: {
      ru: [
        'Механизм распределения экономии удалён или переписан так, что вся выгода достаётся Заказчику.',
        'Ответственность за изменённое проектное решение целиком переходит к Подрядчику, включая долгосрочную эксплуатацию.',
        'Срок ответа Заказчика не установлен — предложение зависает, а работы идут по исходному решению.',
      ],
      en: [
        'The benefit-sharing mechanism is deleted or rewritten so that the whole saving accrues to the Employer.',
        'Responsibility for the changed design passes wholly to the Contractor, including long-term operation.',
        'No response period is fixed for the Employer — the proposal hangs while the work proceeds on the original design.',
      ],
      uz: [
        'Tejamkorlikni taqsimlash mexanizmi olib tashlangan yoki butun foyda Buyurtmachiga tegadigan qilib qayta yozilgan.',
        'Oʻzgartirilgan loyiha yechimi uchun javobgarlik toʻliq Pudratchiga oʻtadi, shu jumladan uzoq muddatli ekspluatatsiya.',
        'Buyurtmachining javob muddati belgilanmagan — taklif osilib qoladi, ishlar esa dastlabki yechim boʻyicha boradi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Как делится экономия от предложения по Sub-Clause 13.2?',
          en: 'How is the saving from a 13.2 proposal shared?',
          uz: 'Sub-Clause 13.2 boʻyicha takliftan tejamkorlik qanday taqsimlanadi?',
        },
        a: {
          ru: 'Базовый FIDIC предполагает разделение выгоды между сторонами, но конкретная формула задаётся в контракте, и именно её правят чаще всего. Встречаются варианты от равного деления до полного зачисления экономии Заказчику. Поэтому первый вопрос при рассмотрении возможности value engineering — не техническая идея, а текст пункта в вашем конкретном контракте.',
          en: 'Base FIDIC contemplates sharing the benefit between the parties, but the actual formula is set in the contract, and that is precisely what gets edited most. Variants run from an even split to the whole saving accruing to the Employer. So the first question when considering value engineering is not the technical idea but the wording of the clause in your specific contract.',
          uz: 'Bazaviy FIDIC foydani tomonlar oʻrtasida taqsimlashni nazarda tutadi, lekin aniq formula shartnomada belgilanadi va aynan u eng koʻp tuzatiladi. Teng boʻlishdan tortib tejamkorlikni toʻliq Buyurtmachiga yozishgacha variantlar uchraydi. Shuning uchun value engineering imkoniyatini koʻrib chiqishda birinchi savol — texnik gʻoya emas, sizning muayyan shartnomangizdagi band matni.',
        },
      },
      {
        q: {
          ru: 'Кто отвечает, если предложенное решение окажется хуже исходного?',
          en: 'Who is responsible if the proposed solution turns out worse than the original?',
          uz: 'Agar taklif qilingan yechim dastlabkisidan yomonroq chiqsa, kim javob beradi?',
        },
        a: {
          ru: 'Как правило, инициатор изменения — Подрядчик, поскольку предложение исходит от него и он подтверждает его пригодность. Это ключевая причина осторожности: экономия достаётся частично, а риск за долговременную работоспособность решения — целиком. Перед подачей предложения стоит оценить не только выигрыш в стоимости строительства, но и последствия для эксплуатации в течение периода дефектов и после него.',
          en: 'Generally the party proposing the change — the Contractor — since the proposal originates with it and it confirms the solution’s suitability. That is the core reason for caution: the saving is shared, the risk for long-term performance is not. Before submitting, weigh not just the construction cost gain but the consequences for operation during the defects period and beyond.',
          uz: 'Odatda oʻzgarish tashabbuskori — Pudratchi, chunki taklif undan chiqadi va u yechimning yaroqliligini tasdiqlaydi. Bu ehtiyotkorlikning asosiy sababi: tejamkorlik qisman tegadi, yechimning uzoq muddatli ishlashi uchun risk esa toʻliq. Taklif berishdan oldin faqat qurilish qiymatidagi yutuqni emas, nuqson davrida va undan keyin ekspluatatsiya uchun oqibatlarni ham baholash kerak.',
        },
      },
    ],
  },
};
