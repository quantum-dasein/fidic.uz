// Vercel Serverless Function — consultation/lead form at /api/lead.
// Forwards the lead to Telegram if a bot is configured; otherwise returns a
// non-2xx so the front-end falls back to a pre-filled mailto link (so a lead is
// never lost).
//
// Optional env vars (set in Vercel → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN  — token from @BotFather
//   TELEGRAM_CHAT_ID    — chat/channel id to receive leads (e.g. your user id)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const name = String(body.name || '').slice(0, 200).trim();
    const contact = String(body.contact || '').slice(0, 200).trim();
    const topic = String(body.topic || '').slice(0, 200).trim();
    const message = String(body.message || '').slice(0, 2000).trim();

    if (!name || !contact) {
      return res.status(400).json({ error: 'Имя и контакт обязательны.' });
    }

    // No bot configured → tell the client to use the mailto fallback.
    if (!token || !chatId) {
      return res.status(503).json({ error: 'lead-channel-unconfigured' });
    }

    const text =
      `🆕 Заявка с FIDIC.uz\n\n` +
      `👤 Имя: ${name}\n` +
      `📞 Контакт: ${contact}\n` +
      `📌 Тема: ${topic || '—'}\n` +
      `📝 Задача: ${message || '—'}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!tgRes.ok) {
      const detail = await tgRes.text();
      console.error('Telegram error', tgRes.status, detail);
      return res.status(502).json({ error: 'Не удалось отправить. Используется резервный способ.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('lead handler error', err);
    return res.status(500).json({ error: 'Внутренняя ошибка.' });
  }
}
