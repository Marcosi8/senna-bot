let handler = async (m, { text, conn }) => {
  // Extrai o número e a mensagem do texto
  // Usa o caractere | como separador
  let { 0: number, 1: message } = (text ?? '').split('|').map(v => v.trim())

  try {
    // Verifica se o número é válido
    if (!number || !/^\+?\d{10,15}$/.test(number)) throw `Número inválido`
    // Verifica se a mensagem não está vazia
    if (!message) throw `Mensagem vazia`
    // Verifica se a mensagem não é muito longa
    if (message.length > 90) throw `Mensagem muito longa`
    // Adiciona um aviso ao início da mensagem
    // Informa que a mensagem é um correio anônimo
    message = `[AVISO: Esta é uma mensagem de correio anônimo. O remetente não é o número do bot, mas outro usuário que usou o plugin anonimo.]\n\n` + message
    // Envia a mensagem para o número usando o bot
    await conn.sendMessage(number, message, 'conversation')
    // Retorna uma confirmação para o usuário
    m.reply(`Mensagem enviada com sucesso`)
  } catch (error) {
    // Trata o erro
    m.reply(`Erro ao enviar a mensagem: ${error.message}`)
  }
}

handler.help = ['anonimo']
handler.tags = ['fun']
handler.command = ['anonimo']
handler.group = true

export default handler
