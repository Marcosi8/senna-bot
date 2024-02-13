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
            if (other) {
                if (m.isGroup) {
                    await this.sendMessage(other, { text: "[❗️] *Seu parceiro saiu do chat.*"}, { quoted: m })
                } else {
                    await this.sendMessage(other, "[❗️] *Seu parceiro saiu do chat.*")
                }
            }
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendMessage(m.chat, { text: "🤔 *Você já está em um chat anônimo.*"}, { quoted: m })
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                if (m.isGroup) {
                    await this.sendMessage(room.a, { text: "🥳 *Um parceiro se juntou ao chat.*"}, { quoted: m })
                } else {
                    await this.sendMessage(room.a, "🥳 *Um parceiro se juntou ao chat.*")
                }
                room.b = m.sender
                room.state = 'CHATTING'
                if (m.isGroup) {
                    await this.sendMessage(m.chat, { text: "🎉 *Você foi conectado a um chat anônimo.*"}, { quoted: m })
                } else {
                    await this.sendMessage(m.chat, "🎉 *Você foi conectado a um chat anônimo.*")
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
                if (m.isGroup) {
                    await this.sendMessage(m.chat, { text: "🚦 _*Você está na fila para um chat anônimo, aguarde até alguém se conectar!*_ "}, { quoted: m })
                } else {
                    await this.sendMessage(m.chat, "🚦 _*Você está na fila para um chat anônimo, aguarde até alguém se conectar!*_ ")
                }
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