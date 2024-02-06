import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['558881647724', 'marcoskz_', true],
  ['558881647724']
] //Numeros de owner 

global.mods = [''] 
global.prems = ['558881647724', '558881647724']
global.APIs = { // API Prefix
  // name: 'https://website' 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.fgmods.xyz': 'aa9HWoim' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'soyuz' 
global.author = '@mr' 

//--info FG
global.botName = 'Vladivostok'
global.fgig = 'https://www.instagram.com/marcoskz_' 
global.fgsc = 'https://github.com/Marcosi8' 
global.fgyt = 'https://youtube.com'
global.fgpyp = 'https://www.paypal.com/donate/?business=WUDZNJ573PAF6&no_recurring=0&item_name=Help+this+project+stay+active%21+%3A%29&currency_code=BRL'
global.fglog = 'https://i.ibb.co/1zdz2j3/logo.jpgs' 

//--- Grupos WA
global.fgcanal = 'https://chat.whatsapp.com/G7MP2jGbrq4Anl4ag81DtD'
global.bgp = 'https://chat.whatsapp.com/G7MP2jGbrq4Anl4ag81DtD'
global.bgp2 = 'https://chat.whatsapp.com/G7MP2jGbrq4Anl4ag81DtD'
global.bgp3 = 'https://chat.whatsapp.com/G7MP2jGbrq4Anl4ag81DtD' //--GP NSFW

global.wait = '⏲️ _Carregando..._\n*▬▬▬▭*'
global.rwait = '⌛'
global.dmoji = '🤠'
global.done = '✅'
global.error = '🚫' 
global.xmoji = '🚀' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
