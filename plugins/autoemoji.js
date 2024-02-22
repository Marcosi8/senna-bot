export function handler(m, { conn, args }) {
  if (args[0] === 'on') {
    conn.autoreactEnabled = true;
    conn.reply(m.chat, 'Auto-reaction ativado!', m);
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

export function pickRandomEmoticon() { 
  const emoticons = ["😺", "🪨", "🚀", "🏂", "😼", "🐀", "🙀", "🚦", "🥳", "🇧🇷", "😏", "😳", "🥵", "🤯", "😱", "😨", "🤫", "🥴", "🇧🇷", "🤑", "🤠", "🤖", "🤝", "💪", "👑", "😚", "👨‍💻", "🐈", "🐆", "🐅", "⚡️", "🌈", "☃️", "🍦", "🌝", "🌛", "🌜", "🍓", "🍎", "🎈", "🪄", "❤️", "👨‍💻", "🚪", "💉", "🥸", "🔌", "💡", "🕴", "🥇", "📂", "🍕", "👰", "😎", "🔥", "🖕", "🫂"];
  return emoticons[Math.floor(Math.random() * emoticons.length)];
}
