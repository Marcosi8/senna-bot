const axios = import('axios');

let handler = async (m, { conn }) => {
    const options = {
        method: 'GET',
        url: 'https://memes-brasileiros1.p.rapidapi.com/dev/memes',
        headers: {
            'X-RapidAPI-Key': '14f5625a72mshd4beb354ebf1af4p1752a4jsn11e344cd9c9e',
            'X-RapidAPI-Host': 'memes-brasileiros1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const memeUrl = response.data.url;
        m.react("😂");
        await conn.sendFile(m.chat, memeUrl, '', '', m);
    } catch (error) {
        console.error(error);
        m.reply('Erro ao obter o meme.');
    }
};

handler.help = ['meme'];
handler.tags = ['prime'];
handler.command = ['meme', 'memes'];

module.exports = handler;