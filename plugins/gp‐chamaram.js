let handler = async (message, { conn, participants, groupMetadata, args }) => {
  const pp = groupMetadata?.profilePicThumbObj?.eurl || './src/avatar_contact.png'
  const groupAdmins = participants.filter(p => p.isAdmin)
  const listAdmins = groupAdmins.map((v, i) => `${i + 1}. @${v.jid.split('@')[0]}`).join('\n▢ ')
  const owner = groupMetadata.owner || groupAdmins.find(p => p.isAdmin === 'superadmin') || message.chat.split`-`[0] + '@s.whatsapp.net'
  
  let messageText = `*Administradores do Grupo:*\n${listAdmins}`
  
  try {
    await conn.sendFile(message.chat, pp, 'admins_message.jpg', Buffer.from(messageText), message, false, { mentions: groupAdmins.map(v => v.jid) })
  } catch (error) {
    console.error(error)
    message.reply('Ocorreu um erro ao chamar os administradores do grupo.')
  }
}

handler.tags = ['prime'] // Tags para identificar o comando
handler.help = ['admins', '@admins', 'dmins'] // Comandos de ajuda

handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler
