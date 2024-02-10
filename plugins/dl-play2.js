import yts from 'yt-search';
import ytdl from 'ytdl-core';
let limit = 320;

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
    if (!text) throw `🤔 Você quer que música? ${mssg.example} *${usedPrefix + command}* queen, don't stop me now`;

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

    conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, rcanal);

    try {
        let stream = ytdl(vid.url, { filter: 'audioonly', quality: 'highestaudio' });
        let bufs = [];
        stream.on('data', (chunk) => {
            bufs.push(chunk);
        });
        stream.on('end', () => {
            let buffer = Buffer.concat(bufs);
            conn.sendFile(m.chat, buffer, 'audio.opus', '', m, false, { mimetype: 'audio/opus' });
        });
    } catch (error) {
        m.reply(`🚫 ${mssg.error}`);
    }
}

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'musica', 'song'];

export default handler;
