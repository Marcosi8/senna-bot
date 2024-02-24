const typingLoop = async (conn, chatId) => {
    while (true) {
        await conn.updatePresence(chatId, Presence.composing)
        await new Promise(resolve => setTimeout(resolve, 5000)) // Aguarda 5 segundos antes de enviar novamente
    }
}

const handler = async ({ conn, args }) => {
    const chatId = args[0] + '@s.whatsapp.net' // Obtendo o ID do chat a partir dos argumentos
    typingLoop(conn, chatId).catch(err => console.error(err)) // Adicionando tratamento de erro
}

handler.help = ['typingloop <chatId>']
handler.tags = ['tools']
handler.command = ['typingloop']

export default handler
