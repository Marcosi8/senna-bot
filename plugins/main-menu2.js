
let handler = async function (m, { conn, text, usedPrefix }) {
  
let m2 = `
≡ Use estes comandos sem prefixo: *${usedPrefix}*
┌─⊷ *AUDIOS* 
▢ Bot 
▢ Fino señores
▢ Sad
▢ boa noite
▢ boa tarde
▢ bom dia
└──────────────
`
    let pp = './src/WhatsApp Video 2024-02-08 at 16.59.44.mp4' 
    /*conn.sendButton(m.chat, m2, mssg.ig, pp, [
      ['⏍ Info', `${usedPrefix}botinfo`],
      ['⌬ Grupos', `${usedPrefix}gpdylux`]
    ],m, rpyt)*/
    conn.sendFile(m.chat, pp, 'menu.jpg', m2, m, null, rpl)
   
}

handler.help = ['menu2']
handler.tags = ['main']
handler.command = ['menu2', 'audios'] 

export default handler
