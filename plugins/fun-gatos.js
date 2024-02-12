function handler(m, { conn, groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.jid);
    let lindos = [];
    while (lindos.length < 3) {
        let p = ps[Math.floor(Math.random() * ps.length)];
        if (!lindos.includes(p)) {
            lindos.push(p);
        }
    }
    let mentions = lindos.map(p => ({ "tag": toM(p), "id": p }));
    m.reply(`
        Marque os três mais lindos do grupo! ❤️
        ${mentions.map(m => m.tag).join('\n')}
    `, null, { mentions });
}

handler.help = ['toplindos'];
handler.tags = ['fun', 'prime'];
handler.command = ['toplindos', 'maislindos'];
handler.group = true;

export default handler;

function toM(f) {
    return '@' + f.split('@')[0];
}
