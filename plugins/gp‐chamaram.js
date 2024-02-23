let handler = async (m, { conn, participants, groupMetadata, args }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n▢ ')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

    let text = `
    *Denúncia ou Aviso aos Administradores do Grupo* 🚨

    *Lista de Administradores:*
    ${listAdmin}

    _Envie sua mensagem com confiança, os administradores estão aqui para ajudar!_ 🤝
    `

    if (args.length > 0) {
        text += `\n\n*Mensagem Adicional:*\n${args.join(' ')}`
    } else {
        text += `\n\n*Nenhuma mensagem adicional fornecida.*\nPor favor, forneça uma mensagem para que os administradores possam ajudar.`
    }

    text = text.trim()

    conn.sendFile(m.chat, pp, 'staff.png', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['denunciar]
handler.tags = ['group']
handler.command = ['staff', 'admins', 'denunciar, 'adm'] 
handler.group = true
export default handler
