
let handler = async function (m, { conn, text, usedPrefix }) {
  
let m2 = `
> Lista de comandos

>*ADMIN*

captcha
welcome
antilink (com kick user)
antilink2 (sem kick user)
detect 
document
nsfw
autosticker
└───────────── 
>*USERS*

autolevelup
chatbot 
└─────────────
>*OWNER*
public
sopv
sogp
└─────────────
*📌 Exemplo:*
*${usedPrefix}on* welcome
*${usedPrefix}off* welcome
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
handler.command = ['menu2', 'setmenu'] 

export default handler
