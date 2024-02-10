import yts from 'yt-search'
import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

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

        let button = [
            { buttonId: 'download', buttonText: 'Download', type: 1 }
        ]

        let btn = {
            contentText: `${isLimit ? `≡  *FG YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *🎞️${mssg.quality}*: ${quality}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ COMPLETO!' }`,
            footerText: 'Aguarde enquanto o download é processado...',
            buttons: button,
            headerType: 1
        }

        let loadingMsg = await conn.sendButton(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), play.trim(), btn, m)
      
        let progress = ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"]
        let i = 0

        let interval = setInterval(() => {
            if (i >= progress.length) i = 0
            loadingMsg.contentText = progress[i]
            conn.updateMessage(m.chat, loadingMsg).catch(console.error)
            i++
        }, 1000)

        if(!isLimit) {
            conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), `
                ▢ *🎞️Qualidade* : ${quality}
                ▢ *⚖️Peso* : ${size}
            `.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
        }

        m.react(done) 
        clearInterval(interval)

    } catch {
        try {
            let yt = await (isVideo ? fg.ytmp4 : fg.ytmp3)(vid.url, q)
            let { title, dl_url, quality, size, sizeB } = yt
            let isLimit = limit * 1024 < sizeB 

            let button = [
                { buttonId: 'download', buttonText: 'Download', type: 1 }
            ]

            let btn = {
                contentText: `${isLimit ? `≡  *FG YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *🎞️${mssg.quality}*: ${quality}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ COMPLETO!' }`,
                footerText: 'Aguarde enquanto o download é processado...',
                buttons: button,
                headerType: 1
            }

            let loadingMsg = await conn.sendButton(m.chat, dl_url, title + '.mp' + (3 + /2$/.test(command)), play.trim(), btn, m)
      
            let progress = ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"]
            let i = 0

            let interval = setInterval(() => {
                if (i >= progress.length) i = 0
                loadingMsg.contentText = progress[i]
                conn.updateMessage(m.chat, loadingMsg).catch(console.error)
                i++
            }, 1000)

            if(!isLimit) {
                conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /2$/.test(command)), `
                ≡  *FG YTDL 2*
                
                *📌${mssg.title}* : ${title}
                *🎞️${mssg.quality}* : ${quality}
                *⚖️${mssg.size}* : ${size}
                `.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
            }

            m.react(done) 
            clearInterval(interval)
        } catch (error) {
            m.reply(`🚫 ${mssg.error}`)
        }
    }
}

handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'musica', 'song']

export default handler
