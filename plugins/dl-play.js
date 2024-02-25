import fetch from "node-fetch";
import ytdl from 'youtubedl-core';
import fg from 'api-dylux';
import yts from 'youtube-yts';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
}) => {
    if (!text) throw `🤔 *Diga o nome da música.*\n🎵 Exemplo: ${usedPrefix + command} Mr blue sky`;
    conn.GURUPLAY = conn.GURUPLAY ? conn.GURUPLAY : {};

    let isLimit = limit * 1024 < sizeB; // Definindo a variável isLimit

    // Animacao de loading
    const loadingAnimation = ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"];
    let loadingMsgIndex = 0;
    const loadingInterval = setInterval(() => {
        conn.modify(m.chat, {
            text: `Carregando... ${loadingAnimation[loadingMsgIndex++ % loadingAnimation.length]}`
        });
    }, 500); // Altere o intervalo conforme necessário

    await conn.reply(m.chat, wait, m);

    const result = await searchAndDownloadMusic(text);
    clearInterval(loadingInterval); // Limpar o intervalo quando a pesquisa e o download estiverem concluídos

    if (!result.allLinks || !result.allLinks.length) {
        return await conn.reply(m.chat, "Desculpe, nenhum resultado de vídeo encontrado para esta pesquisa.", m);
    }

    const selectedUrl = result.allLinks[0].url;
    const thumbnail = result.thumbnail;
    const title = result.title;
    const author = result.author;
    const uploadedAt = result.uploadedAt;
    const views = result.views;

    const doc = {
        text: `> *YT MUSIC*
┌──────────────
📀 ${title}

👤 *Autor:* ${author}
📆 *Upload:* ${uploadedAt}
♻️ *Visualizações:* ${views}
┢━━━━━━━━━━━━
🔗 ${selectedUrl}
└──────────────
_Powered by marcoskz_`,
        thumbnail,
    };

    await conn.sendMessage(m.chat, doc, {
        quoted: m
    });

    let fileName = generateRandomName();
    const audioStream = ytdl(selectedUrl, {
        filter: 'audioonly',
        quality: 'highestaudio',
    });

    const tmpDir = os.tmpdir();
    const writableStream = fs.createWriteStream(`${tmpDir}/${fileName}.mp3`);
    await streamPipeline(audioStream, writableStream);

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
};

handler.help = ["play"];
handler.tags = ["prime"];
handler.command = ['musica', 'song2', 'música', 'play', 'som'];
handler.limit = false;
export default handler;

// Funções auxiliares abaixo...

async function searchAndDownloadMusic(query) {
    try {
        const { videos } = await yts(query);
        if (!videos.length) return "Desculpe, nenhum resultado de vídeo encontrado para esta pesquisa.";

        const allLinks = videos.map(video => ({
            title: video.title,
            url: video.url,
        }));

        const jsonData = {
            title: videos[0].title,
            description: videos[0].description,
            duration: videos[0].duration,
            author: videos[0].author.name,
            allLinks: allLinks,
            videoUrl: videos[0].url,
            thumbnail: videos[0].thumbnail,
            uploadedAt: videos[0].uploadedAt, // Adicionando a data de upload
            views: videos[0].views // Adicionando o número de visualizações
        };

        return jsonData;
    } catch (error) {
        return "Erro: " + error.message;
    }
}

function generateRandomName() {
    const adjectives = ["happy", "sad", "funny", "brave", "clever", "kind", "silly", "wise", "gentle", "bold"];
    const nouns = ["cat", "dog", "bird", "tree", "river", "mountain", "sun", "moon", "star", "cloud"];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return randomAdjective + "-" + randomNoun;
            }
