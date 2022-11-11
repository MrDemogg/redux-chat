const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const fsHandler = {
  error: {
    errorGuilt: 'server',
    message: null
  },
  postMessage: async (request, response) => {
    let uniqueId = uuidv4()
    let error = false
    if (request.author && request.message) {
      if (request.author.length !== 0 && request.message !== 0) {
        try {
          while (fs.existsSync(`./server/messages/${uniqueId}.json`)) {
            uniqueId = uuidv4()
          }
          const writeData = {
            id: uniqueId,
            message: request.message,
            author: request.author,
            datetime: new Date().toISOString()
          }
          fs.writeFileSync(`./server/messages/${uniqueId}.json`, JSON.stringify(writeData))
          response.status(200).send('success')
        } catch (e) {
          fsHandler.error.message = e.message
          response.status(500).send(fsHandler.error)
        }
      } else {
        error = true
      }
    } else {
      error = true
    }
    if (error) {
      fsHandler.error.errorGuilt = 'user'
      fsHandler.error.message = 'Вы не указали автора, либо отправили пустое сообщение'
      response.status(400).send(fsHandler.error)
    }
  },
  getMessages: (response, datetime = null) => {
    const messages = []
    try {
      fs.readdir('./server/messages', async (err, files) => {
        for (let i = 0; i < files.length; i++) {
          const fileData = await JSON.parse(fs.readFileSync(`./server/messages/${files[i]}` ).toString())
          messages.push(fileData)
        }
        let sortedMessages
        sortedMessages = messages.sort((a, b) => {
          return new Date(b.datetime) - new Date(a.datetime)
        })
        if (datetime) {
          let datetimeIsValid = false
          for (let i = 0; i < sortedMessages.length; i++) {
            if (sortedMessages[i].datetime === datetime) {
              datetimeIsValid = true
            }
          }
          if (datetimeIsValid) {
            const messagesFromDatetime = sortedMessages.slice(0, sortedMessages.indexOf(datetime))
            response.status(200).send(messagesFromDatetime.reverse())
          } else {
            fsHandler.error.errorGuilt = 'user'
            fsHandler.error.message = 'Указанной даты нет в базе данных'
            response.status(400).send(fsHandler.error)
          }
        } else {
          response.status(200).send(sortedMessages.slice(0, 30).reverse())
        }
      })
    } catch (e) {
      fsHandler.error.message = e.message
      response.status(500).send(fsHandler.error)
    }
  }
}

module.exports = fsHandler
