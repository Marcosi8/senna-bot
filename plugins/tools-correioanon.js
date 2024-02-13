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