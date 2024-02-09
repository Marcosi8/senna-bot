
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
  'fino senhores': './src/mp3/fino.mp3',
  'bom dia': 'https://b.top4top.io/m_2961oeau70.mp3',
  'bot': 'https://d.top4top.io/m_2961bgor02.mp3',
  'fake', 'mentira', '/fake' : 'https://f.top4top.io/m_2961e8ou64.mp3',
  'paulo': 'https://c.top4top.io/m_29613e80q1.mp3',
  '@558881647724': 'https://e.top4top.io/m_29619bg673.mp3'
}
