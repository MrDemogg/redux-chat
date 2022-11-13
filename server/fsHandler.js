const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const fsHandler = {
  error: null,
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
            datetime: new Date().toLocaleString()
          }
          fs.writeFileSync(`./server/messages/${uniqueId}.json`, JSON.stringify(writeData))
          response.status(200).send('success')
        } catch (e) {
          fsHandler.error = e.message
          response.status(500).send(fsHandler.error)
        }
      } else {
        error = true
      }
    } else {
      error = true
    }
    if (error) {
      fsHandler.error = 'Вы не указали автора, либо отправили пустое сообщение'
      response.status(400).send(fsHandler.error)
    }
  },
  getMessages: (response, datetime = 'null') => {
    const messages = []
    try {
      fs.readdir('./server/messages', async (err, files) => {
        for (let i = 0; i < files.length; i++) {
          if (files[i] !== '.gitkeep') {
            const fileData = await JSON.parse(fs.readFileSync(`./server/messages/${files[i]}`).toString())
            messages.push(fileData)
          }
        }
        const sortedMessages = messages
          .map(n => {
            return [ n.datetime, {...n, datetime: +new Date(n.datetime.replace(/(\d+)\.(\d+)\.(\d+),/, '$3-$2-$1'))} ]
          })
          .sort((a, b) => {
            console.log(a[1].datetime - b[1].datetime)
            return a[1].datetime - b[1].datetime
          })
          .map(n => {
            return {...n[1], datetime: n[0]}
          });
        if (datetime !== 'null') {
          let datetimeIsValid = false
          let datetimeIndex = 0
          for (let i = 0; i < sortedMessages.length; i++) {
            if (sortedMessages[i].datetime === datetime) {
              datetimeIndex = i
              datetimeIsValid = true
              i += sortedMessages.length
              break;
            }
          }
          if (datetimeIsValid) {
            const messagesFromDatetime = sortedMessages.slice(datetimeIndex)
            response.status(200).send(messagesFromDatetime)
          } else {
            fsHandler.error = 'Указанной даты нет в базе данных'
            response.status(400).send(fsHandler.error)
          }
        } else {
          response.status(200).send(sortedMessages.slice(0, 30))
        }
      })
    } catch (e) {
      fsHandler.error = e.message
      response.status(500).send(fsHandler.error)
    }
  }
}

module.exports = fsHandler
