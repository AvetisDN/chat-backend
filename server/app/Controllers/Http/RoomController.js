'use strict'

const { v4: uuidv4 } = require('uuid')

const Room = use('App/Models/Room')

const { broadcast } = require('../../utils/socket.utils')

class RoomController {
    async fetch({ params, response }) {
        const rooms = await Room.query().fetch();
        return rooms;
    }
    async select({ params, response }) {
        const room = await Room
                            .query()
                            .where('uuid', params.id)
                            .with('messages')
                            .first()
        if(!room) {
            return response.notFound(`Room ${params.id} doesn't exist`)
        }

        return room;
    }

    async create() {
        const room = new Room();
        const newUuid = uuidv4();
        room.uuid = newUuid;
        await room.save()
        return Room.find(newUuid)
    }

    async createMessage({params, request, response}) {
        const room = await Room.query().where('uuid', params.id).first()
        if(!room) {
            return response.notFound(`Room ${params.id} doesn't exist`)
        }
        const data = request.only(['name', 'message'])
        const message = await room.messages().create(data)
        broadcast(room.uuid, 'room:newMessage', message)

        return message
    }
}

module.exports = RoomController
