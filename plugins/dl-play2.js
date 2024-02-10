const ytdl = require('ytdl-core');

let limit = 320;

module.exports = {
  cmdName: () => ({
    name: ['play', 'musica', 'song'],
    alias: [],
    react: "🎧",
    need: "text",
    category: "dl",
    desc: "Search and play music from YouTube.",
  }),
  getCommand: async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
    if (!text) throw `🤔 Do you want music? ${mssg.example} *${usedPrefix + command}* queen, don't stop me now`;

    let chat = global.db.data.chats[m.chat];
    let info = await ytdl.getInfo(text);
    let vid = info.videoDetails;
    if (!vid) throw `❗️ Video/Audio not found`;
    let isVideo = /vid$/.test(command);

    conn.sendFile(m.chat, vid.thumbnail.thumbnails[0].url, 'play', `
      ≡ *YT MUSIC*
      ┌──────────────
      ▢ 📥 *Title:* ${vid.title}
      ▢ 📆 *Uploaded:* ${vid.publishDate}
      ▢ ⏱️ *Duration:* ${vid.lengthSeconds}
      ▢ 👀 *Views:* ${vid.viewCount}
      └──────────────

      _Sending..._
    `, m, null, rcanal);

    let q = isVideo ? 'highest' : 'highestaudio';

    try {
      let stream = ytdl(text, { quality: q });
      conn.sendFile(m.chat, stream, `${vid.title}.mp4`, `
        ▢ *Quality*: ${q}
        ▢ *Size*: Unknown
      `, m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument });
      m.react(done);
    } catch {
      m.reply(`🚫 Error`);
    }
  }
};
