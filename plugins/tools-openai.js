import fetch from 'node-fetch';

// Mensagem de introdução
const introductionPrompt = "Olá! Eu sou o Soyuz, um bot de WhatsApp criado para ajudar você. Se precisar de alguma coisa, é só me chamar!";

// Função para lidar com todas as mensagens recebidas
const handleMessage = async (m, conn) => {
  // Verificar se é uma nova conversa e enviar a introdução
  if (m.isNewUser) {
    await conn.sendMessage(m.chat, introductionPrompt, MessageType.text);
    return;
  }

  // Verificar se há texto na mensagem ou se há texto em uma mensagem citada
  let text = m.text || (m.quoted && m.quoted.text);

  // Se não houver texto, não fazer nada
  if (!text) return;

  // Realizar o processamento da mensagem conforme o exemplo que você forneceu
  const rwait = '⏳'; // Defina rwait conforme necessário
  const done = '✅'; // Defina done conforme necessário

  let pp = marcosgpt.getRandom();
  
  try {
    m.react(rwait);
    const { key } = await conn.sendMessage(m.chat, {
      image: pp,
      caption: '_*Buscando uma resposta*_...'
    }, {quoted: m});
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const guru1 = `https://vihangayt.me/tools/chatgpt?q=${prompt}`;
    
    try {
      let response = await fetch(guru1);
      let data = await response.json();

      if (data.status === true && data.data) {
        let result = data.data;

        await conn.relayMessage(m.chat, {
          protocolMessage: {
            key,
            type: 14,
            editedMessage: {
              imageMessage: { caption: result }
            }
          }
        }, {});
        m.react(done);
      } else {
        throw new Error('No valid data in the API response');
      }
    } catch (error) {
      console.error('Error from the first API:', error);
      throw `*ERROR*: ${error.message}`; // Retorna a mensagem de erro específica
    }
  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*: ${error.message}`; // Retorna a mensagem de erro específica
  }
};

// Evento de ouvinte para lidar com todas as mensagens recebidas
conn.on('chat-update', async (chatUpdate) => {
  // Verificar se a atualização é uma mensagem e se é uma mensagem recebida
  if (chatUpdate.messages && chatUpdate.messages.length && chatUpdate.count) {
    // Iterar sobre todas as mensagens recebidas
    for (let message of chatUpdate.messages) {
      // Verificar se a mensagem é recebida
      if (message.key && message.key.remoteJid == conn.user.jid && message.messageStubType === 32) {
        // Lidar com a mensagem
        await handleMessage(message, conn);
      }
    }
  }
});
