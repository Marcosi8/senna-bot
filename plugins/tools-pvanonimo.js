kasync function handler(m, { command, args }) {
    command = command.toLowerCase()
    switch (command) {
        case 'pvanonimo': {
            // Verifica se foram fornecidos argumentos corretos
            if (!args || args.length < 2) return reply(`Exemplo: ${prefixo + command} +55 00.../Oi amor, sdds`)

            // Extrai o número e a mensagem do argumento
            let txt1 = args[0].replace(/\D/g,'');
            let txt2 = args.slice(1).join(' ');

            // Verifica se o número e a mensagem foram fornecidos
            if (!txt1) return reply('Cadê o número da pessoa?')
            if (!txt2) return reply('Cadê a mensagem do correio??')

            // Chama a função para enviar a mensagem
            let [result] = await Ay.onWhatsApp(txt1)
            if (!result) return reply(`Número inválido`)

            // Monta a mensagem a ser enviada
            let bla = `┞┧Msg: ${txt2}`

            // Envia a mensagem
            Ay.sendMessage(result.jid, { text: bla })

            // Retorna a confirmação de envio
            reply(`Mensagem enviada com sucesso para wa.me/${result.jid.split("@")[0]}`)
            break;
        }
    }
}
handler.command = ['pvanonimo']
handler.tags = ['prime']
handler.help = ['pvanonimo']
handler.limit = false
module.exports = handler