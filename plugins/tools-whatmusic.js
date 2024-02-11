import fs from 'fs';
import acrcloud from 'acrcloud';

let acr = new acrcloud({
    host: 'identify-us-west-2.acrcloud.com',
    access_key: '402013e26582c7f23f3fbd4814100759',
    access_secret: 'tvRsiOyDPi8BcmlDUEbWueGG716zUASNJsQHKXjp'
});

let handler = async (m) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (/audio|video/.test(mime)) {
        let media = await q.download();
        let ext = mime.split('/')[1];
        fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media);
        
        let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`));
        let { code, msg } = res.status;

        if (code !== 0) throw msg;

        let { title, artists, album, genres, release_date, external_metadata } = res.metadata.music[0];
        let txt = `
            𝚁𝙴𝚂𝚄𝙻𝚃
            • 📌 *TITLE*: ${title}
            • 👨‍🎤 𝙰𝚁𝚃𝙸𝚂𝚃: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'NOT FOUND'}
            • 💾 𝙰𝙻𝙱𝚄𝙼: ${album.name || 'NOT FOUND'}
            • 🌐 𝙶𝙴𝙽𝙴𝚁: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'NOT FOUND'}
            • 📆 RELEASE DATE: ${release_date || 'NOT FOUND'}
            • 📎 LINK: ${external_metadata && external_metadata.spotify && external_metadata.spotify.track && external_metadata.spotify.track.external_urls && external_metadata.spotify.track.external_urls.spotify ? external_metadata.spotify.track.external_urls.spotify : 'NOT FOUND'}
        `.trim();

        fs.unlinkSync(`./tmp/${m.sender}.${ext}`);
        m.reply(txt);
    } else {
        throw '*𝚁𝙴𝚂𝙿𝙾𝙽𝙳 𝙰𝚄𝙳𝙸𝙾*';
    }
}

handler.help = ['shazam'];
handler.tags = ['tools'];
handler.command = /^quemusica|shazam|whatmusic|find$/i;

export default handler;
