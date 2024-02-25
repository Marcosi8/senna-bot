import yts from 'yt-search';
import { youtubedl } from '@bochilteam/scraper';

let limit = 320;

let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {
    if (!text) throw `🤔 Você quer ouvir que música? ${mssg.example}: *${usedPrefix + command}* don't stop me now, queen`;
  
    let res = await yts(text);
    let vid = res.videos[0];

    if (!vid) throw `🚫 Vídeo/Audio não encontrado`;
    m.react('💿');

    let play = `
> *YT MUSIC*
┌──────────────
▢ 🎧 *${mssg.title}:* ${vid.title}
▢ 📆 *${mssg.aploud}:* ${vid.ago}
▢ ⏱️ *${mssg.duration}:* ${vid.timestamp}
▢ ♻️ *${mssg.views}:* ${vid.views.toLocaleString()}
└──────────────

_Enviando..._`;

    conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, rcanal);
  
    let q = '128kbps'; // Forçando qualidade de áudio
    try {
        let yt = await youtubedl(vid.url, q);
        let { title, dl_url, quality, size, sizeB } = yt;
        let isLimit = limit * 1024 < sizeB;

        await conn.loadingMsg(m.chat, '📥 Baixando', ` ${isLimit ? `≡  *YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *🎞️${mssg.quality}*: ${quality}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '🎉 Download Completo!' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m);
     
        if (!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp3', `
> 💿 *MP3*
_Use /song para ouvir a música diretamente no WhatsApp!_
 
▢ *🎞️Qualidade* : ${quality}
▢ *⚖️Tamanho* : ${size}
`.trim(), m, false, { mimetype: 'audio/mpeg', asDocument: true });
        
        m.react(done);
    } catch (error) {
        m.reply(`🚫 ${mssg.error}`);
    }
};

handler.help = ['play'];
handler.tags = ['prime', 'dl'];
handler.command = ['play', 'song2', 'mp3', 'playmp3'];

export default handler;
