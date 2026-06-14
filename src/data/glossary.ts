// FIDIC terminology library. Each entry: term (EN), the working RU label, and a
// concise definition. Category drives filtering on the glossary page.

export type GlossaryCategory = 'Роли' | 'Процедуры' | 'Платежи' | 'Споры' | 'Время' | 'Документы';

export interface GlossaryTerm {
  term: string;        // English term as used in the contracts
  ru: string;          // Russian working term
  category: GlossaryCategory;
  definition: string;
}

export const glossary: GlossaryTerm[] = [
  { term: 'Engineer', ru: 'Инженер', category: 'Роли', definition: 'Лицо, назначенное Заказчиком для администрирования контракта (Red/Yellow). При определениях обязан действовать нейтрально (Sub-Clause 3.7).' },
  { term: 'Employer', ru: 'Заказчик', category: 'Роли', definition: 'Сторона, заказывающая работы и несущая платёжные обязательства; в Silver Book действует через Представителя Заказчика.' },
  { term: 'Contractor', ru: 'Подрядчик', category: 'Роли', definition: 'Сторона, выполняющая работы; в Yellow/Silver также отвечает за проектирование.' },
  { term: 'Employer\'s Representative', ru: 'Представитель Заказчика', category: 'Роли', definition: 'Управляет контрактом в Silver Book вместо независимого Инженера; действует в интересах Заказчика.' },
  { term: 'DAAB', ru: 'Совет по спорам', category: 'Споры', definition: 'Dispute Avoidance/Adjudication Board — постоянный орган для предотвращения и решения споров; его решения обязательны к немедленному исполнению.' },
  { term: 'Notice of Dissatisfaction (NOD)', ru: 'Уведомление о несогласии', category: 'Споры', definition: 'Формальное уведомление о несогласии с решением DAAB, открывающее путь к арбитражу. Пропуск срока делает решение окончательным.' },
  { term: 'Variation', ru: 'Изменение', category: 'Процедуры', definition: 'Изменение в Работах, инициированное Инженером/Заказчиком по Clause 13; оценивается и может корректировать цену и срок.' },
  { term: 'Claim', ru: 'Претензия', category: 'Споры', definition: 'Требование одной стороны к другой о доп. оплате, продлении срока или ином праве. В 2017 — единый порядок для обеих сторон (Clause 20).' },
  { term: 'Extension of Time (EOT)', ru: 'Продление срока', category: 'Время', definition: 'Право Подрядчика на продление срока завершения при задержках, за которые он не отвечает (Sub-Clause 8.5).' },
  { term: 'Time-bar (28 days)', ru: 'Пресекательный срок 28 дней', category: 'Время', definition: 'Срок подачи уведомления о претензии. Пропуск может лишить стороны права на претензию (Sub-Clause 20.2.1).' },
  { term: 'Taking-Over Certificate', ru: 'Акт приёмки', category: 'Документы', definition: 'Подтверждает, что Работы завершены и приняты Заказчиком; запускает период уведомления о дефектах (Clause 10).' },
  { term: 'Defects Notification Period (DNP)', ru: 'Период уведомления о дефектах', category: 'Время', definition: 'Период после приёмки, в течение которого Подрядчик обязан устранять выявленные дефекты (Clause 11).' },
  { term: 'Performance Certificate', ru: 'Сертификат исполнения', category: 'Документы', definition: 'Выдаётся после устранения дефектов и завершения DNP; означает выполнение обязательств Подрядчика.' },
  { term: 'Performance Security', ru: 'Обеспечение исполнения', category: 'Платежи', definition: 'Банковская гарантия/обеспечение, предоставляемое Подрядчиком как гарантия исполнения (Sub-Clause 4.2).' },
  { term: 'Interim Payment Certificate (IPC)', ru: 'Промежуточный платёжный сертификат', category: 'Платежи', definition: 'Сертификат Инженера на промежуточный платёж за выполненные объёмы и поставленные материалы (Clause 14).' },
  { term: 'Provisional Sum', ru: 'Условная сумма', category: 'Платежи', definition: 'Сумма, заложенная в цену для работ/поставок, определяемых позднее; расходуется по указанию Инженера.' },
  { term: 'Bill of Quantities (BoQ)', ru: 'Ведомость объёмов', category: 'Документы', definition: 'Перечень объёмов работ с расценками; основа оплаты в Red/Pink Book (re-measurement).' },
  { term: 'Tests on Completion', ru: 'Испытания при завершении', category: 'Процедуры', definition: 'Испытания перед приёмкой, подтверждающие соответствие Работ требованиям (Clause 9).' },
  { term: 'Tests after Completion', ru: 'Испытания после завершения', category: 'Процедуры', definition: 'Эксплуатационные испытания после приёмки (Yellow/Silver, Clause 12), подтверждающие проектные показатели.' },
  { term: 'Exceptional Event', ru: 'Исключительное событие', category: 'Процедуры', definition: 'Событие вне контроля сторон (в 1999 — Force Majeure), дающее право на освобождение от ответственности (Clause 18).' },
  { term: 'Delay Damages', ru: 'Неустойка за просрочку', category: 'Платежи', definition: 'Заранее оценённые убытки за задержку завершения (liquidated damages), обычно с предельным размером.' },
  { term: 'Provisional / Final Statement', ru: 'Итоговый расчёт', category: 'Платежи', definition: 'Расчёт Подрядчика по завершении для окончательного определения причитающихся сумм (Clause 14).' },
  { term: 'Programme', ru: 'Программа работ', category: 'Документы', definition: 'Детальный график исполнения, представляемый Подрядчиком; основа контроля сроков (Sub-Clause 8.3).' },
  { term: 'Site Data / Unforeseeable Conditions', ru: 'Непредвиденные условия', category: 'Процедуры', definition: 'Физические условия площадки, которые опытный Подрядчик не мог предвидеть (Sub-Clause 4.12); распределение риска зависит от книги.' },
  { term: 'Determination', ru: 'Определение Инженера', category: 'Процедуры', definition: 'Решение Инженера по согласованию или определению вопроса при отсутствии договорённости сторон (Sub-Clause 3.7).' },
  { term: 'Pink Book / MDB', ru: 'Гармонизированная форма МФО', category: 'Документы', definition: 'Версия Red Book, согласованная с банками развития (World Bank, ADB, EBRD) для финансируемых ими проектов.' },
];
