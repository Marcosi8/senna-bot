import axios from 'axios'; // Certifique-se de que você tenha instalado o pacote 'axios'

let handler = async (m, { conn }) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://memes-brasileiros1.p.rapidapi.com/dev/memes',
            headers: {
                'X-RapidAPI-Key': '14f5625a72mshd4beb354ebf1af4p1752a4jsn11e344cd9c9e',
                'X-RapidAPI-Host': 'memes-brasileiros1.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const memeUrl = response.data.url; // Obtém a URL do meme gerado

        // Envie o meme para o chat
        await conn.sendFile(m.chat, memeUrl, '', 'Meme gerado', m);
    } catch (error) {
        console.error(error);
        // Trate o erro conforme necessário
    }
};

handler.help = ['meme'];
handler.tags = ['img'];
handler.command = ['meme', 'memes'];

export default handler;
