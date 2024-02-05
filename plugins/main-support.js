 
let handler = async (m, { conn }) => {

m.reply(`
≡  *${botName}ᴮᴼᵀ ┃ SUPORTE*

◈ ━━━━━━━━━━━━━━━━━━━━ ◈
▢ Canal
${fgcanal}

▢ Grupo *1*
${bgp}

▢ Grupo *2*
${bgp2}

▢ Grupo *NSFW* 🔞
${bgp3}

▢ 𝐌𝐘 - 𝐌𝐚𝐲𝐥𝐮𝐱 | ᴮᴼᵀ⚡
https://chat.whatsapp.com/G7MP2jGbrq4Anl4ag81DtD

◈ ━━━━━━━━━━━━━━━━━━━━ ◈
▢ *Mais informações*
 https://wa.me/558881647724

▢ *Telegram*
• https://t.me/fgawgp
 ▢ *PayPal*
• https://www.paypal.com/donate/?business=WUDZNJ573PAF6&no_recurring=0&item_name=Help+this+project+stay+active%21+%3A%29&currency_code=BRL
▢ *YouTube*
• https://www.youtube.com`)

}
handler.help = ['support']
handler.tags = ['main']
handler.command = ['grupos', 'groups', 'support'] 

export default handler
