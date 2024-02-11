let handler = async function (m) {
  for (const message in textMsg) {
    if (new RegExp(`^${message}$`, 'i').test(m.text)) {
      const responses = textMsg[message];
      const randomIndex = Math.floor(Math.random() * responses.length);
      this.sendText(m.chat, responses[randomIndex]);
      break;
    }
  }
  return true;
}

handler.all = handler;

export default handler;

let textMsg = {
  'olá': ['Olá! Como posso ajudá-lo?', 'E aí, tudo bem? Como posso ser útil?'],
  'como vai?': ['Estou bem, obrigado por perguntar. E você?', 'Ótimo! E você, como está?'],
  'qual é o seu nome?': ['Meu nome é ChatGPT. Em que posso ajudar?', 'Eu sou o ChatGPT. Como posso ser útil para você?'],
  'o que você gosta de fazer?': ['Adoro conversar com pessoas inteligentes como você!', 'Eu gosto de ajudar as pessoas a encontrar respostas para suas perguntas.'],
  'você é um robô?': ['Sim, sou um assistente virtual criado para ajudar com várias tarefas.', 'Sou um bot criado para auxiliar em diferentes tipos de interações.'],
  'você tem hobbies?': ['Meu hobby favorito é aprender coisas novas todos os dias!', 'Adoro ler e aprender sobre uma ampla variedade de tópicos.'],
  // Adicione mais respostas aqui conforme necessário
}
