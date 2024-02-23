let handler = async (message, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return message.reply(`Por favor, inclua uma mensagem para enviar aos administradores do grupo.`)
  const pp = groupMetadata?.profilePicThumbObj?.eurl || './src/admins.jpg'
  const groupAdmins = participants.filter(p => p.isAdmin)
  const listAdmins = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.jid.split('@')[0]}*`).join('\n')
  const owner = groupMetadata.owner || groupAdmins.find(p => p.isAdmin === 'superadmin') || message.chat.split`-`[0] + '@s.whatsapp.net'
  let pesan = args.join` `
  let formattedMessage = `*Denúncia ou Aviso aos Administradores do Grupo* 🚨\n\n${pesan}\n\n*Lista de Administradores:*\n${listAdmins}\n\n_Envie sua mensagem com confiança, os administradores estão aqui para ajudar!_ 🤝`
  
  try {
    await conn.sendFile(message.chat, pp, 'admins_message.jpg', Buffer.from(formattedMessage), message, false, { mentions: groupAdmins.map(v => v.jid) })
  } catch (error) {
    console.error(error)
    message.reply('Ops! Algo deu errado ao enviar a mensagem para os administradores do grupo.')
  }
}

handler.tags = ['admin'] // Tags para identificar o comando
handler.help = ['admins', '@admins', 'dmins'] // Comandos de ajuda

handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
