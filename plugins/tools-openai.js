import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `*Exemplo: ${usedPrefix + command} 𝘸𝘩𝘢𝘵 𝘪𝘴 𝘪𝘴𝘭𝘢𝘮?`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  let pp = marcosgpt.getRandom()
  
  try {
    m.react(rwait)
    const { key } = await conn.sendMessage(m.chat, {
      image: pp,
      caption: '𝙃𝙤𝙡𝙙 𝙤𝙣 𝙜𝙚𝙩𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙖𝙣𝙨𝙬𝙚𝙧...'
    }, {quoted: m})
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const guru1 = `https://api.vihangayt.me/tools/chatgpt4?q=Hi`;
    
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
      const guru2 = `https://api.vihangayt.me/tools/chatgpt3?q=Hi`;
      
      let response = await fetch(guru2);
      let data = await response.json();
      let result = data.completion;

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

export default handler;
