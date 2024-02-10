
import yts from 'yt-search'
import fg from 'api-dylux'

let limit = 320
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  
    if (!text) throw `🤔 Você quer que música? ${mssg.example} *${usedPrefix + command}* queen, don't stop me now`
    
    let chat = global.db.data.chats[m.chat]
    let res = await yts(text)
    let vid = res.videos[0]
    
    if (!vid) throw `❗️ Vídeo/Audio não encontrado`
    
    let isVideo = /vid$/.test(command)
    m.react('🎧') 
  
    let play = `
	≡ *YT MUSIC*
┌──────────────
▢ 📥 *${mssg.title}:* ${vid.title}
▢ 📆 *${mssg.aploud}:* ${vid.ago}
▢ ⏱️ *${mssg.duration}:* ${vid.timestamp}
▢ 👀 *${mssg.views}:* ${vid.views.toLocaleString()}
└──────────────

_Enviando..._` 
    
    conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, rcanal)
  
    let q = isVideo ? '360p' : '128kbps' 
    try {
        let yt = await (isVideo ? fg.ytv : fg.yta)(vid.url, q)
        let { title, dl_url, quality, size, sizeB } = yt
        let isLimit = limit * 1024 < sizeB 

        await conn.loadingMsg(m.chat, '📥 BAIXANDO', ` ${isLimit ? `≡  *FG YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *🎞️${mssg.quality}*: ${quality}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ COMPLETO!' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m)
     
        if (!isLimit) {
            conn.sendFile(m.chat, dl_url, title + '.' + (isVideo ? 'mp4' : 'm4a'), `
▢ *🎞️Qualidade* : ${quality}
▢ *⚖️Peso* : ${size}
`.trim(), m, false, { mimetype: isVideo ? 'video/mp4' : 'audio/m4a', asDocument: chat.useDocument })
            m.react(done) 
        } else {
            throw `⚠️ Limite de tamanho excedido!`
        }
    } catch (error) {
        m.reply(`🚫 ${mssg.error}: ${error}`)
    }
}

handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'musica', 'song']

export default handler
