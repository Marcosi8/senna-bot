import fs from 'fs';

let handler = m => m;
handler.all = async function (m, { conn }) {
    try {
        let imgBuffer = fs.readFileSync('./src/GPT/gpt1.jpeg');
        await conn.updateProfilePicture(conn.user.jid, imgBuffer);
        console.log('Foto de perfil atualizada com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar a foto de perfil:', error);
    }
    return m;
};

export default handler;
