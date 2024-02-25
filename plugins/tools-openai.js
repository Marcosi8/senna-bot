import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `*Exemplo:* ${usedPrefix + command} *como funciona o linux?*`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

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

    const guru1 = `https://vihangayt.me/tools/chatgpt2?q=${prompt}`;
    
    try {
      let response = await fetch(guru1);
      let data = await response.json();
      let result = data.result;

      if (!result) {
        throw new Error('No valid JSON response from the first API');
      }

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
    } catch (error) {
      console.error('Error from the first API:', error);

      const model = 'llama';
      const senderNumber = m.sender.replace(/[^0-9]/g, ''); 
      const session = `GURU_BOT_${senderNumber}`;
      const guru2 = `https://vihangayt.me/tools/chatgpt2?q=${prompt}`;
      
      let response = await fetch(guru2);
      let data = await response.json();
      let result = data.completion;

      if (!result) {
        throw new Error('No valid completion from the second API');
      }

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
    }

  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};
handler.help = ['chatgpt']
handler.tags = ['ia']
handler.command = ['ai', 'gpt', 'chatgpt'];

export default handler
