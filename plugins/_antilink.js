const linkRegex = /https?:\/\/\S+/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0;
    if (!m.isGroup) return !1;
    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupLink = linkRegex.test(m.text); // Alterado para testar a presença de links
    const listAdmin = Object.keys(chat.admins || {}).map((v, i) => `${i + 1}. @${v.split('@')[0]}`).join('\n❗️'); // Corrigido para acessar chat.admins corretamente

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return !0;
        }
        const banMessage = `> *[❗️] LINK DETECTED 🔗*\n\n*We do not allow unknown links in our group*\n\nNão permitimos links desconhecidos em nosso grupo, @${m.sender.split('@')[0]}. O banimento é automático, contate um administrador se acha que foi um erro. ${isBotAdmin ? '' : '\n\n⚠️ Eu não sou um administrador, então eu não posso expulsá-lo. Chamada por administradores do grupo:\n\n${listAdmin}'}`;
        await conn.reply(m.chat, banMessage, null, { mentions: [m.sender] });
        if (isBotAdmin && chat.antiLink) {
            await conn.sendMessage(m.chat, { delete: m.key });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        } else if (!chat.antiLink) {
            return !0;
        }
    }
    return !0;
}
