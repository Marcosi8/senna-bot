
import cheerio from 'cheerio';
import fetch from 'node-fetch';
let handler = async (m, { conn, text }) => {
	
if (!text) throw `🤖 ${mssg.notext}`;
m.react('💬')

	try {
		let gpt = await fetch(global.API('fgmods', '/api/info/openai2', { text }, 'apikey'));
        let res = await gpt.json()
        await m.reply(res.result)
	} catch {
		m.reply(`🚫 Error: Falha na API, tente novamente`);
	}

}
handler.help = ['chatgpt2 <text>']; 
handler.tags = ['tools'];
handler.command = ['ia', 'ai2', 'chatgpt2', 'openai', 'gpt2'];

export default handler;
