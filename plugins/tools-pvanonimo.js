let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Criado por: https://github.com/Marcosi8
    if (!text || !text.includes('|')) {
        throw `❗️ *Por favor, use o comando corretamente.* \n\n*Formato:* \n*> ${usedPrefix + command} numero|mensagem*\n\n*Exemplo:* \n*> ${usedPrefix + command} 999999999999|Esta é uma mensagem anônima.*`
    }

    m.react('📬'); // Adicionando reação
    
    let time = global.db.data.users[m.sender].lastrob + 720000; // 12 minutos em milissegundos, ajuste como quiser.
    if (new Date - global.db.data.users[m.sender].lastrob < 720000) {
        throw `⏱️ *ESPERE* ${msToTime(time - new Date())}\n*NÃO USE ESTE COMANDO COMO SPAMMER, 1 USO POR VEZ.*`;
    }
    
    let [nomor, pesan] = text.split('|');
    
    m.reply('📤 Enviando seu correio anônimo...'); // Mensagem de aviso

    let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
    
    await conn.sendMessage(fixedNumber, {
        text: `📮 𝗖𝗢𝗥𝗥𝗘𝗜𝗢 𝗔𝗡Ô𝗡𝗜𝗠𝗢 📮\n\n> ${pesan.trim()}\n\n📩 𝙑𝙤𝙘ê 𝙧𝙚𝙘𝙚𝙗𝙚𝙪 𝙪𝙢𝙖 𝙢𝙚𝙣𝙨𝙖𝙜𝙚𝙢 𝙖𝙣ô𝙣𝙞𝙢𝙖 𝙙𝙚 𝙤𝙪𝙩𝙧𝙤 𝙪𝙨𝙪á𝙧𝙞𝙤. 𝙀𝙨𝙩𝙖 𝙢𝙚𝙣𝙨𝙖𝙜𝙚𝙢 𝙣ã𝙤 𝙛𝙤𝙞 𝙚𝙣𝙫𝙞𝙖𝙙𝙖 𝙥𝙚𝙡𝙤 𝙗𝙤𝙩.`,
        quoted: m // Quote com a mensagem original
    });
    
    await delay(5000);
    m.reply(`📥 *Correio enviada com sucesso para* ${nomor}!`); // Confirmação de envio
    
    global.db.data.users[m.sender].lastrob = new Date * 1;
}

handler.help = ['correio']
handler.tags = ['prime', 'chat']
handler.command = ['pvanonimo', 'correio', 'correioanonimo'] 
export default handler;

const delay = time => new Promise(res => setTimeout(res, time))
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return hours + " Hora(s) " + minutes + " Minuto(s)"
             }
