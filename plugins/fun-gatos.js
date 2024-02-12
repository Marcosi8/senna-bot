function handler(m, { conn, groupMetadata }) {
    let participants = groupMetadata.participants;
    let lindos = [];
    while (lindos.length < 3) {
        let randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        if (!lindos.includes(randomParticipant)) {
            lindos.push(randomParticipant);
        }
    }
    let mentions = lindos.map(p => ({ "tag": `@${p.split("@")[0]}`, "id": p }));
    conn.sendMessage(m.chat, `
        Marque os três mais lindos do grupo! ❤️\n${mentions.map(m => m.tag).join('\n')}
    `, null, { mentions });
}

handler.help = ['toplindos'];
handler.tags = ['fun'];
handler.command = ['toplindos'];
handler.group = true;

export default handler;
