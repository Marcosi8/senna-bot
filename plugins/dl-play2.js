import yts from 'yt-search'
import axios from 'axios' // Importando o Axios para fazer requisições HTTP

let limit = 320
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  
    if (!text) throw `🤔 Você quer que música? ${mssg.example} *${usedPrefix + command}* queen, don't stop me now`
    let chat = global.db.data.chats[m.chat]
    let res = await yts(text)
    let vid = res.videos[0]
    if (!vid) throw `❗️ Vídeo/Audio não encontrado`
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
  
    try {
        let apiResponse = await axios.get(`https://www.yt-download.org/api/button/mp3/${vid.videoId}`)
        if (!apiResponse.data.link) throw 'Link de download não encontrado'
        
        let audioUrl = apiResponse.data.link
        await conn.sendFile(m.chat, audioUrl, 'audio.mp3', `🎵 ${vid.title}`, m)
        m.react('✅') // Reage com um emoji indicando que o processo foi concluído com sucesso
    } catch (error) {
        m.reply(`❌ Ocorreu um erro ao processar a música: ${error}`)
    }
}

handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'musica', 'song']

export default handler
