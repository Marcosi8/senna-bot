let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'abrir': 'not_announcement',
        'fechar': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)

    return m.reply(`
🛡️ ${mssg.gpSetting}

*▢ ${usedPrefix + command} fechar*
*▢ ${usedPrefix + command} abrir*
`)
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['grupo']
handler.tags = ['group']
handler.command = ['group', 'grupo'] 
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
