import fs from 'fs';

let handler = async (m, { conn }) => {
    console.log('Verificando atualização da foto de perfil...');
    
    let setting = global.db.data.settings[this.user.jid];
    let currentTime = new Date().getTime();
    let lastUpdate = setting.lastUpdate || 0;
    let updateInterval = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    if (currentTime - lastUpdate >= updateInterval || lastUpdate === 0) {
        console.log('Atualizando a foto de perfil...');
        await updateProfilePhoto(conn);
        setting.lastUpdate = currentTime;
        global.db.save();
    } else {
        console.log('A foto de perfil não precisa ser atualizada neste momento.');
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
        console.log('Foto de perfil atualizada com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar a foto de perfil:', error);
    }
}
