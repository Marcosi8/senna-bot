let typingLoop = async (conn) => {
    while (true) {
        await conn.chatUpdate(conn.user.jid, 'typing')
        await new Promise(resolve => setTimeout(resolve, 5000)) // Aguarda 5 segundos antes de enviar novamente
    }
}

const handler = async ({ conn }) => {
    typingLoop(conn)
}

handler.help = ['typingloop']
handler.tags = ['prime']
handler.command = ['typingloop']

export default handler
