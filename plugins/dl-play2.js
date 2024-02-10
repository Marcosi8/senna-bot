import yts from 'yt-search';
import fg from 'api-dylux';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 320;

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
    try {
        if (!text) throw `🤔 Você quer uma música? ${mssg.example} *${usedPrefix + command}* Queen, Don't Stop Me Now`;

        let res = await yts(text);
        let vid = res.videos[0];

        if (!vid) throw `❗️ Vídeo/Audio não encontrado`;

        m.react('🎧');

        let play = `
            ≡ *YT MUSIC*
            ┌──────────────
            ▢ 📥 *${mssg.title}:* ${vid.title}
            ▢ 📆 *${mssg.aploud}:* ${vid.ago}
            ▢ ⏱️ *${mssg.duration}:* ${vid.timestamp}
            ▢ 👀 *${mssg.views}:* ${vid.views.toLocaleString()}
            └──────────────

            _Enviando..._
        `;
        
        conn.sendMessage(m.chat, vid.thumbnail, 'play', play);

        let q = /vid$/.test(command) ? '360p' : '128kbps';
        let yt = await (isVideo ? fg.ytv : fg.yta)(vid.url, q);
        let { title, dl_url, quality, size, sizeB } = yt;
        let isLimit = limit * 1024 < sizeB;

        await conn.loadingMsg(m.chat, '📥 BAIXANDO', ` ${isLimit ? `≡  *FG YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *🎞️${mssg.quality}*: ${quality}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ COMPLETO!' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m);

        if (!isLimit) {
            conn.sendMessage(m.chat, dl_url, `
                ▢ *🎞️Qualidade* : ${quality}
                ▢ *⚖️Peso* : ${size}
            `.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg' });
            
            m.react('done');
        }
    } catch (error) {
        m.reply(`🚫 ${mssg.error}`);
    }
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'musica', 'song'];

export default handler;
