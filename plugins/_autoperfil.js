import fs from 'fs';

let handler = async (m, { conn }) => {
    let setting = global.db.data.settings[this.user.jid];
    let currentTime = new Date().getTime();
    let lastUpdate = setting.lastUpdate || 0;
    let updateInterval = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    if (currentTime - lastUpdate >= updateInterval || lastUpdate === 0) {
        await updateProfilePhoto(conn);
        setting.lastUpdate = currentTime;
        global.db.save();
    }
};

handler.all = async (m, { conn }) => {
    handler(m, { conn });
    return m;
};

export default handler;

async function updateProfilePhoto(conn) {
    try {
        let imgBuffer = fs.readFileSync('./src/GPT/gpt1.jpeg'); // Substitua pelo caminho da sua imagem
        await conn.updateProfilePicture(conn.user.jid, imgBuffer);
    } catch (error) {
        console.error('Erro ao atualizar a foto de perfil:', error);
    }
}
