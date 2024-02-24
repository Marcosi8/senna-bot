import fs from 'fs';

let handler = async ({ conn }) => {
    let setting = global.db.data.settings;
    let currentTime = new Date().getTime();
    let lastUpdate = setting.lastProfileUpdate || 0;
    let updateInterval = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    if (currentTime - lastUpdate >= updateInterval || lastUpdate === 0) {
        try {
            let imgBuffer = fs.readFileSync('./src/GPT/gpt1.jpeg');
            await conn.updateProfilePicture(conn.user.jid, imgBuffer);
            setting.lastProfileUpdate = currentTime;
            global.db.save();
            console.log('Foto de perfil atualizada com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar a foto de perfil:', error);
        }
    }
};

export default handler;
