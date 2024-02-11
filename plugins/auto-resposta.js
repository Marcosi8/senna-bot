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
    // ... (adicione mais palavras-chave e respostas)

    // Função para ativar o plugin
    enable: () => {
        active = true;
    },

    // Função para desativar o plugin
    disable: () => {
        active = false;
    },

    // Função para verificar se o plugin está ativo
    isActive: () => {
        return active;
    },
};

let active = true; // Plugin ativado por padrão

const handler = async (m, { conn, args }) => {
    const keyword = m.body.toLowerCase();

    // Verifica se o plugin está ativo
    if (!active) {
        return;
    }

    // Verifica se a palavra-chave existe
    if (!responses.hasOwnProperty(keyword)) {
        return;
    }

    // Obtém as respostas para a palavra-chave
    const possibleResponses = responses[keyword];

    // Seleciona uma resposta aleatória
    const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

    // Envia a resposta para o remetente
    await conn.reply(m.chat, randomResponse, m);
};

// Define o comando e as tags do plugin
handler.command = ["responder"];
handler.tags = ["prime"];

// Exporta o plugin
module.exports = handler;
