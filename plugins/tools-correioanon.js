const { Api, WhatsApp } = import('venom-bot');

const api = new Api({
    headless: true, // Opcional: evita a inicialização do navegador
});

const whatsapp = new WhatsApp(api, {
    session: 'sessions', // Nome da pasta para salvar a sessão
});

whatsapp.onMessage(async (message) => {
    if (message.body === '/anonimo') {
        // Reação ao reconhecer o comando
        await whatsapp.sendSeen(message.chatId);
        await whatsapp.sendReaction(message.chatId, '');

        // Extrai o número do destinatário e a mensagem
        const command = message.body.split(' ');
        const destinatario = command[1];
        const mensagem = command.slice(2).join(' ');

        // Envia a mensagem ao destinatário
        await whatsapp.sendText(destinatario + '@c.us', `Mensagem anônima: ${mensagem}`);

        // Confirmação para o remetente
        await whatsapp.sendText(message.chatId, 'Mensagem enviada de forma anônima!');
    }
});

whatsapp.connect();

const handler = {
    help: ['/anonimo [número do destinatário] [mensagem]'],
    tags: ['tools', 'prime'],
    command: /^\/anonimo/i
};

module.exports = handler;
