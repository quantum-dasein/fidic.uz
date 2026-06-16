// Sample practice questions for the FIDIC certification prep portal (RU/EN/UZ).
import type { Lang } from '../i18n/ui';

export interface QuizQuestion {
  track: string;
  question: string;
  options: string[];
  correct: number;
  explain: string;
}

interface RawQ {
  track: string;
  correct: number;
  question: Record<Lang, string>;
  options: Record<Lang, string[]>;
  explain: Record<Lang, string>;
}

const raw: RawQ[] = [
  {
    track: 'Red Book', correct: 1,
    question: {
      ru: 'В Red Book (Construction) за проектирование Работ обычно отвечает:',
      en: 'In the Red Book (Construction), the design of the Works is usually the responsibility of:',
      uz: 'Red Book (Construction)’da Ishlarni loyihalash uchun odatda kim javobgar:',
    },
    options: {
      ru: ['Подрядчик', 'Заказчик', 'Инженер', 'DAAB'],
      en: ['The Contractor', 'The Employer', 'The Engineer', 'The DAAB'],
      uz: ['Pudratchi', 'Buyurtmachi', 'Muhandis', 'DAAB'],
    },
    explain: {
      ru: 'В Red Book проектирует Заказчик (через своего проектировщика), а Подрядчик строит по предоставленному проекту. Риск проектных ошибок остаётся за Заказчиком.',
      en: 'In the Red Book the Employer designs (through its designer) and the Contractor builds to the provided design. Design-error risk stays with the Employer.',
      uz: 'Red Book’da Buyurtmachi (loyihachisi orqali) loyihalashtiradi, Pudratchi esa berilgan loyiha bo‘yicha quradi. Loyiha xatolari xavfi Buyurtmachida qoladi.',
    },
  },
  {
    track: 'Yellow Book', correct: 1,
    question: {
      ru: 'Чем Yellow Book принципиально отличается от Red Book?',
      en: 'How does the Yellow Book fundamentally differ from the Red Book?',
      uz: 'Yellow Book Red Book’dan tubdan nimasi bilan farq qiladi?',
    },
    options: {
      ru: ['В Yellow Book нет Инженера', 'В Yellow Book проектирует Подрядчик', 'Yellow Book только для дорог', 'Yellow Book не предусматривает claims'],
      en: ['The Yellow Book has no Engineer', 'In the Yellow Book the Contractor designs', 'The Yellow Book is only for roads', 'The Yellow Book has no claims'],
      uz: ['Yellow Book’da Muhandis yo‘q', 'Yellow Book’da Pudratchi loyihalashtiradi', 'Yellow Book faqat yo‘llar uchun', 'Yellow Book’da claims yo‘q'],
    },
    explain: {
      ru: 'Yellow Book (Plant & Design-Build) возлагает проектирование на Подрядчика, который отвечает за пригодность проекта для цели. Инженер в Yellow Book есть.',
      en: 'The Yellow Book (Plant & Design-Build) places design on the Contractor, who is responsible for fitness for purpose. The Yellow Book does have an Engineer.',
      uz: 'Yellow Book (Plant & Design-Build) loyihalashni Pudratchiga yuklaydi, u maqsadga muvofiqlik uchun javobgar. Yellow Book’da Muhandis mavjud.',
    },
  },
  {
    track: 'Silver / EPC', correct: 1,
    question: {
      ru: 'Кто администрирует контракт в Silver Book вместо независимого Инженера?',
      en: 'Who administers the contract in the Silver Book instead of an independent Engineer?',
      uz: 'Silver Book’da mustaqil Muhandis o‘rniga shartnomani kim yuritadi?',
    },
    options: {
      ru: ['DAAB', 'Представитель Заказчика', 'Банк', 'Арбитр'],
      en: ['The DAAB', 'The Employer’s Representative', 'The bank', 'An arbitrator'],
      uz: ['DAAB', 'Buyurtmachi vakili', 'Bank', 'Arbitr'],
    },
    explain: {
      ru: 'В Silver Book (EPC/Turnkey) нет независимого Инженера — функции выполняет Представитель Заказчика, действующий в его интересах. Подрядчик несёт почти все риски.',
      en: 'In the Silver Book (EPC/Turnkey) there is no independent Engineer — the Employer’s Representative acts in the Employer’s interest. The Contractor bears almost all risk.',
      uz: 'Silver Book (EPC/Turnkey)’da mustaqil Muhandis yo‘q — vazifani Buyurtmachi manfaatida ish ko‘ruvchi Buyurtmachi vakili bajaradi. Pudratchi deyarli barcha xavfni o‘z zimmasiga oladi.',
    },
  },
  {
    track: 'Claims', correct: 1,
    question: {
      ru: 'В какой срок по изданиям 2017 нужно подать Notice of Claim?',
      en: 'Under the 2017 editions, within what period must a Notice of Claim be given?',
      uz: '2017-yil tahriri bo‘yicha Notice of Claim qancha muddatda topshirilishi kerak?',
    },
    options: {
      ru: ['14 дней', '28 дней', '56 дней', '84 дня'],
      en: ['14 days', '28 days', '56 days', '84 days'],
      uz: ['14 kun', '28 kun', '56 kun', '84 kun'],
    },
    explain: {
      ru: 'Sub-Clause 20.2.1: уведомление о претензии подаётся в течение 28 дней с момента осведомлённости о событии. Это пресекательный срок (time-bar).',
      en: 'Sub-Clause 20.2.1: a notice of claim is given within 28 days of becoming aware of the event. This is a time-bar.',
      uz: 'Sub-Clause 20.2.1: da’vo to‘g‘risidagi xabar hodisadan xabardor bo‘lgan paytdan 28 kun ichida beriladi. Bu — presekativ muddat (time-bar).',
    },
  },
  {
    track: 'Claims', correct: 1,
    question: {
      ru: 'Что происходит при пропуске 28-дневного срока уведомления?',
      en: 'What happens if the 28-day notice period is missed?',
      uz: '28 kunlik xabar berish muddati o‘tkazib yuborilsa nima bo‘ladi?',
    },
    options: {
      ru: ['Ничего, срок продлевается автоматически', 'Сторона может потерять право на претензию', 'Спор сразу идёт в арбитраж', 'Инженер обязан принять претензию'],
      en: ['Nothing, the period extends automatically', 'The party may lose its right to the claim', 'The dispute goes straight to arbitration', 'The Engineer must accept the claim'],
      uz: ['Hech narsa, muddat avtomatik uzayadi', 'Tomon da’vo huquqini yo‘qotishi mumkin', 'Nizo darhol arbitrajga o‘tadi', 'Muhandis da’voni qabul qilishi shart'],
    },
    explain: {
      ru: 'Срок носит пресекательный характер: при его пропуске сторона может лишиться права на эту претензию, даже если она обоснована по существу.',
      en: 'The period is a time-bar: if missed, the party may forfeit the right to that claim even if it is meritorious.',
      uz: 'Muddat presekativ xususiyatga ega: o‘tkazib yuborilsa, tomon mazmunan asosli bo‘lsa ham, bu da’vo huquqidan mahrum bo‘lishi mumkin.',
    },
  },
  {
    track: 'DAAB', correct: 1,
    question: {
      ru: 'Решение DAAB по изданиям 2017:',
      en: 'A DAAB decision under the 2017 editions:',
      uz: '2017-yil tahriri bo‘yicha DAAB qarori:',
    },
    options: {
      ru: ['Носит рекомендательный характер', 'Обязательно к исполнению немедленно', 'Вступает в силу только после арбитража', 'Может вынести только суд'],
      en: ['Is merely a recommendation', 'Is binding with immediate effect', 'Takes effect only after arbitration', 'Can only be issued by a court'],
      uz: ['Tavsiyaviy xususiyatga ega', 'Darhol ijro etilishi shart', 'Faqat arbitrajdan keyin kuchga kiradi', 'Faqat sud chiqarishi mumkin'],
    },
    explain: {
      ru: 'Решение DAAB обязательно к немедленному исполнению, даже при несогласии стороны. Подав Notice of Dissatisfaction, сторона может позже передать спор в арбитраж, но исполнить решение нужно сразу.',
      en: 'A DAAB decision is binding with immediate effect, even if a party disagrees. By filing a Notice of Dissatisfaction a party may later go to arbitration, but the decision must be complied with at once.',
      uz: 'DAAB qarori, tomon rozi bo‘lmasa ham, darhol ijro etilishi shart. Notice of Dissatisfaction topshirib, tomon keyinroq arbitrajga murojaat qilishi mumkin, lekin qaror darhol bajarilishi kerak.',
    },
  },
  {
    track: 'DAAB', correct: 1,
    question: {
      ru: 'Что означает буква «A» (Avoidance) в аббревиатуре DAAB?',
      en: 'What does the “A” (Avoidance) in DAAB stand for?',
      uz: 'DAAB qisqartmasidagi «A» (Avoidance) nimani anglatadi?',
    },
    options: {
      ru: ['Арбитраж', 'Предотвращение споров', 'Апелляция', 'Аудит'],
      en: ['Arbitration', 'Dispute avoidance', 'Appeal', 'Audit'],
      uz: ['Arbitraj', 'Nizolarni oldini olish', 'Apellyatsiya', 'Audit'],
    },
    explain: {
      ru: 'DAAB = Dispute Avoidance/Adjudication Board. Акцент 2017 года — на предотвращении (avoidance) споров постоянным советом, а не только на их разрешении.',
      en: 'DAAB = Dispute Avoidance/Adjudication Board. The 2017 emphasis is on avoiding disputes via a standing board, not only resolving them.',
      uz: 'DAAB = Dispute Avoidance/Adjudication Board. 2017-yil urg‘usi — doimiy kengash orqali nizolarni oldini olishda (avoidance), nafaqat ularni hal qilishda.',
    },
  },
  {
    track: 'Procurement', correct: 2,
    question: {
      ru: 'Какая книга FIDIC обычно применяется на проектах, финансируемых банками развития?',
      en: 'Which FIDIC book is usually used on projects financed by development banks?',
      uz: 'Taraqqiyot banklari moliyalashtirgan loyihalarda odatda qaysi FIDIC kitobi qo‘llaniladi?',
    },
    options: {
      ru: ['Green Book', 'Gold Book', 'Pink Book (MDB)', 'White Book'],
      en: ['Green Book', 'Gold Book', 'Pink Book (MDB)', 'White Book'],
      uz: ['Green Book', 'Gold Book', 'Pink Book (MDB)', 'White Book'],
    },
    explain: {
      ru: 'Pink Book — гармонизированная для МФО версия Red Book. Её используют Всемирный банк, АБР, ЕБРР и другие банки развития, добавляя свои Особые условия.',
      en: 'The Pink Book is the MDB-harmonised version of the Red Book. The World Bank, ADB, EBRD and other development banks use it, adding their Particular Conditions.',
      uz: 'Pink Book — Red Book’ning XTB uchun uyg‘unlashtirilgan versiyasi. Uni Jahon banki, ADB, EBRD va boshqa taraqqiyot banklari o‘z Maxsus shartlarini qo‘shgan holda ishlatadi.',
    },
  },
];

export function getQuiz(lang: Lang): QuizQuestion[] {
  return raw.map((q) => ({
    track: q.track,
    correct: q.correct,
    question: q.question[lang],
    options: q.options[lang],
    explain: q.explain[lang],
  }));
}
