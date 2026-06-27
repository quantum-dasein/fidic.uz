// Vercel Serverless Function — "Ask FIDIC AI".
// Lives at /api/ask. Calls the Anthropic Messages API via raw HTTPS fetch so the
// site can stay a fully static Astro build with no SDK in the bundle.
//
// Required env var (set in Vercel → Project → Settings → Environment Variables):
//   ANTHROPIC_API_KEY   — your Anthropic API key
// Optional:
//   FIDIC_AI_MODEL      — model id (default: claude-opus-4-8).
//                         Cheaper/faster options: claude-haiku-4-5, claude-sonnet-4-6.

const MODEL = process.env.FIDIC_AI_MODEL || 'claude-opus-4-8';

const SYSTEM_PROMPT = `Ты — экспертный помощник по контрактам FIDIC на портале FIDIC.uz (проект консалтинговой компании Bridge Consult, Узбекистан).

Твоя задача — объяснять простым, точным языком концепции, термины и процедуры контрактов FIDIC и смежные темы: радужную серию (Red, Yellow, Silver, Green, Gold, Pink, Emerald, Blue, White Book), EPC, claims, DAAB, разрешение споров, проекты МФО (Всемирный банк, АБР, ЕБРР), управление контрактами.

Правила:
- Отвечай на языке пользователя (LANG передаётся ниже): ru — русский, en — English, uz — o‘zbekcha. Если язык вопроса явно другой — отвечай на языке вопроса.
- Будь точным и практичным. Ссылайся на номера статей (Clauses) изданий 2017, когда уместно.
- Отвечай КРАТКО и по существу: 2–4 абзаца или короткий список. Не добавляй пошаговых рассуждений — только итоговый ответ.
- Если вопрос требует анализа конкретного контракта или юридического решения — отвечай по общим принципам и рекомендуй обратиться к экспертам Bridge Consult (форма заявки на сайте или Telegram @fidicuzb).
- Не выдумывай факты. Если не уверен — честно скажи об этом.
- Не давай юридических заключений; добавляй, что это справочная информация.
- Если вопрос не относится к FIDIC, инфраструктурным контрактам или строительству — вежливо верни разговор к теме портала.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Метод не поддерживается.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error:
        'AI-помощник ещё не подключён. Напишите нам в Telegram @fidicuzb или оставьте заявку — ответит эксперт.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    let messages = Array.isArray(body.messages) ? body.messages : [];
    const lang = ['ru', 'en', 'uz'].includes(body.lang) ? body.lang : 'ru';

    // Sanitise: keep only valid roles/strings, cap history and length to limit abuse.
    messages = messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
      return res.status(400).json({ error: 'Пустой или некорректный запрос.' });
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT + `\n\nLANG = ${lang}`,
        messages,
      }),
    });

    if (!anthropicRes.ok) {
      const detail = await anthropicRes.text();
      console.error('Anthropic API error', anthropicRes.status, detail);
      return res.status(502).json({
        error: 'Помощник временно недоступен. Попробуйте позже или напишите в Telegram @fidicuzb.',
      });
    }

    const data = await anthropicRes.json();
    const answer = Array.isArray(data.content)
      ? data.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim()
      : '';

    if (!answer) {
      return res.status(502).json({ error: 'Не удалось сформировать ответ. Попробуйте переформулировать вопрос.' });
    }

    return res.status(200).json({ answer });
  } catch (err) {
    console.error('ask handler error', err);
    return res.status(500).json({ error: 'Внутренняя ошибка. Попробуйте позже.' });
  }
}
