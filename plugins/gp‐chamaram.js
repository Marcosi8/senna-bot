let handler = async (message, { conn, participants, groupMetadata, args, usedPrefix, text, command }) => {
  if (!text) return message.reply(`Por favor, inclua uma mensagem para enviar para todos os moderadores do grupo.`)
  const pp = groupMetadata?.profilePicThumbObj?.eurl || './src/avatar_contact.png'
  const groupModerators = participants.filter(p => p.isAdmin)
  const listModerators = groupModerators.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
  const owner = groupMetadata.owner || groupModerators.find(p => p.isAdmin === 'superadmin')?.id || message.chat.split`-`[0] + '@s.whatsapp.net'
  let pesan = args.join` `
  let formattedMessage = `*Mensagem do Bot:*\n${pesan}`
  let moderatorListMessage = `*Lista de Moderadores:*\n${listModerators}`
  
  try {
    await conn.sendFile(message.chat, pp, 'moderators_message.jpg', Buffer.from(formattedMessage + '\n\n' + moderatorListMessage), message, false, { mentions: [...groupModerators.map(v => v.id), owner] })
  } catch (error) {
    console.error(error)
    message.reply('Ocorreu um erro ao enviar a mensagem para os moderadores do grupo.')
  }
}

handler.tags = ['prime'] // Tags para identificar o comando
handler.help = ['moderadores', '@moderadores', 'mods'] // Comandos de ajuda

handler.command = /^(moderadores|@moderadores|mods)$/i
handler.group = true
export default handler
