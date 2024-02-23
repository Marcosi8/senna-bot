export function handler(m, { conn, args }) {
  if (args[0] === 'on') {
    conn.autoreactEnabled = true;
    conn.reply(m.chat, 'Auto-reaction ativado!', m);
    autoReact(m, conn); // Chama a função para reação automática
  } else if (args[0] === 'off') {
    conn.autoreactEnabled = false;
    conn.reply(m.chat, 'Auto-reaction desativado!', m);
  } else {
    conn.reply(m.chat, 'Use *autoreact on* ou *autoreact off*.', m);
  }
}

handler.help = ['autoreact on/off'];
handler.tags = ['prime'];
handler.command = /^(autoreact)$/i;
handler.group = true;
export default handler;

export function pickRandomEmoticon() { 
  const emoticons = ["😺", "🪨", "🚀", "🏂", "😼", "🐀", "🙀", "🚦", "🥳", "🇧🇷", "😏", "😳", "🥵", "🤯", "😱", "😨", "🤫", "🥴", "🇧🇷", "🤑", "🤠", "🤖", "🤝", "💪", "👑", "😚", "👨‍💻", "🐈", "🐆", "🐅", "⚡️", "🌈", "☃️", "🍦", "🌝", "🌛", "🌜", "🍓", "🍎", "🎈", "🪄", "❤️", "👨‍💻", "🚪", "💉", "🥸", "🔌", "💡", "🕴", "🥇", "📂", "🍕", "👰", "😎", "🔥", "🖕", "🫂"];
  return emoticons[Math.floor(Math.random() * emoticons.length)];
}

function autoReact(m, conn) {
  if (!conn.autoreactEnabled) return; // Verifica se a reação automática está ativada
  const emoticon = pickRandomEmoticon(); // Seleciona um emoji aleatório
  conn.sendMessage(m.chat, { text: emoticon, contextInfo: { mentionedJid: [m.sender] } }); // Envia a reação
}
