const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');

// Chave de API para autenticação na API Text-to-Speech da Google
const API_KEY = 'sua_chave_de_api_aqui';

// Configuração do cliente Text-to-Speech da Google
const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    private_key: API_KEY,
    client_email: 'seu_email_de_serviço@dominio.com' // Substitua pelo seu email de serviço
  }
});

let handler = async function (m) {
  for (const message in textMsg) {
    if (new RegExp(`^${message}$`, 'i').test(m.text)) {
      const responses = textMsg[message];
      const randomIndex = Math.floor(Math.random() * responses.length);
      const text = responses[randomIndex];

      // Configuração da solicitação de síntese de voz
      const request = {
        input: { text: text },
        voice: { languageCode: 'pt-BR', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      };

      // Solicitação de síntese de voz
      const [response] = await client.synthesizeSpeech(request);
      // Escreve o áudio em um arquivo temporário
      const outputFile = `audio_${Date.now()}.mp3`;
      fs.writeFileSync(outputFile, response.audioContent, 'binary');
      // Envio do arquivo de áudio
      this.sendFile(m.chat, outputFile, null, null, m);
      // Exclui o arquivo temporário após o envio
      fs.unlinkSync(outputFile);
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
