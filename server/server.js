import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 8080;
const allowedOrigins = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);
const attempts = new Map();

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use((request, response, next) => {
  const origin = request.get('origin');
  const normalizedOrigin = origin?.replace(/\/$/, '');
  const localOrigin = normalizedOrigin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(normalizedOrigin);
  if (normalizedOrigin && (allowedOrigins.includes(normalizedOrigin) || localOrigin)) {
    response.set('Access-Control-Allow-Origin', origin);
    response.set('Vary', 'Origin');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  }
  if (request.method === 'OPTIONS') {
    return normalizedOrigin && (allowedOrigins.includes(normalizedOrigin) || localOrigin)
      ? response.sendStatus(204)
      : response.sendStatus(403);
  }
  next();
});

app.get('/health', (_request, response) => response.json({ ok: true }));

app.post('/api/lead', async (request, response) => {
  const origin = request.get('origin')?.replace(/\/$/, '');
  const isLocal = origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  if (origin && !allowedOrigins.includes(origin) && !isLocal) return response.status(403).json({ error: 'Origin is not allowed' });

  const ip = request.ip || 'unknown';
  const now = Date.now();
  const previous = attempts.get(ip) || 0;
  if (now - previous < 30_000) return response.status(429).json({ error: 'Too many requests' });

  const name = String(request.body?.name || '').trim();
  const phone = String(request.body?.phone || '').trim();
  const userMessage = String(request.body?.message || '').trim();
  if (!name || !phone || name.length > 120 || phone.length > 40 || userMessage.length > 2000) {
    return response.status(400).json({ error: 'Invalid form data' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return response.status(503).json({ error: 'Telegram is not configured' });

  attempts.set(ip, now);
  const text = ['Новая заявка с сайта МедПроект', '', `Имя / компания: ${name}`, `Телефон: ${phone}`, `Сообщение: ${userMessage || 'Не указано'}`].join('\n');
  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    if (!telegramResponse.ok) throw new Error(`Telegram returned ${telegramResponse.status}`);
    response.json({ ok: true });
  } catch (error) {
    console.error('Telegram delivery failed:', error instanceof Error ? error.message : 'Unknown error');
    response.status(502).json({ error: 'Message delivery failed' });
  }
});

app.listen(port, '0.0.0.0', () => console.log(`Lead API listening on port ${port}`));
