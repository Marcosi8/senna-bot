
const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

export async function before(m, {conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n❗️')

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }
        await conn.reply(m.chat, `> *[❗️] LINK DETECTED 🔗*
            
*We do not allow unknown links in our group*\nNão permitimos links desconhecidos em nosso grupo. @${m.sender.split('@')[0]}. O banimento é automático, contate um administrador se acha que foi um erro. ${isBotAdmin ? '' : '\n\nEu não sou um administrador, então eu não posso expulsá-lo.'\n'${listAdmin}'}`, null, { mentions: [m.sender] } )
        if (isBotAdmin && chat.antiLink) {
        	await conn.sendMessage(m.chat, { delete: m.key })
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!chat.antiLink) return //m.reply('')
    }
    return !0
}
