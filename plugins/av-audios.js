
let handler = m => m
handler.all = async function (m) {
  for (const message in audioMsg) {
    if (new RegExp(`^${message}$`, 'i').test(m.text)) {
      this.sendFile(m.chat, audioMsg[message], 'audio.mp3', null, m, true)
      break
    }
  }
  return !0
 }

export default handler


let audioMsg = {
  'boa noite|noite|sono|cansado|dormir|trabalhar|trabalho': 'https://g.top4top.io/m_2961taxle0.mp3',
  'bom dia|bom dia bot|bom dia pessoal|bomdia|bom dia gente|bom diaa|bundia|bom dia a todos': 'https://f.top4top.io/m_2961uuv7l0.mp3',
  'robo|o bot|eae': 'o bot sou eu',
  'verdade|mentira|tenho namorada|é mesmo|mentiroso|eu menti|sim': 'https://f.top4top.io/m_2961e8ou64.mp3',
  'paulo|nidney|samuel|jao|alif': 'https://c.top4top.io/m_29613e80q1.mp3',
  '@558881647724': 'https://d.top4top.io/m_2961bgor02.mp3'
}
