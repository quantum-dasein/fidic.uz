// Sample practice questions for the FIDIC certification prep portal.
// Intentionally teaching-oriented. Each has one correct answer + explanation.

export interface QuizQuestion {
  track: string;
  question: string;
  options: string[];
  correct: number; // index
  explain: string;
}

export const quiz: QuizQuestion[] = [
  {
    track: 'Red Book',
    question: 'В Red Book (Construction) за проектирование Работ обычно отвечает:',
    options: ['Подрядчик', 'Заказчик', 'Инженер', 'DAAB'],
    correct: 1,
    explain: 'В Red Book проектирует Заказчик (через своего проектировщика), а Подрядчик строит по предоставленному проекту. Риск проектных ошибок остаётся за Заказчиком.',
  },
  {
    track: 'Yellow Book',
    question: 'Чем Yellow Book принципиально отличается от Red Book?',
    options: [
      'В Yellow Book нет Инженера',
      'В Yellow Book проектирует Подрядчик',
      'Yellow Book только для дорог',
      'Yellow Book не предусматривает claims',
    ],
    correct: 1,
    explain: 'Yellow Book (Plant & Design-Build) возлагает проектирование на Подрядчика, который отвечает за пригодность проекта для цели. Инженер в Yellow Book есть.',
  },
  {
    track: 'Silver / EPC',
    question: 'Кто администрирует контракт в Silver Book вместо независимого Инженера?',
    options: ['DAAB', 'Представитель Заказчика', 'Банк', 'Арбитр'],
    correct: 1,
    explain: 'В Silver Book (EPC/Turnkey) нет независимого Инженера — функции выполняет Представитель Заказчика, действующий в его интересах. Подрядчик несёт почти все риски.',
  },
  {
    track: 'Claims',
    question: 'В какой срок по изданиям 2017 нужно подать Notice of Claim?',
    options: ['14 дней', '28 дней', '56 дней', '84 дня'],
    correct: 1,
    explain: 'Sub-Clause 20.2.1: уведомление о претензии подаётся в течение 28 дней с момента осведомлённости о событии. Это пресекательный срок (time-bar).',
  },
  {
    track: 'Claims',
    question: 'Что происходит при пропуске 28-дневного срока уведомления?',
    options: [
      'Ничего, срок продлевается автоматически',
      'Сторона может потерять право на претензию',
      'Спор сразу идёт в арбитраж',
      'Инженер обязан принять претензию',
    ],
    correct: 1,
    explain: 'Срок носит пресекательный характер: при его пропуске сторона может лишиться права на эту претензию, даже если она обоснована по существу.',
  },
  {
    track: 'DAAB',
    question: 'Решение DAAB по изданиям 2017:',
    options: [
      'Носит рекомендательный характер',
      'Обязательно к исполнению немедленно',
      'Вступает в силу только после арбитража',
      'Может вынести только суд',
    ],
    correct: 1,
    explain: 'Решение DAAB обязательно к немедленному исполнению, даже при несогласии стороны. Подав Notice of Dissatisfaction, сторона может позже передать спор в арбитраж, но исполнить решение нужно сразу.',
  },
  {
    track: 'DAAB',
    question: 'Что означает буква «A» (Avoidance) в аббревиатуре DAAB?',
    options: [
      'Арбитраж',
      'Предотвращение споров',
      'Апелляция',
      'Аудит',
    ],
    correct: 1,
    explain: 'DAAB = Dispute Avoidance/Adjudication Board. Акцент 2017 года — на предотвращении (avoidance) споров постоянным советом, а не только на их разрешении.',
  },
  {
    track: 'Procurement',
    question: 'Какая книга FIDIC обычно применяется на проектах, финансируемых банками развития?',
    options: ['Green Book', 'Gold Book', 'Pink Book (MDB)', 'White Book'],
    correct: 2,
    explain: 'Pink Book — гармонизированная для МФО версия Red Book. Её используют Всемирный банк, АБР, ЕБРР и другие банки развития, добавляя свои Особые условия.',
  },
];
