function handler(m, {conn, groupMetadata }) {
    let now = new Date();
    let lastUsed = global.db.data.users[m.sender].shipping || 0;
    m.react('⚡️');
    let elapsedTime = now - lastUsed;

    if (elapsedTime < 1800000) // 30 minutos em milissegundos
        throw `🕴 Você pode usar novamente em *${msToTime(1800000 - elapsedTime)}*`;

    let ps = groupMetadata.participants.map(v => v.id);
    let f = ps.getRandom();
    let h = ps.getRandom();
    let g;

    do {
        g = ps.getRandom();
    } while (h === f || h === g);

    m.reply(`
▢ *❗️🚨 ATENÇÃO 🚨❗️ PARA OS MAIS LINDOS DO GRUPO!!👇*

🥇🏳️‍🌈 ${toM(f)}

🥈🫦 ${toM(h)}

🥉🧌 ${toM(g)}
`, null, { mentions: [f, g] });

    global.db.data.users[m.sender].shipping = now;
}

handler.help = ['toplindo'];
handler.tags = ['fun', 'prime'];
handler.command = ['toplindo'];
handler.group = true;

export default handler;

let toM = f => '@' + f.split('@')[0];

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ` ${mssg.hour} ` + minutes + ` ${mssg.minute}`;
}
