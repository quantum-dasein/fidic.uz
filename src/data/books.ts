// The FIDIC "Rainbow Suite" — the colour-coded family of standard contracts.
// Data is intentionally concise and practitioner-oriented. Reviewed for the
// 2017 second editions where applicable. Risk values are indicative (0–100,
// share of project risk carried by the Contractor) and meant for teaching.

export interface FidicBook {
  id: string;
  name: string;          // Common ("rainbow") name
  fullName: string;      // Official title
  hex: string;           // Spine colour
  edition: string;       // Current edition
  whoDesigns: 'Заказчик' | 'Подрядчик' | 'Совместно' | '—';
  pricing: string;       // Pricing mechanism
  contractorRisk: number; // 0–100
  oneLiner: string;      // The hook
  bestFor: string;       // Typical use
  facts: string[];       // 3–4 key facts
  signatureClause: string; // A clause that characterises this book
  uzbekistan?: string;   // Relevance note for Uzbekistan / Central Asia
}

export const books: FidicBook[] = [
  {
    id: 'red',
    name: 'Red Book',
    fullName: 'Conditions of Contract for Construction',
    hex: '#c0362c',
    edition: '2nd ed., 2017',
    whoDesigns: 'Заказчик',
    pricing: 'Измеряемые объёмы / BoQ',
    contractorRisk: 40,
    oneLiner: 'Классика строительства: проектирует Заказчик, объёмы измеряются.',
    bestFor: 'Здания и инфраструктура, спроектированные Заказчиком (его Инженером). Дороги, мосты, гражданское строительство.',
    facts: [
      'Проект готовит Заказчик; Подрядчик строит «по чертежам».',
      'Контрактом администрирует независимый Инженер (Clause 3).',
      'Оплата по фактически измеренным объёмам (re-measurement).',
      'Риск проектных ошибок остаётся за Заказчиком.',
    ],
    signatureClause: 'Clause 12 — Measurement and Valuation',
    uzbekistan: 'Чаще встречается в адаптации Pink Book для проектов АБР и Всемирного банка.',
  },
  {
    id: 'yellow',
    name: 'Yellow Book',
    fullName: 'Conditions of Contract for Plant and Design-Build',
    hex: '#e0a82e',
    edition: '2nd ed., 2017',
    whoDesigns: 'Подрядчик',
    pricing: 'Твёрдая цена (lump sum)',
    contractorRisk: 60,
    oneLiner: 'Проектирует и строит Подрядчик: оборудование и design-build.',
    bestFor: 'Электромеханические работы и объекты «под ключ», где проект выполняет Подрядчик: заводы, ОС, насосные станции.',
    facts: [
      'Подрядчик отвечает за проектирование и его пригодность для цели.',
      'Твёрдая договорная цена, корректируемая по Clause 13/14.',
      'Есть Инженер (Clause 3) и Tests on Completion (Clause 9).',
      'Баланс риска смещён к Подрядчику за счёт ответственности за проект.',
    ],
    signatureClause: 'Clause 5 — Design (ответственность Подрядчика за проект)',
    uzbekistan: 'Применяется в энергетике и промышленных объектах с проектированием подрядчика.',
  },
  {
    id: 'silver',
    name: 'Silver Book',
    fullName: 'Conditions of Contract for EPC / Turnkey Projects',
    hex: '#b9bcc4',
    edition: '2nd ed., 2017',
    whoDesigns: 'Подрядчик',
    pricing: 'Фиксированная цена «под ключ»',
    contractorRisk: 85,
    oneLiner: 'EPC «под ключ»: максимум определённости цены и сроков для Заказчика.',
    bestFor: 'Проекты с проектным финансированием, BOT/IPP, где инвестору нужны предсказуемые цена и дата.',
    facts: [
      'Нет независимого Инженера — есть Представитель Заказчика.',
      'Подрядчик несёт почти все риски, включая большинство «непредвиденного».',
      'Высокая определённость цены/срока — в обмен на премию за риск.',
      'Не рекомендуется, когда Заказчик хочет вмешиваться в проект.',
    ],
    signatureClause: 'Clause 4.12 — Unforeseeable Difficulties (риск на Подрядчике)',
    uzbekistan: 'Базовая форма для IPP и проектов ГЧП с проектным финансированием.',
  },
  {
    id: 'green',
    name: 'Green Book',
    fullName: 'Short Form of Contract',
    hex: '#2f8f5b',
    edition: '2nd ed., 2021',
    whoDesigns: 'Совместно',
    pricing: 'Гибко (цена/объёмы/смета)',
    contractorRisk: 50,
    oneLiner: 'Короткая форма для небольших и простых работ.',
    bestFor: 'Контракты небольшой стоимости, короткого срока или повторяющиеся простые работы.',
    facts: [
      'Существенно упрощённый набор условий.',
      'Гибкий выбор механизма ценообразования.',
      'Облегчённое управление и разрешение споров.',
      'Издание 2021 года расширило применимость формы.',
    ],
    signatureClause: 'Упрощённые условия — компактный набор статей',
    uzbekistan: 'Удобна для малых подрядов и пилотных работ.',
  },
  {
    id: 'pink',
    name: 'Pink Book',
    fullName: 'MDB Harmonised Construction Contract',
    hex: '#d36a86',
    edition: 'v3, 2010',
    whoDesigns: 'Заказчик',
    pricing: 'Измеряемые объёмы / BoQ',
    contractorRisk: 42,
    oneLiner: 'Red Book, согласованный с банками развития (МФО).',
    bestFor: 'Проекты, финансируемые многосторонними банками: Всемирный банк, АБР, ЕБРР, ИБР.',
    facts: [
      'Гармонизированная версия Red Book для МФО (MDB).',
      'Учитывает требования банков: антикоррупция, аудит, право проверки.',
      'Часто идёт со Особыми условиями конкретного банка.',
      'Ключевая форма для тендеров с международным финансированием.',
    ],
    signatureClause: 'Особые положения МФО — добросовестность и право аудита',
    uzbekistan: '⭐ Самая релевантная форма для Узбекистана: дороги, вода, энергетика по линии АБР и ВБ.',
  },
  {
    id: 'emerald',
    name: 'Emerald Book',
    fullName: 'Conditions of Contract for Underground Works',
    hex: '#0f8a6d',
    edition: '1st ed., 2019',
    whoDesigns: 'Совместно',
    pricing: 'С учётом геориска',
    contractorRisk: 55,
    oneLiner: 'Подземные работы: справедливое распределение геологического риска.',
    bestFor: 'Тоннели, метро, подземное строительство с высокой геологической неопределённостью.',
    facts: [
      'Совместная разработка FIDIC и ITA (тоннельная ассоциация).',
      'Вводит Geotechnical Baseline Report (GBR) как точку отсчёта риска.',
      'Механизм распределения геориска между сторонами.',
      'Учитывает фактические грунтовые условия при оплате.',
    ],
    signatureClause: 'Geotechnical Baseline Report — базовая линия георисков',
    uzbekistan: 'Актуальна для метро и тоннельных участков горных автодорог.',
  },
  {
    id: 'gold',
    name: 'Gold Book',
    fullName: 'Design, Build and Operate (DBO)',
    hex: '#b8902f',
    edition: '1st ed., 2008',
    whoDesigns: 'Подрядчик',
    pricing: 'Цена строительства + период эксплуатации',
    contractorRisk: 70,
    oneLiner: 'Проектируй — строй — эксплуатируй: ответственность на 20 лет.',
    bestFor: 'Объекты, где нужна долгосрочная (как правило 20-летняя) эксплуатация одной стороной: водоочистка, утилизация отходов.',
    facts: [
      'Один контракт на проект, строительство и долгую эксплуатацию.',
      'Стимулирует Подрядчика к качеству на весь жизненный цикл.',
      'Типовой операционный период — 20 лет.',
      'Объединяет CAPEX и OPEX в единой ответственности.',
    ],
    signatureClause: 'Operation Service — длительный период эксплуатации',
    uzbekistan: 'Перспективна для коммунальной инфраструктуры (вода, ТБО).',
  },
  {
    id: 'blue',
    name: 'Blue-Green Book',
    fullName: 'Form of Contract for Dredging and Reclamation Works',
    hex: '#2f6fb0',
    edition: '2nd ed., 2016',
    whoDesigns: 'Совместно',
    pricing: 'Адаптировано под дноуглубление',
    contractorRisk: 50,
    oneLiner: 'Дноуглубление и намыв: специальная короткая форма.',
    bestFor: 'Работы по дноуглублению, намыву территорий и связанные морские/речные работы.',
    facts: [
      'Подготовлена совместно с IADC (ассоциация дноуглубления).',
      'Учитывает специфику морских и водных работ.',
      'Компактная, основана на принципах короткой формы.',
      'Покрывает риски, типичные для dredging-проектов.',
    ],
    signatureClause: 'Специальные положения для морских/водных работ',
    uzbekistan: 'Нишевая форма; релевантна для водохранилищ и берегоукрепления.',
  },
  {
    id: 'white',
    name: 'White Book',
    fullName: 'Client / Consultant Model Services Agreement',
    hex: '#e8e6e0',
    edition: '5th ed., 2017',
    whoDesigns: '—',
    pricing: 'За услуги (time / lump sum)',
    contractorRisk: 30,
    oneLiner: 'Договор на услуги консультанта, а не на строительство.',
    bestFor: 'Привлечение инженера-консультанта: проектирование, надзор, управление проектом.',
    facts: [
      'Регулирует отношения Заказчик ↔ Консультант, не строительство.',
      'Определяет объём услуг, вознаграждение и ответственность.',
      'Часто используется параллельно со строительными формами.',
      'Содержит положения об обязанности должной заботы (duty of care).',
    ],
    signatureClause: 'Scope of Services — объём услуг консультанта',
    uzbekistan: 'Применяется при найме международных инженеров-консультантов.',
  },
];

// Risk-allocation spectrum, used by the interactive "risk dial".
export const riskSpectrum = books
  .filter((b) => ['red', 'pink', 'green', 'emerald', 'yellow', 'gold', 'silver'].includes(b.id))
  .sort((a, b) => a.contractorRisk - b.contractorRisk);
