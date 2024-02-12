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
  if (!number || !/^\+?\d{10,15}$/.test(number)) throw 'Número inválido'
  // Verifica se a mensagem não está vazia
  if (!message) throw 'Mensagem vazia'
  // Verifica se a mensagem não é muito longa
  if (message.length > 90) throw 'Mensagem muito longa'
  // Adiciona um aviso ao início da mensagem
  // Informa que a mensagem é um correio anônimo
  message = '[AVISO: Esta é uma mensagem de correio anônimo. O remetente não é o número do bot, mas outro usuário que usou o comando /anonimo.]\n\n' + message
  // Cria um objeto com as opções da mensagem, usando a função generateWAMessageContent
  // Essa função recebe o texto da mensagem e um objeto com as opções adicionais
  // Você pode ver mais detalhes sobre essa função neste artigo: [1](https://stackoverflow.com/questions/23673184/uncaught-typeerror-cannot-use-in-operator-to-search-for-in-json-string)
  let messageOptions = generateWAMessageContent(message, {quoted: null, contextInfo: {}})
  // Envia a mensagem para o número usando o bot
  // Passa o objeto com as opções da mensagem como o terceiro argumento, e não uma string
  await conn.sendMessage(number, messageOptions, {})
  // Retorna uma confirmação para o usuário
  m.reply('Mensagem enviada com sucesso!')
}

handler.help = ['anonimo']
handler.tags = ['fun']
handler.command = ['anonimo']
handler.group = true

export default handler
