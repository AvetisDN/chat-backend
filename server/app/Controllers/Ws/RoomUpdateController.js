'use strict'

class RoomUpdateController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log('new subscriber')
  }

  onMessage(message) {
    console.log(message);
    
  }

  onClose() {
    console.log('subsription closed')
  }

}

module.exports = RoomUpdateController
