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
    conn.sendMessage(m.chat, message, null, { mentions });
}

handler.help = ['marcarlindos'];
handler.tags = ['fun'];
handler.command = ['marcarlindos'];
handler.group = true;

export default handler;
