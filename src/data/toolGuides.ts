// Explanatory layer for the interactive tools under /tools/.
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

export interface ToolGuide {
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

export const toolGuides: Record<string, ToolGuide> = {
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

  'book-selector': {
    basis: {
      ru: 'Инструмент сопоставляет ответы о модели проекта с профилями книг радужной серии и предлагает форму, которая соответствует этой модели. Логика подбора идёт от трёх вопросов: кто выполняет проектирование, как оценивается работа и кто несёт георискатегорию. Именно эти три ответа, а не отраслевая привычка, и определяют правильную книгу.',
      en: 'The tool matches answers about the delivery model against the profiles of the Rainbow Suite books and proposes the form that fits. The selection logic turns on three questions: who performs the design, how the work is valued, and who carries ground risk. Those three answers, rather than sector habit, determine the right book.',
      uz: 'Vosita loyiha modeli haqidagi javoblarni kamalak seriyasi kitoblari profillari bilan solishtiradi va shu modelga mos formani taklif qiladi. Tanlov mantiqi uch savoldan kelib chiqadi: loyihalashni kim bajaradi, ish qanday baholanadi va georiskni kim koʻtaradi. Aynan shu uch javob, tarmoq odati emas, toʻgʻri kitobni belgilaydi.',
    },
    inputs: {
      ru: [
        'Проектирование — смотрите на фактическую готовность документации к тендеру, а не на планы её доработать.',
        'Способ оценки — есть ли ведомость объёмов, по которой можно делать обмер, или цена твёрдая с вехами.',
        'Геология — изучена ли площадка изысканиями и приложены ли отчёты к тендерному пакету.',
        'Роль Инженера — нужен ли независимый администратор контракта или заказчик будет управлять сам.',
      ],
      en: [
        'Design — judge the actual state of the documentation at tender, not the plan to develop it further.',
        'Valuation — whether there is a bill of quantities to measure against, or a lump sum against milestones.',
        'Ground — whether the site has been investigated and the reports are in the tender package.',
        'The Engineer’s role — whether an independent contract administrator is needed or the Employer will run it.',
      ],
      uz: [
        'Loyihalash — hujjatlarni keyinchalik ishlab chiqish rejalariga emas, tenderdagi haqiqiy tayyorligiga qarang.',
        'Baholash usuli — oʻlchov qilish mumkin boʻlgan hajmlar vedomosti bormi yoki narx bosqichlar bilan qatʼiymi.',
        'Geologiya — obyekt izlanishlar bilan oʻrganilganmi va hisobotlar tender paketiga ilova qilinganmi.',
        'Muhandis roli — mustaqil shartnoma administratori kerakmi yoki buyurtmachi oʻzi boshqaradimi.',
      ],
    },
    reading: {
      ru: 'Результат — отправная точка для обсуждения, а не готовое решение. Если инструмент предлагает Silver Book, а геология не изучена, это сигнал не к выбору формы, а к тому, что проект ещё не готов к тендеру. Смешанные ситуации решаются не «средней» книгой, а чётким разграничением ответственности в Employer\'s Requirements.',
      en: 'The result is a starting point for discussion, not a decision. If the tool suggests the Silver Book while the geology is unexplored, that is a signal about project readiness rather than about form selection. Mixed cases are not solved by a middle book but by drawing a clear line of responsibility in the Employer’s Requirements.',
      uz: 'Natija — tayyor qaror emas, muhokama uchun boshlangʻich nuqta. Agar vosita Silver Book taklif qilsa-yu, geologiya oʻrganilmagan boʻlsa, bu forma tanlash emas, loyiha hali tenderga tayyor emasligi haqidagi signal. Aralash holatlar «oʻrtacha» kitob bilan emas, Employer\'s Requirements da javobgarlikni aniq ajratish bilan hal qilinadi.',
    },
    limits: {
      ru: [
        'Не учитывает требования банка развития: в проектах МФО форма часто задана закупочными документами заранее.',
        'Не оценивает готовность рынка подрядчиков к выбранной модели в конкретной юрисдикции.',
        'Не проверяет совместимость выбранной формы с местным правом — это отдельная работа над Particular Conditions.',
        'Не различает подтипы внутри книги: Red Book в редакции 2017 и в MDB Harmonised Edition ведут себя по-разному.',
      ],
      en: [
        'Does not account for lender requirements: on MDB projects the form is often fixed by the bidding documents in advance.',
        'Does not assess whether the local contractor market is ready for the chosen model.',
        'Does not check the chosen form against local law — that is separate work on the Particular Conditions.',
        'Does not distinguish variants within a book: the Red Book 2017 and the MDB Harmonised Edition behave differently.',
      ],
      uz: [
        'Taraqqiyot banki talablarini hisobga olmaydi: XTB loyihalarida forma koʻpincha xarid hujjatlari bilan oldindan belgilangan.',
        'Muayyan yurisdiksiyada pudratchilar bozori tanlangan modelga tayyorligini baholamaydi.',
        'Tanlangan formaning mahalliy huquq bilan mosligini tekshirmaydi — bu Particular Conditions ustidagi alohida ish.',
        'Kitob ichidagi kichik turlarni ajratmaydi: 2017 tahriridagi Red Book va MDB Harmonised Edition turlicha ishlaydi.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Что делать, если банк уже задал форму контракта?',
          en: 'What if the lender has already fixed the contract form?',
          uz: 'Agar bank shartnoma formasini allaqachon belgilagan boʻlsa nima qilish kerak?',
        },
        a: {
          ru: 'Тогда выбор книги закрыт, и инструмент полезен иначе — как способ увидеть, где заданная форма расходится с реальной моделью проекта. Каждое такое расхождение придётся закрывать в Particular Conditions или закладывать в цену. Это ровно тот список, который стоит проработать на стадии разъяснений к тендеру.',
          en: 'Then the choice is closed, and the tool is useful differently — as a way to see where the imposed form diverges from the real delivery model. Each divergence will have to be closed in the Particular Conditions or priced in. That is precisely the list worth working through at tender clarification stage.',
          uz: 'U holda kitob tanlash yopiq va vosita boshqacha foydali — belgilangan forma loyihaning real modelidan qayerda farq qilishini koʻrish usuli sifatida. Har bir bunday farqni Particular Conditions da yopish yoki narxga kiritish kerak boʻladi. Bu aynan tenderga tushuntirishlar bosqichida ishlab chiqishga arziydigan roʻyxat.',
        },
      },
      {
        q: {
          ru: 'Можно ли взять Yellow Book, если проект готов наполовину?',
          en: 'Can the Yellow Book be used when the design is half complete?',
          uz: 'Agar loyiha yarim tayyor boʻlsa, Yellow Book olish mumkinmi?',
        },
        a: {
          ru: 'Можно, но опасность в другом: Employer\'s Requirements часто наполовину состоят из готовых предписывающих решений. Тогда подрядчик формально отвечает за пригодность результата, но не контролирует ключевые проектные решения. Если идёте по этому пути, разграничьте в требованиях явно: что проектирует подрядчик и по каким функциональным критериям это принимается.',
          en: 'It can, but the danger lies elsewhere: the Employer’s Requirements are often half prescriptive solutions. The Contractor is then formally answerable for fitness for purpose while not controlling the key design decisions. If you go this way, draw the line explicitly in the requirements: what the Contractor designs and against which functional criteria it is accepted.',
          uz: 'Mumkin, lekin xavf boshqa narsada: Employer\'s Requirements koʻpincha yarmi tayyor koʻrsatma yechimlardan iborat. U holda pudratchi rasman natija yaroqliligi uchun javob beradi, lekin asosiy loyiha qarorlarini nazorat qilmaydi. Bu yoʻldan borsangiz, talablarda aniq ajrating: pudratchi nimani loyihalashtiradi va u qanday funksional mezonlar boʻyicha qabul qilinadi.',
        },
      },
    ],
  },

  'notice-deadline': {
    basis: {
      ru: 'Инструмент откладывает от даты события договорные сроки уведомлений по FIDIC 2017 и показывает, какие из них уже наступили. В основе те же периоды, что и в Sub-Clause 20.2, но задача шире: не только claim, но и уведомления по другим пунктам, у каждого из которых свой срок и своё последствие пропуска.',
      en: 'The tool counts the FIDIC 2017 contractual notice periods from an event date and shows which have already fallen due. It rests on the same periods as Sub-Clause 20.2, but the scope is wider: not just claims, but notices under other clauses, each with its own period and its own consequence for missing it.',
      uz: 'Vosita hodisa sanasidan FIDIC 2017 boʻyicha shartnomaviy bildirishnoma muddatlarini sanaydi va qaysilari allaqachon kelganini koʻrsatadi. Asosda Sub-Clause 20.2 dagi kabi davrlar, lekin vazifa kengroq: faqat claim emas, boshqa bandlar boʻyicha bildirishnomalar ham, ularning har birida oʻz muddati va oʻtkazib yuborish oqibati bor.',
    },
    inputs: {
      ru: [
        'Дата события — та, которую вы сможете подтвердить записью в журнале, входящим письмом или протоколом.',
        'Тип уведомления — от него зависит применимый период; уведомление о претензии и advance warning живут по разным правилам.',
        'Если Particular Conditions меняют период, результат нужно скорректировать вручную.',
      ],
      en: [
        'The event date — the one you can evidence from a diary entry, an incoming letter or a minute.',
        'The notice type — it determines the applicable period; a claim notice and an advance warning run on different rules.',
        'If the Particular Conditions change the period, adjust the result manually.',
      ],
      uz: [
        'Hodisa sanasi — jurnaldagi yozuv, kiruvchi xat yoki bayonnoma bilan tasdiqlay oladiganingiz.',
        'Bildirishnoma turi — qoʻllaniladigan davr shunga bogʻliq; daʼvo bildirishnomasi va advance warning turli qoidalar boʻyicha yashaydi.',
        'Agar Particular Conditions davrni oʻzgartirsa, natijani qoʻlda tuzatish kerak.',
      ],
    },
    reading: {
      ru: 'Наступивший срок не всегда означает утрату права: последствия пропуска у разных уведомлений разные. Пропуск 28 дней по Sub-Clause 20.2 в общем случае лишает права на claim, а неподача advance warning по Sub-Clause 8.4 сама по себе права не лишает, но может повлиять на размер присуждённого. Поэтому смотрите не только на цвет статуса, но и на то, какой это пункт.',
      en: 'An expired period does not always mean lost entitlement: the consequences differ by notice type. Missing the 28 days under Sub-Clause 20.2 generally bars the claim, whereas failing to give advance warning under Sub-Clause 8.4 does not bar it but can affect what is ultimately awarded. So read not just the status colour but which clause it belongs to.',
      uz: 'Kelgan muddat har doim ham huquq yoʻqolishini anglatmaydi: turli bildirishnomalarda oqibatlar har xil. Sub-Clause 20.2 boʻyicha 28 kunni oʻtkazib yuborish odatda claim huquqidan mahrum qiladi, Sub-Clause 8.4 boʻyicha advance warning bermaslik esa huquqdan mahrum qilmaydi, lekin hukm qilingan miqdorga taʼsir qilishi mumkin. Shuning uchun faqat holat rangiga emas, bu qaysi band ekaniga ham qarang.',
    },
    limits: {
      ru: [
        'Не проверяет требования Sub-Clause 1.3 к форме, адресату и способу доставки уведомления.',
        'Не учитывает изменённые Particular Conditions периоды.',
        'Не различает разовое и длящееся событие: по продолжающимся обстоятельствам нужна серия уведомлений.',
        'Не заменяет реестр уведомлений — для контроля по проекту нужен постоянный журнал, а не разовый расчёт.',
      ],
      en: [
        'Does not check the Sub-Clause 1.3 requirements on form, addressee and method of service.',
        'Does not account for periods modified by the Particular Conditions.',
        'Does not distinguish one-off from continuing events: continuing circumstances need a series of notices.',
        'Does not replace a notice register — project control needs a standing log, not a one-off calculation.',
      ],
      uz: [
        'Bildirishnoma shakli, manzili va yetkazish usuli boʻyicha Sub-Clause 1.3 talablarini tekshirmaydi.',
        'Particular Conditions oʻzgartirgan davrlarni hisobga olmaydi.',
        'Bir martalik va davomli hodisani ajratmaydi: davomli holatlar uchun bildirishnomalar seriyasi kerak.',
        'Bildirishnomalar reestrini almashtirmaydi — loyihani nazorat qilish uchun bir martalik hisob emas, doimiy jurnal kerak.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Какие уведомления по FIDIC 2017 чаще всего пропускают?',
          en: 'Which FIDIC 2017 notices are missed most often?',
          uz: 'FIDIC 2017 boʻyicha qaysi bildirishnomalar koʻproq oʻtkazib yuboriladi?',
        },
        a: {
          ru: 'Три группы. Уведомление о претензии по Sub-Clause 20.2 — из-за спора о дате осведомлённости. Уведомление о непредвиденных физических условиях по Sub-Clause 4.12 — потому что работы продолжают, и условие физически исчезает. И уведомление о намерении приостановить работы при неоплате — подрядчики уходят с площадки без него и превращают обоснованную позицию в собственное нарушение.',
          en: 'Three groups. The claim notice under Sub-Clause 20.2, because of the argument about the awareness date. The notice of unforeseeable physical conditions under Sub-Clause 4.12, because work carries on and the condition physically disappears. And the notice of intention to suspend for non-payment — contractors walk off site without it and convert a sound position into their own breach.',
          uz: 'Uch guruh. Sub-Clause 20.2 boʻyicha daʼvo bildirishnomasi — xabardorlik sanasi boʻyicha bahs tufayli. Sub-Clause 4.12 boʻyicha kutilmagan jismoniy sharoitlar haqidagi bildirishnoma — ishlar davom etadi va sharoit jismonan yoʻqoladi. Va toʻlanmaganda ishlarni toʻxtatish niyati haqidagi bildirishnoma — pudratchilar busiz obyektdan ketadi va asosli pozitsiyani oʻz buzilishiga aylantiradi.',
        },
      },
      {
        q: {
          ru: 'Нужно ли подавать уведомление, если Инженер и так всё знает?',
          en: 'Is a notice still needed if the Engineer already knows?',
          uz: 'Agar Muhandis hammasini bilsa ham, bildirishnoma berish kerakmi?',
        },
        a: {
          ru: 'Да. Фактическая осведомлённость Инженера не заменяет договорное уведомление: срок отсчитывается от события, а не от того, обсуждали ли вопрос на совещании. Осведомлённость Инженера может пригодиться позже — при оспаривании утраты права она учитывается, — но строить на ней позицию вместо своевременного уведомления нельзя.',
          en: 'Yes. The Engineer’s actual knowledge does not substitute for a contractual notice: the period runs from the event, not from whether the matter was discussed at a meeting. That knowledge may help later — it is a factor when challenging a time bar — but it is not a substitute for serving notice in time.',
          uz: 'Ha. Muhandisning haqiqiy xabardorligi shartnomaviy bildirishnomani almashtirmaydi: muddat masala majlisda muhokama qilinganidan emas, hodisadan sanaladi. Muhandis xabardorligi keyinroq asqotishi mumkin — huquq yoʻqolishiga eʼtiroz bildirishda u hisobga olinadi — lekin oʻz vaqtida bildirishnoma oʻrniga unga tayanib boʻlmaydi.',
        },
      },
    ],
  },

  'contract-risk-score': {
    basis: {
      ru: 'Инструмент собирает ответы о ключевых параметрах контракта — форма, распределение рисков, гарантии, механизм претензий, порядок разрешения споров — и сводит их в сопоставимую оценку. Смысл не в самой цифре, а в том, чтобы увидеть, какие именно параметры тянут проект вниз, и обсуждать их предметно, а не на уровне «контракт тяжёлый».',
      en: 'The tool collects answers on the contract’s key parameters — form, risk allocation, securities, claims mechanism, dispute route — and reduces them to a comparable score. The point is not the number but seeing which parameters drag the project down, so they can be discussed specifically rather than as a general sense that the contract is harsh.',
      uz: 'Vosita shartnomaning asosiy parametrlari — forma, risklar taqsimoti, kafolatlar, daʼvo mexanizmi, nizolarni hal qilish tartibi — boʻyicha javoblarni yigʻadi va ularni solishtiriladigan bahoga keltiradi. Maʼno raqamning oʻzida emas, qaysi parametrlar loyihani pastga tortayotganini koʻrish va ularni «shartnoma ogʻir» darajasida emas, aniq muhokama qilishda.',
    },
    inputs: {
      ru: [
        'Отвечайте по фактическому тексту Particular Conditions, а не по общим условиям выбранной книги.',
        'Contract Data — основной источник по срокам, пределам и гарантиям; пустое поле считайте худшим вариантом.',
        'Если пункт удалён или переписан, это отдельный ответ, а не «как в стандарте».',
      ],
      en: [
        'Answer from the actual Particular Conditions text, not from the general conditions of the chosen book.',
        'The Contract Data is the main source on periods, caps and securities; treat a blank entry as the worst case.',
        'If a clause is deleted or rewritten, that is its own answer, not "as per the standard".',
      ],
      uz: [
        'Tanlangan kitobning umumiy shartlari boʻyicha emas, Particular Conditions ning haqiqiy matni boʻyicha javob bering.',
        'Contract Data — muddatlar, chegaralar va kafolatlar boʻyicha asosiy manba; boʻsh maydonni eng yomon variant deb hisoblang.',
        'Agar band olib tashlangan yoki qayta yozilgan boʻlsa, bu «standartdagidek» emas, alohida javob.',
      ],
    },
    reading: {
      ru: 'Высокий балл риска не означает, что от проекта нужно отказаться. Он означает, что риск нужно либо закрыть вопросом на стадии разъяснений, либо заложить в цену, либо принять сознательно с планом управления. Практическая ценность в разбивке: два контракта с одинаковой общей оценкой могут требовать совершенно разных действий, если у одного проблема в гарантиях, а у другого — в механизме претензий.',
      en: 'A high risk score does not mean walking away. It means the risk must either be closed with a clarification question, priced in, or accepted deliberately with a management plan. The practical value is in the breakdown: two contracts with the same overall score can demand entirely different action if one has a problem with securities and the other with the claims mechanism.',
      uz: 'Yuqori risk balli loyihadan voz kechish kerak degani emas. U riskni yo tushuntirish bosqichidagi savol bilan yopish, yo narxga kiritish, yo boshqaruv rejasi bilan ongli qabul qilish kerakligini bildiradi. Amaliy qiymat taqsimotda: umumiy bahosi bir xil ikki shartnoma butunlay turli harakatlarni talab qilishi mumkin, agar birida muammo kafolatlarda, ikkinchisida daʼvo mexanizmida boʻlsa.',
    },
    limits: {
      ru: [
        'Не читает ваш контракт: оценка настолько точна, насколько точны ответы.',
        'Не учитывает применимое право, которое может изменить действие ограничения ответственности или пресекательного срока.',
        'Не оценивает контрагента: платёжная дисциплина заказчика в модель не входит, а на практике часто решает.',
        'Не заменяет правовую экспертизу конкретного текста — это скрининг, а не заключение.',
      ],
      en: [
        'It does not read your contract: the score is only as accurate as the answers.',
        'It does not account for the governing law, which can change how a liability cap or a time bar operates.',
        'It does not assess the counterparty: the Employer’s payment record is outside the model and often decisive in practice.',
        'It does not replace legal review of the actual text — this is screening, not an opinion.',
      ],
      uz: [
        'Sizning shartnomangizni oʻqimaydi: baho javoblar qanchalik aniq boʻlsa, shunchalik aniq.',
        'Javobgarlik cheklovi yoki soʻndiruvchi muddat amalini oʻzgartirishi mumkin boʻlgan qoʻllaniladigan huquqni hisobga olmaydi.',
        'Kontragentni baholamaydi: buyurtmachining toʻlov intizomi modelga kirmaydi, amalda esa koʻpincha hal qiladi.',
        'Muayyan matnning huquqiy ekspertizasini almashtirmaydi — bu xulosa emas, skrining.',
      ],
    },
    faq: [
      {
        q: {
          ru: 'Какой балл считать приемлемым?',
          en: 'What score should be treated as acceptable?',
          uz: 'Qanday ballni maqbul deb hisoblash kerak?',
        },
        a: {
          ru: 'Универсального порога нет: приемлемость зависит от маржи, опыта команды в этой модели и от того, есть ли у вас рычаги управления конкретными рисками. Полезнее сравнивать не с абстрактной нормой, а с вашими прошлыми проектами: если контракт заметно жёстче того, на котором вы уже спорили, это сигнал закладывать резерв.',
          en: 'There is no universal threshold: acceptability depends on margin, the team’s experience with that model, and whether you have levers over the specific risks. It is more useful to compare against your own past projects than an abstract norm: if a contract is materially harsher than one you already ended up disputing, that is a signal to build in contingency.',
          uz: 'Universal chegara yoʻq: maqbullik marja, jamoaning shu modeldagi tajribasi va muayyan risklarni boshqarish richaglaringiz borligiga bogʻliq. Abstrakt meʼyor bilan emas, oʻz oʻtgan loyihalaringiz bilan solishtirish foydaliroq: agar shartnoma siz allaqachon bahslashgan loyihadan sezilarli ogʻirroq boʻlsa, bu zaxira qoʻyish signali.',
        },
      },
      {
        q: {
          ru: 'Что делать с найденными рисками до подачи оферты?',
          en: 'What to do with the risks found before submitting a bid?',
          uz: 'Oferta topshirishdan oldin topilgan risklar bilan nima qilish kerak?',
        },
        a: {
          ru: 'Разложите их на три корзины: закрывается вопросом на стадии разъяснений, требует резерва в цене, принимается сознательно. Первая корзина — самая ценная и самая недоиспользуемая: вопрос на этапе clarification стоит несопоставимо дешевле, чем claim на исполнении, а окно для него закрывается за считанные дни.',
          en: 'Sort them into three buckets: closable with a clarification question, needs a contingency in the price, accepted deliberately. The first bucket is the most valuable and the most underused: a clarification question costs incomparably less than a claim during execution, and the window for it closes within days.',
          uz: 'Ularni uch savatga ajrating: tushuntirish bosqichidagi savol bilan yopiladi, narxda zaxira talab qiladi, ongli qabul qilinadi. Birinchi savat — eng qimmatli va eng kam ishlatiladigani: clarification bosqichidagi savol ijro davridagi claim dan beqiyos arzon turadi, uning oynasi esa bir necha kunda yopiladi.',
        },
      },
    ],
  },
};
