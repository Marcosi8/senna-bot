import { toDataURL } from 'qrcode'
let handler = async (m, { text, conn }) => {
if (!text) throw `𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊 𝙋𝘼𝙍𝘼 𝘾𝙊𝙉𝙑𝙀𝙍𝙏𝙄𝙍 𝙀𝙉 𝘾𝙊𝘿𝙄𝙂𝙊 𝙌𝙍\n\n𝙒𝙍𝙄𝙏𝙀 𝘼 𝙏𝙀𝙓𝙏 𝙏𝙊 𝘾𝙊𝙉𝙑𝙀𝙍𝙏 𝙄𝙉𝙏𝙊 𝙌𝙍 𝘾𝙊𝘿𝙀`
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', m)
}
handler.help = ['qrcode'].map(v => 'qr' + v + ' <text>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
export default handler