let handler = async (m, { conn }) => {
    let setting = global.db.data.settings[this.user.jid];
    
    // Verificar se é hora de atualizar a foto de perfil
    let currentTime = new Date().getTime();
    let lastUpdate = setting.lastUpdate || 0;
    let timeDiff = currentTime - lastUpdate;
    let updateInterval = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
    
    if (timeDiff >= updateInterval) {
        // É hora de atualizar a foto de perfil
        let imgBuffer = fs.readFileSync('caminho/para/sua/imagem.jpg'); // Substitua pelo caminho da sua imagem
        await conn.updateProfilePicture(m.chat, imgBuffer).catch(_ => _);
        
        // Atualizar o timestamp da última atualização
        setting.lastUpdate = currentTime;
        // Salvar as configurações
        global.db.save();
    }
};

handler.command = /^updateprofile$/i;

export default handler;
