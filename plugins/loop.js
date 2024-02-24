const handler = async ({ conn, args }) => {
    if (!args || args.length === 0) {
        console.error('ID do chat não fornecido.')
        return
    }
    const chatId = args[0] + '@s.whatsapp.net' // Obtendo o ID do chat a partir dos argumentos
    typingLoop(conn, chatId).catch(err => console.error(err)) // Adicionando tratamento de erro
}
