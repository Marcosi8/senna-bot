async function handler(m, { conn, usedPrefix, text, command }) {
  console.log('1');
  let waLin = '';
  console.log('2');
  if (text) {
    console.log('3');
    waLin = text.replace(/[^0-9]/g, '');
    console.log('4');
  } else if (m.quoted && m.quoted.sender) {
    console.log('5');
    waLin = m.quoted.sender.replace(/[^0-9]/g, '');
    console.log('6');
  } else if (m.mentionedJid && m.mentionedJid[0]) {
    console.log('7');
    waLin = m.mentionedJid[0].replace(/[^0-9]/g, '');
    console.log('8');
  } else {
    console.log('9');
    throw `❗️ *Digite um número, marque um usuário ou mencione um usuário*`;
    console.log('10');
  }
  const waLink = `https://wa.me/${waLin}`;
  console.log('11');
  const message = `*WhatsApp Link:* ${waLink}\n*Número de telefone:* ${waLin}`; // Concatenando o link e o número de telefone
  console.log('12');

  conn.sendMessage(m.chat, { text: message, quoted: m, contextInfo: { mentionedJid: [m.sender] } });
  console.log('13');

  m.react('🗃');
  console.log('14');
}

const help = ['wa'];
const tags = ['tools', 'prime'];
const command = ['wa'];

export { handler, help, tags, command };
