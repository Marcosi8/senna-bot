import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

conn.on('message-new', async (m) => {
  let stiker = false
  let packname = global.packname || 'Nome do Pacote' // Defina o nome do pacote caso não esteja definido globalmente
  let author = global.author || 'Autor' // Defina o autor caso não esteja definido globalmente
  try {
    let mime = (m.msg || m).mimetype || m.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((m.msg || m).seconds > 11) return // Máximo 10 segundos
      let img = await m.download?.()
      if (!img) throw `✳️ Responde a una imagen o video`
      let out
      try {
        stiker = await sticker(img, false, packname, author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, packname, author)
        }
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, null, rpl)
  }
})
