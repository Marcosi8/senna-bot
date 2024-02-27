import moment from 'moment-timezone'

let handler = async (m, { conn }) => {  
const fechabra = moment().tz('America/Sao_Paulo').format('DD/MM HH:mm')
const fechaperu = moment().tz('America/Lima').format('DD/MM HH:mm');
const fechamexico = moment().tz('America/Mexico_City').format('DD/MM HH:mm');
const fechabolivia = moment().tz('America/La_Paz').format('DD/MM HH:mm');
const fechachile = moment().tz('Chile/Continental').format('DD/MM HH:mm');
const fechacosta = moment().tz('America/Costa_Rica').format('DD/MM HH:mm');
const fechapuerto = moment().tz('America/Puerto_Rico').format('DD/MM HH:mm');
const fechahaiti = moment().tz('America/Port-au-Prince').format('DD/MM HH:mm');
const fechaparaguai = moment().tz('America/Asuncion').format('DD/MM HH:mm');
const fechauruguai = moment().tz('America/Montevideo').format('DD/MM HH:mm');
const fechavenezuela = moment().tz('America/Caracas').format('DD/MM HH:mm');
const fechapar = moment().tz('Pacific/Port_Moresby').format('DD/MM HH:mm');
const fechabang = moment().tz('Asia/Bangkok').format('DD/MM HH:mm');
const fechahong = moment().tz('Asia/Hong_Kong').format('DD/MM HH:mm');
const fechasing = moment().tz('Asia/Singapore').format('DD/MM HH:mm');
const fechajak = moment().tz('Asia/Jakarta').format('DD/MM HH:mm');
const fechachina = moment().tz('Asia/Shanghai').format('DD/MM HH:mm');
const fechaindia = moment().tz('Asia/Kolkata').format('DD/MM HH:mm');
const fecharabia = moment().tz('Asia/Riyadh').format('DD/MM HH:mm');
const fechaturquia = moment().tz('Europe/Istanbul').format('DD/MM HH:mm');
const fechagr = moment().tz('Europe/Berlin').format('DD/MM HH:mm');
const fechareino = moment().tz('Europe/London').format('DD/MM HH:mm');
const fechajapao = moment().tz('Asia/Tokyo').format('DD/MM HH:mm');
const fechaaus = moment().tz('Australia/Sydney').format('DD/MM HH:mm');
const fechanz = moment().tz('Pacific/Auckland').format('DD/MM HH:mm');

await conn.sendMessage(m.chat, { text: `\`\`\`
「 Fuso-Horário 🗺️ 」
⏱️Brasil: ${fechabra}
⏱️Peru: ${fechaperu}
⏱️México: ${fechamexico}
⏱️Bolívia : ${fechabolivia}
⏱️Chile: ${fechachile}
⏱️Costa Rica: ${fechacosta}
⏱️Porto Rico: ${fechapuerto}
⏱️Haiti: ${fechahaiti}
⏱️Paraguai: ${fechaparaguai}
⏱️Uruguai: ${fechauruguai}
⏱️Venezuela: ${fechavenezuela}
⏱️Papua Nova Guiné : ${fechapar}
⏱️Tailândia: ${fechabang}
⏱️Hong Kong: ${fechahong}
⏱️Singapura: ${fechasing}
⏱️Indonésia: ${fechajak}
⏱️China: ${fechachina}
⏱️Índia: ${fechaindia}
⏱️Arábia Saudita: ${fecharabia}
⏱️Turquia: ${fechaturquia}
⏱️Alemanha: ${fechagr}
⏱️Reino Unido: ${fechareino}
⏱️Japão: ${fechajapao}
⏱️Austrália: ${fechaaus}
⏱️Nova Zelândia: ${fechanz}
\`\`\`
${String.fromCharCode(8206).repeat(850)}
💻 *Horario do servidor*\n*[ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ]*\n*${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')}*` }, {quoted: m })
}

handler.help = ['horario']
handler.tags = ['info', 'prime']
handler.command = ['hora', 'horario', 'time']

export default handler
