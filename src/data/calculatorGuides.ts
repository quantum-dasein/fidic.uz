// Explanatory layer for the /tools/calculators/* pages.
//
// The calculators themselves were ~220-word pages: an input form, a result
// panel and a disclaimer. That is thin for a page people reach by searching
// "калькулятор EOT" or "FIDIC time bar calculator" — and it left the tool
// without the one thing a legal calculator most needs, an honest statement of
// what it does NOT account for.
//
// Each guide explains the basis of the calculation, where to find the inputs in
// the contract, how to read the output, and the limits of the result.
//
// Reference-level material, not legal advice.

import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
type LList = Record<Lang, string[]>;

export interface CalculatorGuide {
  /** What the calculator computes and the clause it rests on. */
  basis: L;
  /** Where each input comes from in the contract documents. */
  inputs: LList;
  /** How to read the output without over-reading it. */
  reading: L;
  /** What the calculation deliberately does not model. */
  limits: LList;
  faq: { q: L; a: L }[];
}

export const calculatorGuides: Record<string, CalculatorGuide> = {
  'time-bar': {
    basis: {
      ru: 'Расчёт опирается на Sub-Clause 20.2 изданий 2017: 28 дней на Notice of Claim с момента, когда сторона узнала или должна была узнать о событии, и 84 дня на полностью детализированную претензию. Калькулятор просто откладывает эти периоды от введённой даты — вся сложность не в арифметике, а в том, какую дату считать началом отсчёта.',
      en: 'The calculation rests on Sub-Clause 20.2 of the 2017 editions: 28 days for the Notice of Claim from when the party became aware, or should have become aware, of the event, and 84 days for the fully detailed claim. The calculator simply counts those periods from the date entered — the difficulty is never the arithmetic, it is which date starts the clock.',
      uz: 'Hisob 2017 nashrlarining Sub-Clause 20.2 ga tayanadi: tomon hodisadan xabar topgan yoki topishi kerak boʻlgan paytdan Notice of Claim uchun 28 kun va toʻliq batafsil daʼvo uchun 84 kun. Kalkulyator bu davrlarni kiritilgan sanadan sanaydi — qiyinchilik arifmetikada emas, qaysi sana sanashni boshlashida.',
    },
    inputs: {
      ru: [
        'Дата осведомлённости — не дата, когда claim решили подавать, а дата, когда о событии стало известно или должно было стать известно.',
        'Опорой служит первая запись в журнале работ, первое письмо по теме или протокол совещания — именно их будут смотреть в споре.',
        'Если Particular Conditions сокращают 28 дней, результат калькулятора нужно скорректировать вручную: он считает по стандартным периодам.',
      ],
      en: [
        'The awareness date — not the date the claim was decided on, but the date the event became known or should have become known.',
        'The anchor is the first site diary entry, first letter on the subject or meeting minute — those are what a dispute will examine.',
        'If the Particular Conditions shorten the 28 days, adjust the result manually: the calculator uses the standard periods.',
      ],
      uz: [
        'Xabardorlik sanasi — claim topshirishga qaror qilingan sana emas, hodisa maʼlum boʻlgan yoki boʻlishi kerak boʻlgan sana.',
        'Tayanch — ish jurnalidagi birinchi yozuv, mavzu boʻyicha birinchi xat yoki majlis bayonnomasi: nizoda aynan ularga qaraladi.',
        'Agar Particular Conditions 28 kunni qisqartirsa, natijani qoʻlda tuzatish kerak: kalkulyator standart davrlar boʻyicha hisoblaydi.',
      ],
    },
    reading: {
      ru: 'Зелёный статус означает только то, что календарный срок ещё не истёк, — он ничего не говорит об обоснованности претензии. Красный статус не означает автоматической утраты права: издание 2017 предусматривает механизм оспаривания time-bar, но опираться на него как на план нельзя. В обоих случаях следующий шаг один — подать уведомление в предусмотренной форме, а не откладывать.',
      en: 'A green status means only that the calendar period has not expired; it says nothing about the merits of the claim. A red status does not mean automatic loss of entitlement: the 2017 edition provides a route to challenge a time bar, but it cannot be relied on as a plan. In both cases the next step is the same — serve the notice in the prescribed form rather than deferring it.',
      uz: 'Yashil holat faqat kalendar muddat hali tugamaganini bildiradi — u daʼvoning asosliligi haqida hech narsa demaydi. Qizil holat huquqning avtomatik yoʻqolishini anglatmaydi: 2017 nashri time-bar ga eʼtiroz bildirish mexanizmini nazarda tutadi, lekin unga reja sifatida tayanib boʻlmaydi. Ikkala holatda ham keyingi qadam bir xil — bildirishnomani nazarda tutilgan shaklda topshirish, kechiktirmaslik.',
    },
    limits: {
      ru: [
        'Не учитывает сокращённые или удлинённые сроки, введённые Particular Conditions.',
        'Не проверяет, соблюдены ли требования Sub-Clause 1.3 к форме и способу доставки уведомления.',
        'Не различает разовое и длящееся событие: по продолжающимся обстоятельствам нужны промежуточные claims.',
        'Не учитывает нормы применимого права, которые могут влиять на действительность договорного пресекательного срока.',
      ],
      en: [
        'Does not account for shortened or extended periods introduced by Particular Conditions.',
        'Does not check compliance with the Sub-Clause 1.3 requirements on the form and method of serving a notice.',
        'Does not distinguish a one-off from a continuing event: continuing circumstances require interim claims.',
        'Does not account for rules of the governing law that may affect the validity of a contractual time bar.',
      ],
      uz: [
        'Particular Conditions kiritgan qisqartirilgan yoki uzaytirilgan muddatlarni hisobga olmaydi.',
        'Bildirishnoma shakli va yetkazish usuli boʻyicha Sub-Clause 1.3 talablari bajarilganini tekshirmaydi.',
        'Bir martalik va davomli hodisani ajratmaydi: davomli holatlar boʻyicha oraliq claims kerak.',
        'Shartnomaviy soʻndiruvchi muddat haqiqiyligiga taʼsir qilishi mumkin boʻlgan qoʻllaniladigan huquq normalarini hisobga olmaydi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'От какой даты калькулятор считает 28 дней?',
          en: 'From which date does the calculator count the 28 days?',
          uz: 'Kalkulyator 28 kunni qaysi sanadan sanaydi?',
        },
        a: {
          ru: 'От введённой вами даты осведомлённости, включая её как день ноль. Именно эта дата обычно и становится предметом спора: Инженер отсчитывает от более ранней, подрядчик — от более поздней. Поэтому вводите ту дату, которую вы сможете подтвердить документом, а не ту, которая удобнее.',
          en: 'From the awareness date you enter, treating it as day zero. That date is usually what the dispute is actually about: the Engineer counts from an earlier one, the Contractor from a later one. So enter the date you can evidence with a document, not the one that suits you better.',
          uz: 'Siz kiritgan xabardorlik sanasidan, uni nol kun sifatida hisobga olib. Aynan shu sana odatda nizo predmetiga aylanadi: Muhandis erta sanadan, pudratchi kechroq sanadan sanaydi. Shuning uchun qulayroq sanani emas, hujjat bilan tasdiqlay oladigan sanani kiriting.',
        },
      },
      {
        q: {
          ru: 'Считаются ли 28 дней календарными или рабочими?',
          en: 'Are the 28 days calendar days or working days?',
          uz: '28 kun kalendar kunimi yoki ish kunimi?',
        },
        a: {
          ru: 'По стандартному тексту FIDIC — календарными, и калькулятор считает именно так. Выходные и праздники срок не продлевают. Это одна из причин, по которой уведомление лучше готовить сразу: длинные праздничные периоды в регионе могут съесть заметную часть окна, если тянуть до последних дней.',
          en: 'Under the standard FIDIC text they are calendar days, and the calculator counts them that way. Weekends and public holidays do not extend the period. That is one reason to prepare the notice immediately: long holiday periods in the region can consume a noticeable part of the window if it is left to the last days.',
          uz: 'Standart FIDIC matni boʻyicha — kalendar kunlari va kalkulyator xuddi shunday hisoblaydi. Dam olish va bayram kunlari muddatni uzaytirmaydi. Bu bildirishnomani darhol tayyorlash sabablaridan biri: mintaqadagi uzoq bayram davrlari oxirgi kunlarga qoldirilsa, oynaning sezilarli qismini yeb qoʻyishi mumkin.',
        },
      },
    ],
  },

  'eot-delay': {
    basis: {
      ru: 'Новая дата завершения складывается из исходной Time for Completion и предоставленного продления. Просрочка сверх новой даты — та база, на которой по Sub-Clause 8.8 считается неустойка. Расчёт намеренно простой: вся спорная часть находится не здесь, а в обосновании самого EOT — во влиянии события на критический путь.',
      en: 'The revised completion date is the original Time for Completion plus the extension granted. Delay beyond that revised date is the base on which delay damages are computed under Sub-Clause 8.8. The arithmetic is deliberately simple: everything contentious sits not here but in justifying the EOT itself — the effect of the event on the critical path.',
      uz: 'Yangi yakunlanish sanasi dastlabki Time for Completion va berilgan uzaytirishdan tashkil topadi. Yangi sanadan ortiq kechikish — Sub-Clause 8.8 boʻyicha jarima hisoblanadigan baza. Hisob ataylab oddiy: barcha bahsli qism bu yerda emas, EOT ning oʻzini asoslashda — hodisaning kritik yoʻlga taʼsirida.',
    },
    inputs: {
      ru: [
        'Исходная дата завершения — из Contract Data, с учётом секций, если приёмка идёт частями.',
        'Предоставленный EOT — только то, что уже определено Инженером или согласовано, а не то, что заявлено в претензии.',
        'Фактическая дата завершения — дата Taking-Over, а не дата, когда работы физически закончились на площадке.',
      ],
      en: [
        'The original completion date — from the Contract Data, allowing for sections where taking over is sectional.',
        'The EOT granted — only what the Engineer has determined or the parties have agreed, not what a claim asks for.',
        'The actual completion date — the date of taking over, not the date work physically finished on site.',
      ],
      uz: [
        'Dastlabki yakunlanish sanasi — Contract Data dan, qabul qismlarga boʻlingan boʻlsa, boʻlimlarni hisobga olib.',
        'Berilgan EOT — faqat Muhandis aniqlagan yoki kelishilgan narsa, daʼvoda talab qilingan emas.',
        'Haqiqiy yakunlanish sanasi — Taking-Over sanasi, ishlar obyektda jismonan tugagan sana emas.',
      ],
    },
    reading: {
      ru: 'Ноль дней просрочки означает лишь то, что по введённым цифрам вы уложились в срок. Он не подтверждает, что предоставленный EOT достаточен: если часть заявленных продлений ещё не определена Инженером, реальная картина изменится после определения. И наоборот, показанная просрочка не равна автоматическому начислению неустойки — сначала должны быть рассмотрены все поданные claims.',
      en: 'Zero days of delay means only that, on the figures entered, you finished within time. It does not confirm that the EOT granted is sufficient: where part of the extensions claimed is still undetermined, the picture changes once the Engineer determines them. Equally, delay shown here does not equal automatic damages — all outstanding claims have to be dealt with first.',
      uz: 'Nol kun kechikish faqat kiritilgan raqamlar boʻyicha muddatga ulgurganingizni bildiradi. U berilgan EOT yetarli ekanini tasdiqlamaydi: agar talab qilingan uzaytirishlarning bir qismi Muhandis tomonidan hali aniqlanmagan boʻlsa, qaror chiqqach manzara oʻzgaradi. Aksincha, koʻrsatilgan kechikish avtomatik jarima demakmas — avval barcha topshirilgan claims koʻrib chiqilishi kerak.',
    },
    limits: {
      ru: [
        'Не выполняет анализ задержек: не показывает, какое событие сдвинуло критический путь и на сколько.',
        'Не учитывает параллельные задержки, которые обычно дают время, но не деньги.',
        'Не различает секционную приёмку — при частичной передаче объекта база расчёта другая.',
        'Не считает prolongation costs: продление срока и затраты на него — разные права с разными доказательствами.',
      ],
      en: [
        'Does not perform delay analysis: it does not show which event moved the critical path or by how much.',
        'Does not account for concurrency, which normally yields time but not money.',
        'Does not handle sectional taking-over — where parts are handed over separately the base differs.',
        'Does not compute prolongation costs: extension of time and its cost are separate entitlements on separate evidence.',
      ],
      uz: [
        'Kechikish tahlilini bajarmaydi: qaysi hodisa kritik yoʻlni va qanchaga siljitganini koʻrsatmaydi.',
        'Odatda vaqt beradigan, pul bermaydigan parallel kechikishlarni hisobga olmaydi.',
        'Boʻlimlarga boʻlingan qabulni ajratmaydi — obyekt qisman topshirilganda hisob bazasi boshqa.',
        'Prolongation costs ni hisoblamaydi: muddatni uzaytirish va uning xarajatlari — turli dalillarga ega turli huquqlar.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что делать, если часть EOT ещё не определена Инженером?',
          en: 'What if part of the EOT has not yet been determined by the Engineer?',
          uz: 'Agar EOT ning bir qismi Muhandis tomonidan hali aniqlanmagan boʻlsa nima qilish kerak?',
        },
        a: {
          ru: 'Посчитайте два сценария: по уже определённому продлению и по заявленному целиком. Разница между ними и есть ваша текущая подверженность риску неустойки, пока определения нет. Этот же разрыв обычно и стоит показывать руководству — он нагляднее, чем обсуждение отдельных claims.',
          en: 'Run two scenarios: on the extension already determined and on the full amount claimed. The gap between them is your present exposure to delay damages while the determination is outstanding. That same gap is usually what to show management — it reads more clearly than a discussion of individual claims.',
          uz: 'Ikki stsenariyni hisoblang: allaqachon aniqlangan uzaytirish boʻyicha va toʻliq talab qilingan boʻyicha. Ular orasidagi farq — qaror boʻlmagan paytdagi jarima riskiga hozirgi ochiqligingiz. Odatda rahbariyatga aynan shu farqni koʻrsatish kerak — u alohida claims muhokamasidan koʻra tushunarliroq.',
        },
      },
      {
        q: {
          ru: 'Продлевает ли EOT период уведомления о дефектах?',
          en: 'Does an EOT extend the Defects Notification Period?',
          uz: 'EOT nuqson haqida xabar berish davrini uzaytiradimi?',
        },
        a: {
          ru: 'Нет, напрямую не продлевает: DNP отсчитывается от приёмки, а не от исходной даты завершения. Но EOT сдвигает саму дату приёмки, а значит и начало DNP, и дату выдачи Performance Certificate. Это стоит учитывать при планировании сроков банковских гарантий — они должны покрывать сдвинувшийся период.',
          en: 'Not directly: the DNP runs from taking over, not from the original completion date. But an EOT moves the taking-over date itself, and with it the start of the DNP and the date of the Performance Certificate. Factor that into the validity periods of bank guarantees — they have to cover the shifted window.',
          uz: 'Yoʻq, bevosita uzaytirmaydi: DNP dastlabki yakunlanish sanasidan emas, qabuldan sanaladi. Lekin EOT qabul sanasining oʻzini siljitadi, demak DNP boshlanishini va Performance Certificate berilish sanasini ham. Buni bank kafolatlari muddatlarini rejalashtirishda hisobga olish kerak — ular siljigan davrni qoplashi shart.',
        },
      },
    ],
  },

  'liquidated-damages': {
    basis: {
      ru: 'Сумма считается как ставка за день просрочки, умноженная на число дней, но не выше предела, установленного в Contract Data. Обе величины — договорные: они не выводятся из фактических убытков Заказчика и не требуют их доказывания. Именно поэтому проверка cap важнее спора о ставке: предел ограничивает всю подверженность риску по этому основанию.',
      en: 'The amount is the daily rate multiplied by the days of delay, capped at the limit stated in the Contract Data. Both figures are contractual: they are not derived from the Employer’s actual loss and do not require it to be proved. That is why checking the cap matters more than arguing the rate — the cap bounds the whole exposure under this head.',
      uz: 'Summa kechikish kuni uchun stavkani kunlar soniga koʻpaytirish yoʻli bilan hisoblanadi, lekin Contract Data da belgilangan chegaradan yuqori emas. Ikkala qiymat ham shartnomaviy: ular Buyurtmachining haqiqiy zararidan kelib chiqmaydi va uni isbotlashni talab qilmaydi. Shuning uchun cap ni tekshirish stavka haqidagi bahsdan muhimroq: chegara bu asos boʻyicha butun risk ochiqligini cheklaydi.',
    },
    inputs: {
      ru: [
        'Ставка за день — из Contract Data; обычно процент от Accepted Contract Amount за календарный день.',
        'Дни просрочки — считаются от даты завершения с учётом всех предоставленных EOT, а не от исходной.',
        'Предел (cap) — из Contract Data; если поле пустое, это само по себе повод для вопроса на стадии тендера.',
      ],
      en: [
        'The daily rate — from the Contract Data; usually a percentage of the Accepted Contract Amount per calendar day.',
        'Days of delay — counted from the completion date as extended by every EOT granted, not from the original date.',
        'The cap — from the Contract Data; a blank field is itself a reason to raise a question at tender stage.',
      ],
      uz: [
        'Kun uchun stavka — Contract Data dan; odatda kalendar kuni uchun Accepted Contract Amount dan foiz.',
        'Kechikish kunlari — barcha berilgan EOT hisobga olingan yakunlanish sanasidan sanaladi, dastlabkisidan emas.',
        'Chegara (cap) — Contract Data dan; maydon boʻsh boʻlsa, bu oʻzi tender bosqichida savol berish uchun sabab.',
      ],
    },
    reading: {
      ru: 'Если расчёт упёрся в cap, это значит, что дальнейшая просрочка по данному основанию суммы не увеличивает, — но не значит, что риск закончился. При достижении предела у Заказчика могут появиться другие механизмы, включая расторжение. И обратная сторона: в стандартной конструкции FIDIC неустойка является исчерпывающим средством за задержку, поэтому взыскать те же убытки повторно нельзя.',
      en: 'If the calculation has hit the cap, further delay adds nothing under this head — but that does not mean the risk has ended. Once the cap is reached the Employer may have other mechanisms available, including termination. The reverse also holds: in the standard FIDIC structure delay damages are the sole remedy for late completion, so the same loss cannot be recovered twice.',
      uz: 'Agar hisob cap ga tayangan boʻlsa, bu asos boʻyicha keyingi kechikish summani oshirmaydi — lekin risk tugadi degani emas. Chegaraga yetganda Buyurtmachida boshqa mexanizmlar, shu jumladan bekor qilish paydo boʻlishi mumkin. Teskari tomoni ham bor: standart FIDIC konstruksiyasida jarima kechikish uchun yagona vosita, shuning uchun oʻsha zararni qayta undirib boʻlmaydi.',
    },
    limits: {
      ru: [
        'Не учитывает секционную приёмку: после передачи части объекта размер неустойки должен уменьшаться пропорционально.',
        'Не проверяет, все ли поданные claims об EOT рассмотрены, — а именно они меняют число дней просрочки.',
        'Не оценивает, устоит ли оговорка о неустойке по применимому праву, если она сформулирована как штраф.',
        'Не учитывает валютные оговорки, если ставка и платежи выражены в разных валютах.',
      ],
      en: [
        'Does not account for sectional taking-over: once part of the works is handed over, the rate should reduce proportionally.',
        'Does not check whether every EOT claim has been dealt with — and it is those that change the number of days.',
        'Does not assess whether the damages provision survives under the governing law where it reads as a penalty.',
        'Does not handle currency provisions where the rate and the payments are denominated differently.',
      ],
      uz: [
        'Boʻlimlarga boʻlingan qabulni hisobga olmaydi: obyektning bir qismi topshirilgach, jarima miqdori mutanosib kamayishi kerak.',
        'Barcha topshirilgan EOT claims koʻrib chiqilganini tekshirmaydi — aynan ular kechikish kunlari sonini oʻzgartiradi.',
        'Jarima haqidagi band shtraf sifatida shakllantirilgan boʻlsa, u qoʻllaniladigan huquq boʻyicha kuchda qolishini baholamaydi.',
        'Stavka va toʻlovlar turli valyutalarda ifodalangan boʻlsa, valyuta bandlarini hisobga olmaydi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что делать, если в Contract Data не указан предел неустойки?',
          en: 'What if the Contract Data states no cap on delay damages?',
          uz: 'Agar Contract Data da jarima chegarasi koʻrsatilmagan boʻlsa nima qilish kerak?',
        },
        a: {
          ru: 'Это следует поднимать на стадии разъяснений к тендеру, а не после подписания. Отсутствие предела означает, что подверженность риску по этому основанию формально не ограничена и растёт с каждым днём просрочки. В большинстве проектов такое поле — результат невнимательности при подготовке пакета, и вопрос на стадии clarification закрывает его без конфликта.',
          en: 'Raise it at tender clarification stage, not after signature. No cap means exposure under this head is formally unbounded and grows with every day of delay. On most projects a blank field is an oversight in preparing the package, and a clarification question closes it without conflict.',
          uz: 'Buni imzolashdan keyin emas, tenderga tushuntirishlar bosqichida koʻtarish kerak. Chegara yoʻqligi bu asos boʻyicha risk ochiqligi rasman cheklanmagan va har kuni kechikish bilan oʻsishini bildiradi. Koʻp loyihalarda bunday maydon paket tayyorlashdagi eʼtiborsizlik natijasi va clarification bosqichidagi savol uni mojarosiz yopadi.',
        },
      },
      {
        q: {
          ru: 'Может ли Заказчик удержать неустойку из промежуточного платежа?',
          en: 'Can the Employer deduct delay damages from an interim payment?',
          uz: 'Buyurtmachi jarimani oraliq toʻlovdan ushlab qola oladimi?',
        },
        a: {
          ru: 'Обычно да, при соблюдении процедуры уведомления и определения. Но если позже будет предоставлен EOT, покрывающий этот период, удержанное подлежит возврату. Практически это означает, что удержание до рассмотрения всех поданных claims — рискованный шаг для Заказчика и повод для встречной претензии подрядчика о задержке платежа.',
          en: 'Usually yes, provided the notice and determination procedure is followed. But if an EOT covering that period is later granted, the deduction must be returned. In practice, deducting before every outstanding claim has been dealt with is a risky move for the Employer and gives the Contractor grounds for a counter-claim on late payment.',
          uz: 'Odatda ha, bildirishnoma va qaror protsedurasi bajarilsa. Lekin keyinchalik shu davrni qoplaydigan EOT berilsa, ushlab qolingan mablagʻ qaytarilishi kerak. Amalda bu barcha topshirilgan claims koʻrib chiqilgunga qadar ushlab qolish Buyurtmachi uchun xavfli qadam va pudratchiga toʻlov kechikishi boʻyicha qarshi daʼvo uchun sabab ekanini anglatadi.',
        },
      },
    ],
  },

  'interim-payment': {
    basis: {
      ru: 'Сумма к оплате за период = накопленная стоимость выполненных работ и материалов − удержание (retention) − погашение аванса − уже сертифицированные ранее суммы. Логика Clause 14 накопительная: каждый сертификат пересчитывает всю картину с начала проекта, а не только текущий месяц, поэтому корректировка прошлых периодов входит в текущий IPC автоматически.',
      en: 'The amount due for the period = cumulative value of work and materials − retention − advance payment recovery − amounts previously certified. The Clause 14 logic is cumulative: each certificate recomputes the whole picture from project start rather than the current month alone, so corrections to earlier periods flow into the current IPC automatically.',
      uz: 'Davr uchun toʻlanadigan summa = bajarilgan ishlar va materiallarning toʻplangan qiymati − ushlab qolish (retention) − avansni qoplash − avval sertifikatlangan summalar. Clause 14 mantiqi toʻplanuvchi: har bir sertifikat faqat joriy oyni emas, loyiha boshidan butun manzarani qayta hisoblaydi, shuning uchun oʻtgan davrlarni tuzatish joriy IPC ga avtomatik kiradi.',
    },
    inputs: {
      ru: [
        'Накопленная стоимость — итог с начала проекта, а не выработка за месяц; иначе расчёт даст ошибку в разы.',
        'Процент удержания и его предельная сумма — поля Contract Data; после достижения предела удержание больше не начисляется.',
        'Погашение аванса — по формуле из контракта, обычно процент от суммы периода после превышения порога.',
        'Ранее сертифицировано — сумма всех предыдущих IPC, а не последнего.',
      ],
      en: [
        'Cumulative value — the total from project start, not the month’s output; otherwise the result is out by a wide margin.',
        'Retention percentage and its limit — Contract Data entries; once the limit is reached no further retention accrues.',
        'Advance payment recovery — per the contract formula, usually a percentage of the period amount above a threshold.',
        'Previously certified — the sum of all earlier IPCs, not just the last one.',
      ],
      uz: [
        'Toʻplangan qiymat — loyiha boshidan jami, oylik ishlab chiqarish emas; aks holda natija bir necha barobar xato boʻladi.',
        'Ushlab qolish foizi va uning chegara summasi — Contract Data maydonlari; chegaraga yetgach ushlab qolish hisoblanmaydi.',
        'Avansni qoplash — shartnomadagi formula boʻyicha, odatda chegaradan oshgach davr summasidan foiz.',
        'Avval sertifikatlangan — barcha oldingi IPC lar summasi, oxirgisi emas.',
      ],
    },
    reading: {
      ru: 'Полученная цифра — это сумма, которую следует заявить, а не та, которую обязательно сертифицируют. Инженер вправе не принять позиции, не подтверждённые обмерами и документами, поэтому расхождение между заявкой и сертификатом — норма, а не признак конфликта. Спорить стоит не с самим фактом снижения, а с конкретными вычеркнутыми позициями, требуя письменного обоснования по каждой.',
      en: 'The figure produced is what to apply for, not what will necessarily be certified. The Engineer may decline items unsupported by measurement and documentation, so a gap between application and certificate is normal rather than a sign of conflict. What is worth contesting is not the reduction as such but the specific items struck out, asking for written reasons on each.',
      uz: 'Olingan raqam — talab qilish kerak boʻlgan summa, albatta sertifikatlanadigan emas. Muhandis oʻlchov va hujjatlar bilan tasdiqlanmagan pozitsiyalarni qabul qilmasligi mumkin, shuning uchun ariza va sertifikat orasidagi farq mojaro belgisi emas, meyor. Kamaytirish faktining oʻzi bilan emas, oʻchirilgan aniq pozitsiyalar bilan bahslashish kerak, har biri boʻyicha yozma asoslash talab qilib.',
    },
    limits: {
      ru: [
        'Не учитывает корректировки по колебаниям цен и изменениям законодательства, если контракт их предусматривает.',
        'Не считает налоги и валютные пересчёты при платежах в нескольких валютах.',
        'Не проверяет, достигнут ли минимальный порог суммы промежуточного сертификата, ниже которого он не выдаётся.',
        'Не отражает удержания Заказчика по иным основаниям — например, встречные требования или неустойку.',
      ],
      en: [
        'Does not apply price-fluctuation or change-in-law adjustments where the contract provides for them.',
        'Does not compute tax or currency conversion where payment is made in more than one currency.',
        'Does not check the minimum interim certificate amount below which no certificate is issued.',
        'Does not reflect Employer deductions on other grounds — cross-claims or delay damages, for instance.',
      ],
      uz: [
        'Shartnoma nazarda tutgan boʻlsa, narx tebranishi va qonunchilik oʻzgarishi boʻyicha tuzatishlarni hisobga olmaydi.',
        'Bir necha valyutada toʻlovda soliq va valyuta qayta hisobini hisoblamaydi.',
        'Oraliq sertifikat berilmaydigan minimal summa chegarasiga yetilganini tekshirmaydi.',
        'Buyurtmachining boshqa asoslar boʻyicha ushlab qolishlarini — masalan, qarshi talablar yoki jarimani — aks ettirmaydi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Почему сертифицированная сумма меньше заявленной?',
          en: 'Why is the certified amount lower than the amount applied for?',
          uz: 'Nega sertifikatlangan summa talab qilingandan kam?',
        },
        a: {
          ru: 'Чаще всего из-за объёмов, не подтверждённых совместным обмером, материалов на площадке без документов о поставке и праве собственности, либо позиций, которые Инженер относит к ещё не выполненным. Первый шаг — не спор, а запрос письменной расшифровки по позициям: в большинстве случаев вопрос закрывается документами, а не аргументами.',
          en: 'Most often because of quantities not confirmed by joint measurement, materials on site without delivery and title documentation, or items the Engineer treats as not yet executed. The first step is not an argument but a request for a written line-by-line breakdown: in most cases the issue closes on documents rather than debate.',
          uz: 'Koʻpincha birgalikdagi oʻlchov bilan tasdiqlanmagan hajmlar, yetkazib berish va mulk huquqi hujjatlarisiz obyektdagi materiallar yoki Muhandis hali bajarilmagan deb hisoblagan pozitsiyalar tufayli. Birinchi qadam — bahs emas, pozitsiyalar boʻyicha yozma tafsilot soʻrash: aksariyat hollarda masala dalillar bilan emas, hujjatlar bilan yopiladi.',
        },
      },
      {
        q: {
          ru: 'Включаются ли материалы на площадке в промежуточный платёж?',
          en: 'Are materials on site included in an interim payment?',
          uz: 'Obyektdagi materiallar oraliq toʻlovga kiradimi?',
        },
        a: {
          ru: 'Как правило да, если контракт это предусматривает и выполнены его условия: материалы поставлены на площадку, соответствуют спецификации, надлежаще хранятся и застрахованы, а право собственности переходит к Заказчику. Конкретный перечень условий — в Contract Data и Particular Conditions, и его стоит прочитать до первой заявки, а не после отказа.',
          en: 'Generally yes, where the contract provides for it and its conditions are met: the materials are delivered to site, conform to specification, are properly stored and insured, and title passes to the Employer. The precise conditions sit in the Contract Data and Particular Conditions, and are worth reading before the first application rather than after a rejection.',
          uz: 'Odatda ha, agar shartnoma buni nazarda tutsa va uning shartlari bajarilsa: materiallar obyektga yetkazilgan, spetsifikatsiyaga mos, tegishli saqlanadi va sugʻurtalangan, mulk huquqi esa Buyurtmachiga oʻtadi. Aniq shartlar roʻyxati Contract Data va Particular Conditions da va uni rad javobdan keyin emas, birinchi arizadan oldin oʻqish kerak.',
        },
      },
    ],
  },

  'daab-timeline': {
    basis: {
      ru: 'Таймлайн строится по срокам Clause 21 изданий 2017: решение DAAB — в течение 84 дней с передачи спора (21.4.3), Notice of Dissatisfaction — 28 дней после решения (21.4.4), период попытки мирного урегулирования — 28 дней (21.5), затем открывается путь в арбитраж. Эти сроки процессуальные: их пропуск меняет не сумму, а саму доступность следующей ступени.',
      en: 'The timeline follows the Clause 21 periods of the 2017 editions: the DAAB decision within 84 days of referral (21.4.3), a Notice of Dissatisfaction within 28 days of the decision (21.4.4), a 28-day amicable settlement period (21.5), and then the route to arbitration opens. These are procedural periods: missing one changes not the amount but whether the next rung is available at all.',
      uz: 'Taymlayn 2017 nashrlarining Clause 21 muddatlari boʻyicha quriladi: DAAB qarori — nizo topshirilgandan 84 kun ichida (21.4.3), Notice of Dissatisfaction — qarordan keyin 28 kun (21.4.4), tinch kelishuvga urinish davri — 28 kun (21.5), keyin arbitrajga yoʻl ochiladi. Bu muddatlar protsessual: ularni oʻtkazib yuborish summani emas, keyingi bosqichning mavjudligini oʻzgartiradi.',
    },
    inputs: {
      ru: [
        'Дата передачи спора в DAAB — дата формального referral, а не дата, когда разногласие возникло.',
        'Дата получения решения DAAB — заполняется, когда решение фактически получено; до этого расчёт показывает крайний срок.',
        'Если DAAB не сформирован, таймлайн неприменим: сначала нужно решить вопрос состава совета.',
      ],
      en: [
        'The referral date — the date of formal referral to the DAAB, not the date the disagreement arose.',
        'The date the DAAB decision was received — filled in once it actually arrives; until then the calculation shows the deadline.',
        'If no DAAB has been constituted the timeline does not apply: the composition of the board has to be resolved first.',
      ],
      uz: [
        'Nizoni DAAB ga topshirish sanasi — rasmiy referral sanasi, kelishmovchilik yuzaga kelgan sana emas.',
        'DAAB qarorini olish sanasi — qaror haqiqatda olingach toʻldiriladi; unga qadar hisob oxirgi muddatni koʻrsatadi.',
        'Agar DAAB tuzilmagan boʻlsa, taymlayn qoʻllanilmaydi: avval kengash tarkibi masalasini hal qilish kerak.',
      ],
    },
    reading: {
      ru: 'Ключевая точка таймлайна — срок Notice of Dissatisfaction. Его пропуск обычно означает, что решение DAAB становится окончательным и обязательным, и путь в арбитраж по этому спору закрывается. При этом само решение подлежит немедленному исполнению независимо от подачи NOD: несогласие открывает следующую ступень, но не приостанавливает обязанность исполнить.',
      en: 'The critical point on the timeline is the Notice of Dissatisfaction deadline. Missing it normally makes the DAAB decision final and binding, closing the route to arbitration on that dispute. Meanwhile the decision itself is binding with immediate effect regardless of an NOD: disagreement opens the next rung but does not suspend the duty to comply.',
      uz: 'Taymlayning asosiy nuqtasi — Notice of Dissatisfaction muddati. Uni oʻtkazib yuborish odatda DAAB qarori yakuniy va majburiy boʻlishini va shu nizo boʻyicha arbitrajga yoʻl yopilishini anglatadi. Shu bilan birga qarorning oʻzi NOD topshirilganidan qatʼi nazar darhol ijro etilishi shart: rozilik bermaslik keyingi bosqichni ochadi, lekin bajarish majburiyatini toʻxtatmaydi.',
    },
    limits: {
      ru: [
        'Не учитывает изменённые сроки, если Particular Conditions или DAAB Rules отличаются от стандартных.',
        'Не проверяет, сформирован ли DAAB и соблюдены ли требования к составу и назначению членов.',
        'Не учитывает возможное продление сроков по соглашению сторон.',
        'Не показывает сроки арбитражного регламента — они задаются выбранными правилами (ICC или иными), а не Clause 21.',
      ],
      en: [
        'Does not account for modified periods where the Particular Conditions or DAAB Rules depart from the standard.',
        'Does not check whether the DAAB is constituted or whether the requirements on composition and appointment were met.',
        'Does not account for extensions of the periods agreed between the parties.',
        'Does not show arbitration timetable steps — those follow the chosen rules (ICC or other), not Clause 21.',
      ],
      uz: [
        'Particular Conditions yoki DAAB Rules standartdan farq qilsa, oʻzgartirilgan muddatlarni hisobga olmaydi.',
        'DAAB tuzilganini va tarkib hamda aʼzolarni tayinlash talablari bajarilganini tekshirmaydi.',
        'Tomonlar kelishuvi boʻyicha muddatlarni uzaytirish imkoniyatini hisobga olmaydi.',
        'Arbitraj reglamenti muddatlarini koʻrsatmaydi — ular Clause 21 emas, tanlangan qoidalar (ICC yoki boshqa) bilan belgilanadi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что если DAAB не вынес решение в 84 дня?',
          en: 'What if the DAAB does not issue a decision within 84 days?',
          uz: 'Agar DAAB 84 kunda qaror chiqarmasa nima boʻladi?',
        },
        a: {
          ru: 'Контракт предусматривает, что при отсутствии решения в срок любая из сторон может подать Notice of Dissatisfaction и двигаться дальше по лестнице спора. То есть бездействие совета не запирает процесс. Но опираться на этот сценарий не стоит: решение DAAB часто снимает спор дешевле и быстрее, чем арбитраж, поэтому продление срока по соглашению сторон нередко выгоднее эскалации.',
          en: 'The contract provides that where no decision is given in time, either party may serve a Notice of Dissatisfaction and move up the ladder. So an inactive board does not lock the process. But it is not a scenario to plan around: a DAAB decision often resolves the dispute more cheaply and faster than arbitration, so agreeing an extension is frequently better value than escalating.',
          uz: 'Shartnoma muddatda qaror boʻlmasa, har qanday tomon Notice of Dissatisfaction topshirib, nizo zinapoyasi boʻyicha yuqoriga koʻtarilishi mumkinligini nazarda tutadi. Yaʼni kengashning harakatsizligi jarayonni qulflamaydi. Lekin bu stsenariyga tayanmaslik kerak: DAAB qarori nizoni koʻpincha arbitrajdan arzonroq va tezroq hal qiladi, shuning uchun tomonlar kelishuvi bilan muddatni uzaytirish eskalatsiyadan foydaliroq.',
        },
      },
      {
        q: {
          ru: 'Можно ли идти в арбитраж, минуя DAAB?',
          en: 'Can arbitration be commenced without going through the DAAB?',
          uz: 'DAAB ni chetlab arbitrajga borish mumkinmi?',
        },
        a: {
          ru: 'По общему правилу нет: прохождение ступеней Clause 21 — условие обращения в арбитраж, и попытка его обойти обычно приводит к возражению о недопустимости иска. Ограниченные исключения касаются ситуаций, когда DAAB отсутствует и не может быть сформирован. Это тот случай, где стоит получить процессуальную консультацию до подачи, а не после.',
          en: 'As a general rule no: working through the Clause 21 steps is a condition of arbitrating, and attempting to bypass it usually invites a jurisdictional or admissibility objection. Narrow exceptions apply where there is no DAAB in place and none can be constituted. This is a point on which to take procedural advice before filing rather than after.',
          uz: 'Umumiy qoida boʻyicha yoʻq: Clause 21 bosqichlaridan oʻtish arbitrajga murojaat qilish sharti va uni chetlab oʻtishga urinish odatda daʼvoning maqbul emasligi haqidagi eʼtirozga olib keladi. Cheklangan istisnolar DAAB yoʻq va uni tuzib boʻlmaydigan holatlarga tegishli. Bu topshirishdan keyin emas, oldin protsessual maslahat olish kerak boʻlgan holat.',
        },
      },
    ],
  },
};
