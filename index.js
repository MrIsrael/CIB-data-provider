// Dependencies
const express = require('express')
const scraper = require('./scrapers')

// Required statements to properly use Express framework
const app = express()
app.use(express.json())

// Endpoints
app.get('/', (req, res) => {
  res.send('This is the CIB-data-provider entry endpoint. To get real time data, send your GET request to: /api/data.')
})

app.get('/api/data', async (req, res) => {
  let data = []
  data[0] = await scraper.scrapeUsdCop('https://es.tradingview.com/symbols/USDCOP/')
  data[1] = await scraper.scrapeNyseCib('https://es.tradingview.com/symbols/NYSE-CIB/')
  res.send(data)
})

// Listen to port
const port = process.env.port || 3500
app.listen(port, () => console.log(`Listening to port ${port}...`))
