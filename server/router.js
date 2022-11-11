const express = require('express')
const router = express.Router()
const fsHandler = require('./fsHandler')

router.post('/message', (req, res) => {
  fsHandler.postMessage(req.body, res).then()
})

module.exports = router