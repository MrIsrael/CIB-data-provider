// Dependencies
const express = require('express')
const serverless = require('serverless-http')
const scraper = require('./scrapers')

// Required statements to properly use Express framework
const app = express()
const router = express.Router()
// app.use(express.json())

// Endpoints
router.get('/', (req, res) => {
  res.send('This is the CIB-data-provider entry endpoint. To get real time data, send your GET request to: /data.')
})

router.get('/data', async (req, res) => {
  let data = []
  data[0] = await scraper.scrapeUsdCop('https://es.tradingview.com/symbols/USDCOP/')
  data[1] = await scraper.scrapeNyseCib('https://es.tradingview.com/symbols/NYSE-CIB/')
  res.send(data)
})

// Bind the router into the app (instance of Express created above):
app.use('/.netlify/functions/api', router)

// In order for the lambda to run, a handler function needs to be exported:
module.exports.handler = serverless(app)

// Endpoints (old)
// app.get('/api/data', async (req, res) => {
//   let data = []
//   data[0] = await scraper.scrapeUsdCop('https://es.tradingview.com/symbols/USDCOP/')
//   data[1] = await scraper.scrapeNyseCib('https://es.tradingview.com/symbols/NYSE-CIB/')
//   res.send(data)
// })
