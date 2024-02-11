let active = true; // Inicialmente ativado
const ownerPassword = "1234"; // Senha do proprietário do bot

const responses = {
    "oi": "Olá!",
    "tchau": "Até mais!",
    "como você está?": "Estou bem, obrigado por perguntar.",
    "bot": ["Sim?", "Precisou de alguma coisa?", "Aqui estou!"],
    "legal": ["Muito legal!", "Legal mesmo!", "Adoro quando as coisas são legais."],
    "legal né": "Com certeza!",
    "obrigado": ["De nada!", "Foi um prazer ajudar!"],
    "nada": "Por nada!",
    "você é inteligente": ["Obrigado! Fico feliz em ouvir isso.", "Eu tento ser."],
    "bom dia": ["Bom dia!", "Tenha um ótimo dia!", "Que seu dia seja cheio de coisas boas!"],
    "boa tarde": ["Boa tarde!", "Espero que você esteja tendo uma tarde maravilhosa!"],
    "boa noite": ["Boa noite!", "Durma bem!", "Até amanhã!"],
    "bons sonhos": ["Bons sonhos!", "Durma bem e sonhe com os anjos!"]
    // Adicione mais palavras e respostas conforme desejado
};

const handler = async (m, { conn, args }) => {
    const password = args[1];
    if (password !== ownerPassword) {
        await conn.reply(m.chat, 'Senha incorreta!', m);
        return;
    }
    if (args[0] === 'on') {
        active = true;
        await conn.reply(m.chat, 'Respostas automáticas ativadas!', m);
    } else if (args[0] === 'off') {
        active = false;
        await conn.reply(m.chat, 'Respostas automáticas desativadas!', m);
    }
};

handler.command = ["resposta"];
handler.tags = ["prime"];

export default handler;

create().then((client) => start(client));

async function start(client) {
    client.onMessage(async (message) => {
        if (!active) return; // Se não estiver ativo, não responde
        const text = message.body.toLowerCase();
        const response = responses[text];
        if (response) {
            if (Array.isArray(response)) {
                const randomResponse = response[Math.floor(Math.random() * response.length)];
                await client.sendText(message.from, randomResponse);
            } else {
                await client.sendText(message.from, response);
            }
        }
    });
}
