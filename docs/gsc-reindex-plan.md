# План переиндексации в Google Search Console

Составлен 26.07.2026 по данным Coverage + Performance экспортов.
Все 40 URL проверены: отдают 200 и присутствуют в `sitemap-0.xml`.

## Порядок действий

**Шаг 0 — обязательно первым.** Задеплоить ветку с переписанными гео-страницами.
До деплоя прод отдаёт старую версию `/knowledge/fidic-uzbekistan/` без упоминания
ПП-330. Запрос индексации до деплоя заставит Google перечитать старую заглушку и
подтвердить её — это хуже, чем не делать ничего.

**Шаг 1.** Search Console → «Файлы Sitemap» → удалить `sitemap-index.xml`,
добавить заново. Сбрасывает дату последнего обхода.

**Шаг 2.** «Проверка URL» (строка поиска сверху) → вставить URL → дождаться
проверки → «Запросить индексирование». Лимит примерно 10–12 URL в сутки на ресурс,
поэтому список разбит на 4 дня. Порядок внутри дня соблюдать не обязательно,
порядок дней — желательно.

**Шаг 3.** «Индексирование страниц» → в таблице причин открыть
«Обнаружена, не проиндексирована» (174 стр.) и «Запрещено тегом noindex» (84 стр.)
→ кнопка «Проверить исправление». Это ставит весь набор в очередь на перепроверку,
в обход лимита на ручные запросы.

---

## День 1 — цель восстановления (10 URL)

Шесть переписанных гео-страниц плюс главные. Это то, ради чего всё делается.

```
https://fidic.uz/
https://fidic.uz/knowledge/fidic-uzbekistan/
https://fidic.uz/en/knowledge/fidic-uzbekistan/
https://fidic.uz/uz/knowledge/fidic-uzbekistan/
https://fidic.uz/knowledge/fidic-kazakhstan/
https://fidic.uz/en/knowledge/fidic-kazakhstan/
https://fidic.uz/uz/knowledge/fidic-kazakhstan/
https://fidic.uz/knowledge/fidic-and-uzbek-law/
https://fidic.uz/en/
https://fidic.uz/uz/
```

## День 2 — хабы (10 URL)

Разделы, через которые Google обходит остальной сайт. Пока они не в индексе,
174 «обнаруженных» страницы не получат обхода.

```
https://fidic.uz/knowledge/
https://fidic.uz/en/knowledge/
https://fidic.uz/clauses/
https://fidic.uz/tools/
https://fidic.uz/glossary/
https://fidic.uz/certification/
https://fidic.uz/resources/
https://fidic.uz/knowledge/mdb-fidic/
https://fidic.uz/knowledge/pink-book-mdb/
https://fidic.uz/knowledge/rainbow-guide/
```

## День 3 — страницы с доказанным спросом (10 URL)

Отобраны по числу показов в Performance-экспорте: у них уже есть трафик,
возврат в индекс даёт результат быстрее всего.

```
https://fidic.uz/en/knowledge/claims-28-days/
https://fidic.uz/en/knowledge/taking-over-dnp/
https://fidic.uz/knowledge/taking-over-dnp/
https://fidic.uz/en/knowledge/emerald-book-tunnels/
https://fidic.uz/en/knowledge/variations-clause-13/
https://fidic.uz/en/knowledge/prolongation-costs-evidence/
https://fidic.uz/tools/book-selector/
https://fidic.uz/knowledge/claims-28-days/
https://fidic.uz/knowledge/fidic-certification-path/
https://fidic.uz/en/knowledge/performance-security/
```

## День 4 — опорные материалы (10 URL)

```
https://fidic.uz/knowledge/performance-security/
https://fidic.uz/knowledge/daab-explained/
https://fidic.uz/knowledge/silver-book-epc/
https://fidic.uz/knowledge/red-vs-yellow-vs-silver/
https://fidic.uz/knowledge/eot-claim/
https://fidic.uz/knowledge/payment-clause-14/
https://fidic.uz/knowledge/sub-clause-20-2/
https://fidic.uz/knowledge/fidic-public-procurement/
https://fidic.uz/knowledge/editions-1999-2017-2022/
https://fidic.uz/mdb-project-cases/
```

---

## Чего НЕ делать

- Не запрашивать индексацию URL без завершающего слеша (`/knowledge/fidic-uzbekistan`
  без `/`) — это 308-редирект, запрос уйдёт впустую.
- Не трогать причины «Вариант страницы с тегом canonical» (17) и
  «Страница с переадресацией» (12). Это нормальная работа hreflang и
  `trailingSlash: 'always'`, а не ошибки.
- Не подавать один и тот же URL повторно чаще раза в несколько дней — повторные
  запросы не ускоряют обход и тратят суточный лимит.

## Ожидания по срокам

Отчёт Coverage в GSC отстаёт на 2–3 недели, поэтому цифры «292 не проиндексировано»
будут держаться какое-то время после того, как ситуация реально исправится.
Ориентир для восстановления после месячного `noindex` — 4–8 недель. Первым
возвращается брендовый трафик, гео-запросы позже.
