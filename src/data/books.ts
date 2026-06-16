// The FIDIC "Rainbow Suite" — the colour-coded family of standard contracts.
// Localizable fields are stored as { ru, en, uz }; getBooks(lang) flattens them.
import type { Lang } from '../i18n/ui';

type L = Record<Lang, string>;
type LA = Record<Lang, string[]>;

export interface FidicBook {
  id: string;
  name: string;
  fullName: string; // official English title (same in all languages)
  hex: string;
  edition: string;
  whoDesigns: string;
  pricing: string;
  contractorRisk: number;
  oneLiner: string;
  bestFor: string;
  facts: string[];
  signatureClause: string;
  uzbekistan?: string;
}

interface RawBook {
  id: string;
  name: string;
  fullName: string;
  hex: string;
  edition: string;
  contractorRisk: number;
  whoDesigns: L;
  pricing: L;
  oneLiner: L;
  bestFor: L;
  facts: LA;
  signatureClause: L;
  uzbekistan?: L;
}

const raw: RawBook[] = [
  {
    id: 'red', name: 'Red Book', fullName: 'Conditions of Contract for Construction',
    hex: '#c0362c', edition: '2nd ed., 2017', contractorRisk: 40,
    whoDesigns: { ru: 'Заказчик', en: 'Employer', uz: 'Buyurtmachi' },
    pricing: { ru: 'Измеряемые объёмы / BoQ', en: 'Re-measurement / BoQ', uz: "O‘lchanadigan hajmlar / BoQ" },
    oneLiner: {
      ru: 'Классика строительства: проектирует Заказчик, объёмы измеряются.',
      en: 'Construction classic: the Employer designs, quantities are re-measured.',
      uz: "Qurilish klassikasi: Buyurtmachi loyihalashtiradi, hajmlar o‘lchanadi.",
    },
    bestFor: {
      ru: 'Здания и инфраструктура, спроектированные Заказчиком (его Инженером). Дороги, мосты, гражданское строительство.',
      en: 'Buildings and infrastructure designed by the Employer (its Engineer). Roads, bridges, civil works.',
      uz: "Buyurtmachi (uning Muhandisi) loyihalashtirgan binolar va infratuzilma. Yo‘llar, ko‘priklar, fuqarolik qurilishi.",
    },
    facts: {
      ru: ['Проект готовит Заказчик; Подрядчик строит «по чертежам».', 'Контрактом администрирует независимый Инженер (Clause 3).', 'Оплата по фактически измеренным объёмам (re-measurement).', 'Риск проектных ошибок остаётся за Заказчиком.'],
      en: ['The Employer prepares the design; the Contractor builds “to drawings”.', 'Administered by an independent Engineer (Clause 3).', 'Payment by actual re-measured quantities.', 'Design-error risk stays with the Employer.'],
      uz: ["Loyihani Buyurtmachi tayyorlaydi; Pudratchi «chizmalar bo‘yicha» quradi.", 'Shartnomani mustaqil Muhandis yuritadi (Clause 3).', "To‘lov haqiqatda o‘lchangan hajmlar bo‘yicha (re-measurement).", "Loyiha xatolari xavfi Buyurtmachida qoladi."],
    },
    signatureClause: { ru: 'Clause 12 — Measurement and Valuation', en: 'Clause 12 — Measurement and Valuation', uz: 'Clause 12 — Measurement and Valuation' },
    uzbekistan: {
      ru: 'Чаще встречается в адаптации Pink Book для проектов АБР и Всемирного банка.',
      en: 'Most often seen as the Pink Book adaptation for ADB and World Bank projects.',
      uz: 'Ko‘pincha ADB va Jahon banki loyihalari uchun Pink Book moslashtirilishida uchraydi.',
    },
  },
  {
    id: 'yellow', name: 'Yellow Book', fullName: 'Conditions of Contract for Plant and Design-Build',
    hex: '#e0a82e', edition: '2nd ed., 2017', contractorRisk: 60,
    whoDesigns: { ru: 'Подрядчик', en: 'Contractor', uz: 'Pudratchi' },
    pricing: { ru: 'Твёрдая цена (lump sum)', en: 'Lump sum', uz: "Qat’iy narx (lump sum)" },
    oneLiner: {
      ru: 'Проектирует и строит Подрядчик: оборудование и design-build.',
      en: 'The Contractor designs and builds: plant and design-build.',
      uz: 'Pudratchi loyihalashtiradi va quradi: jihozlar va design-build.',
    },
    bestFor: {
      ru: 'Электромеханические работы и объекты «под ключ», где проект выполняет Подрядчик: заводы, ОС, насосные станции.',
      en: 'Electro-mechanical works and turnkey facilities designed by the Contractor: plants, treatment works, pumping stations.',
      uz: 'Pudratchi loyihalashtiradigan elektromexanik ishlar va «kalit topshiriladigan» obyektlar: zavodlar, tozalash inshootlari, nasos stansiyalari.',
    },
    facts: {
      ru: ['Подрядчик отвечает за проектирование и его пригодность для цели.', 'Твёрдая договорная цена, корректируемая по Clause 13/14.', 'Есть Инженер (Clause 3) и Tests on Completion (Clause 9).', 'Баланс риска смещён к Подрядчику за счёт ответственности за проект.'],
      en: ['The Contractor is responsible for the design and its fitness for purpose.', 'A lump-sum price, adjusted under Clause 13/14.', 'There is an Engineer (Clause 3) and Tests on Completion (Clause 9).', 'Risk shifts toward the Contractor due to design responsibility.'],
      uz: ['Pudratchi loyiha va uning maqsadga muvofiqligi uchun javobgar.', "Qat’iy shartnoma narxi, Clause 13/14 bo‘yicha tuzatiladi.", 'Muhandis (Clause 3) va Tests on Completion (Clause 9) mavjud.', 'Loyiha uchun javobgarlik tufayli xavf muvozanati Pudratchiga siljiydi.'],
    },
    signatureClause: { ru: 'Clause 5 — Design (ответственность Подрядчика)', en: 'Clause 5 — Design (Contractor’s responsibility)', uz: 'Clause 5 — Design (Pudratchi javobgarligi)' },
    uzbekistan: {
      ru: 'Применяется в энергетике и промышленных объектах с проектированием подрядчика.',
      en: 'Used in power and industrial facilities with contractor design.',
      uz: 'Energetika va pudratchi loyihalashtiradigan sanoat obyektlarida qo‘llaniladi.',
    },
  },
  {
    id: 'silver', name: 'Silver Book', fullName: 'Conditions of Contract for EPC / Turnkey Projects',
    hex: '#b9bcc4', edition: '2nd ed., 2017', contractorRisk: 85,
    whoDesigns: { ru: 'Подрядчик', en: 'Contractor', uz: 'Pudratchi' },
    pricing: { ru: 'Фиксированная цена «под ключ»', en: 'Fixed turnkey price', uz: "Qat’iy «kalit» narxi" },
    oneLiner: {
      ru: 'EPC «под ключ»: максимум определённости цены и сроков для Заказчика.',
      en: 'EPC turnkey: maximum price and time certainty for the Employer.',
      uz: 'EPC «kalit topshiriladigan»: Buyurtmachi uchun narx va muddat aniqligi maksimal.',
    },
    bestFor: {
      ru: 'Проекты с проектным финансированием, BOT/IPP, где инвестору нужны предсказуемые цена и дата.',
      en: 'Project-financed schemes, BOT/IPP, where the investor needs predictable price and date.',
      uz: 'Loyihaviy moliyalashtirishli loyihalar, BOT/IPP, bunda investorga oldindan aytib bo‘ladigan narx va sana kerak.',
    },
    facts: {
      ru: ['Нет независимого Инженера — есть Представитель Заказчика.', 'Подрядчик несёт почти все риски, включая большинство «непредвиденного».', 'Высокая определённость цены/срока — в обмен на премию за риск.', 'Не рекомендуется, когда Заказчик хочет вмешиваться в проект.'],
      en: ['No independent Engineer — there is an Employer’s Representative.', 'The Contractor bears almost all risk, including most of the “unforeseeable”.', 'High price/time certainty — in exchange for a risk premium.', 'Not advised when the Employer wants to be involved in the design.'],
      uz: ['Mustaqil Muhandis yo‘q — Buyurtmachi vakili bor.', "Pudratchi deyarli barcha xavfni, jumladan «oldindan ko‘rib bo‘lmaydigan»larning ko‘pini o‘z zimmasiga oladi.", 'Narx/muddat aniqligi yuqori — xavf mukofoti evaziga.', 'Buyurtmachi loyihaga aralashmoqchi bo‘lsa, tavsiya etilmaydi.'],
    },
    signatureClause: { ru: 'Clause 4.12 — Unforeseeable Difficulties (риск на Подрядчике)', en: 'Clause 4.12 — Unforeseeable Difficulties (risk on Contractor)', uz: 'Clause 4.12 — Unforeseeable Difficulties (xavf Pudratchida)' },
    uzbekistan: {
      ru: 'Базовая форма для IPP и проектов ГЧП с проектным финансированием.',
      en: 'The base form for IPPs and PPP projects with project financing.',
      uz: 'Loyihaviy moliyalashtirishli IPP va DXSh loyihalari uchun asosiy shakl.',
    },
  },
  {
    id: 'green', name: 'Green Book', fullName: 'Short Form of Contract',
    hex: '#2f8f5b', edition: '2nd ed., 2021', contractorRisk: 50,
    whoDesigns: { ru: 'Совместно', en: 'Either party', uz: 'Birgalikda' },
    pricing: { ru: 'Гибко (цена/объёмы/смета)', en: 'Flexible (price/quantities/cost)', uz: 'Moslashuvchan (narx/hajmlar/smeta)' },
    oneLiner: {
      ru: 'Короткая форма для небольших и простых работ.',
      en: 'A short form for small and simple works.',
      uz: 'Kichik va oddiy ishlar uchun qisqa shakl.',
    },
    bestFor: {
      ru: 'Контракты небольшой стоимости, короткого срока или повторяющиеся простые работы.',
      en: 'Low-value, short-duration or repetitive simple works.',
      uz: 'Kichik qiymatli, qisqa muddatli yoki takrorlanuvchi oddiy ishlar.',
    },
    facts: {
      ru: ['Существенно упрощённый набор условий.', 'Гибкий выбор механизма ценообразования.', 'Облегчённое управление и разрешение споров.', 'Издание 2021 года расширило применимость формы.'],
      en: ['A substantially simplified set of conditions.', 'Flexible choice of pricing mechanism.', 'Lightweight administration and dispute resolution.', 'The 2021 edition broadened the form’s applicability.'],
      uz: ['Sezilarli soddalashtirilgan shartlar to‘plami.', 'Narx belgilash mexanizmini moslashuvchan tanlash.', 'Yengillashtirilgan boshqaruv va nizolarni hal qilish.', '2021-yil tahriri shaklning qo‘llanilishini kengaytirdi.'],
    },
    signatureClause: { ru: 'Упрощённые условия — компактный набор статей', en: 'Simplified conditions — a compact set of clauses', uz: 'Soddalashtirilgan shartlar — ixcham moddalar to‘plami' },
    uzbekistan: {
      ru: 'Удобна для малых подрядов и пилотных работ.',
      en: 'Convenient for small contracts and pilot works.',
      uz: 'Kichik pudratlar va sinov ishlari uchun qulay.',
    },
  },
  {
    id: 'pink', name: 'Pink Book', fullName: 'MDB Harmonised Construction Contract',
    hex: '#d36a86', edition: 'v3, 2010', contractorRisk: 42,
    whoDesigns: { ru: 'Заказчик', en: 'Employer', uz: 'Buyurtmachi' },
    pricing: { ru: 'Измеряемые объёмы / BoQ', en: 'Re-measurement / BoQ', uz: "O‘lchanadigan hajmlar / BoQ" },
    oneLiner: {
      ru: 'Red Book, согласованный с банками развития (МФО).',
      en: 'The Red Book harmonised with the development banks (MDBs).',
      uz: 'Taraqqiyot banklari (XTB) bilan kelishilgan Red Book.',
    },
    bestFor: {
      ru: 'Проекты, финансируемые многосторонними банками: Всемирный банк, АБР, ЕБРР, ИБР.',
      en: 'Projects financed by multilateral banks: World Bank, ADB, EBRD, IsDB.',
      uz: 'Ko‘p tomonlama banklar moliyalashtirgan loyihalar: Jahon banki, ADB, EBRD, IsDB.',
    },
    facts: {
      ru: ['Гармонизированная версия Red Book для МФО (MDB).', 'Учитывает требования банков: антикоррупция, аудит, право проверки.', 'Часто идёт со Особыми условиями конкретного банка.', 'Ключевая форма для тендеров с международным финансированием.'],
      en: ['A harmonised version of the Red Book for MDBs.', 'Reflects bank requirements: anti-corruption, audit, right to inspect.', 'Often comes with a specific bank’s Particular Conditions.', 'The key form for internationally financed tenders.'],
      uz: ['XTB (MDB) uchun Red Book’ning uyg‘unlashtirilgan versiyasi.', 'Bank talablarini hisobga oladi: korrupsiyaga qarshi, audit, tekshirish huquqi.', 'Ko‘pincha aniq bankning Maxsus shartlari bilan keladi.', 'Xalqaro moliyalashtirishli tenderlar uchun asosiy shakl.'],
    },
    signatureClause: { ru: 'Особые положения МФО — добросовестность и право аудита', en: 'MDB provisions — integrity and right to audit', uz: 'XTB qoidalari — halollik va audit huquqi' },
    uzbekistan: {
      ru: '⭐ Самая релевантная форма для Узбекистана: дороги, вода, энергетика по линии АБР и ВБ.',
      en: '⭐ The most relevant form for Uzbekistan: roads, water, energy under ADB and WB.',
      uz: "⭐ O‘zbekiston uchun eng dolzarb shakl: ADB va JB yo‘nalishida yo‘llar, suv, energetika.",
    },
  },
  {
    id: 'emerald', name: 'Emerald Book', fullName: 'Conditions of Contract for Underground Works',
    hex: '#0f8a6d', edition: '1st ed., 2019', contractorRisk: 55,
    whoDesigns: { ru: 'Совместно', en: 'Shared', uz: 'Birgalikda' },
    pricing: { ru: 'С учётом геориска', en: 'Geo-risk based', uz: 'Georisk hisobga olingan' },
    oneLiner: {
      ru: 'Подземные работы: справедливое распределение геологического риска.',
      en: 'Underground works: a fair allocation of geological risk.',
      uz: 'Yer osti ishlari: geologik xavfni adolatli taqsimlash.',
    },
    bestFor: {
      ru: 'Тоннели, метро, подземное строительство с высокой геологической неопределённостью.',
      en: 'Tunnels, metro, underground construction with high geological uncertainty.',
      uz: 'Tunnellar, metro, yuqori geologik noaniqlikdagi yer osti qurilishi.',
    },
    facts: {
      ru: ['Совместная разработка FIDIC и ITA (тоннельная ассоциация).', 'Вводит Geotechnical Baseline Report (GBR) как точку отсчёта риска.', 'Механизм распределения геориска между сторонами.', 'Учитывает фактические грунтовые условия при оплате.'],
      en: ['Jointly developed by FIDIC and the ITA (tunnelling association).', 'Introduces a Geotechnical Baseline Report (GBR) as the risk baseline.', 'A mechanism to allocate geo-risk between the parties.', 'Reflects actual ground conditions in payment.'],
      uz: ['FIDIC va ITA (tunnel uyushmasi) tomonidan birgalikda ishlab chiqilgan.', 'Xavf boshlang‘ich nuqtasi sifatida Geotechnical Baseline Report (GBR) joriy etadi.', 'Tomonlar o‘rtasida georiskni taqsimlash mexanizmi.', "To‘lovda haqiqiy tuproq sharoitlarini hisobga oladi."],
    },
    signatureClause: { ru: 'Geotechnical Baseline Report — базовая линия георисков', en: 'Geotechnical Baseline Report — the geo-risk baseline', uz: 'Geotechnical Baseline Report — georisk bazaviy chizig‘i' },
    uzbekistan: {
      ru: 'Актуальна для метро и тоннельных участков горных автодорог.',
      en: 'Relevant for metros and tunnel sections of mountain highways.',
      uz: 'Metro va tog‘ avtomobil yo‘llarining tunnel uchastkalari uchun dolzarb.',
    },
  },
  {
    id: 'gold', name: 'Gold Book', fullName: 'Design, Build and Operate (DBO)',
    hex: '#b8902f', edition: '1st ed., 2008', contractorRisk: 70,
    whoDesigns: { ru: 'Подрядчик', en: 'Contractor', uz: 'Pudratchi' },
    pricing: { ru: 'Строительство + период эксплуатации', en: 'Build + operation period', uz: 'Qurilish + ekspluatatsiya davri' },
    oneLiner: {
      ru: 'Проектируй — строй — эксплуатируй: ответственность на 20 лет.',
      en: 'Design — build — operate: responsibility for 20 years.',
      uz: 'Loyihalashtir — qur — ishlat: 20 yil davomida javobgarlik.',
    },
    bestFor: {
      ru: 'Объекты с долгосрочной (как правило 20-летней) эксплуатацией одной стороной: водоочистка, утилизация отходов.',
      en: 'Facilities needing long-term (typically 20-year) operation by one party: water treatment, waste management.',
      uz: 'Bir tomon tomonidan uzoq muddatli (odatda 20 yillik) ekspluatatsiyani talab qiluvchi obyektlar: suv tozalash, chiqindilarni utilizatsiya qilish.',
    },
    facts: {
      ru: ['Один контракт на проект, строительство и долгую эксплуатацию.', 'Стимулирует Подрядчика к качеству на весь жизненный цикл.', 'Типовой операционный период — 20 лет.', 'Объединяет CAPEX и OPEX в единой ответственности.'],
      en: ['One contract for design, construction and long operation.', 'Incentivises the Contractor to quality across the whole life cycle.', 'A typical operation period of 20 years.', 'Combines CAPEX and OPEX under a single responsibility.'],
      uz: ['Loyiha, qurilish va uzoq ekspluatatsiya uchun yagona shartnoma.', "Pudratchini butun hayot davri davomida sifatga undaydi.", 'Odatiy operatsion davr — 20 yil.', 'CAPEX va OPEX’ni yagona javobgarlikda birlashtiradi.'],
    },
    signatureClause: { ru: 'Operation Service — длительный период эксплуатации', en: 'Operation Service — the long operation period', uz: 'Operation Service — uzoq ekspluatatsiya davri' },
    uzbekistan: {
      ru: 'Перспективна для коммунальной инфраструктуры (вода, ТБО).',
      en: 'Promising for utility infrastructure (water, solid waste).',
      uz: 'Kommunal infratuzilma uchun istiqbolli (suv, MQCh).',
    },
  },
  {
    id: 'blue', name: 'Blue-Green Book', fullName: 'Form of Contract for Dredging and Reclamation Works',
    hex: '#2f6fb0', edition: '2nd ed., 2016', contractorRisk: 50,
    whoDesigns: { ru: 'Совместно', en: 'Shared', uz: 'Birgalikda' },
    pricing: { ru: 'Адаптировано под дноуглубление', en: 'Adapted for dredging', uz: 'Tublashtirishga moslashtirilgan' },
    oneLiner: {
      ru: 'Дноуглубление и намыв: специальная короткая форма.',
      en: 'Dredging and reclamation: a special short form.',
      uz: 'Tublashtirish va to‘ldirish: maxsus qisqa shakl.',
    },
    bestFor: {
      ru: 'Работы по дноуглублению, намыву территорий и связанные морские/речные работы.',
      en: 'Dredging, land reclamation and related marine/river works.',
      uz: 'Tublashtirish, hududlarni to‘ldirish va bog‘liq dengiz/daryo ishlari.',
    },
    facts: {
      ru: ['Подготовлена совместно с IADC (ассоциация дноуглубления).', 'Учитывает специфику морских и водных работ.', 'Компактная, основана на принципах короткой формы.', 'Покрывает риски, типичные для dredging-проектов.'],
      en: ['Prepared jointly with the IADC (dredging association).', 'Reflects the specifics of marine and water works.', 'Compact, based on short-form principles.', 'Covers risks typical of dredging projects.'],
      uz: ['IADC (tublashtirish uyushmasi) bilan birgalikda tayyorlangan.', 'Dengiz va suv ishlari xususiyatlarini hisobga oladi.', 'Ixcham, qisqa shakl tamoyillariga asoslangan.', 'Dredging loyihalari uchun xos xavflarni qamrab oladi.'],
    },
    signatureClause: { ru: 'Специальные положения для морских/водных работ', en: 'Special provisions for marine/water works', uz: 'Dengiz/suv ishlari uchun maxsus qoidalar' },
    uzbekistan: {
      ru: 'Нишевая форма; релевантна для водохранилищ и берегоукрепления.',
      en: 'A niche form; relevant for reservoirs and bank protection.',
      uz: 'Nisha shakl; suv omborlari va qirg‘oqni mustahkamlash uchun dolzarb.',
    },
  },
  {
    id: 'white', name: 'White Book', fullName: 'Client / Consultant Model Services Agreement',
    hex: '#e8e6e0', edition: '5th ed., 2017', contractorRisk: 30,
    whoDesigns: { ru: '—', en: '—', uz: '—' },
    pricing: { ru: 'За услуги (time / lump sum)', en: 'For services (time / lump sum)', uz: 'Xizmatlar uchun (time / lump sum)' },
    oneLiner: {
      ru: 'Договор на услуги консультанта, а не на строительство.',
      en: 'A consultant services agreement, not a construction contract.',
      uz: 'Qurilish emas, balki maslahatchi xizmatlari shartnomasi.',
    },
    bestFor: {
      ru: 'Привлечение инженера-консультанта: проектирование, надзор, управление проектом.',
      en: 'Engaging a consulting engineer: design, supervision, project management.',
      uz: 'Maslahatchi muhandisni jalb qilish: loyihalash, nazorat, loyiha boshqaruvi.',
    },
    facts: {
      ru: ['Регулирует отношения Заказчик ↔ Консультант, не строительство.', 'Определяет объём услуг, вознаграждение и ответственность.', 'Часто используется параллельно со строительными формами.', 'Содержит положения об обязанности должной заботы (duty of care).'],
      en: ['Governs the Client ↔ Consultant relationship, not construction.', 'Defines the scope of services, fees and liability.', 'Often used alongside the construction forms.', 'Contains duty-of-care provisions.'],
      uz: ['Buyurtmachi ↔ Maslahatchi munosabatlarini tartibga soladi, qurilishni emas.', 'Xizmatlar hajmi, haq va javobgarlikni belgilaydi.', 'Ko‘pincha qurilish shakllari bilan parallel ishlatiladi.', "Tegishli g‘amxo‘rlik (duty of care) qoidalarini o‘z ichiga oladi."],
    },
    signatureClause: { ru: 'Scope of Services — объём услуг консультанта', en: 'Scope of Services — the consultant’s scope', uz: 'Scope of Services — maslahatchi xizmatlari hajmi' },
    uzbekistan: {
      ru: 'Применяется при найме международных инженеров-консультантов.',
      en: 'Used when engaging international consulting engineers.',
      uz: 'Xalqaro maslahatchi muhandislarni yollashda qo‘llaniladi.',
    },
  },
];

export function getBooks(lang: Lang): FidicBook[] {
  return raw.map((b) => ({
    id: b.id, name: b.name, fullName: b.fullName, hex: b.hex, edition: b.edition,
    contractorRisk: b.contractorRisk,
    whoDesigns: b.whoDesigns[lang],
    pricing: b.pricing[lang],
    oneLiner: b.oneLiner[lang],
    bestFor: b.bestFor[lang],
    facts: b.facts[lang],
    signatureClause: b.signatureClause[lang],
    uzbekistan: b.uzbekistan ? b.uzbekistan[lang] : undefined,
  }));
}
