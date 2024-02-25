let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text
    m.reply(`✅ ${text} definido como mensagem de saída`)
  } else throw `🏷 ${mssg.leaMsg}`
}
handler.help = ['setbye <texto>']
handler.tags = ['group']
handler.command = ['setbye', 'setdespedida'] 
handler.admin = true
handler.owner = true

export default handler
