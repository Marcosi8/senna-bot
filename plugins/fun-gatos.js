function handler(m, { conn, groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.jid);
  let lindos = [];
  while (lindos.length < 3) {
    let p = ps[Math.floor(Math.random() * ps.length)];
    if (!lindos.includes(p)) {
      lindos.push(p);
    }
  }
  let mentions = lindos.map(p => ({ "tag": `@${p.split("@")[0]}`, "id": p }));
  let message = `
    Marque os três mais lindos do grupo! ❤️
  `;
  mentions.forEach((mention, index) => {
    let beleza = (Math.random() * 100).toFixed(2);
    message += `\n${mention.tag} - ${beleza}%`;
  });
  
  // Corrige o uso de `conn.reply` para resposta à mensagem recebida.
  conn.reply(m, message, null, { mentions });
}

handler.help = ['toplindo'];
handler.tags = ['fun'];
handler.command = ['toplindo'];
handler.group = true;

export default handler;
