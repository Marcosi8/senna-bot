let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'abrir': 'not_announcement',
        'fechar': 'announcement',
    }[(args[0] || '')]
    if (isClose === undefined)

    return m.reply(`
🛡️ ${mssg.gpSetting}

*${usedPrefix + command} fechar*
*${usedPrefix + command} abrir*
*${usedPrefix + command} close*
*${usedPrefix + command} open*
`)
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['abrir/fechar']
handler.tags = ['group']
handler.command = ['group', 'abrir', 'grupo', 'fechar', 'open', 'close'] 
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
