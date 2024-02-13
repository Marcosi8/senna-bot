//Powered by: marcoskz_

function handler(m, {conn, groupMetadata }) {
    let now = new Date();
    let lastUsed = global.db.data.users[m.sender].shipping || 0;
    let elapsedTime = now - lastUsed;

    if (elapsedTime < 1800000) // 30 minutos em milissegundos
        throw `🐮 Você pode tocar o berrante em *${msToTime(1800000 - elapsedTime)}*`;

    let ps = groupMetadata.participants.map(v => v.id);
    let f = ps.getRandom();
    let h = ps.getRandom();
    let g = ps.getRandom();
    let i = ps.getRandom();
    let j = ps.getRandom();
    let k = ps.getRandom();
    let l = ps.getRandom();
    let m = ps.getRandom();
    let n = ps.getRandom();
    let o = ps.getRandom();

    m.reply(`
 🐂🚨*CHAMANDO TODOS OS CORNOS, REPITO, O BERRANTE FOI TOCADO*🚨🐂

🥇 _*Boi Supremo*_ ${toM(f)}

🥈 _*Boi Master*_ ${toM(h)}

🥉 Bezerra ${toM(g)}

🐂 ${toM(i)}

🐂 ${toM(j)}

🐂 ${toM(k)}

🐂 ${toM(l)}

🐂 ${toM(m)}

🐂 ${toM(n)}

🐂 ${toM(o)}
`, null, { mentions: [f, g, i, j, k, l, m, n, o] });

    global.db.data.users[m.sender].shipping = now;
}

handler.help = ['topboi'];
handler.tags = ['fun', 'prime'];
handler.command = ['topboi'];
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
