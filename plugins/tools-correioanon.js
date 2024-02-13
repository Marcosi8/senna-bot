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
                room.b = m.sender
                room.state = 'WAITING'
                await this.sendMessage(m.chat, { text: "🎉 *Você foi conectado a um chat anônimo.*"}, { quoted: m })

                // Broadcast message to groups
                let groups = ['120363230195203225@g.us']; // Adicionei o ID do grupo fornecido à lista de grupos
                let message = `🔔 *Notificação de Chat Anônimo* 🔔\n\nAlguém entrou na sessão de chat anônimo neste grupo.`
                for (let groupId of groups) {
                    await this.sendMessage(groupId, { text: message });
                }
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'CHATTING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendMessage(m.chat, { text: "🚦 _*Você está na fila para um chat anônimo, aguarde até alguem se conectar!*_ "}, { quoted: m })
            }
            break
        }
        case 'infoanonimo': { // Nova case para mostrar informações sobre o chat anônimo
            let infoText = "*O chat Anônimo funciona apenas no privado do Bot.*\n\n👥 Consiste em usar o número do Bot para falar com outras pessoas, ou seja, as duas pessoas estarão escrevendo ao mesmo tempo no chat privado do Bot, dessa forma, nenhuma 🔒 das duas pessoas pode ver o número, foto, usuário, descrição, etc...🔒\n\n✨ Para usar essa função, siga estas etapas:\n⚡️ Acesse o chat privado do Bot\n⚡️ Digite o seguinte comando: *#start*\n\n✅ Depois de fazer isso, basta ter paciência até que outra pessoa use o mesmo comando (#start) para serem vinculados pelo número do Bot e começar a interagir.\n\n✅ Se deixar o #start ativado, terá mais chances de interagir com a outra pessoa de forma anônima.\n\n🚪 Se desejar sair do chat anônimo, use o seguinte comando: *#leave*\n✅ Dessa forma, você deixará de estar no chat anônimo do Bot.\n\n❗ Não nos responsabilizamos pelo mau uso dessa função do Bot"
            await this.sendMessage(m.chat, { text: infoText }, { quoted: m })
            break
        }
    }
}
handler.help = ['start', 'parar', 'proximo', 'infoanonimo'] // Adicionado 'infoanonimo' ao help
handler.tags = ['Chat']
handler.command = ['start', 'parar', 'proximo', 'infoanonimo'] // Adicionado 'infoanonimo' aos comandos
handler.private = false
export default handler