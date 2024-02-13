async function handler(m, { usedPrefix, command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return this.sendMessage(m.chat, { text: "[❗️] *Você não está em um chat anônimo.*"})
            m.reply("Você saiu do chat anônimo.")
            let other = room.other(m.sender) 
            if (other) await this.sendMessage(other, { text: "[❗️] *Seu parceiro saiu do chat.*"})
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return this.sendMessage(m.chat, { text: "🤔 *Você já está em um chat anônimo.*"})
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendMessage(room.a, { text: "🥳 *Um parceiro se juntou ao chat.*"})
                room.b = m.sender
                room.state = '_*CONVERSANDO!*_'
                await this.sendMessage(m.chat, { text: "🎉 *Você foi conectado a um chat anônimo.*"})
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: '*_PROCURANDO...*_',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendMessage(m.chat, { text: "🚦 _*Você está na fila para um chat anônimo, aguarde até alguem se conectar!*_ "})
            }
            break
        }
    }
}
handler.help = ['start', 'parar', 'proximo']
handler.tags = ['Chat']
handler.command = ['start', 'parar', 'proximo']
handler.private = false

module.exports = handler;