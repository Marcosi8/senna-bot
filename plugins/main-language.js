
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
	
  let te = `✳️ ${mssg.langList}\n- es (Español)\n- en (Inglés)\n- id (Indonesia)\n- pt (Portugues)\n- ar (Árabe)\n\n📌 ${mssg.example}: *${usedPrefix + command}* en\nYou can suggest translations at \nwa.me/558881647724`
  if (!text) throw te
  let user = global.db.data.users[m.sender]
   if (args[0] === "es") {
       user.language = args[0]
       m.reply("✅ *Español Seleccionado*\n\nAhora el bot responderá a su mensaje en Español")
      } else if (args[0] === "en") {
       user.language = args[0]
       m.reply("✅ *Selected English*\n\nNow the bot will reply to your message in English")
      } else if (args[0] === "id") {
      user.language = args[0]
       m.reply("✅ *Bahasa Indonesia terpilih*\n\nSekarang bot akan membalas pesanmu dengan bahasa Indonesia")
      } else if (args[0] === "pt") {
        user.language = args[0]
         m.reply("✅ *Português selecionado!*\n\nO bot vai responder a sua mensagem em Português")
       } else if (args[0] === "ar") {
        user.language = args[0]
        m.reply("✅ *تم اختيار اللغة العربية*\n\nالآن سيقوم البوت بالرد على رسائلك باللغة العربية")
      } else {
       m.reply(te)
     }
    
 }
 handler.help = ['language <pt-en..>']
 handler.tags = ['main']
 handler.command = ['language', 'lenguaje', 'lang', 'idioma'] 
 
 export default handler
