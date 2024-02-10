import yts from 'yt-search';
import ytdl from 'yt-dlp';

let limit = 320;

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  // ... (rest of your code)

  try {
    const ydlOptions = {
      format: 'bestaudio[ext=opus]', // Prioritize downloading Opus audio
      download: false, // Don't download immediately
    };

    const ydlInfo = await ytdl.getInfo(vid.url, ydlOptions);
    const { title, url, format, acodec, size, size_bytes } = ydlInfo.formats[0];

    const isLimit = limit * 1024 < size_bytes;

    await conn.loadingMsg(m.chat, ' BAIXANDO', ` ${isLimit ? `≡  *YT-DLP*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *️${mssg.quality}*: ${format}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ COMPLETO!' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m);

    if (!isLimit) {
      const filename = `${title}.opus`; // Use .opus extension
      const file = await ydl.downloadFromInfo(ydlInfo, ydlOptions);
      await conn.sendFile(m.chat, file, filename, `
      ▢ *️Qualidade*: ${format}
      ▢ *⚖️Peso*: ${size}
      ▢ *Codec*: ${acodec}
      `.trim(), m, false, { mimetype: 'audio/opus', asDocument: chat.useDocument });
      m.react(done);
    }
  } catch (error) {
    }

}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'musica', 'song']
