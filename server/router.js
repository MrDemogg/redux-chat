const express = require('express')
const router = express.Router()
const fsHandler = require('./fsHandler')

router.post('/messages', (req, res) => {
  fsHandler.postMessage(req.body, res).then()
})

router.get('/messages', (req, res) => {
  if (req.query.datetime === '') {
    fsHandler.getMessages(res, 'null')
  } else {
    fsHandler.getMessages(res, req.query.datetime)
  }
})

module.exports = router