const express = require('express')
const router = express.Router()

const async_middleware = require('../utils/middleware');

router.get('/', async_middleware(async (req, res, next) => {
  res.json({ 'title': 'Found the API' })
}))

module.exports = router
