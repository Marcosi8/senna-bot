let handler = async (m, { conn, text, usedPrefix, command }) => {

let time = global.db.data.users[m.sender].lastrob + 720000
if (new Date - global.db.data.users[m.sender].lastrob < 720000) throw `*⏱️ ESPERE* ${msToTime(time - new Date())}\n*NÃO USE ESTE COMANDO COMO SPAMMER, 1 USO POR VEZ.*`
let [nomor, pesan, jumlah] = text.split('|')
if (!nomor) throw `*DIGITE O NÚMERO QUE DESEJA ENVIAR SPAM*\n*❊ ${usedPrefix + command} numero|texto|quantidade*\n*EXEMPLO*\n*❊ ${usedPrefix + command} 999999999999|marco|35*\n\n𝙀𝙉𝙏𝙀𝙍 𝙏𝙃𝙀 𝙉𝙐𝙈𝘽𝙀𝙍 𝙏𝙊 𝘽𝙀 𝙎𝙋𝘼𝙈𝙀𝘿\n*❊ ${usedPrefix + command} number|text|amount*\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*❊ ${usedPrefix + command} 999999999999|Hi!!|35*`
if (!pesan) throw `𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙉𝙐𝙈𝙀𝙍𝙊 𝘼𝙇 𝙌𝙐𝙀 𝙎𝙀 𝙇𝙀 𝙃𝘼𝙍𝘼 𝙎𝙋𝘼𝙈\n*❊ ${usedPrefix + command} numero|texto|quantidade*\n*EXEMPLO*\n*❊ ${usedPrefix + command} 999999999999|marco|35*\n\n𝙀𝙉𝙏𝙀𝙍 𝙏𝙃𝙀 𝙉𝙐𝙈𝘽𝙀𝙍 𝙏𝙊 𝘽𝙀 𝙎𝙋𝘼𝙈𝙀𝘿\n*❊ ${usedPrefix + command} number|text|amount*\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*❊ ${usedPrefix + command} 999999999999|Hi!!|35*`
if (jumlah && isNaN(jumlah)) throw `𝙀𝙉 𝘾𝘼𝙉𝙏𝙄𝘿𝘼𝘿 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙄𝙍 𝙀𝙇 𝙉𝙐𝙈𝙀𝙍𝙊 𝘼𝙇 𝙌𝙐𝙀 𝙎𝙀 𝙇𝙀 𝙃𝘼𝙍𝘼 𝙎𝙋𝘼𝙈\n*❊ ${usedPrefix + command} numero|texto|quantidade*\n*EXEMPLO*\n*❊ ${usedPrefix + command} 999999999999|Holaaa|35*\n\n𝙀𝙉𝙏𝙀𝙍 𝙏𝙃𝙀 𝙉𝙐𝙈𝘽𝙀𝙍 𝙏𝙊 𝘽𝙀 𝙎𝙋𝘼𝙈𝙀𝘿\n*❊ ${usedPrefix + command} number|text|amount*\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*❊ ${usedPrefix + command} 999999999999|Hi!!|35*`
await delay(10000)
let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
await delay(10000)
let fixedJumlah = jumlah ? jumlah * 1 : 10
if (fixedJumlah > 10) throw `_MÍNIMO DE_ *10* _PARA FAZER UM SPAM_\n\n𝙈𝙄𝙉𝙄𝙈𝙐𝙈 *10* 𝙈𝙀𝙎𝙎𝘼𝙂𝙀𝙎 𝙏𝙊 𝙎𝙋𝘼𝙈`
await delay(10000)
await m.reply(`*SPAM ENVIADO PARA*${fixedJumlah}*QUANTIDADE*${nomor}*\n\n𝙏𝙃𝙀 𝙎𝙋𝘼𝙈 𝙒𝘼𝙎 𝙎𝙀𝙉𝙏 *${fixedJumlah}* 𝙏𝙄𝙈𝙀𝙎 𝙏𝙊 *${nomor}*`)
await delay(10000)
for (let i = fixedJumlah; i > 1; i--) {
await delay(10000)
if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m)
}
global.db.data.users[m.sender].lastrob = new Date * 1
}
handler.help = ['spam']
handler.tags = ['prime']
handler.command = ['spamar', 'spam'] 
export default handler 
const delay = time => new Promise(res => setTimeout(res, time))

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + " Hora(s) " + minutes + " Minuto(s)"}