const express = require('express')
const router = express.Router()

const redis = require("redis")
const client = redis.createClient()

const { promisify } = require('util')
const get_keys = promisify(client.keys).bind(client)
const smembers = promisify(client.smembers).bind(client)
const hmget = promisify(client.hmget).bind(client)

const async_middleware = require('../utils/middleware');

router.get('/', async_middleware(async (req, res, next) => {
  res.json({ 'title': 'Found the API' })
}))

router.get('/categories', async_middleware(async (req, res, next) => {

  client.smembers('categories', (err, categories) => {
    res.json(categories)
  })

}))

router.get('/photos/:category', async_middleware(async (req, res, next) => {

  const category = req.params.category

  let photos = []

  const keys = await get_keys('image:*:categories')

  for (let key of keys) {

    const categories = await smembers(key)

    if (categories.includes(category)) {

      const key_data = key.split(':')
      const img_num  = key_data[1]

      const img_data = await hmget(`image:${img_num}`, ['src', 'width', 'height'])

      const photo = {
        src: img_data[0],
        width: parseInt(img_data[1], 10),
        height: parseInt(img_data[2], 10),
        categories: categories
      }

      photos.push(photo)

    }
  }

  res.json(photos)

}))

module.exports = router
