let handler = async (m, { text, conn }) => {
  // Extrai o número e a mensagem do texto
  // Usa o caractere | como separador
  let { 0: number, 1: message } = (text ?? '').split('|').map(v => v.trim());

  try {
    // Valida o número
    if (!number || !/^\+?\d{10,15}$/.test(number)) throw 'Número inválido';
    // Valida a mensagem
    if (!message) throw 'Mensagem vazia';
    // Limita o tamanho da mensagem
    if (message.length > 90) throw 'Mensagem muito longa';
    // Cria a mensagem com aviso de anonimato
    message = `[AVISO: Esta é uma mensagem de correio anônimo. O remetente não é o número do bot, mas outro usuário que usou o plugin anonimo.]\n\n` + message;
    // Envia a mensagem
    await conn.sendMessage(number, message, 'conversation');
    // Retorna confirmação para o usuário
    m.reply('Mensagem enviada com sucesso');
  } catch (error) {
    // Trata o erro e informa o usuário
    m.reply(`Erro ao enviar a mensagem: ${error.message}`);
  }
};

handler.help = ['anonimo'];
handler.tags = ['fun'];
handler.command = ['anonimo'];
handler.group = true;

export default handler;
