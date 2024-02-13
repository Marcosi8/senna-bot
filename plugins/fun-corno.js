//POWERED BY MARCOSKZ

function handler(m, {conn, groupMetadata }) {
    let now = new Date();
    let lastUsed = global.db.data.users[m.sender].shipping || 0;
    let elapsedTime = now - lastUsed;

    if (elapsedTime < 300000) // 5 minutos em milissegundos
        throw `Você pode acionar a boiada novamente em *${msToTime(300000 - elapsedTime)}*`;

    let ps = groupMetadata.participants.map(v => v.id);
let f = ps.getRandom();
let h = ps.getRandom(); 
let k = ps.getRandom();
let i = ps.getRandom();
let v = ps.getRandom();
let g;

do {
    g = ps.getRandom();
} while (h === f || h === i || h === k || h === v || h === g || g === f || g === i || g === k || g === v);
// Agora você tem 6 pessoas (f, h, k, i, v, g) sem repetição
    m.reply(`
🐂🚨 *CHAMANDO TODOS OS CHiFRUDOS, REPITO, O BERRANTE FOI TOCADO* 🚨🐂

🥇 _*Boi Supremo*_ ${toM(f)}

🥈 _*Boi Master*_ ${toM(h)}

🥉 _*Bezerra*_ ${toM(g)}

🐂 ${toM(i)}

🐂 ${toM(v)}

🐂 ${toM(k)}
`, null, { mentions: [f, g] });

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
