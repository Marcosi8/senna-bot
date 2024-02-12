const { Client } = import('whatsapp-web.js');

const client = new Client();

client.on('message', async (message) => {
    try {
        if (message.body.startsWith('/anonimo')) {
            // Reação ao reconhecer o comando
            await message.react('📬');
            
            // Verifica se o comando está no formato correto
            const command = message.body.split(' ');
            if (command.length < 3) {
                await message.reply('Formato incorreto. Use /anonimo [número do destinatário] [mensagem]');
                return;
            }

            // Extrai o número do destinatário e a mensagem
            const destinatario = command[1];
            const mensagem = command.slice(2).join(' ');

            // Envia a mensagem ao destinatário
            await client.sendMessage(destinatario + '@c.us', `Mensagem anônima: ${mensagem}`);

            // Confirmação para o remetente
            await message.reply('Mensagem enviada de forma anônima!');
        }
    } catch (err) {
        console.error('Erro ao enviar a mensagem anônima:', err);
    }
});

client.initialize();

const handler = {
    help: ['/anonimo [número do destinatário] [mensagem]'],
    tags: ['tools', 'prime'],
    command: /^\/anonimo/i
};

module.exports = handler;
