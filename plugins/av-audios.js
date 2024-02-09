
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
  'fino senhores|fino|senhores': './src/mp3/fino.mp3',
  'bom dia|bom dia pessoal|bomdia|bom dia gente|bom diaa|bundia': 'https://b.top4top.io/m_2961oeau70.mp3',
  'bot|robo|adm': 'https://d.top4top.io/m_2961bgor02.mp3',
  'fake|mentira|/fake|mentiroso|eu menti': 'https://f.top4top.io/m_2961e8ou64.mp3',
  'paulo|nidney|samuel|jao|alif': 'https://c.top4top.io/m_29613e80q1.mp3',
  '@558881647724': 'https://e.top4top.io/m_29619bg673.mp3'
}
