import ytdl from 'youtubedl-core';
import yts from 'yt-search';
import fs from 'fs';
import { promisify } from 'util';
import os from 'os';

const handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `🤔 Você quer ouvir que música? Exemplo: ${usedPrefix + command} don't stop me now, queen`;

    await conn.reply(m.chat, '🎵 Aguarde enquanto procuro e preparo sua música...', m);

    let res = await yts(text);
    let vid = res.videos[0];

    if (!vid) throw `🚫 Vídeo/Audio não encontrado`;

    await conn.sendFile(m.chat, vid.thumbnail, 'play', `
> *YT MUSIC*
┌──────────────
▢ 🎧 *Título:* ${vid.title}
▢ 📆 *Upload:* ${vid.ago}
▢ ⏱️ *Duração:* ${vid.timestamp}
▢ ♻️ *Visualizações:* ${vid.views.toLocaleString()}
└──────────────

_Enviando..._
`, m);

    try {
        let fileName = generateRandomName();
        const audioStream = ytdl(vid.url, {
            filter: 'audioonly',
            quality: 'highestaudio',
        });

        const tmpDir = os.tmpdir();
        const writableStream = fs.createWriteStream(`${tmpDir}/${fileName}.mp3`);
        await promisify(streamPipeline)(audioStream, writableStream);

        const audioDoc = {
            audio: {
                url: `${tmpDir}/${fileName}.mp3`
            },
            mimetype: 'audio/mpeg',
            ptt: false,
            waveform: [100, 0, 0, 0, 0, 0, 100],
            fileName: `${fileName}`,
        };

        await conn.sendMessage(m.chat, audioDoc, {
            quoted: m
        });
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, "Ocorreu um erro ao processar a música.", m);
    }
};

handler.help = ["play"];
handler.tags = ["prime", "dl"];
handler.command = ["play", "song2", "mp3", "playmp3"];
export default handler;

// Funções auxiliares abaixo...

function generateRandomName() {
    const adjectives = ["happy", "sad", "funny", "brave", "clever", "kind", "silly", "wise", "gentle", "bold"];
    const nouns = ["cat", "dog", "bird", "tree", "river", "mountain", "sun", "moon", "star", "cloud"];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return randomAdjective + "-" + randomNoun;
}
