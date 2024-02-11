async function getYoutubeVideo(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const info = await ytdl.getInfo(url);
      const result = [];
      
      for (let i = 0; i < info.formats.length; i++) {
        const item = info.formats[i];
        if (item.container === 'mp4' && item.hasVideo && item.hasAudio) {
          const { qualityLabel, contentLength } = item;
          const bytes = await bytesToSize(contentLength);
          const video = { url: item.url, quality: qualityLabel, size: bytes };
          result.push(video);
        }
      }
      
      const filteredResult = result.filter(x => x.url !== undefined && x.size !== undefined && x.quality !== undefined);
      const tinyUrl = await axios.get(`https://tinyurl.com/api-create.php?url=${filteredResult[0].url}`);
      const title = info.videoDetails.title;
      const thumb = info.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
      
      resolve({ title, result: tinyUrl.data, videoUrl: filteredResult[0].url, thumb });
    } catch (error) {
      reject(error);
    }
  });
}

async function handler(m, { conn, args, usedPrefix, command }) {
  if (!args[0]) throw '*🪩Please enter a link / YouTube link.*';
  let enviando;
  if (enviando) return;
  enviando = true;
  let youtubeLink = '';
  if (args[0].includes('you')) {
    youtubeLink = args[0];
  } else {
    const index = parseInt(args[0]) - 1;
    if (index >= 0) {
      if (Array.isArray(global.videoList) && global.videoList.length > 0) {
        const matchingItem = global.videoList.find((item) => item.from === m.sender);
        if (matchingItem) {
          if (index < matchingItem.urls.length) {
            youtubeLink = matchingItem.urls[index];
          } else {
            enviando = false;
            throw `*[❗] A link was not found for that number, please enter a number between 1 and 1. ${matchingItem.urls.length}*`;
          }
        } else {
          enviando = false;
          throw `*[❗] To be able to make use of the command in this way (${usedPrefix + command} <numero>), please search for videos with the ${usedPrefix}playlist <texto>*`;
        }
      } else {
        enviando = false;
        throw `*[❗] To be able to make use of the command in this way (${usedPrefix + command} <numero>), Please perform the video search with the ${usedPrefix}playlist <texto>*`;
      }
    }
  }
  const { key } = await m.reply(`*♻️Getting your video..._*`);
  try {
    const videoInfo = await getYoutubeVideo(youtubeLink);
    const buff = await getBuffer(videoInfo.videoUrl);
    const fileSizeInBytes = buff.byteLength;
    const fileSizeInKB = fileSizeInBytes / 1024;
    const fileSizeInMB = fileSizeInKB / 1024;
    const roundedFileSizeInMB = fileSizeInMB.toFixed(2);
    if (fileSizeInMB > 100) {
      await conn.sendMessage(m.chat, { document: buff, caption: `*🪩Title:* ${videoInfo.title}\n*🪩Size:* ${roundedFileSizeInMB} MB`, fileName: videoInfo.title + '.mp4', mimetype: 'video/mp4' }, { quoted: m });
      await conn.sendMessage(m.chat, { text: `*[ ✅ ] Video downloaded and sent successfully🛡️.*\n\n*—◉ It was sent in document format due to the weight of the video ${roundedFileSizeInMB} MB and exceeds the limit set by WhatsApp .*\n*◉ Titulo:* ${videoInfo.title}`, edit: key }, { quoted: m });
      enviando = false;
    } else {
      await conn.sendMessage(m.chat, { video: buff, caption: `*🪩Title:* ${videoInfo.title}\n*🪩Size:* ${roundedFileSizeInMB} MB`, fileName: videoInfo.title + '.mp4', mimetype: 'video/mp4' }, { quoted: m });
      await conn.sendMessage(m.chat, { text: `*[ ✅ ] Video successfully downloaded.*`, edit: key }, { quoted: m });
      enviando = false;
    }
  } catch (ee) {
    console.log(ee);
    try {
      const qu = args[1] || '360';
      const q = qu + 'p';
      const v = youtubeLink;
      const yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v));
      const dl_url = yt.video[q].download();
      const ttl = yt.title;
      const size = yt.video[q].fileSizeH;
      await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `*🪩Title:* ${ttl}\n*🪩Size:* ${size}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
      await conn.sendMessage(m.chat, { text: '*[ ✅ ] Video descargado exitosamente.*', edit: key }, { quoted: m });
      enviando = false;
    } catch (ee2) {
      console.log(ee2);
      try {
        const mediaa = await ytMp4(youtubeLink);
        await conn.sendMessage(m.chat, { video: { url: mediaa.result }, fileName: `error.mp4`, caption: `_𝐓𝐡𝐞 Prince - 𝐁𝐨𝐭_`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: m });
        await conn.sendMessage(m.chat, { text: '*[ ✅ ] Video successfully downloaded.*', edit: key }, { quoted: m });
        enviando = false;
      } catch {
        try {
          const lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${youtubeLink}`);
          const lolh = await lolhuman.json();
          const**⬤**
