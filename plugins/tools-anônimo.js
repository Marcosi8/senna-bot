export async function before(m, { match }) {
    this.anonymous = this.anonymous ? this.anonymous : {}
    let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
    if (room) {
        if (/^.*(next|leave|start)/.test(m.text))
            return
        let other = [room.a, room.b].find(user => user !== m.sender)
        await this.sendMessage(m.chat, { text: m.text }, { quoted: m })
    }
    return !0
}