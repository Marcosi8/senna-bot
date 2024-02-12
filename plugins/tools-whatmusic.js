import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-us-west-2.acrcloud.com',
access_key: '402013e26582c7f23f3fbd4814100759',
access_secret: 'tvRsiOyDPi8BcmlDUEbWueGG716zUASNJsQHKXjp'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
m.react('⚡️');
let mime = (q.msg || q).mimetype || ''
if (/audio|video/.test(mime)) {
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
let { code, msg } = res.status
if (code !== 0) throw msg
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `
𝚁𝙴𝚂𝚄𝙻𝚃
• 📌 *TÍTULO:* ${title}

• 👨‍🎤 *_ARTISTA:_* ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'NOT FOUND'}
• 💾 *_ÁLBUM:_* ${album.name || 'NOT FOUND'}
• 🌐 *_GÊNERO:_* ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'NOT FOUND'}
• 📆 *DATA DE UPLOAD:* ${release_date || 'NOT FOUND'}
`.trim()
fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
m.reply(txt)
} else throw '*😉 Responda o áudio e vou descobrir a música para você!*'
}

handler.help = ['shazam']
handler.tags = ['tools', 'prime']
handler.command = /^quemusica|shazam|whatmusic|find$/i
export default handler
