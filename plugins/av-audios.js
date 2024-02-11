let messages = {
  "ola": "Olá, como posso ajudar?",
  "como está?": "Estou bem, obrigado por perguntar.",
  "adeus": "Até mais tarde!",
  "quem é você?": "Sou um bot criado para ajudar a responder suas perguntas."
  // Adicione mais mensagens conforme necessário
};

let handler = async function (m) {
  for (const key in messages) {
    if (new RegExp(`^${key}$`, 'i').test(m.text)) {
      await this.sendText(m.chat, messages[key]); // Envia a mensagem correspondente
      break;
    }
  }
  return true;
}

handler.all = handler; // Define o handler.all como a função handler definida acima

export default handler;
