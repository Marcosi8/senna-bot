import fetch from "node-fetch";
import ytdl from 'youtubedl-core';
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
    if (!text) throw `*_🤔 diga o nome da música_* \n*_Exemplo: ${usedPrefix + command} To Serve Russia_*`;
    conn.GURUPLAY = conn.GURUPLAY ? conn.GURUPLAY : {};
    await conn.reply(m.chat, wait, m);
    const result = await searchAndDownloadMusic(text);
    if (!result.allLinks || !result.allLinks.length) {
        return await conn.reply(m.chat, "Sorry, no video results were found for this search.", m);
    }

    const selectedUrl = result.allLinks[0].url; // Seleciona o URL do primeiro resultado
    const thumbnail = result.thumbnail; // Salva a thumbnail do primeiro resultado
    const title = result.title; // Salva o título do primeiro resultado

    const doc = {
        text: `*${title}*\n${selectedUrl}`, // Mensagem com o título e o link
        thumbnail, // Thumbnail do vídeo
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

handler.help = ["música"];
handler.tags = ["prime"];
handler.command = ['musica', 'música', 'song', 'som'];
handler.limit = false;
export default handler;

// Funções auxiliares abaixo...

async function searchAndDownloadMusic(query) {
    try {
        const { videos } = await yts(query);
        if (!videos.length) return "Sorry, no video results were found for this search.";

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
        };

        return jsonData;
    } catch (error) {
        return "Error: " + error.message;
    }
}


function generateRandomName() {
    const adjectives = ["happy", "sad", "funny", "brave", "clever", "kind", "silly", "wise", "gentle", "bold"];
    const nouns = ["cat", "dog", "bird", "tree", "river", "mountain", "sun", "moon", "star", "cloud"];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return randomAdjective + "-" + randomNoun;
}
