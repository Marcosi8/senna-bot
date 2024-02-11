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
        return await conn.reply(m.chat, "Desculpe, nenhum resultado de vídeo foi encontrado para esta pesquisa.", m);
    }

    const selectedUrl = result.allLinks[0].url; // Seleciona o URL do primeiro resultado
    const thumbnail = result.thumbnail; // Salva a thumbnail do primeiro resultado
    const title = result.title; // Salva o título do primeiro resultado
    const author = result.author; // Salva o autor do primeiro resultado
    const uploadedAt = result.uploadedAt; // Salva a data de upload do primeiro resultado
    const views = result.views; // Salva o número de visualizações do primeiro resultado

    const doc = {
        text: `*${title}*\n${selectedUrl}\n\n_Uploaded by: ${author}_\n_Uploaded at: ${uploadedAt}_\n_Views: ${views}_\n\n⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️`, // Mensagem com as informações e animação de download
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
        quoted: m,
        thumbnail: fs.readFileSync('./download.gif'), // Adiciona uma animação de download
    });
};

handler.help = ["música"];
handler.tags = ["prime"];
handler.command = ['musica', 'música', 'song', 'som'];
handler.limit = false;
export default handler;

// Funções auxiliares abaixo...
