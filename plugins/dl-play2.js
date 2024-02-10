import yts from 'yt-search';
import ytdl from 'yt-dlp';

let limit = 320;

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
 if (!text) throw `🤔 Você quer que música? ${mssg.example} *${usedPrefix + command}* queen, don't stop me now`
  let chat = global.db.data.chats[m.chat]
  let res = await yts(text)
  //let vid = res.all.find(video => video.seconds < 3600)
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
     
	  if(!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), `
▢ *🎞️Qualidade* : ${quality}
▢ *⚖️Peso* : ${size}
`.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
		m.react(done) 
  } catch {

  try {
    const ydlOptions = {
      format: 'bestaudio[ext=opus]', // Prioritize downloading Opus audio
      download: false, // Don't download immediately
    };

    const ydlInfo = await ytdl.getInfo(vid.url, ydlOptions);
    const { title, url, format, acodec, size, size_bytes } = ydlInfo.formats[0];

    const isLimit = limit * 1024 < size_bytes;

    await conn.loadingMsg(m.chat, ' BAIXANDO', ` ${isLimit ? `≡  *YT-DLP*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *️${mssg.quality}*: ${format}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ COMPLETO!' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m);

    if (!isLimit) {
      const filename = `${title}.opus`; // Use .opus extension
      const file = await ydl.downloadFromInfo(ydlInfo, ydlOptions);
      await conn.sendFile(m.chat, file, filename, `
      ▢ *️Qualidade*: ${format}
      ▢ *⚖️Peso*: ${size}
      ▢ *Codec*: ${acodec}
      `.trim(), m, false, { mimetype: 'audio/opus', asDocument: chat.useDocument });
      m.react(done);
    }
  } catch (error) {
    }

}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'musica', 'song']
