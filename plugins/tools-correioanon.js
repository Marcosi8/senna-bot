// Este plugin permite enviar mensagens anônimas a outros números usando o bot como intermediário
// O comando é /anonimo | <numero> | <mensagem>
// O número deve estar no formato internacional, por exemplo: +5511999999999
// A mensagem deve ter no máximo 90 caracteres
// O plugin verifica se o número é válido e se a mensagem não está vazia
// O plugin envia a mensagem para o número usando o bot e retorna uma confirmação para o usuário

let handler = async (m, { text, conn }) => {
  // Extrai o número e a mensagem do texto
  // Usa o caractere | como separador
  let [number, message] = text.split('|').map(v => v.trim())
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
}

handler.help = ['anonimo']
handler.tags = ['fun']
handler.command = ['anonimo']
handler.group = true

export default handler
