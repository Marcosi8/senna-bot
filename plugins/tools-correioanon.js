async function handler(m, { usedPrefix, command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.sendMessage(m.chat, { text: "[❗️] *Você não está em um chat anônimo.*"}, { quoted: m })
            m.reply("Você saiu do chat anônimo.")
            let other = room.other(m.sender) 
            if (other) await this.sendMessage(other, { text: "[❗️] *Seu parceiro saiu do chat.*"}, { quoted: m })
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendMessage(m.chat, { text: "🤔 *Você já está em um chat anônimo.*"}, { quoted: m })
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendMessage(room.a, { text: "🥳 *Um parceiro se juntou ao chat.*"}, { quoted: m })
                await this.sendMessage(room.b, { text: "🥳 *Um parceiro se juntou ao chat.*"})
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendMessage(m.chat, { text: "🎉 *Você foi conectado a um chat anônimo.*"}, { quoted: m })

                // Enviar mensagem para todos os grupos
                let groups = Object.values(this.chats).filter(chat => chat.jid.endsWith('@g.us'))
                for (let group of groups) {
                    await this.sendMessage(group.jid, { text: "🎉 *Alguém se conectou a um chat anônimo!*"})
                }
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendMessage(m.chat, { text: "🚦 _*Você está na fila para um chat anônimo, aguarde até alguém se conectar!*_ "}, { quoted: m })
            }
            break
        }
        case 'anonimoinfo': {
            let anonimoinfoText = `👤 *O chat Anônimo funciona apenas no privado do Bot.*
👥 Consiste em usar o número do Bot para falar com outras pessoas, ou seja, as duas pessoas estarão escrevendo ao mesmo tempo no chat privado do Bot, dessa forma, nenhuma 🔒 das duas pessoas pode ver o número, foto, usuário, descrição, etc...🔒
✨ Para usar essa função, siga estas etapas:
⚡️ Acesse o chat privado do Bot
⚡️ Digite o seguinte comando: *#start*
✅ Depois de fazer isso, basta ter paciência até que outra pessoa use o mesmo comando (#start) para serem vinculados pelo número do Bot e começar a interagir.
✅ Se deixar o #start ativado, terá mais chances de interagir com a outra pessoa de forma anônima.
🚪 Se desejar sair do chat anônimo, use o seguinte comando: *#leave*
✅ Dessa forma, você deixará de estar no chat anônimo do Bot.
❗ Não nos responsabilizamos pelo mau uso dessa função do Bot.`;
            await this.sendMessage(m.chat, { text: anonimoinfoText }, { quoted: m });
            break;
        }
    }
}

handler.help = ['start', 'leave', 'next', 'anonimoinfo'];
handler.tags = ['chat'];
handler.command = ['start', 'leave', 'next', 'anonimoinfo'];
handler.private = false;

export default handler;