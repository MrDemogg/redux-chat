const fs = require('fs')
const { uuidv } = require('uuidv4')

const fsHandler = {
  error: {
    errorGuilt: 'server',
    message: null
  },
  postMessage: async (request, response) => {
    let uniqueId = uuidv()
    if (request.author && request.message) {
      if (request.author.length > 0 && request.message.length > 0) {
        try {
          while (fs.existsSync(`./server/messages/${uniqueId}.json`)) {
            uniqueId = uuidv()
          }
          const writeData = {
            id: uniqueId,
            message: request.message,
            author: request.author,
            datetime: new Date().toISOString()
          }
          fs.writeFileSync(`./server/messages/${id}.json`, JSON.stringify(writeData))
        } catch (e) {
          fsHandler.error.message = e.message
          response.status(500).send(fsHandler.error)
        }
      } else {
        fsHandler.error.errorGuilt = 'user'
        fsHandler.error.message = 'Вы не указали автора, либо отправили пустое сообщение'
        response.status(400).send(fsHandler.error)
      }
    }
  }
}

module.exports = fsHandler
