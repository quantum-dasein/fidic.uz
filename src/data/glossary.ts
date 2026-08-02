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
  slug: string;
  label: string;
  category: string;
  definition: string;
  /** Present only for terms that have their own page. */
  long?: string;
  clauses: string[];
}

// Stable anchor id from the English term (e.g. "Notice of Dissatisfaction (NOD)"
// → "notice-of-dissatisfaction-nod"). Used for #anchors and article tooltips.
export function glossarySlug(term: string): string {
  return term
    .toLowerCase()
    .replace(/[’'"().]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface RawTerm {
  term: string;
  cat: CatKey;
  label: Record<Lang, string>;
  def: Record<Lang, string>;
  clauses?: string[];
  /**
   * The long form. A term only gets its own page once this is written — the
   * one-line `def` is enough for the list, but a URL that promises to explain
   * "what a Taking-Over Certificate is" and delivers forty words is exactly the
   * thin content this site spent July removing.
   *
   * The demand is real and measured: GSC (3 months to 2026-08-02) shows
   * `fidic это` at position 8.08, `фидик это` at 7, `eot это` at 6 and
   * `dnp meaning in construction` — all with zero clicks, because nothing here
   * answered them directly.
   */
  long?: Record<Lang, string>;
}

const raw: RawTerm[] = [
  { term: 'Engineer', cat: 'roles', clauses: ['agreement-determination-3-7'],
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
  { term: 'DAAB', cat: 'disputes', clauses: ['daab-disputes-21'],
    label: { ru: 'Совет по спорам', en: 'Dispute Avoidance/Adjudication Board', uz: 'Nizolar bo‘yicha kengash' },
    def: {
      ru: 'Dispute Avoidance/Adjudication Board — постоянный орган для предотвращения и решения споров; его решения обязательны к немедленному исполнению.',
      en: 'Dispute Avoidance/Adjudication Board — a standing body to avoid and resolve disputes; its decisions are binding with immediate effect.',
      uz: 'Dispute Avoidance/Adjudication Board — nizolarni oldini olish va hal qilish uchun doimiy organ; qarorlari darhol ijro etilishi shart.',
    },
    long: {
      ru: `DAAB (Dispute Avoidance/Adjudication Board) — постоянный совет по предотвращению и разрешению споров, назначаемый на весь срок проекта. В изданиях 2017 года он пришёл на смену DAB, и перемена не только в названии: слово «avoidance» стоит первым намеренно.

Совет из одного или трёх членов формируется в начале проекта, регулярно посещает объект и знает контекст к моменту, когда спор возникает. Стороны могут обратиться к нему неформально — за содействием или неофициальным мнением — не запуская процедуру. Это и есть предотвращение: большинство разногласий гаснет там, где ещё не превратилось в спор.

Если спор всё-таки передан на рассмотрение, DAAB выносит решение в течение 84 дней. Решение обязательно к немедленному исполнению — независимо от того, согласны ли стороны. Несогласная сторона подаёт Notice of Dissatisfaction в течение 28 дней и получает право позже передать спор в арбитраж; но платить и исполнять надо сейчас.

Самая частая ошибка на практике — предусмотреть DAAB в Contract Data и не сформировать его. Совет, назначенный в момент возникновения спора, теряет главное преимущество: он не знает проекта.`,
      en: `The DAAB (Dispute Avoidance/Adjudication Board) is a standing board for avoiding and resolving disputes, appointed for the whole duration of the project. In the 2017 editions it replaced the DAB, and the change is not only in the name: "avoidance" comes first on purpose.

A board of one or three members is constituted at the start, visits the site regularly, and already understands the context by the time a dispute arises. The parties can approach it informally — for assistance or an informal opinion — without starting a formal procedure. That is the avoidance function: most disagreements die where they have not yet become disputes.

If a dispute is formally referred, the DAAB decides within 84 days. The decision is binding with immediate effect, whether or not the parties agree with it. A dissatisfied party gives a Notice of Dissatisfaction within 28 days and preserves the right to arbitrate later — but it must comply and pay now.

The most common failure in practice is providing for a DAAB in the Contract Data and never constituting it. A board appointed once the dispute has arisen loses its main advantage: it does not know the project.`,
      uz: `DAAB (Dispute Avoidance/Adjudication Board) — butun loyiha muddatiga tayinlanadigan, nizolarni oldini olish va hal qilish bo‘yicha doimiy kengash. 2017-yil tahrirlarida u DAB o‘rnini egalladi, va o‘zgarish faqat nomda emas: «avoidance» so‘zi ataylab birinchi turadi.

Bir yoki uch a’zodan iborat kengash loyiha boshida shakllantiriladi, obyektga muntazam tashrif buyuradi va nizo yuzaga kelganda kontekstni biladi. Tomonlar unga norasmiy murojaat qilishlari mumkin — tartibni ishga tushirmasdan.

Agar nizo rasman topshirilsa, DAAB 84 kun ichida qaror chiqaradi. Qaror darhol ijro etilishi shart. Rozi bo‘lmagan tomon 28 kun ichida Notice of Dissatisfaction beradi va keyinroq arbitrajga murojaat qilish huquqini saqlaydi — lekin hozir to‘lashi kerak.

Eng keng tarqalgan xato — DAAB’ni Contract Data’da nazarda tutib, uni shakllantirmaslik.`,
    } },
  { term: 'Notice of Dissatisfaction (NOD)', cat: 'disputes', clauses: ['daab-disputes-21'],
    label: { ru: 'Уведомление о несогласии', en: 'Notice of Dissatisfaction', uz: 'Rozilik bildirmaslik xabari' },
    def: {
      ru: 'Формальное уведомление о несогласии с решением DAAB, открывающее путь к арбитражу. Пропуск срока делает решение окончательным.',
      en: 'A formal notice of disagreement with a DAAB decision, opening the way to arbitration. Missing the deadline makes the decision final.',
      uz: 'DAAB qarori bilan rozi emasligi haqida rasmiy xabar bo‘lib, arbitrajga yo‘l ochadi. Muddat o‘tkazib yuborilsa, qaror yakuniy bo‘ladi.',
    } },
  { term: 'Variation', cat: 'procedures', clauses: ['variations-13', 'extension-of-time-8-5'],
    label: { ru: 'Изменение', en: 'Variation', uz: "O‘zgartirish" },
    def: {
      ru: 'Изменение в Работах, инициированное Инженером/Заказчиком по Clause 13; оценивается и может корректировать цену и срок.',
      en: 'A change to the Works initiated by the Engineer/Employer under Clause 13; valued, and may adjust price and time.',
      uz: 'Clause 13 bo‘yicha Muhandis/Buyurtmachi tashabbusi bilan Ishlardagi o‘zgarish; baholanadi va narx hamda muddatni tuzatishi mumkin.',
    },
    long: {
      ru: `Variation — изменение Работ, оформленное по контракту. Это единственный законный способ изменить объём, качество или последовательность работ после подписания: любое «просто сделайте вот так» без оформления создаёт спор, а не обязательство.

Инициировать изменение может Инженер — инструкцией или запросом предложения. Подрядчик обязан выполнить инструкцию, но обязан и возразить, если изменение технически невыполнимо, влияет на безопасность или требует того, что невозможно приобрести. Возражать нужно немедленно и письменно.

Оценка изменения идёт по иерархии: применимая ставка из Bill of Quantities, затем ставка по аналогии, и только затем — новая ставка. Изменение почти всегда несёт и временны́е последствия, поэтому вместе с оценкой стоимости ставится вопрос об Extension of Time.

Граница между Variation и claim — частый источник путаницы. Variation — это когда объём изменил Заказчик или Инженер. Claim — это когда обстоятельство возникло само (непредвиденные условия, задержка доступа) и вы требуете компенсации. Оформляются они по-разному, и подмена одного другим стоит денег.`,
      en: `A Variation is a change to the Works made under the contract. It is the only lawful way to change the scope, quality or sequence of work after signature: an informal "just do it this way" creates a dispute, not an obligation.

The Engineer initiates it, either by instruction or by request for proposal. The Contractor must comply — but must also object if the change is technically impossible, affects safety, or requires goods that cannot be obtained. The objection has to be immediate and in writing.

Valuation follows a hierarchy: an applicable rate from the Bill of Quantities, then a rate derived by analogy, and only then a new rate. A Variation almost always carries time consequences too, so the question of an Extension of Time is raised alongside the money.

The line between a Variation and a claim causes constant confusion. A Variation is when the Employer or Engineer changed the scope. A claim is when a circumstance arose on its own — unforeseeable conditions, delayed access — and you are seeking compensation. They are documented differently, and mistaking one for the other is expensive.`,
      uz: `Variation — shartnoma bo‘yicha rasmiylashtirilgan Ishlarning o‘zgarishi. Bu imzolangandan keyin hajm, sifat yoki ishlar ketma-ketligini o‘zgartirishning yagona qonuniy usuli: rasmiylashtirilmagan «shunday qiling» majburiyat emas, nizo yaratadi.

O‘zgarishni Muhandis boshlaydi — ko‘rsatma yoki taklif so‘rovi bilan. Pudratchi ko‘rsatmani bajarishi shart, lekin o‘zgarish texnik jihatdan imkonsiz bo‘lsa yoki xavfsizlikka ta’sir qilsa, e’tiroz bildirishi ham shart — darhol va yozma.

Baholash ierarxiya bo‘yicha boradi: Bill of Quantities’dagi amaldagi stavka, keyin o‘xshashlik bo‘yicha stavka, va faqat keyin — yangi stavka. O‘zgarish deyarli doimo vaqt oqibatlarini ham keltiradi, shuning uchun Extension of Time masalasi birga qo‘yiladi.

Variation va claim orasidagi chegara — doimiy chalkashlik manbai.`,
    } },
  { term: 'Claim', cat: 'disputes', clauses: ['claims-20-2'],
    label: { ru: 'Претензия', en: 'Claim', uz: "Da’vo" },
    def: {
      ru: 'Требование одной стороны к другой о доп. оплате, продлении срока или ином праве. В 2017 — единый порядок для обеих сторон (Clause 20).',
      en: 'One party’s request to the other for additional payment, time or another entitlement. In 2017, a single procedure for both parties (Clause 20).',
      uz: 'Bir tomonning ikkinchisidan qo‘shimcha to‘lov, muddat yoki boshqa huquq talab qilishi. 2017-yilda — har ikki tomon uchun yagona tartib (Clause 20).',
    },
    long: {
      ru: `Claim — требование стороны о дополнительном платеже, продлении срока или ином праве по контракту. В изданиях 2017 года это понятие переработано: Clause 20 задаёт единый порядок для претензий обеих сторон, тогда как раньше у Заказчика и Подрядчика были разные пути.

Механика единая. Сначала уведомление в течение 28 дней с момента осведомлённости о событии — это пресекательный срок. Затем детально обоснованная претензия в течение 84 дней: обстоятельства, договорное основание, причинно-следственная связь, расчёт последствий. Затем ответ Инженера: сначала попытка достичь согласия, при неудаче — определение по Sub-Clause 3.7. Несогласие с определением ведёт к DAAB и далее к арбитражу.

Стоит различать claim и спор. Claim — это ещё не конфликт: это заявленное право, которое администрируется в рабочем порядке. Спором оно становится, только когда определение не устроило сторону и подан Notice of Dissatisfaction.

Что чаще всего губит претензии на практике: не слабость по существу, а отсутствие contemporary records — записей, сделанных по ходу событий, а не собранных задним числом.`,
      en: `A claim is a party's assertion of an entitlement to additional payment, an extension of time, or another right under the contract. The 2017 editions reworked the concept: Clause 20 sets a single procedure for both parties' claims, where previously the Employer and the Contractor had different routes.

The mechanics are uniform. First, notice within 28 days of awareness of the event — a time-bar. Then a fully detailed claim within 84 days: the circumstances, the contractual basis, the causal link, and the calculation of the consequences. Then the Engineer's response: first an attempt to reach agreement, failing which a determination under Sub-Clause 3.7. Disagreement with the determination leads to the DAAB and then to arbitration.

It is worth separating a claim from a dispute. A claim is not yet a conflict: it is an asserted entitlement being administered in the ordinary course. It becomes a dispute only once a determination is unsatisfactory and a Notice of Dissatisfaction is given.

What kills claims in practice is rarely weakness on the merits. It is the absence of contemporary records — notes made as events happened, rather than assembled afterwards.`,
      uz: `Claim — tomonning qo‘shimcha to‘lov, muddatni uzaytirish yoki shartnoma bo‘yicha boshqa huquqqa bo‘lgan talabi. 2017-yil tahrirlarida bu tushuncha qayta ishlangan: Clause 20 har ikki tomon da’volari uchun yagona tartibni belgilaydi.

Mexanika yagona. Avval hodisadan xabardor bo‘lgan paytdan 28 kun ichida xabarnoma — bu presekativ muddat. Keyin 84 kun ichida batafsil asoslangan da’vo: holatlar, shartnomaviy asos, sabab-oqibat bog‘liqligi, oqibatlar hisobi. Keyin Muhandis javobi: avval kelishuvga erishishga urinish, bo‘lmasa — Sub-Clause 3.7 bo‘yicha qaror.

Claim va nizoni ajratish kerak. Claim hali ziddiyat emas: bu ish tartibida yuritiladigan bildirilgan huquq. U faqat qaror qoniqtirmagan va Notice of Dissatisfaction berilgan paytda nizoga aylanadi.

Amaliyotda da’volarni ko‘pincha mazmun zaifligi emas, contemporary records yo‘qligi halok qiladi.`,
    } },
  { term: 'Extension of Time (EOT)', cat: 'time', clauses: ['extension-of-time-8-5', 'claims-20-2', 'delay-damages-8-8'],
    label: { ru: 'Продление срока', en: 'Extension of Time', uz: 'Muddatni uzaytirish' },
    def: {
      ru: 'Право Подрядчика на продление срока завершения при задержках, за которые он не отвечает (Sub-Clause 8.5).',
      en: 'The Contractor’s entitlement to extend the completion time for delays it is not responsible for (Sub-Clause 8.5).',
      uz: 'Pudratchi javobgar bo‘lmagan kechikishlar uchun yakunlash muddatini uzaytirish huquqi (Sub-Clause 8.5).',
    },
    long: {
      ru: `Extension of Time (EOT) — продление срока завершения Работ. Механизм, который защищает Подрядчика от delay damages за задержку, вызванную не им, и одновременно сохраняет для Заказчика определённую дату завершения вместо неопределённости «работы идут».

Право на EOT возникает при задержке по перечисленным в контракте основаниям: изменения по Clause 13, задержка доступа к объекту, непредвиденные физические условия (Sub-Clause 4.12), исключительные события (Clause 18), задержка со стороны Заказчика или органов власти. Основание должно быть на критическом пути — задержка работы, у которой есть запас времени, права на продление не даёт.

EOT — это про время, а не про деньги. Продление срока само по себе не даёт права на возмещение затрат: для этого нужно отдельное основание, и часть событий (например, исключительные) дают время, но не Cost. Это и есть смысл формулы «time, no money».

Процедурно EOT — это claim по Clause 20 со всеми его сроками: уведомление в течение 28 дней, детальная претензия в течение 84 дней. Пропуск первого срока может стоить права на продление целиком.`,
      en: `An Extension of Time (EOT) extends the Time for Completion. It protects the Contractor from delay damages for a delay it did not cause, and at the same time preserves a definite completion date for the Employer instead of an open-ended "the works are ongoing".

Entitlement arises for the grounds the contract lists: Variations under Clause 13, delayed access to the Site, unforeseeable physical conditions (Sub-Clause 4.12), Exceptional Events (Clause 18), and delays attributable to the Employer or the authorities. The cause must sit on the critical path — delaying an activity that has float earns no extension.

EOT is about time, not money. An extension does not by itself carry a right to Cost: that needs its own basis, and some events — Exceptional Events among them — give time but not money. That is what "time, no money" means.

Procedurally an EOT is a claim under Clause 20 with all of its deadlines: notice within 28 days, fully detailed claim within 84 days. Missing the first can forfeit the extension entirely.`,
      uz: `Extension of Time (EOT) — Ishlarni tugatish muddatini uzaytirish. Bu mexanizm Pudratchini o‘zi sabab bo‘lmagan kechikish uchun delay damages’dan himoya qiladi va ayni paytda Buyurtmachi uchun aniq tugatish sanasini saqlaydi.

Huquq shartnomada sanab o‘tilgan asoslar bo‘yicha yuzaga keladi: Clause 13 bo‘yicha o‘zgarishlar, obyektga kirishning kechikishi, kutilmagan fizik sharoitlar (Sub-Clause 4.12), istisno hodisalar (Clause 18), Buyurtmachi yoki hokimiyat tomonidan kechikish. Asos kritik yo‘lda bo‘lishi kerak.

EOT vaqt haqida, pul haqida emas. Muddatni uzaytirishning o‘zi xarajatlarni qoplash huquqini bermaydi: buning uchun alohida asos kerak. «Time, no money» formulasining ma’nosi shu.

Tartib bo‘yicha EOT — bu Clause 20 bo‘yicha claim: 28 kun ichida xabarnoma, 84 kun ichida batafsil da’vo.`,
    } },
  { term: 'Time-bar (28 days)', cat: 'time', clauses: ['claims-20-2'],
    label: { ru: 'Пресекательный срок 28 дней', en: '28-day time-bar', uz: '28 kunlik muddat' },
    def: {
      ru: 'Срок подачи уведомления о претензии. Пропуск может лишить стороны права на претензию (Sub-Clause 20.2.1).',
      en: 'The deadline to give a notice of claim. Missing it can forfeit the party’s right to the claim (Sub-Clause 20.2.1).',
      uz: 'Da’vo to‘g‘risida xabar berish muddati. O‘tkazib yuborish da’vo huquqidan mahrum qilishi mumkin (Sub-Clause 20.2.1).',
    },
    long: {
      ru: `Time-bar — пресекательный срок на подачу уведомления о претензии. По Sub-Clause 20.2.1 изданий 2017 года сторона обязана уведомить о претензии в течение 28 дней с момента, когда узнала или должна была узнать о событии или обстоятельстве. Пропуск этого срока лишает права на претензию — независимо от того, насколько она обоснована по существу.

Ключевой и самый недооценённый момент — точка отсчёта. Срок течёт не с момента, когда оформили документы, не с момента, когда посчитали убытки, и не с момента, когда стало ясно, что переговоры зашли в тупик. Он течёт с момента осведомлённости о событии. Поэтому уведомление подаётся раньше, чем понятны последствия, и это нормально: уведомление — это не расчёт, а заявление о факте.

В изданиях 2017 года time-bar работает симметрично: он применяется и к претензиям Заказчика тоже.

Есть предохранитель: если сторона считает пропуск срока оправданным, а другая не согласна, вопрос разрешается через определение Инженера, а затем DAAB. Но полагаться на него как на план — плохая стратегия.

Практический вывод: управление претензиями начинается с календаря, а не с аргументов. Считайте даты, а не спорьте о них.`,
      en: `A time-bar is the cut-off for giving notice of a claim. Under Sub-Clause 20.2.1 of the 2017 editions, a party must give notice within 28 days of becoming aware, or of when it should have become aware, of the event or circumstance. Miss it and the claim is lost, however meritorious it is on the merits.

The most underrated part is when the clock starts. It does not start when the paperwork is ready, nor when the loss has been quantified, nor when it becomes clear that negotiation has failed. It starts at awareness of the event. So the notice goes in before the consequences are understood — and that is correct: a notice is a statement of fact, not a calculation.

Under the 2017 editions the time-bar is symmetrical: it applies to the Employer's claims too.

There is a safety valve: if a party considers the late notice justified and the other disagrees, the question goes to the Engineer's determination and then the DAAB. Relying on it as a plan is a poor strategy.

The practical consequence: claims management starts with a calendar, not with arguments.`,
      uz: `Time-bar — da’vo to‘g‘risida xabar berish uchun presekativ muddat. 2017-yil tahriridagi Sub-Clause 20.2.1 bo‘yicha tomon hodisadan xabardor bo‘lgan yoki bo‘lishi kerak bo‘lgan paytdan 28 kun ichida xabar berishi shart. Muddatni o‘tkazib yuborish da’vo huquqidan mahrum qiladi — u mazmunan qanchalik asosli bo‘lishidan qat’i nazar.

Eng kam baholanadigan jihat — hisob nuqtasi. Muddat hujjatlar tayyor bo‘lganda emas, zarar hisoblanganda emas, muzokaralar tugaganda emas — hodisadan xabardor bo‘lgan paytdan boshlanadi. Shuning uchun xabarnoma oqibatlar tushunarli bo‘lishidan oldin beriladi.

2017-yil tahrirlarida time-bar simmetrik ishlaydi: u Buyurtmachi da’volariga ham qo‘llaniladi.

Amaliy xulosa: da’volarni boshqarish kalendardan boshlanadi, dalillardan emas.`,
    } },
  { term: 'Taking-Over Certificate', cat: 'documents', clauses: ['taking-over-10-1'],
    label: { ru: 'Акт приёмки', en: 'Taking-Over Certificate', uz: 'Qabul qilish dalolatnomasi' },
    def: {
      ru: 'Подтверждает, что Работы завершены и приняты Заказчиком; запускает период уведомления о дефектах (Clause 10).',
      en: 'Confirms the Works are complete and taken over by the Employer; starts the Defects Notification Period (Clause 10).',
      uz: 'Ishlar yakunlangani va Buyurtmachi tomonidan qabul qilinganini tasdiqlaydi; nuqsonlar to‘g‘risida xabar berish davrini boshlaydi (Clause 10).',
    },
    long: {
      ru: `Taking-Over Certificate — сертификат приёмки, который Инженер выдаёт, когда Работы (или их согласованная секция) завершены в соответствии с контрактом и прошли Tests on Completion. Это не формальность, а момент, который переключает сразу несколько режимов контракта.

С даты, указанной в сертификате, риск случайной гибели Работ переходит к Заказчику, обязанность страховать объект меняет сторону, прекращается начисление delay damages и начинается отсчёт Периода уведомления о дефектах (DNP). Поэтому спор идёт обычно не о самом факте приёмки, а о дате: каждый день расхождения — это деньги.

Заказчик может занять Работы и без сертификата — тогда FIDIC исходит из того, что приёмка состоялась фактически (deemed taking-over). Подрядчику важно зафиксировать этот момент письменно: занятие объекта без оформления даты приёмки — классический способ потерять аргумент в споре о просрочке.

Не путайте с Performance Certificate: тот выдаётся в конце DNP и означает, что все обязательства, включая устранение дефектов, исполнены.`,
      en: `A Taking-Over Certificate is the certificate the Engineer issues when the Works, or an agreed Section of them, are complete in accordance with the Contract and have passed the Tests on Completion. It is not a formality: it flips several contractual regimes at once.

From the date stated in the certificate, the risk of loss of the Works passes to the Employer, the insurance obligation changes hands, delay damages stop accruing, and the Defects Notification Period (DNP) starts to run. That is why disputes are rarely about whether taking-over happened and almost always about the date — every day of disagreement is money.

The Employer can also take the Works into use without a certificate, in which case FIDIC treats taking-over as having occurred in fact (deemed taking-over). A contractor should record that moment in writing: occupation without a fixed taking-over date is a classic way to lose an argument about delay.

Do not confuse it with the Performance Certificate, which is issued at the end of the DNP and confirms that all obligations, including remedying defects, have been discharged.`,
      uz: `Taking-Over Certificate — Muhandis Ishlar (yoki ularning kelishilgan qismi) shartnomaga muvofiq tugallanganda va Tests on Completion o‘tganda beradigan qabul sertifikati. Bu rasmiyatchilik emas: u shartnomaning bir necha rejimini birdan almashtiradi.

Sertifikatda ko‘rsatilgan sanadan boshlab Ishlarning tasodifiy nobud bo‘lish xavfi Buyurtmachiga o‘tadi, sug‘urta majburiyati tomonini o‘zgartiradi, delay damages hisoblanishi to‘xtaydi va Nuqsonlar to‘g‘risida xabar berish davri (DNP) boshlanadi. Shuning uchun nizo qabul faktida emas, sanada bo‘ladi: har bir kelishmovchilik kuni — bu pul.

Buyurtmachi Ishlarni sertifikatsiz ham egallashi mumkin — u holda FIDIC qabul amalda bo‘lgan deb hisoblaydi (deemed taking-over). Pudratchi bu paytni yozma qayd etishi muhim.

Performance Certificate bilan adashtirmang: u DNP oxirida beriladi va barcha majburiyatlar bajarilganini bildiradi.`,
    } },
  { term: 'Defects Notification Period (DNP)', cat: 'time', clauses: ['defects-period-11'],
    label: { ru: 'Период уведомления о дефектах', en: 'Defects Notification Period', uz: 'Nuqsonlar xabar berish davri' },
    def: {
      ru: 'Период после приёмки, в течение которого Подрядчик обязан устранять выявленные дефекты (Clause 11).',
      en: 'The period after taking-over during which the Contractor must remedy notified defects (Clause 11).',
      uz: 'Qabul qilingandan keyin Pudratchi aniqlangan nuqsonlarni bartaraf etishi shart bo‘lgan davr (Clause 11).',
    },
    long: {
      ru: `Defects Notification Period (DNP) — период уведомления о дефектах: срок после приёмки Работ, в течение которого Подрядчик обязан устранять выявленные дефекты и завершать недоделки. По умолчанию в изданиях 2017 года это 365 дней, но конкретный срок всегда задан в Contract Data и может отличаться.

DNP — это не «гарантия» в бытовом смысле. Это контрактный механизм с двумя сторонами: Заказчик обязан уведомить о дефекте, Подрядчик — устранить его в разумный срок, и у Подрядчика есть право доступа на объект, чтобы это сделать. Отказ в доступе снимает с него ответственность за неустранение.

Важная деталь: если дефект не даёт использовать Работы или их значительную часть по назначению, DNP по этой части может быть продлён — но не более чем на два года. Устранение дефекта, вызванного не Подрядчиком, оплачивается как Variation.

Период заканчивается выдачей Performance Certificate — только этот документ, а не истечение календарного срока, закрывает обязательства Подрядчика.`,
      en: `The Defects Notification Period (DNP) is the period after taking-over during which the Contractor must remedy notified defects and finish outstanding work. Under the 2017 editions the default is 365 days, but the actual period is always stated in the Contract Data and can differ.

The DNP is not a "warranty" in the everyday sense. It is a contractual mechanism with obligations both ways: the Employer must notify the defect, the Contractor must remedy it within a reasonable time, and the Contractor has a right of access to do so. Refusing access relieves the Contractor of responsibility for the failure to remedy.

One detail matters disproportionately: if a defect prevents the Works, or a substantial part of them, from being used for their intended purpose, the DNP for that part can be extended — but by no more than two years. Remedying a defect that is not the Contractor's responsibility is valued as a Variation.

The period ends with the Performance Certificate. It is that document, not the expiry of the calendar period, that discharges the Contractor's obligations.`,
      uz: `Defects Notification Period (DNP) — nuqsonlar to‘g‘risida xabar berish davri: Ishlar qabul qilingandan keyin Pudratchi aniqlangan nuqsonlarni bartaraf etishi va tugallanmagan ishlarni yakunlashi shart bo‘lgan muddat. 2017-yil tahrirlarida standart 365 kun, lekin aniq muddat har doim Contract Data’da ko‘rsatiladi.

DNP kundalik ma’nodagi «kafolat» emas. Bu ikki tomonlama majburiyatli shartnoma mexanizmi: Buyurtmachi nuqson haqida xabar berishi, Pudratchi uni oqilona muddatda bartaraf etishi kerak, va Pudratchining buning uchun obyektga kirish huquqi bor. Kirishni rad etish uni javobgarlikdan ozod qiladi.

Agar nuqson Ishlardan maqsadli foydalanishga to‘sqinlik qilsa, o‘sha qism bo‘yicha DNP uzaytirilishi mumkin — lekin ikki yildan ko‘p emas. Pudratchi aybi bo‘lmagan nuqsonni bartaraf etish Variation sifatida to‘lanadi.

Davr Performance Certificate berilishi bilan tugaydi.`,
    } },
  { term: 'Performance Certificate', cat: 'documents', clauses: ['defects-period-11'],
    label: { ru: 'Сертификат исполнения', en: 'Performance Certificate', uz: 'Bajarilish sertifikati' },
    def: {
      ru: 'Выдаётся после устранения дефектов и завершения DNP; означает выполнение обязательств Подрядчика.',
      en: 'Issued after defects are remedied and the DNP ends; signifies that the Contractor’s obligations are fulfilled.',
      uz: 'Nuqsonlar bartaraf etilib, DNP tugaganidan keyin beriladi; Pudratchi majburiyatlari bajarilganini bildiradi.',
    } },
  { term: 'Performance Security', cat: 'payments', clauses: ['performance-security-4-2'],
    label: { ru: 'Обеспечение исполнения', en: 'Performance Security', uz: 'Bajarilish ta’minoti' },
    def: {
      ru: 'Банковская гарантия/обеспечение, предоставляемое Подрядчиком как гарантия исполнения (Sub-Clause 4.2).',
      en: 'A bank guarantee/security provided by the Contractor as a performance guarantee (Sub-Clause 4.2).',
      uz: 'Pudratchi tomonidan bajarilish kafolati sifatida taqdim etiladigan bank kafolati/ta’minot (Sub-Clause 4.2).',
    },
    long: {
      ru: `Performance Security — обеспечение исполнения обязательств Подрядчика, которое он предоставляет Заказчику по Sub-Clause 4.2. Обычно это банковская гарантия на 5–10% от Принятой договорной суммы; точный размер и форма задаются в Contract Data.

Практически всё в этом инструменте зависит от одной характеристики: гарантия «по требованию» (on demand) или условная. Гарантия по первому требованию оплачивается банком по формальному обращению Заказчика, без доказательства нарушения — банк проверяет только соответствие документов условиям гарантии, а не спор по существу. Для Подрядчика это означает, что деньги уходят до того, как кто-либо разберётся, кто прав.

Отсюда практические выводы. Формулировка обращения должна быть максимально узкой. Срок действия гарантии должен покрывать весь период до Performance Certificate плюс запас, но не быть бессрочным. Заказчик обязан вернуть гарантию в течение 21 дня после выдачи Performance Certificate — этот срок часто нарушают, и об этом надо помнить.

Отдельно проверяйте, выпустит ли требуемую форму местный банк: на проектах МФО форма задаётся банком развития и не всегда совпадает с тем, к чему привыкли локальные банки.`,
      en: `Performance Security is the security the Contractor provides to the Employer under Sub-Clause 4.2 for the proper performance of the Contract. Typically a bank guarantee for 5–10% of the Accepted Contract Amount; the exact figure and form are set in the Contract Data.

Almost everything about this instrument turns on one characteristic: whether the guarantee is on demand or conditional. An on-demand guarantee is paid by the bank on a formal call from the Employer, without proof of breach — the bank checks the documents against the terms of the guarantee, not the merits of the dispute. For the Contractor that means the money leaves before anyone establishes who was right.

Hence the practical points. The wording of the demand should be as narrow as possible. The validity period must cover through to the Performance Certificate with a margin, without being open-ended. The Employer must return the security within 21 days of issuing the Performance Certificate — a deadline that is routinely missed and worth chasing.

Check separately whether a local bank will issue the required form: on MDB projects the form comes from the development bank and does not always match what local banks are used to.`,
      uz: `Performance Security — Pudratchining Sub-Clause 4.2 bo‘yicha Buyurtmachiga taqdim etadigan majburiyatlarni bajarish ta’minoti. Odatda bu Qabul qilingan shartnoma summasining 5–10% miqdoridagi bank kafolati; aniq miqdor va shakl Contract Data’da beriladi.

Bu vositadagi deyarli hamma narsa bitta xususiyatga bog‘liq: kafolat «talab bo‘yicha» (on demand) yoki shartlimi. Birinchi talab bo‘yicha kafolatni bank Buyurtmachining rasmiy murojaati bo‘yicha, buzilishni isbotlamasdan to‘laydi. Pudratchi uchun bu pul kim haqligini aniqlashdan oldin ketishini anglatadi.

Amaliy xulosalar: murojaat formulasi imkon qadar tor bo‘lishi kerak; amal qilish muddati Performance Certificate’gacha bo‘lgan davrni qoplashi kerak; Buyurtmachi kafolatni Performance Certificate berilgandan keyin 21 kun ichida qaytarishi shart.

Alohida tekshiring: talab qilingan shaklni mahalliy bank chiqaradimi.`,
    } },
  { term: 'Interim Payment Certificate (IPC)', cat: 'payments', clauses: ['payment-14'],
    label: { ru: 'Промежуточный платёжный сертификат', en: 'Interim Payment Certificate', uz: 'Oraliq to‘lov sertifikati' },
    def: {
      ru: 'Сертификат Инженера на промежуточный платёж за выполненные объёмы и поставленные материалы (Clause 14).',
      en: 'The Engineer’s certificate for an interim payment for completed work and delivered materials (Clause 14).',
      uz: 'Bajarilgan hajmlar va yetkazilgan materiallar uchun oraliq to‘lov bo‘yicha Muhandis sertifikati (Clause 14).',
    },
    long: {
      ru: `Interim Payment Certificate (IPC) — промежуточный платёжный сертификат, который Инженер выдаёт в ответ на Statement Подрядчика и который порождает обязанность Заказчика заплатить. Ключевая мысль: платёж по FIDIC привязан не к акту и не к счёту, а к сертификату.

Цикл выглядит так. Подрядчик подаёт Statement с подтверждающими документами. Инженер в течение 28 дней выдаёт IPC с суммой, которую считает причитающейся. Заказчик платит в течение 56 дней с даты получения Statement. Конкретные сроки задаются в Contract Data и могут отличаться, но структура сохраняется.

Инженер вправе скорректировать сумму, но не вправе просто не выдать сертификат: если он считает, что заявлено лишнее, он сертифицирует то, что считает верным, а разница становится предметом разногласия — и его разрешают через определение и DAAB, а не через молчание.

При неоплате у Подрядчика есть последовательность прав по Sub-Clause 14.8 и 16: проценты за просрочку, затем — при существенной просрочке — приостановка работ и в крайнем случае расторжение. Все эти шаги требуют предварительного уведомления, и порядок здесь важнее скорости.

На проектах, где местная отчётность требует актов выполненных работ, стыковку с сертификатами FIDIC нужно прописывать в Particular Conditions осознанно — иначе два документооборота начинают противоречить друг другу.`,
      en: `An Interim Payment Certificate (IPC) is the certificate the Engineer issues in response to the Contractor's Statement, and it is what creates the Employer's obligation to pay. The key idea: payment under FIDIC attaches to a certificate, not to an invoice or a completion act.

The cycle runs like this. The Contractor submits a Statement with supporting documents. The Engineer issues an IPC within 28 days, for the amount it considers due. The Employer pays within 56 days of receiving the Statement. The exact periods are set in the Contract Data and can differ, but the structure holds.

The Engineer may adjust the amount, but may not simply withhold the certificate: if it considers the claim overstated, it certifies what it believes to be correct, and the difference becomes a matter to be resolved through determination and the DAAB — not through silence.

If payment does not come, the Contractor has a sequence of rights under Sub-Clauses 14.8 and 16: financing charges, then, on substantial default, suspension of work and ultimately termination. Every step requires prior notice, and here the order matters more than the speed.

On projects where local reporting requires completion acts, the interface with FIDIC certificates has to be written into the Particular Conditions deliberately — otherwise the two paper trails start contradicting each other.`,
      uz: `Interim Payment Certificate (IPC) — Muhandis Pudratchining Statement’iga javoban beradigan oraliq to‘lov sertifikati, u Buyurtmachining to‘lash majburiyatini yuzaga keltiradi. Asosiy fikr: FIDIC bo‘yicha to‘lov dalolatnomaga emas, sertifikatga bog‘lanadi.

Sikl shunday: Pudratchi tasdiqlovchi hujjatlar bilan Statement topshiradi. Muhandis 28 kun ichida IPC beradi. Buyurtmachi Statement olingandan keyin 56 kun ichida to‘laydi. Aniq muddatlar Contract Data’da beriladi.

Muhandis summani tuzatishi mumkin, lekin sertifikatni bermaslikka haqli emas: agar ortiqcha deb hisoblasa, o‘zi to‘g‘ri deb bilgan summani sertifikatlaydi, farq esa kelishmovchilik predmetiga aylanadi.

To‘lanmaganda Pudratchining Sub-Clause 14.8 va 16 bo‘yicha huquqlari ketma-ketligi bor: kechikish uchun foizlar, keyin ishlarni to‘xtatish va oxirgi chora sifatida bekor qilish. Har bir qadam oldindan xabarnoma talab qiladi.`,
    } },
  { term: 'Provisional Sum', cat: 'payments', clauses: ['payment-14', 'variations-13'],
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
  { term: 'Tests on Completion', cat: 'procedures', clauses: ['taking-over-10-1'],
    label: { ru: 'Испытания при завершении', en: 'Tests on Completion', uz: 'Yakunlashda sinovlar' },
    def: {
      ru: 'Испытания перед приёмкой, подтверждающие соответствие Работ требованиям (Clause 9).',
      en: 'Tests before taking-over confirming the Works meet the requirements (Clause 9).',
      uz: 'Qabul qilishdan oldin Ishlar talablarga mosligini tasdiqlovchi sinovlar (Clause 9).',
    } },
  { term: 'Tests after Completion', cat: 'procedures', clauses: ['taking-over-10-1', 'defects-period-11'],
    label: { ru: 'Испытания после завершения', en: 'Tests after Completion', uz: 'Yakunlashdan keyingi sinovlar' },
    def: {
      ru: 'Эксплуатационные испытания после приёмки (Yellow/Silver, Clause 12), подтверждающие проектные показатели.',
      en: 'Operational tests after taking-over (Yellow/Silver, Clause 12) confirming design performance.',
      uz: 'Qabul qilingandan keyingi ekspluatatsion sinovlar (Yellow/Silver, Clause 12), loyiha ko‘rsatkichlarini tasdiqlaydi.',
    } },
  { term: 'Exceptional Event', cat: 'procedures', clauses: ['exceptional-events-18'],
    label: { ru: 'Исключительное событие', en: 'Exceptional Event', uz: 'Istisno hodisa' },
    def: {
      ru: 'Событие вне контроля сторон (в 1999 — Force Majeure), дающее право на освобождение от ответственности (Clause 18).',
      en: 'An event beyond the parties’ control (Force Majeure in 1999), giving relief from liability (Clause 18).',
      uz: 'Tomonlar nazoratidan tashqari hodisa (1999-yilda — Force Majeure), javobgarlikdan ozod qilish huquqini beradi (Clause 18).',
    } },
  { term: 'Delay Damages', cat: 'payments', clauses: ['delay-damages-8-8', 'extension-of-time-8-5'],
    label: { ru: 'Неустойка за просрочку', en: 'Delay Damages', uz: 'Kechikish uchun jarima' },
    def: {
      ru: 'Заранее оценённые убытки за задержку завершения (liquidated damages), обычно с предельным размером.',
      en: 'Pre-assessed damages for delayed completion (liquidated damages), usually capped.',
      uz: 'Yakunlash kechikkani uchun oldindan baholangan zararlar (liquidated damages), odatda chegaralangan.',
    } },
  { term: 'Final Statement', cat: 'payments', clauses: ['payment-14'],
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
  { term: 'Unforeseeable Conditions', cat: 'procedures', clauses: ['unforeseeable-conditions-4-12'],
    label: { ru: 'Непредвиденные условия', en: 'Unforeseeable Conditions', uz: 'Oldindan ko‘rib bo‘lmaydigan sharoitlar' },
    def: {
      ru: 'Физические условия площадки, которые опытный Подрядчик не мог предвидеть (Sub-Clause 4.12); распределение риска зависит от книги.',
      en: 'Physical site conditions an experienced Contractor could not foresee (Sub-Clause 4.12); risk allocation depends on the book.',
      uz: 'Tajribali Pudratchi oldindan ko‘ra olmaydigan maydonning jismoniy sharoitlari (Sub-Clause 4.12); xavf taqsimoti kitobga bog‘liq.',
    } },
  { term: 'Determination', cat: 'procedures', clauses: ['agreement-determination-3-7'],
    label: { ru: 'Определение Инженера', en: 'Determination', uz: 'Muhandis qarori' },
    def: {
      ru: 'Решение Инженера по согласованию или определению вопроса при отсутствии договорённости сторон (Sub-Clause 3.7).',
      en: 'The Engineer’s decision to agree or determine a matter where the parties have not agreed (Sub-Clause 3.7).',
      uz: 'Tomonlar kelishmagan masalani kelishish yoki aniqlash bo‘yicha Muhandis qarori (Sub-Clause 3.7).',
    },
    long: {
      ru: `Determination — определение Инженера по Sub-Clause 3.7: формальное решение по вопросу, по которому стороны не смогли договориться. Это ключевой узел контрактной машины FIDIC, и именно он чаще всего заедает на практике.

Порядок двухступенчатый. Сначала Инженер обязан провести консультации и попытаться достичь согласия сторон — это не факультативная любезность, а обязанность. Если согласие не достигнуто в срок, Инженер выносит определение: справедливое, обоснованное и с указанием подробных обоснований.

Издания 2017 года прямо требуют от Инженера действовать нейтрально при вынесении определения. Это стоит подчеркнуть: Инженер назначен и оплачивается Заказчиком, но в этой конкретной функции он не представляет его интересы. Смешение ролей — источник большинства споров о самих определениях.

Есть срок: как правило, 42 дня. Молчание Инженера не нейтрально — если определение не вынесено в срок, оно считается отклонением претензии, и это открывает сторонам путь к DAAB.

Практический вывод для Подрядчика: определение — не приговор, а ступень. Несогласие фиксируется Notice of Dissatisfaction в срок, иначе определение становится окончательным и обязательным.`,
      en: `A determination is the Engineer's decision under Sub-Clause 3.7 on a matter the parties could not agree. It is the central joint in the FIDIC machine, and it is the one that seizes up most often in practice.

The procedure has two stages. First the Engineer must consult and try to bring the parties to agreement — not an optional courtesy but a duty. If agreement is not reached in time, the Engineer makes a determination: fair, reasoned, and supported by detailed particulars.

The 2017 editions expressly require the Engineer to act neutrally when determining. That is worth stressing: the Engineer is appointed and paid by the Employer, but in this particular function it does not represent the Employer's interests. Conflating the two roles is the source of most disputes about determinations themselves.

There is a deadline, usually 42 days. The Engineer's silence is not neutral — if no determination is made in time, it is deemed a rejection of the claim, which opens the route to the DAAB.

The practical point for a contractor: a determination is a step, not a verdict. Disagreement must be recorded by a Notice of Dissatisfaction in time, or the determination becomes final and binding.`,
      uz: `Determination — Muhandisning Sub-Clause 3.7 bo‘yicha qarori: tomonlar kelisha olmagan masala bo‘yicha rasmiy yechim. Bu FIDIC shartnoma mashinasining asosiy tugunidir va amaliyotda aynan u ko‘proq tiqiladi.

Tartib ikki bosqichli. Avval Muhandis maslahatlashuv o‘tkazishi va tomonlarni kelishuvga keltirishga urinishi shart — bu ixtiyoriy xushmuomalalik emas, majburiyat. Kelishuv bo‘lmasa, Muhandis qaror chiqaradi: adolatli, asoslangan va batafsil izohlar bilan.

2017-yil tahrirlari Muhandisdan qaror chiqarishda neytral harakat qilishni talab qiladi. Muhandis Buyurtmachi tomonidan tayinlanadi va to‘lanadi, lekin bu funksiyada uning manfaatlarini ifodalamaydi.

Muddat bor: odatda 42 kun. Muhandisning sukuti neytral emas — qaror chiqarilmasa, u da’voni rad etish deb hisoblanadi.

Amaliy xulosa: qaror hukm emas, bosqich.`,
    } },
  { term: 'Pink Book / MDB', cat: 'documents', clauses: ['claims-20-2', 'payment-14'],
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
    slug: glossarySlug(t.term),
    label: t.label[lang],
    category: catLabels[t.cat][lang],
    definition: t.def[lang],
    long: t.long?.[lang],
    clauses: t.clauses ?? [],
  }));
}

/**
 * Terms that get their own URL — those with a written long form. Deliberately
 * data-driven rather than a hand-kept list: a term appears at /glossary/<slug>/
 * the moment it has something page-worthy to say, and never before.
 */
export function glossaryPages(lang: Lang): GlossaryTerm[] {
  return getGlossary(lang).filter((t) => t.long);
}

export function glossaryTermBySlug(slug: string, lang: Lang): GlossaryTerm | undefined {
  return glossaryPages(lang).find((t) => t.slug === slug);
}

/** Same category, for the "related terms" block. Excludes the term itself. */
export function relatedTerms(slug: string, lang: Lang, limit = 6): GlossaryTerm[] {
  const all = getGlossary(lang);
  const self = all.find((t) => t.slug === slug);
  if (!self) return [];
  return all.filter((t) => t.slug !== slug && t.category === self.category).slice(0, limit);
}

export function getGlossaryCategories(lang: Lang): string[] {
  const seen = new Set<string>();
  raw.forEach((t) => seen.add(catLabels[t.cat][lang]));
  return Array.from(seen);
}
