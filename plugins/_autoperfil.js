import fs from 'fs';
import { create } from '@open-wa/wa-automate';

create().then(async conn => {
    let handler = m => m;
    handler.all = async function (m) {
        if (!conn) return;

        let setting = global.db.data.settings[this.user.jid];

        let _uptime = process.uptime() * 1000;
        let _muptime;
        if (process.send) {
            process.send('uptime');
            _muptime = await new Promise(resolve => {
                process.once('message', resolve);
                setTimeout(resolve, 2000);
            }) * 1000;
        }
        let uptime = clockString(_uptime);
        
        try {
            let imgBuffer = fs.readFileSync('./src/GPT/gpt1.jpeg');
            await conn.updateProfilePic(imgBuffer);
            console.log('Foto de perfil atualizada com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar a foto de perfil:', error);
        }
        
        setting.status = new Date() * 1;
        return m;
    };

    function clockString(ms) {
        let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
        return [d, ' » ', h, ' ・ ', m, ' ・ ', s].map(v => v.toString().padStart(2, 0)).join('');
    }

    conn.on('message', handler);
});
