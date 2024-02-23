import yts from 'yt-search';
import fg from 'api-dylux';
import { youtubedl } from '@bochilteam/scraper';

const limit = 320;

const handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
    if (!text) throw `🤔 Você quer ouvir que música? ${mssg.example}: *${usedPrefix + command}* don't stop me now, queen`;

    const res = await yts(text);
    const vid = res.videos[0];

    if (!vid) throw `🚫 Vídeo/Audio não encontrado`;

    const play = `
    ≡ *YT MUSIC*
    ┌──────────────
    ▢ 🎧 *Title:* ${vid.title}
    ▢ 📆 *Uploaded:* ${vid.ago}
    ▢ ⏱️ *Duration:* ${vid.timestamp}
    ▢ ♻️ *Views:* ${vid.views.toLocaleString()}
    └──────────────

    _Enviando..._`;

    conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, null);

    const q = '128kbps'; 
    try {
        const yt = await fg.yta(vid.url, q);
        const { title, dl_url, quality, size, sizeB } = yt;
        const isLimit = limit * 1024 < sizeB;

        if (!isLimit) {
            const doc = {
                audio: {
                    url: dl_url
                },
                mimetype: 'audio/ogg',
                ptt: false,
                waveform: [100, 0, 0, 0, 0, 0, 100],
                fileName: `${title}`
            };

            await conn.sendMessage(m.chat, doc, { quoted: m });
        } else {
            throw `${mssg.errorLimit} ${limit} MB`;
        }
    } catch (error) {
        m.reply(`🚫 ${mssg.error}`);
    }
};

handler.help = ['song'];
handler.tags = ['prime', 'dl'];
handler.command = ['song', 'song2', 'mp3', 'playmp3'];

export default handler;
