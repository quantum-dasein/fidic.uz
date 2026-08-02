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
    },
    long: {
      ru: `Инженер (Engineer) — лицо, назначенное Заказчиком для администрирования контракта в Red и Yellow Book. Это не надзорный орган и не представитель Заказчика в переговорах: у Инженера собственный набор полномочий, прописанных в контракте.

Он выдаёт платёжные сертификаты, инструктирует изменения, оценивает претензии, подтверждает завершение работ и принимает определения по спорным вопросам. Практически весь документооборот проекта проходит через него.

Ключевая двойственность: Инженер назначен и оплачивается Заказчиком, но при вынесении определения по Sub-Clause 3.7 обязан действовать нейтрально. Издания 2017 года прописали это требование прямо, потому что до этого оно подразумевалось и регулярно нарушалось. Инженер не обязан быть нейтральным всегда — он представляет интересы Заказчика при управлении проектом, — но в конкретной функции определения переключается в другой режим.

В Silver Book Инженера нет вовсе: там действует Представитель Заказчика, который нейтральности не изображает. Это одно из принципиальных отличий EPC-модели.

Практическая проблема региона: бюджет инженерной компании часто формируется по логике технического надзора, а обязанности прописаны по FIDIC. Разрыв закрывается качеством администрирования — определения выдаются с опозданием или не выдаются вовсе.`,
      en: `The Engineer is the person appointed by the Employer to administer the contract under the Red and Yellow Books. It is neither a supervisory authority nor the Employer's negotiator: the Engineer has its own set of powers, written into the contract.

It issues payment certificates, instructs variations, assesses claims, certifies completion and makes determinations on contested matters. Practically the whole documentary life of the project runs through it.

The central duality: the Engineer is appointed and paid by the Employer, yet when making a determination under Sub-Clause 3.7 it must act neutrally. The 2017 editions state that expressly, because before then it was implied and routinely ignored. The Engineer is not required to be neutral at all times — it manages the project in the Employer's interest — but in the specific act of determining it switches mode.

The Silver Book has no Engineer at all: there an Employer's Representative acts, and makes no pretence of neutrality. That is one of the defining differences of the EPC model.

The recurring regional problem: the supervision consultant's budget is often built on a technical-supervision logic while its obligations are written to FIDIC. The gap gets absorbed by the quality of administration — determinations come late, or never.`,
      uz: `Muhandis (Engineer) — Red va Yellow Book’da shartnomani yuritish uchun Buyurtmachi tomonidan tayinlangan shaxs. Bu nazorat organi ham, Buyurtmachining muzokaralardagi vakili ham emas: Muhandisning shartnomada yozilgan o‘z vakolatlari to‘plami bor.

U to‘lov sertifikatlarini beradi, o‘zgarishlarni ko‘rsatadi, da’volarni baholaydi, ishlar tugaganini tasdiqlaydi va bahsli masalalar bo‘yicha qaror qabul qiladi. Amalda loyihaning butun hujjat aylanishi u orqali o‘tadi.

Asosiy ikkiyoqlamalik: Muhandis Buyurtmachi tomonidan tayinlanadi va to‘lanadi, lekin Sub-Clause 3.7 bo‘yicha qaror chiqarishda neytral harakat qilishi shart. 2017-yil tahrirlari bu talabni to‘g‘ridan-to‘g‘ri yozdi.

Silver Book’da Muhandis umuman yo‘q: u yerda neytrallikni ko‘rsatmaydigan Buyurtmachi vakili harakat qiladi.

Mintaqaning amaliy muammosi: nazorat kompaniyasining byudjeti ko‘pincha texnik nazorat mantig‘i bo‘yicha shakllantiriladi, majburiyatlar esa FIDIC bo‘yicha yoziladi.`,
    } },
  { term: 'Employer', cat: 'roles',
    label: { ru: 'Заказчик', en: 'Employer', uz: 'Buyurtmachi' },
    def: {
      ru: 'Сторона, заказывающая работы и несущая платёжные обязательства; в Silver Book действует через Представителя Заказчика.',
      en: 'The party commissioning the works and carrying the payment obligations; in the Silver Book it acts through the Employer’s Representative.',
      uz: 'Ishlarga buyurtma beruvchi va to‘lov majburiyatlarini bajaruvchi tomon; Silver Book’da Buyurtmachi vakili orqali harakat qiladi.',
    },
    long: {
      ru: `Заказчик (Employer) — сторона, которая заказывает Работы, предоставляет доступ к площадке и несёт платёжные обязательства. В русскоязычной практике его часто называют «заказчиком» или «инвестором», но в контракте FIDIC это строго определённый термин с конкретным набором обязанностей.

Обязанности Заказчика недооценивают. Он должен предоставить право доступа и владения площадкой в срок, обеспечить финансовые договорённости и подтвердить их по запросу Подрядчика, предоставить данные о площадке, получить разрешения, которые по контракту его. Нарушение любого из этих пунктов даёт Подрядчику основание для претензии — по времени, а нередко и по деньгам.

Особенно значим Sub-Clause 2.4 (Employer's Financial Arrangements): Подрядчик вправе запросить доказательства того, что у Заказчика есть средства на оплату. Отсутствие ответа — самостоятельное основание для приостановки работ.

В Red и Yellow Book Заказчик действует через Инженера. В Silver Book — через Представителя Заказчика, и это меняет всю динамику: нет фигуры, обязанной быть нейтральной при определениях.

На проектах МФО роль Заказчика обычно исполняет группа реализации проекта при министерстве или агентстве, а не сам получатель займа.`,
      en: `The Employer is the party that commissions the Works, provides access to the Site and carries the payment obligations. In everyday speech people say "client" or "investor", but in a FIDIC contract this is a strictly defined term with a specific set of duties.

Those duties are consistently underestimated. The Employer must give the right of access to and possession of the Site on time, put financial arrangements in place and evidence them on request, supply site data, and obtain the permits allocated to it. Breaching any of these gives the Contractor a basis for a claim — for time, and often for money.

Sub-Clause 2.4 (Employer's Financial Arrangements) is particularly potent: the Contractor may request evidence that the Employer can pay. A failure to respond is a standalone ground for suspending work.

Under the Red and Yellow Books the Employer acts through the Engineer. Under the Silver Book it acts through the Employer's Representative, which changes the whole dynamic: there is no figure obliged to be neutral when determining.

On MDB projects the Employer's role is usually performed by a project implementation unit at a ministry or agency, not by the borrower itself.`,
      uz: `Buyurtmachi (Employer) — Ishlarga buyurtma beruvchi, maydonga kirish imkonini beruvchi va to‘lov majburiyatlarini bajaruvchi tomon. Kundalik nutqda «buyurtmachi» yoki «investor» deyiladi, lekin FIDIC shartnomasida bu aniq majburiyatlar to‘plamiga ega qat’iy belgilangan atama.

Buyurtmachining majburiyatlari kam baholanadi. U maydonga kirish va egalik huquqini o‘z vaqtida berishi, moliyaviy kelishuvlarni ta’minlashi va so‘rov bo‘yicha tasdiqlashi, maydon ma’lumotlarini berishi, o‘ziga tegishli ruxsatnomalarni olishi kerak. Bularning har qandayini buzish Pudratchiga da’vo asosini beradi.

Sub-Clause 2.4 (Employer's Financial Arrangements) ayniqsa muhim: Pudratchi Buyurtmachida to‘lash uchun mablag‘ borligining dalilini so‘rashi mumkin. Javob bo‘lmasligi ishlarni to‘xtatish uchun mustaqil asos.

XTB loyihalarida Buyurtmachi rolini odatda vazirlik huzuridagi loyihani amalga oshirish guruhi bajaradi.`,
    } },
  { term: 'Contractor', cat: 'roles',
    label: { ru: 'Подрядчик', en: 'Contractor', uz: 'Pudratchi' },
    def: {
      ru: 'Сторона, выполняющая работы; в Yellow/Silver также отвечает за проектирование.',
      en: 'The party carrying out the works; in Yellow/Silver also responsible for the design.',
      uz: 'Ishlarni bajaruvchi tomon; Yellow/Silver’da loyihalash uchun ham javobgar.',
    },
    long: {
      ru: `Подрядчик (Contractor) — сторона, выполняющая Работы. Объём его ответственности принципиально зависит от того, какая книга взята: в Red Book он строит по проекту Заказчика, в Yellow и Silver Book — ещё и проектирует.

Разница не количественная, а качественная. Когда Подрядчик отвечает за проектирование, к нему применяется стандарт fitness for purpose: результат должен быть пригоден для назначения, указанного в Employer's Requirements. Это строже привычного «должная профессиональная осмотрительность» и, что важно, часто не покрывается стандартной страховкой профессиональной ответственности. Проверять это нужно до подписания, а не после.

Базовые обязанности одинаковы во всех книгах: выполнить Работы в соответствии с контрактом, предоставить обеспечение исполнения, вести программу работ, соблюдать требования охраны труда и экологии, устранять дефекты в течение DNP.

Права Подрядчика столь же конкретны и часто не используются: приостановка при неоплате, продление срока при задержках со стороны Заказчика, запрос подтверждения финансовых договорённостей, компенсация при непредвиденных физических условиях. Все они работают через процедуру уведомления по Clause 20 — и теряются вместе с пропущенным сроком.`,
      en: `The Contractor is the party carrying out the Works. The scope of its responsibility depends fundamentally on which book applies: under the Red Book it builds to the Employer's design; under the Yellow and Silver Books it designs as well.

The difference is qualitative, not just quantitative. Where the Contractor is responsible for design, a fitness-for-purpose standard applies: the result must be fit for the purpose stated in the Employer's Requirements. That is stricter than the familiar "reasonable skill and care" and — importantly — is frequently excluded from standard professional indemnity cover. Check that before signing, not after.

The core obligations are the same across the books: execute the Works in accordance with the Contract, provide the performance security, maintain the programme, comply with health, safety and environmental requirements, and remedy defects during the DNP.

The Contractor's rights are equally specific and routinely unused: suspension for non-payment, extension of time for Employer delays, the right to evidence of financial arrangements, and compensation for unforeseeable physical conditions. Every one of them runs through the notice procedure in Clause 20 — and is lost with a missed deadline.`,
      uz: `Pudratchi (Contractor) — Ishlarni bajaruvchi tomon. Uning javobgarlik hajmi qaysi kitob olinganiga tubdan bog‘liq: Red Book’da u Buyurtmachi loyihasi bo‘yicha quradi, Yellow va Silver Book’da esa loyihalashtiradi ham.

Farq miqdoriy emas, sifat jihatidan. Pudratchi loyihalash uchun javobgar bo‘lganda unga fitness for purpose standarti qo‘llaniladi: natija Employer's Requirements’da ko‘rsatilgan maqsadga yaroqli bo‘lishi kerak. Bu odatdagi «kasbiy ehtiyotkorlik»dan qat’iyroq va ko‘pincha standart kasbiy javobgarlik sug‘urtasi bilan qoplanmaydi.

Asosiy majburiyatlar barcha kitoblarda bir xil: Ishlarni shartnomaga muvofiq bajarish, ijro ta’minotini berish, ishlar dasturini yuritish, mehnat muhofazasi va ekologiya talablariga rioya qilish, DNP davomida nuqsonlarni bartaraf etish.

Pudratchining huquqlari ham aniq va ko‘pincha ishlatilmaydi: to‘lanmaganda to‘xtatish, Buyurtmachi kechikishlarida muddatni uzaytirish, kutilmagan fizik sharoitlarda kompensatsiya.`,
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
    },
    long: {
      ru: `Notice of Dissatisfaction (NOD) — уведомление о несогласии с решением DAAB. Это последний рубеж: пока NOD не подан, у стороны есть право оспорить решение в арбитраже; после истечения срока решение становится окончательным и обязательным.

Срок — 28 дней с даты получения решения DAAB. Пропуск этого срока — не процедурная формальность: решение приобретает силу, которую уже не пересмотреть, каким бы неверным оно ни казалось.

Ключевой момент, который постоянно путают: подача NOD **не приостанавливает исполнение**. Решение DAAB обязательно к немедленному исполнению независимо от того, согласны вы с ним или нет. Вы платите или исполняете сейчас, а спорите потом. Отказ исполнять решение, по которому подан NOD, сам по себе становится нарушением контракта — и по нему можно получить отдельное разбирательство.

После NOD стороны обязаны попытаться урегулировать спор миром — в изданиях 2017 года на это отведено 28 дней, — и только затем открывается путь в арбитраж.

NOD подаётся и на определение Инженера, если сторона с ним не согласна: там срок тоже 28 дней, и последствия пропуска те же — определение становится окончательным.`,
      en: `A Notice of Dissatisfaction (NOD) records disagreement with a DAAB decision. It is the last gate: until a NOD is given, the party retains the right to take the dispute to arbitration; once the deadline passes, the decision becomes final and binding.

The period is 28 days from receipt of the DAAB decision. Missing it is not a procedural slip: the decision acquires a force that cannot be revisited, however wrong it may look.

The point that is constantly confused: giving a NOD **does not suspend compliance**. A DAAB decision is binding with immediate effect whether or not you agree with it. You pay or perform now and argue later. Refusing to comply with a decision that is under a NOD is itself a breach of contract, and can be pursued as one.

After a NOD the parties must attempt an amicable settlement — the 2017 editions allow 28 days for it — and only then does the route to arbitration open.

A NOD is also given against an Engineer's determination where a party disagrees: the period is likewise 28 days, and the consequence of missing it is the same — the determination becomes final.`,
      uz: `Notice of Dissatisfaction (NOD) — DAAB qarori bilan rozi emaslik to‘g‘risidagi xabarnoma. Bu oxirgi chegara: NOD berilmaguncha tomonning qarorni arbitrajda e’tiroz bildirish huquqi bor; muddat tugagach qaror yakuniy va majburiy bo‘lib qoladi.

Muddat — DAAB qarori olingan sanadan 28 kun. Bu muddatni o‘tkazib yuborish protsessual rasmiyatchilik emas.

Doimo chalkashtiriladigan asosiy jihat: NOD berish **ijroni to‘xtatmaydi**. DAAB qarori siz rozi bo‘lasizmi yoki yo‘qmi, darhol ijro etilishi shart. Siz hozir to‘laysiz yoki bajarasiz, keyin bahslashasiz. NOD berilgan qarorni bajarishdan bosh tortish o‘zi shartnoma buzilishiga aylanadi.

NOD’dan keyin tomonlar nizoni tinch yo‘l bilan hal qilishga urinishlari shart — 2017-yil tahrirlarida buning uchun 28 kun berilgan — va faqat keyin arbitrajga yo‘l ochiladi.

NOD Muhandis qaroriga qarshi ham beriladi: muddat ham 28 kun.`,
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
    },
    long: {
      ru: `Performance Certificate — сертификат исполнения, который Инженер выдаёт после истечения Периода уведомления о дефектах и завершения всех работ по устранению. Это документ, который окончательно закрывает обязательства Подрядчика по исполнению контракта.

Важно понимать: обязательства заканчиваются не с истечением календарного срока DNP, а с выдачей этого сертификата. Пока он не выдан, Подрядчик остаётся связанным — даже если формально период прошёл.

С момента выдачи запускаются несколько следствий. Заказчик обязан вернуть Performance Security в течение 21 дня — срок, который нарушается регулярно, и о котором стоит напоминать письменно. Начинается процедура окончательного расчёта: Подрядчик подаёт Final Statement, и стороны закрывают финансовую сторону контракта.

Чего Performance Certificate **не** делает — не освобождает от ответственности за скрытые дефекты и не прекращает обязательств, которые по своей природе продолжаются после завершения: конфиденциальность, гарантии на отдельные элементы, ответственность за грубую небрежность. Sub-Clause 11.10 прямо это оговаривает.

Не путайте с Taking-Over Certificate: тот выдаётся в начале DNP и означает приёмку Работ, этот — в конце и означает исполнение контракта.`,
      en: `The Performance Certificate is issued by the Engineer once the Defects Notification Period has expired and all outstanding remedial work is complete. It is the document that finally discharges the Contractor's obligations to perform the Contract.

The point to grasp: obligations do not end when the DNP calendar period runs out — they end when this certificate is issued. Until then the Contractor remains bound, even if the period has formally elapsed.

Issuing it triggers several consequences. The Employer must return the Performance Security within 21 days — a deadline that is routinely missed and worth chasing in writing. The final account process begins: the Contractor submits the Final Statement and the parties close out the financial side.

What the Performance Certificate does **not** do: it does not release the Contractor from liability for latent defects, and it does not end obligations that by their nature survive completion — confidentiality, specific warranties, liability for gross negligence. Sub-Clause 11.10 says so expressly.

Do not confuse it with the Taking-Over Certificate, which is issued at the start of the DNP and marks acceptance of the Works. This one comes at the end and marks performance of the Contract.`,
      uz: `Performance Certificate — Nuqsonlar to‘g‘risida xabar berish davri tugagach va barcha bartaraf etish ishlari yakunlangach Muhandis beradigan ijro sertifikati. Bu Pudratchining shartnomani bajarish majburiyatlarini yakuniy yopadigan hujjat.

Muhimi: majburiyatlar DNP kalendar muddati tugashi bilan emas, ushbu sertifikat berilishi bilan tugaydi. U berilmaguncha Pudratchi bog‘langan bo‘lib qoladi.

Berilgan paytdan bir necha oqibat boshlanadi. Buyurtmachi Performance Security’ni 21 kun ichida qaytarishi shart — muntazam buziladigan muddat. Yakuniy hisob-kitob tartibi boshlanadi: Pudratchi Final Statement topshiradi.

Performance Certificate **qilmaydigan** narsa: u yashirin nuqsonlar uchun javobgarlikdan ozod qilmaydi va tabiatan tugaganidan keyin davom etadigan majburiyatlarni to‘xtatmaydi. Sub-Clause 11.10 buni to‘g‘ridan-to‘g‘ri belgilaydi.

Taking-Over Certificate bilan adashtirmang: u DNP boshida beriladi.`,
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
    },
    long: {
      ru: `Provisional Sum — резервная сумма, включённая в договорную цену на работы, поставки или услуги, которые на момент подписания не определены достаточно точно, чтобы их можно было оценить. Инструмент честный: он признаёт, что часть объёма ещё не ясна, вместо того чтобы делать вид, что ясна.

Механика проста и часто нарушается. Сумма включена в Принятую договорную сумму, но **не принадлежит Подрядчику**. Расходовать её можно только по инструкции Инженера — целиком, частично или вовсе никак. Неиспользованный остаток вычитается из окончательного расчёта.

Оценивается израсходованная часть как Variation по [Clause 13](/clauses/variations-13/), плюс согласованный процент на накладные расходы и прибыль Подрядчика, если резерв реализуется через субподряд или закупку.

Практическая ловушка: Provisional Sum не даёт Подрядчику права требовать работу и не гарантирует объём. Планировать загрузку и прибыль исходя из резервных сумм — ошибка, которая обходится дорого при закрытии проекта.

Обратная ловушка для Заказчика: слишком большая доля резервных сумм означает, что цена контракта на самом деле не определена, а конкурс сравнивал предложения, которые несопоставимы.`,
      en: `A Provisional Sum is an amount included in the Contract Price for work, supply or services that are not defined precisely enough at signature to be priced. It is an honest device: it admits that part of the scope is still unclear rather than pretending otherwise.

The mechanics are simple and frequently broken. The sum sits inside the Accepted Contract Amount but **does not belong to the Contractor**. It can only be spent on the Engineer's instruction — in whole, in part, or not at all. Anything unspent is deducted at final account.

The part that is spent is valued as a Variation under [Clause 13](/en/clauses/variations-13/), plus the agreed percentage for the Contractor's overhead and profit where the sum is delivered through a subcontract or purchase.

The practical trap: a Provisional Sum gives the Contractor no right to the work and no guarantee of volume. Planning workload or margin around provisional sums is an expensive mistake at close-out.

The mirror trap for the Employer: too large a share of provisional sums means the contract price is not actually fixed, and the tender compared bids that were never comparable.`,
      uz: `Provisional Sum — imzolash paytida baholash uchun yetarli darajada aniq bo‘lmagan ishlar, yetkazib berish yoki xizmatlar uchun shartnoma narxiga kiritilgan zaxira summa. Bu halol vosita: u hajmning bir qismi hali aniq emasligini tan oladi.

Mexanika oddiy va tez-tez buziladi. Summa Qabul qilingan shartnoma summasiga kiradi, lekin **Pudratchiga tegishli emas**. Uni faqat Muhandis ko‘rsatmasi bo‘yicha sarflash mumkin — to‘liq, qisman yoki umuman yo‘q. Sarflanmagan qoldiq yakuniy hisob-kitobdan chegiriladi.

Sarflangan qism [Clause 13](/uz/clauses/variations-13/) bo‘yicha Variation sifatida baholanadi, ustiga kelishilgan foiz qo‘shiladi.

Amaliy tuzoq: Provisional Sum Pudratchiga ishni talab qilish huquqini bermaydi va hajmni kafolatlamaydi. Zaxira summalardan kelib chiqib yuklama va foydani rejalashtirish — qimmatga tushadigan xato.

Buyurtmachi uchun teskari tuzoq: zaxira summalarning ulushi juda katta bo‘lsa, shartnoma narxi aslida aniqlanmagan.`,
    } },
  { term: 'Bill of Quantities (BoQ)', cat: 'documents',
    label: { ru: 'Ведомость объёмов', en: 'Bill of Quantities', uz: 'Hajmlar qaydnomasi' },
    def: {
      ru: 'Перечень объёмов работ с расценками; основа оплаты в Red/Pink Book (re-measurement).',
      en: 'A priced schedule of work quantities; the basis of payment in the Red/Pink Book (re-measurement).',
      uz: 'Narxlangan ish hajmlari ro‘yxati; Red/Pink Book’da to‘lov asosi (re-measurement).',
    },
    long: {
      ru: `Bill of Quantities (BoQ) — ведомость объёмов работ: перечень позиций с единицами измерения, расчётными количествами и расценками Подрядчика. Это основа модели ценообразования Red Book, где оплата идёт по фактически измеренным объёмам, а не по фиксированной сумме.

Ключевое свойство, которое часто понимают неправильно: количества в BoQ — **расчётные, а не гарантированные**. Оплачивается то, что фактически выполнено и измерено. Если объём оказался больше — платят больше; меньше — меньше. Именно поэтому Red Book подходит там, где объёмы заранее известны приблизительно: земляные работы, дороги, сети.

Расценки из BoQ работают дальше как инструмент оценки: при [Variation](/glossary/variation/) сначала ищется применимая ставка из ведомости, затем ставка по аналогии, и только потом согласовывается новая. Поэтому качество проработки BoQ на стадии тендера прямо влияет на то, насколько предсказуемо будут оцениваться изменения.

Существенное расхождение объёма по позиции может дать основание пересмотреть ставку: при значительном изменении количества первоначальная расценка перестаёт отражать реальную стоимость единицы.

В Yellow и Silver Book BoQ в этой роли нет — там твёрдая цена, а разбивка используется для платежей по вехам.`,
      en: `A Bill of Quantities (BoQ) is a schedule of work items with units, estimated quantities and the Contractor's rates. It underpins the Red Book's pricing model, where payment follows quantities actually measured rather than a lump sum.

The property that is most often misread: the quantities in a BoQ are **estimated, not guaranteed**. What gets paid is what was actually done and measured. More work than billed means more money; less means less. That is why the Red Book suits work whose quantities are only approximately known in advance — earthworks, roads, networks.

The BoQ rates then serve as a valuation tool: when a [Variation](/en/glossary/variation/) arises, the first step is an applicable rate from the bill, then a rate derived by analogy, and only then a newly agreed one. So how carefully the BoQ was built at tender stage directly determines how predictably changes will be valued.

A substantial change in the quantity of an item can justify revisiting its rate: where the quantity shifts significantly, the original rate stops reflecting the true unit cost.

The Yellow and Silver Books have no BoQ in this role — the price is lump sum, and the breakdown serves milestone payments.`,
      uz: `Bill of Quantities (BoQ) — ishlar hajmi vedomosti: o‘lchov birliklari, hisoblangan miqdorlar va Pudratchi narxlari bilan pozitsiyalar ro‘yxati. Bu Red Book narx modelining asosi, u yerda to‘lov qat’iy summa bo‘yicha emas, amalda o‘lchangan hajmlar bo‘yicha boradi.

Ko‘pincha noto‘g‘ri tushuniladigan asosiy xususiyat: BoQ’dagi miqdorlar — **hisoblangan, kafolatlangan emas**. Amalda bajarilgan va o‘lchangan narsa to‘lanadi.

BoQ narxlari keyin baholash vositasi sifatida ishlaydi: [Variation](/uz/glossary/variation/) yuzaga kelganda avval vedomostdagi amaldagi stavka, keyin o‘xshashlik bo‘yicha stavka, va faqat keyin yangisi kelishiladi. Shuning uchun tender bosqichida BoQ qanchalik puxta ishlanganligi o‘zgarishlar qanchalik bashorat qilinadigan baholanishiga bevosita ta’sir qiladi.

Pozitsiya bo‘yicha hajmning sezilarli o‘zgarishi stavkani qayta ko‘rib chiqish uchun asos berishi mumkin.

Yellow va Silver Book’da bu roldagi BoQ yo‘q.`,
    } },
  { term: 'Tests on Completion', cat: 'procedures', clauses: ['taking-over-10-1'],
    label: { ru: 'Испытания при завершении', en: 'Tests on Completion', uz: 'Yakunlashda sinovlar' },
    def: {
      ru: 'Испытания перед приёмкой, подтверждающие соответствие Работ требованиям (Clause 9).',
      en: 'Tests before taking-over confirming the Works meet the requirements (Clause 9).',
      uz: 'Qabul qilishdan oldin Ishlar talablarga mosligini tasdiqlovchi sinovlar (Clause 9).',
    },
    long: {
      ru: `Tests on Completion — испытания при завершении: проверки, которые Подрядчик обязан провести и успешно пройти до того, как Работы могут быть приняты. Без них [Taking-Over Certificate](/glossary/taking-over-certificate/) не выдаётся, а значит не запускаются ни переход риска, ни остановка delay damages.

Последовательность в изданиях 2017 года трёхступенчатая: предпусковые испытания, пусковые испытания, затем пробная эксплуатация. Конкретный состав задаётся в Employer's Requirements или Спецификации — и именно там прячется большинство проблем.

Практическое правило: читать раздел об испытаниях нужно на стадии тендера, а не за месяц до сдачи. Критерии приёмки, кто предоставляет сырьё и энергоносители для испытаний, что считается успешным прохождением, сколько повторов допускается — всё это влияет на стоимость и на риск.

Если испытания не пройдены, Подрядчик вправе повторить их. Если не проходят повторно, у Заказчика появляется выбор: отклонить Работы, принять их со снижением договорной цены или потребовать повторных испытаний. Отказ Заказчика провести испытания в срок работает в пользу Подрядчика — испытания могут считаться пройденными.

Не путайте с [Tests after Completion](/glossary/tests-after-completion/): те проводятся уже после приёмки и проверяют эксплуатационные показатели.`,
      en: `Tests on Completion are the tests the Contractor must carry out and pass before the Works can be taken over. Without them no [Taking-Over Certificate](/en/glossary/taking-over-certificate/) is issued — and so neither the transfer of risk nor the end of delay damages is triggered.

Under the 2017 editions the sequence has three stages: pre-commissioning tests, commissioning tests, and then a trial operation. What each actually involves is set in the Employer's Requirements or the Specification — and that is where most of the trouble hides.

The practical rule: read the testing section at tender stage, not a month before handover. Acceptance criteria, who supplies feedstock and utilities for the tests, what counts as a pass, how many repeats are allowed — all of it drives cost and risk.

If a test is failed the Contractor may repeat it. If it fails again the Employer has a choice: reject the Works, accept them with a reduction in the Contract Price, or require further testing. An Employer that fails to carry out testing on time works in the Contractor's favour — the tests may be deemed passed.

Do not confuse these with [Tests after Completion](/en/glossary/tests-after-completion/), which are run after taking-over and check operating performance.`,
      uz: `Tests on Completion — tugatishdagi sinovlar: Ishlar qabul qilinishidan oldin Pudratchi o‘tkazishi va muvaffaqiyatli o‘tishi shart bo‘lgan tekshiruvlar. Ularsiz [Taking-Over Certificate](/uz/glossary/taking-over-certificate/) berilmaydi.

2017-yil tahrirlarida ketma-ketlik uch bosqichli: ishga tushirishdan oldingi sinovlar, ishga tushirish sinovlari, keyin sinov ekspluatatsiyasi. Aniq tarkib Employer's Requirements yoki Spetsifikatsiyada beriladi — va aynan u yerda muammolarning ko‘pchiligi yashiringan.

Amaliy qoida: sinovlar bo‘limini topshirishdan bir oy oldin emas, tender bosqichida o‘qish kerak. Qabul mezonlari, sinovlar uchun xomashyo va energiyani kim beradi, muvaffaqiyatli o‘tish nima hisoblanadi — bularning barchasi narx va xavfga ta’sir qiladi.

Sinov o‘tmasa, Pudratchi uni takrorlashi mumkin. Buyurtmachining sinovlarni o‘z vaqtida o‘tkazmasligi Pudratchi foydasiga ishlaydi.`,
    } },
  { term: 'Tests after Completion', cat: 'procedures', clauses: ['taking-over-10-1', 'defects-period-11'],
    label: { ru: 'Испытания после завершения', en: 'Tests after Completion', uz: 'Yakunlashdan keyingi sinovlar' },
    def: {
      ru: 'Эксплуатационные испытания после приёмки (Yellow/Silver, Clause 12), подтверждающие проектные показатели.',
      en: 'Operational tests after taking-over (Yellow/Silver, Clause 12) confirming design performance.',
      uz: 'Qabul qilingandan keyingi ekspluatatsion sinovlar (Yellow/Silver, Clause 12), loyiha ko‘rsatkichlarini tasdiqlaydi.',
    },
    long: {
      ru: `Tests after Completion — испытания после завершения: проверки эксплуатационных показателей объекта, которые проводятся уже после приёмки Работ, в период уведомления о дефектах. Встречаются прежде всего в Yellow и Silver Book, где Подрядчик отвечает за проектирование и, следовательно, за то, что объект действительно работает как обещано.

Смысл в том, что часть характеристик невозможно проверить в момент сдачи: производительность установки на разных режимах, расход энергии, выход продукции, доступность оборудования. Для этого нужен период реальной эксплуатации.

Здесь возникает практическая сложность, которой нет в Tests on Completion: объектом уже управляет Заказчик. Поэтому контракт распределяет обязанности — Заказчик обеспечивает условия испытаний и предоставляет персонал, Подрядчик участвует и получает доступ. Если Заказчик эксплуатирует объект неправильно, а показатели не достигнуты, вопрос ответственности становится спорным.

Последствия непрохождения обычно денежные, а не отказ от объекта: контракт задаёт performance damages — штрафы за недостижение гарантированных показателей, часто с формулой пересчёта. Их размер и потолок нужно проверять до подписания: на крупных промышленных объектах это одна из самых существенных статей риска.`,
      en: `Tests after Completion check the operating performance of the facility after the Works have been taken over, during the defects notification period. They appear mainly in the Yellow and Silver Books, where the Contractor is responsible for the design and therefore for whether the plant actually performs as promised.

The rationale is that some characteristics cannot be verified at handover: output at different operating regimes, energy consumption, product yield, equipment availability. Establishing those needs a period of real operation.

That creates a difficulty absent from Tests on Completion: the Employer is already operating the facility. So the contract allocates duties — the Employer provides the test conditions and personnel, the Contractor attends and is given access. Where the Employer operates the plant incorrectly and the figures are missed, responsibility becomes contested.

The consequence of failure is usually financial rather than rejection: the contract sets performance damages for missing guaranteed figures, often with a formula. Their level and cap need checking before signature — on large industrial projects this is one of the most material risk items in the whole contract.`,
      uz: `Tests after Completion — tugatishdan keyingi sinovlar: Ishlar qabul qilingandan keyin, nuqsonlar to‘g‘risida xabar berish davrida o‘tkaziladigan ekspluatatsiya ko‘rsatkichlarini tekshirish. Asosan Yellow va Silver Book’da uchraydi.

Mohiyati shundaki, ba’zi xususiyatlarni topshirish paytida tekshirib bo‘lmaydi: turli rejimlarda unumdorlik, energiya sarfi, mahsulot chiqishi, uskunalar mavjudligi. Buning uchun real ekspluatatsiya davri kerak.

Bu yerda Tests on Completion’da yo‘q amaliy murakkablik yuzaga keladi: obyektni allaqachon Buyurtmachi boshqaradi. Shuning uchun shartnoma majburiyatlarni taqsimlaydi — Buyurtmachi sinov sharoitlarini va xodimlarni ta’minlaydi, Pudratchi ishtirok etadi.

O‘tmaslik oqibati odatda moliyaviy: shartnoma kafolatlangan ko‘rsatkichlarga erishmaganlik uchun performance damages belgilaydi. Ularning miqdori va cheklovini imzolashdan oldin tekshirish kerak.`,
    } },
  { term: 'Exceptional Event', cat: 'procedures', clauses: ['exceptional-events-18'],
    label: { ru: 'Исключительное событие', en: 'Exceptional Event', uz: 'Istisno hodisa' },
    def: {
      ru: 'Событие вне контроля сторон (в 1999 — Force Majeure), дающее право на освобождение от ответственности (Clause 18).',
      en: 'An event beyond the parties’ control (Force Majeure in 1999), giving relief from liability (Clause 18).',
      uz: 'Tomonlar nazoratidan tashqari hodisa (1999-yilda — Force Majeure), javobgarlikdan ozod qilish huquqini beradi (Clause 18).',
    },
    long: {
      ru: `Exceptional Event — исключительное событие: то, что в изданиях 1999 года называлось Force Majeure. Переименование в 2017 году не косметическое: термин «форс-мажор» в разных правовых системах означает разное, и FIDIC ушёл от него, чтобы контракт определял понятие сам, а не отсылал к национальному праву.

Определение построено на четырёх условиях, и все должны выполняться одновременно: событие вне контроля стороны; которое она не могла разумно предвидеть до заключения контракта; которого она не могла разумно избежать или преодолеть; и которое не может быть отнесено к другой стороне. Примерный перечень — война, восстание, мятеж, терроризм, стихийные бедствия — открытый, а не исчерпывающий.

Практическое следствие, которое важнее определения: исключительное событие даёт **продление срока, но не деньги**. Cost возмещается только для отдельных категорий событий и только если они произошли в стране проекта. Это и есть частый случай «time, no money».

Процедура жёсткая: уведомить нужно в течение 14 дней с момента, когда сторона узнала или должна была узнать о событии. Срок короче обычных 28 дней по [Clause 20](/clauses/claims-20-2/), и об этом регулярно забывают.

Если событие мешает исполнению непрерывно 84 дня или суммарно 140 дней, любая сторона вправе расторгнуть контракт.`,
      en: `An Exceptional Event is what the 1999 editions called Force Majeure. The 2017 rename is not cosmetic: "force majeure" means different things in different legal systems, and FIDIC moved away from it so the contract defines the concept itself rather than deferring to national law.

The definition rests on four conditions, all of which must hold at once: the event is beyond a party's control; the party could not reasonably have provided against it before entering the contract; having arisen, the party could not reasonably have avoided or overcome it; and it is not substantially attributable to the other party. The list that follows — war, rebellion, riot, terrorism, natural catastrophe — is indicative, not exhaustive.

The practical consequence matters more than the definition: an Exceptional Event gives **an extension of time, but not money**. Cost is recoverable only for certain categories of event, and only where they occur in the country of the project. This is the archetypal "time, no money" case.

The procedure is tight: notice within 14 days of when the party became aware or should have become aware. That is shorter than the usual 28 days under [Clause 20](/en/clauses/claims-20-2/), and it is regularly forgotten.

If the event prevents performance for 84 continuous days, or 140 days in aggregate, either party may terminate.`,
      uz: `Exceptional Event — istisno hodisa: 1999-yil tahrirlarida Force Majeure deb atalgan narsa. 2017-yildagi qayta nomlash kosmetik emas: «fors-major» atamasi turli huquqiy tizimlarda turlicha ma’no beradi, va FIDIC shartnoma tushunchani o‘zi belgilashi uchun undan uzoqlashdi.

Ta’rif to‘rt shartga quriladi va barchasi bir vaqtda bajarilishi kerak: hodisa tomon nazoratidan tashqarida; shartnoma tuzishdan oldin uni oqilona oldindan ko‘ra olmagan; undan qochib yoki yenga olmagan; va u boshqa tomonga bog‘lanmaydi. Ro‘yxat — urush, qo‘zg‘olon, terrorizm, tabiiy ofatlar — ochiq.

Ta’rifdan muhimroq amaliy oqibat: istisno hodisa **muddatni uzaytirish beradi, pul emas**. Cost faqat ayrim toifadagi hodisalar uchun qoplanadi. Bu «time, no money»ning odatiy holati.

Tartib qat’iy: xabardor bo‘lgan paytdan 14 kun ichida xabar berish kerak. Bu [Clause 20](/uz/clauses/claims-20-2/) bo‘yicha odatdagi 28 kundan qisqaroq.

Hodisa 84 kun uzluksiz to‘sqinlik qilsa, har qanday tomon shartnomani bekor qilishi mumkin.`,
    } },
  { term: 'Delay Damages', cat: 'payments', clauses: ['delay-damages-8-8', 'extension-of-time-8-5'],
    label: { ru: 'Неустойка за просрочку', en: 'Delay Damages', uz: 'Kechikish uchun jarima' },
    def: {
      ru: 'Заранее оценённые убытки за задержку завершения (liquidated damages), обычно с предельным размером.',
      en: 'Pre-assessed damages for delayed completion (liquidated damages), usually capped.',
      uz: 'Yakunlash kechikkani uchun oldindan baholangan zararlar (liquidated damages), odatda chegaralangan.',
    },
    long: {
      ru: `Delay Damages — заранее оценённые убытки за просрочку завершения Работ. В русскоязычной практике их называют неустойкой или штрафом за просрочку, но юридическая природа другая, и разница практическая.

Delay damages — это **не штраф**, а согласованная сторонами предварительная оценка убытков Заказчика от того, что объект не введён в срок. Заказчику не нужно доказывать размер фактических потерь: он применяет ставку из Contract Data. Обратная сторона — он не может требовать больше этой суммы, даже если реальные убытки оказались выше.

Ставка задаётся за день просрочки, обычно в процентах от Принятой договорной суммы, и почти всегда имеет потолок — типично 5–15% от цены контракта. **Проверять наличие потолка нужно до подачи заявки**: контракт без cap означает неограниченную ответственность за просрочку, и это меняет всю экономику предложения.

Начисление останавливается датой, указанной в [Taking-Over Certificate](/glossary/taking-over-certificate/) — отсюда цена спора о дате приёмки.

Важное ограничение: delay damages — единственное средство защиты Заказчика за саму просрочку. Он не может параллельно взыскивать общие убытки за то же опоздание. Но это не мешает ему предъявлять требования по другим основаниям — за дефекты, недостижение показателей, нарушение иных обязательств.

Если просрочка вызвана Заказчиком, а Подрядчик не получил положенное [продление срока](/glossary/extension-of-time-eot/), начисление damages становится оспоримым.`,
      en: `Delay Damages are liquidated damages for late completion of the Works. People call them a penalty, but the legal nature is different and the difference is practical.

Delay damages are **not a penalty**: they are the parties' pre-agreed estimate of the Employer's loss from the facility not being in service on time. The Employer does not have to prove actual loss — it applies the rate from the Contract Data. The flip side is that it cannot recover more than that, even where the real loss was greater.

The rate is per day of delay, usually a percentage of the Accepted Contract Amount, and almost always subject to a cap — typically 5–15% of the contract price. **Check that the cap exists before bidding**: a contract without one means unlimited exposure to delay, which changes the economics of the bid entirely.

Accrual stops at the date stated in the [Taking-Over Certificate](/en/glossary/taking-over-certificate/) — hence the value of an argument about that date.

An important limit: delay damages are the Employer's sole remedy for the delay itself. It cannot also claim general damages for the same lateness. That does not stop it claiming on other grounds — defects, missed performance figures, other breaches.

Where the delay was caused by the Employer and the Contractor did not receive the [extension of time](/en/glossary/extension-of-time-eot/) it was due, the accrual of damages becomes challengeable.`,
      uz: `Delay Damages — Ishlarni kechiktirib tugatganlik uchun oldindan baholangan zararlar. Ularni jarima deb atashadi, lekin huquqiy tabiati boshqacha.

Delay damages — **jarima emas**: bu tomonlar oldindan kelishgan, obyekt o‘z vaqtida ishga tushmaganidan Buyurtmachi ko‘radigan zarar bahosi. Buyurtmachi haqiqiy zarar miqdorini isbotlashi shart emas — u Contract Data’dagi stavkani qo‘llaydi. Teskari tomoni: real zarar ko‘proq bo‘lsa ham, u bundan ortiqni talab qila olmaydi.

Stavka kechikish kuni uchun beriladi, odatda Qabul qilingan shartnoma summasining foizida, va deyarli doimo cheklovga ega — odatda shartnoma narxining 5–15%. **Cheklov borligini topshirishdan oldin tekshirish kerak**.

Hisoblanish [Taking-Over Certificate](/uz/glossary/taking-over-certificate/)da ko‘rsatilgan sanada to‘xtaydi.

Muhim cheklov: delay damages — kechikishning o‘zi uchun Buyurtmachining yagona himoya vositasi. U bir vaqtda umumiy zararlarni undira olmaydi.

Kechikish Buyurtmachi sababli bo‘lsa va Pudratchi tegishli [muddat uzaytirishni](/uz/glossary/extension-of-time-eot/) olmagan bo‘lsa, damages hisoblanishi e’tirozli bo‘ladi.`,
    } },
  { term: 'Final Statement', cat: 'payments', clauses: ['payment-14'],
    label: { ru: 'Итоговый расчёт', en: 'Final Statement', uz: 'Yakuniy hisob-kitob' },
    def: {
      ru: 'Расчёт Подрядчика по завершении для окончательного определения причитающихся сумм (Clause 14).',
      en: 'The Contractor’s statement at completion to finally determine the amounts due (Clause 14).',
      uz: 'Tegishli summalarni yakuniy aniqlash uchun Pudratchining yakunlashdagi hisob-kitobi (Clause 14).',
    },
    long: {
      ru: `Final Statement — окончательный расчёт: итоговый документ, которым Подрядчик закрывает финансовую сторону контракта. Подаётся после выдачи [Performance Certificate](/glossary/performance-certificate/), обычно в течение 56 дней.

Логика двухступенчатая. Сначала Подрядчик подаёт проект окончательного расчёта, стороны его обсуждают, Инженер может потребовать корректировок. Затем подаётся сам Final Statement — уже согласованный — вместе с письменным подтверждением о полном урегулировании (discharge).

Вот это подтверждение и есть главный риск документа. Подписывая discharge, Подрядчик заявляет, что Final Statement отражает полный и окончательный расчёт по контракту. После этого предъявить что-то ещё практически невозможно.

Поэтому правило простое: **всё, что вы намерены требовать, должно быть в Final Statement**. Незакрытые претензии, спорные суммы, вопросы на рассмотрении DAAB — их нужно либо включить, либо явно исключить из discharge оговоркой. Молчаливое «разберёмся потом» здесь не работает.

Обратное тоже верно: contract закрывает и требования Заказчика. После окончательного платёжного сертификата Заказчик ограничен в том, что может предъявить — за исключением скрытых дефектов, мошенничества и грубой небрежности.

Практический совет: начинать собирать позиции для окончательного расчёта нужно задолго до конца проекта, а не когда пришёл Performance Certificate.`,
      en: `The Final Statement is the document with which the Contractor closes out the financial side of the contract. It is submitted after the [Performance Certificate](/en/glossary/performance-certificate/) is issued, usually within 56 days.

The process has two stages. First the Contractor submits a draft final statement, the parties discuss it, and the Engineer may require changes. Then the Final Statement itself is submitted — in agreed form — together with a written discharge.

That discharge is where the risk sits. By signing it the Contractor states that the Final Statement represents full and final settlement under the contract. After that, bringing anything else is close to impossible.

So the rule is simple: **everything you intend to claim must be in the Final Statement**. Open claims, disputed amounts, matters before the DAAB — either include them or expressly carve them out of the discharge. A tacit "we'll sort it later" does not work here.

The reverse also holds: the process closes out the Employer's claims too. After the Final Payment Certificate the Employer is constrained in what it can raise — save for latent defects, fraud and gross negligence.

Practical advice: start assembling the final account positions long before the project ends, not when the Performance Certificate arrives.`,
      uz: `Final Statement — yakuniy hisob-kitob: Pudratchi shartnomaning moliyaviy tomonini yopadigan yakuniy hujjat. [Performance Certificate](/uz/glossary/performance-certificate/) berilgandan keyin, odatda 56 kun ichida topshiriladi.

Mantiq ikki bosqichli. Avval Pudratchi yakuniy hisob-kitob loyihasini topshiradi, tomonlar uni muhokama qiladi, Muhandis tuzatishlar talab qilishi mumkin. Keyin Final Statement’ning o‘zi — kelishilgan holda — to‘liq hisob-kitob to‘g‘risidagi yozma tasdiq (discharge) bilan topshiriladi.

Aynan shu tasdiq hujjatning asosiy xavfi. Discharge’ni imzolab, Pudratchi Final Statement shartnoma bo‘yicha to‘liq va yakuniy hisob-kitobni aks ettirishini bildiradi. Bundan keyin boshqa narsa talab qilish deyarli imkonsiz.

Shuning uchun qoida oddiy: **talab qilmoqchi bo‘lgan hamma narsa Final Statement’da bo‘lishi kerak**. Yopilmagan da’volar, bahsli summalar, DAAB’dagi masalalar — ularni kiritish yoki discharge’dan aniq chiqarib tashlash kerak.

Teskarisi ham to‘g‘ri: tartib Buyurtmachi talablarini ham yopadi.`,
    } },
  { term: 'Programme', cat: 'documents',
    label: { ru: 'Программа работ', en: 'Programme', uz: 'Ishlar dasturi' },
    def: {
      ru: 'Детальный график исполнения, представляемый Подрядчиком; основа контроля сроков (Sub-Clause 8.3).',
      en: 'The detailed execution schedule submitted by the Contractor; the basis for time control (Sub-Clause 8.3).',
      uz: 'Pudratchi taqdim etadigan batafsil bajarilish jadvali; muddatlarni nazorat qilish asosi (Sub-Clause 8.3).',
    },
    long: {
      ru: `Programme — программа работ: документ, показывающий, как и в какой последовательности Подрядчик намерен выполнить Работы. Подаётся в начале проекта (обычно в течение 28 дней с даты начала) и регулярно обновляется.

Программу часто воспринимают как формальность для отчётности. Это ошибка, которая обходится дороже всего при первой же серьёзной претензии. Программа — **доказательственная база** для любого требования о продлении срока: без неё невозможно показать, что задержавшая работа была на критическом пути, а значит невозможно обосновать [EOT](/glossary/extension-of-time-eot/).

Contract требует не просто календарного графика, а содержательного документа: последовательность работ, сроки проверок и согласований, зависимости, ресурсы, отчёт с описанием методов. Обновлять её нужно, когда фактический ход перестаёт соответствовать плану — а не раз в квартал по привычке.

Отдельно про статус: Инженер может прокомментировать программу или указать на её несоответствие контракту, но его молчание не означает одобрения. Программа не становится контрактным обязательством по датам промежуточных работ — обязательна дата завершения. Это защищает Подрядчика от претензий за отставание от собственного плана, но не освобождает от обязанности программу вести.

Практическое правило: программа, восстановленная задним числом для обоснования претензии, легко распознаётся и разрушает доверие ко всей претензии.`,
      en: `The Programme is the document showing how and in what sequence the Contractor intends to execute the Works. It is submitted at the start (usually within 28 days of the Commencement Date) and updated as the project runs.

The Programme is often treated as reporting paperwork. That is the mistake that costs most at the first serious claim. The Programme is the **evidential basis** for any extension of time: without it you cannot show that the delayed activity was on the critical path, and so cannot substantiate an [EOT](/en/glossary/extension-of-time-eot/).

The contract asks for more than a bar chart: the sequence of work, review and approval periods, dependencies, resources, and a supporting report describing the methods. It has to be updated when actual progress stops matching the plan — not quarterly out of habit.

On status: the Engineer may comment on the Programme or note that it does not comply with the contract, but silence is not approval. The Programme does not turn interim dates into contractual obligations — the Time for Completion is the binding date. That protects the Contractor from claims for falling behind its own plan, but does not remove the duty to maintain it.

Practical rule: a programme reconstructed after the fact to support a claim is easy to spot and undermines the credibility of the whole claim.`,
      uz: `Programme — ishlar dasturi: Pudratchi Ishlarni qanday va qanday ketma-ketlikda bajarish niyatida ekanini ko‘rsatadigan hujjat. Loyiha boshida (odatda boshlanish sanasidan 28 kun ichida) topshiriladi va muntazam yangilanadi.

Dastur ko‘pincha hisobot uchun rasmiyatchilik deb qabul qilinadi. Bu birinchi jiddiy da’voda eng qimmatga tushadigan xato. Dastur — muddatni uzaytirish bo‘yicha har qanday talab uchun **dalil bazasi**: usiz kechiktirilgan ish kritik yo‘lda bo‘lganini ko‘rsatib bo‘lmaydi, demak [EOT](/uz/glossary/extension-of-time-eot/)ni asoslab bo‘lmaydi.

Shartnoma oddiy kalendar grafigini emas, mazmunli hujjatni talab qiladi: ishlar ketma-ketligi, tekshirish muddatlari, bog‘liqliklar, resurslar, usullar tavsifi bilan hisobot.

Status haqida: Muhandis dasturga izoh berishi mumkin, lekin uning sukuti ma’qullash emas. Dastur oraliq ishlar sanalari bo‘yicha shartnomaviy majburiyatga aylanmaydi.

Amaliy qoida: da’voni asoslash uchun keyinchalik tiklangan dastur oson tanib olinadi.`,
    } },
  { term: 'Unforeseeable Conditions', cat: 'procedures', clauses: ['unforeseeable-conditions-4-12'],
    label: { ru: 'Непредвиденные условия', en: 'Unforeseeable Conditions', uz: 'Oldindan ko‘rib bo‘lmaydigan sharoitlar' },
    def: {
      ru: 'Физические условия площадки, которые опытный Подрядчик не мог предвидеть (Sub-Clause 4.12); распределение риска зависит от книги.',
      en: 'Physical site conditions an experienced Contractor could not foresee (Sub-Clause 4.12); risk allocation depends on the book.',
      uz: 'Tajribali Pudratchi oldindan ko‘ra olmaydigan maydonning jismoniy sharoitlari (Sub-Clause 4.12); xavf taqsimoti kitobga bog‘liq.',
    },
    long: {
      ru: `Unforeseeable Physical Conditions — непредвиденные физические условия: природные условия на площадке, включая подземные и гидрологические, которые опытный подрядчик не мог разумно предвидеть к дате подачи тендерного предложения. Механизм закреплён в Sub-Clause 4.12 и является одним из немногих, распределяющих геологический риск в пользу Подрядчика.

Стандарт «непредвиденности» объективный, а не субъективный: вопрос не в том, предвидели ли вы, а в том, мог ли предвидеть опытный подрядчик, изучивший всю доступную информацию. Отсюда практическое следствие: данные о площадке, предоставленные Заказчиком, надо изучать до подачи, а результаты собственных изысканий фиксировать. Не изучив доступное, вы не сможете утверждать, что условия были непредвиденными.

При наступлении: уведомление как можно скорее, описание условий, продолжение работ насколько разумно возможно. Право возникает на продление срока и на возмещение Cost — но **не на прибыль**. Это осознанный компромисс FIDIC: риск делится, а не перекладывается целиком.

Инженер вправе учесть при оценке, встречались ли на других участках площадки условия более благоприятные, чем предполагалось — и зачесть эту выгоду. Это не всегда очевидно подрядчикам.

В Silver Book этот механизм обычно исключён: EPC-модель предполагает, что весь риск площадки на Подрядчике. Для подземных работ существует отдельная форма — [Emerald Book](/knowledge/emerald-book-tunnels/) с механизмом геотехнического базиса.`,
      en: `Unforeseeable Physical Conditions are natural conditions on the Site, including sub-surface and hydrological ones, that an experienced contractor could not reasonably have foreseen by the tender submission date. The mechanism sits in Sub-Clause 4.12 and is one of the few that shares ground risk in the Contractor's favour.

The test is objective, not subjective: the question is not whether you foresaw it but whether an experienced contractor, having studied all available information, could have. The practical consequence follows — the site data the Employer provided must be studied before bidding, and your own investigations recorded. Having failed to examine what was available, you cannot argue the conditions were unforeseeable.

When they arise: notify as soon as practicable, describe the conditions, and continue working so far as is reasonable. Entitlement runs to an extension of time and to Cost — but **not profit**. That is FIDIC's deliberate compromise: the risk is shared, not transferred wholesale.

The Engineer may take into account whether conditions elsewhere on the Site proved more favourable than assumed, and set that benefit off. Contractors do not always expect this.

The Silver Book usually excludes the mechanism: the EPC model puts all site risk on the Contractor. For underground work there is a dedicated form — the [Emerald Book](/en/knowledge/emerald-book-tunnels/), with its geotechnical baseline mechanism.`,
      uz: `Unforeseeable Physical Conditions — kutilmagan fizik sharoitlar: maydondagi tabiiy sharoitlar, shu jumladan yer osti va gidrologik, ularni tajribali pudratchi tender taklifi topshirilgan sanaga oqilona oldindan ko‘ra olmagan. Mexanizm Sub-Clause 4.12 da mustahkamlangan.

«Kutilmaganlik» standarti obyektiv: savol siz oldindan ko‘rdingizmi emas, mavjud barcha ma’lumotni o‘rgangan tajribali pudratchi ko‘ra olarmidi. Amaliy oqibat: Buyurtmachi bergan maydon ma’lumotlarini topshirishdan oldin o‘rganish kerak.

Yuz berganda: imkon qadar tezroq xabar berish, sharoitlarni tavsiflash, oqilona darajada ishni davom ettirish. Huquq muddatni uzaytirish va Cost qoplashga yuzaga keladi — lekin **foydaga emas**. Bu FIDIC’ning ongli murosasi: xavf bo‘linadi.

Muhandis maydonning boshqa qismlarida sharoitlar taxmin qilinganidan qulayroq bo‘lganini hisobga olishi mumkin.

Silver Book’da bu mexanizm odatda chiqarib tashlanadi. Yer osti ishlari uchun alohida shakl bor — [Emerald Book](/uz/knowledge/emerald-book-tunnels/).`,
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
    },
    long: {
      ru: `Pink Book — MDB Harmonised Construction Contract: версия Red Book, согласованная с международными банками развития для финансируемых ими проектов. Формально это Общие условия Red Book с изменениями, внесёнными по требованиям банков; именно её вы встретите на большинстве проектов Всемирного банка, АБР и ЕБРР.

Отличия от обычного Red Book лежат не в строительной механике, а в требованиях банков. Добавлены положения о добросовестности и антикоррупционных обязательствах, право банка на аудит и инспекцию, требования по санкционным спискам и запрету на fraud and corruption, обязательства по охране труда, окружающей среды и социальным аспектам (ESHS). Есть требования к отчётности и раскрытию информации, которых нет в стандартной форме.

Практическое следствие для подрядчика: Pink Book требует читать не только сам контракт, но и закупочные правила конкретного банка, а также Particular Conditions, где банк добавляет свои требования. Три уровня документов вместо двух.

Второе следствие — процедурная дисциплина. Банки контролируют исполнение через отчётность, и нарушения ESHS или integrity-условий имеют финансовые последствия вплоть до отстранения от будущих тендеров банка.

Практика по региону разобрана отдельно: [FIDIC в проектах МФО](/knowledge/mdb-fidic/) и [Pink Book: гармонизированная форма](/knowledge/pink-book-mdb/).`,
      en: `The Pink Book is the MDB Harmonised Construction Contract: a version of the Red Book agreed with the multilateral development banks for the projects they finance. Formally it is the Red Book General Conditions with the banks' amendments; it is what you will meet on most World Bank, ADB and EBRD projects.

The differences from the ordinary Red Book are not in the construction mechanics but in the banks' requirements. Provisions on integrity and anti-corruption are added, along with the bank's audit and inspection rights, sanctions-list requirements and the prohibition on fraud and corruption, and obligations on environmental, social, health and safety performance (ESHS). There are reporting and disclosure requirements the standard form does not carry.

The practical consequence for a contractor: the Pink Book means reading not only the contract but the specific bank's procurement rules and the Particular Conditions where the bank adds its own requirements. Three layers of documents instead of two.

The second consequence is procedural discipline. The banks monitor performance through reporting, and breaches of ESHS or integrity provisions carry financial consequences up to debarment from the bank's future tenders.

Regional practice is covered separately: [FIDIC on MDB projects](/en/knowledge/mdb-fidic/) and [the Pink Book explained](/en/knowledge/pink-book-mdb/).`,
      uz: `Pink Book — MDB Harmonised Construction Contract: xalqaro taraqqiyot banklari bilan ular moliyalashtiradigan loyihalar uchun kelishilgan Red Book versiyasi. Rasmiy ravishda bu banklar talablari bo‘yicha o‘zgartirilgan Red Book Umumiy shartlari.

Oddiy Red Book’dan farqlar qurilish mexanikasida emas, banklar talablarida. Halollik va korrupsiyaga qarshi majburiyatlar, bankning audit va inspeksiya huquqi, sanksiyalar ro‘yxatlari talablari, mehnat muhofazasi, atrof-muhit va ijtimoiy jihatlar bo‘yicha majburiyatlar (ESHS) qo‘shilgan.

Pudratchi uchun amaliy oqibat: Pink Book nafaqat shartnomani, balki aniq bankning xarid qoidalarini va bank o‘z talablarini qo‘shadigan Particular Conditions’ni ham o‘qishni talab qiladi. Ikkita o‘rniga uchta hujjat qatlami.

Ikkinchi oqibat — protsessual intizom. Banklar ijroni hisobot orqali nazorat qiladi, ESHS yoki halollik shartlarining buzilishi bankning kelgusi tenderlaridan chetlatishgacha moliyaviy oqibatlarga ega.

Mintaqa bo‘yicha amaliyot alohida: [XTB loyihalarida FIDIC](/uz/knowledge/mdb-fidic/).`,
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
