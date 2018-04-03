const express = require('express')
const router = express.Router()

const redis = require("redis")
const client = redis.createClient()

const async_middleware = require('../utils/middleware');

router.get('/', async_middleware(async (req, res, next) => {
  res.json({ 'title': 'Found the API' })
}))

router.get('/categories', async_middleware(async (req, res, next) => {

  client.smembers('categories', (err, categories) => {
    res.json(categories)
  })

}))

module.exports = router
