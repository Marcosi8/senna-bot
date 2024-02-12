function handler(m, { conn, groupMetadata }) {
    let ps = groupMetadata.participants.map(v => v.jid);
    let lindos = [];
    for (let i = 0; i < 3; i++) {
        let p;
        do {
            p = ps[Math.floor(Math.random() * ps.length)];
        } while (lindos.includes(p));
        lindos.push(p);
    }
    let mentions = lindos.map(p => ({ "tag": toM(p), "id": p }));
    m.reply(`
        Marque os mais lindos do grupo! ❤️
        ${mentions.map(m => m.tag).join('\n')}
    `, null, { mentions });
}

handler.help = ['topgatos'];
handler.tags = ['fun', 'prime'];
handler.command = ['topgatos'];
handler.group = true;

export default handler;

function toM(f) {
    return '@' + f.split('@')[0];
}
