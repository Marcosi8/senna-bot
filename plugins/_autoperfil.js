import fs from 'fs';

let handler = async ({ conn }) => {
    console.log('Verificando atualização da foto de perfil...');
    
    let setting = global.db.data.settings;
    let currentTime = new Date().getTime();
    let lastUpdate = setting.lastUpdate || 0;
    let updateInterval = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    console.log('Última atualização:', new Date(lastUpdate).toLocaleString());
    
    if (currentTime - lastUpdate >= updateInterval || lastUpdate === 0) {
        console.log('Atualizando a foto de perfil...');
        await updateProfilePhoto(conn);
        setting.lastUpdate = currentTime;
        global.db.save();
    } else {
        console.log('A foto de perfil não precisa ser atualizada neste momento.');
    }
};

export default handler;

async function updateProfilePhoto(conn) {
    try {
        let imgBuffer = fs.readFileSync('./src/GPT/gpt1.jpeg');
        await conn.updateProfilePicture(conn.user.jid, imgBuffer);
        console.log('Foto de perfil atualizada com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar a foto de perfil:', error);
    }
}
