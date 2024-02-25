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

      const guru2 = `https://vihangayt.me/tools/chatgpt?2q=${encodeURIComponent(text)}`;

      try {
        let response2 = await fetch(guru2);
        let data2 = await response2.json();

        if (data2.status === true && data2.data) {
          let result2 = data2.data;

          await conn.relayMessage(m.chat, {
            protocolMessage: {
              key,
              type: 14,
              editedMessage: {
                imageMessage: { caption: result2 }
              }
            }
          }, {});
          m.react(done);
        } else {
          throw new Error('No valid data in the second API response');
        }
      } catch (error2) {
        console.error('Error from the second API:', error2);
        throw `*ERROR*: ${error2.message}`; // Retorna a mensagem de erro específica
      }
    }
  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*: ${error.message}`; // Retorna a mensagem de erro específica
  }
};

handler.help = ['chatgpt'];
handler.tags = ['ia'];
handler.command = ['ai', 'gpt', 'chatgpt'];

export default handler;
