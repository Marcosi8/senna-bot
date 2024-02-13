let handler = async (m, { text, conn }) => {
  try {
    // Extrai o número e a mensagem do texto
    // Usa a vírgula como separador
    const parts = text.split(',').map(v => v.trim());
    const number = parts[0];
    const message = parts.slice(1).join(',').trim();
    
    // Valida o número
    if (!number || !/^\+?\d{10,15}$/.test(number)) {
      throw new Error('*Número inválido. Certifique-se de usar o formato:* _+5588xxxxxxxx_');
    }
    
    // Valida a mensagem
    if (!message) {
      throw new Error('Mensagem vazia');
    }
    
    // Limita o tamanho da mensagem
    if (message.length > 90) {
      throw new Error('Mensagem muito longa');
    }
    
    // Cria a mensagem com aviso de anonimato
    const anonymousMessage = '[AVISO: Esta é uma mensagem de correio anônimo. O remetente não é o número do bot, mas outro usuário que usou o plugin anonimo.]\n\n' + message;
    
    // Envia a mensagem
    await conn.sendMessage(number, anonymousMessage, 'conversation');
    
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
handler.group = false;

export default handler;
