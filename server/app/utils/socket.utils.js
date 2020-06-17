const Ws = use('Ws')

function broadcast(id, type, data) {
    const channel = Ws.getChannel('room:*')

    if(!channel) return

    const topic = channel.topic(`room:${id}`)
    if(!topic) return

    topic.broadcastToAll(`message`, {
        type,
        data
    })
}

module.exports = {
    broadcast
}