import type { VercelRequest, VercelResponse } from '@vercel/node'

type TelegramUpdate = {
  message?: {
    chat: { id: number }
    text?: string
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const token = process.env.TELEGRAM_BOT_TOKEN
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!token || !secret) return res.status(500).send('Bot is not configured')
  if (req.headers['x-telegram-bot-api-secret-token'] !== secret) return res.status(401).send('Unauthorized')

  const update = req.body as TelegramUpdate
  const message = update.message
  if (!message?.text?.trim().startsWith('/start')) return res.status(200).json({ ok: true })

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: message.chat.id,
      text: 'Привет! Чтобы открыть приложение, нажми кнопку «Приложение» внизу, рядом с полем ввода ♡',
    }),
  })

  if (!response.ok) return res.status(502).send('Telegram API request failed')
  return res.status(200).json({ ok: true })
}

