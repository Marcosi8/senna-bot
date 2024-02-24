const linkRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    const isLink = linkRegex.test(m.text);

    if (m.text.startsWith('antilink2') && isAdmin) {
        chat.antiLink2 = !chat.antiLink2;
        conn.reply(m.chat, `Anti-link 2 agora está ${chat.antiLink2 ? 'ativado' : 'desativado'}.`, m)
        return !0;
    }

    if (chat.antiLink2 && isLink && !isAdmin) {
        await conn.sendMessage(m.chat, { delete: m.key });
        return !1;
    }

    return !0;
}
