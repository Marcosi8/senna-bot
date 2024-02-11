
import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
const effects = ['preso', 'gay', 'vidro', 'wasted' ,'trigger', 'lolice', 'simcard', 'doce']
let handler = async (m, { conn, usedPrefix, text, command }) => {
let effect = text.trim().toLowerCase()
if (!effects.includes(effect)) throw `

┌─⊷ *EFEITOS*
${effects.map(effect => `▢ ${effect}`).join('\n')}
└───────────

📌 *Exemplo:* 
${usedPrefix + command} wasted 
`.trim()
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw '🤔 *Responda uma Foto para usar este comando*'
if (!/image\/(jpe?g|png)/.test(mime)) throw `🚫 Formato não suportado`
let img = await q.download()
let url = await uploadImage(img)
let apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
avatar: url
})
try {
let stiker = await sticker(null, apiUrl, global.packname, global.author)
conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
} catch (e) {
m.reply('🚫 Erro ao converter para adesivo, enviado como imagem')
await conn.sendFile(m.chat, apiUrl, 'smaker.png', null, m)
}}
handler.help = ['smaker']
handler.tags = ['sticker', 'prime']
handler.command = ['stickmaker', 'stickermaker', 'smaker', 'sefeito'] 
handler.diamond = false

export default handler
