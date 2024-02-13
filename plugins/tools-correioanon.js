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
                await this.sendMessage(m.chat, { text: "🚦 _*Você está na fila para um chat anônimo, aguarde até alguem se conectar!*_ "}, { quoted: m })
            }
            // Envie a mensagem para todos os grupos
            let groups = Object.values(this.chats).filter(chat => chat.jid.endsWith('@g.us'))
            for (let group of groups) {
                await this.sendMessage(group.jid, { text: "🎉 *Alguém entrou em um chat anônimo!*"})
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['chat']
handler.command = ['start', 'leave', 'next']
handler.private = false
export default handler