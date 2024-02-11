let messages = {
  "ola": "Olá, como posso ajudar?",
  "como está?": "Estou bem, obrigado por perguntar.",
  "adeus": "Até mais tarde!",
  "quem é você?": "Sou um bot criado para ajudar a responder suas perguntas."
  // Adicione mais mensagens conforme necessário
};

let handler = async function (m) {
  let lowerCaseText = m.text.toLowerCase(); // Converter a mensagem recebida para minúsculas
  let responded = false; // Variável para controlar se uma resposta foi enviada

  // Verifica se a mensagem recebida corresponde a alguma das chaves no objeto de mensagens
  for (const key in messages) {
    if (lowerCaseText.includes(key)) { // Verifica se a chave está incluída na mensagem
      await this.sendText(m.chat, messages[key]); // Envia a mensagem correspondente
      responded = true; // Define responded como verdadeiro pois uma resposta foi enviada
      break; // Sai do loop após encontrar uma correspondência
    }
  }

  return responded; // Retorna true se uma resposta foi enviada, caso contrário retorna false
}

handler.all = handler; // Define o handler.all como a função handler definida acima

export default handler;
