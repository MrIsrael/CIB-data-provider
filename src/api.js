// Dependencies
const express = require('express')
const serverless = require('serverless-http')
const puppeteer = require('puppeteer')
// const scraper = require('./scrapers')

// Required statements to properly use Express framework
const app = express()
const router = express.Router()
// app.use(express.json())

// Functions
scrapeUsdCop = async function(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [el] = await page.$x('//*[@id="anchor-page-1"]/div/div[3]/div[1]/div/div/div/div[1]/div[1]/span/text()')
  const txt = await el.getProperty('textContent')
  const usd_cop = await txt.jsonValue()
 
  browser.close()
  // console.log({usd_cop})
  return ({usd_cop})
}

scrapeNyseCib = async function(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [el] = await page.$x('//*[@id="anchor-page-1"]/div/div[3]/div[1]/div/div/div/div[1]/div[1]/span')
  const txt = await el.getProperty('textContent')
  const nyse_cib = await txt.jsonValue()

  browser.close()
  // console.log({nyse_cib})
  return ({nyse_cib})
}

// Endpoints
router.get('/', (req, res) => {
  res.send('This is the CIB-data-provider entry endpoint. To get real time data, send your GET request to: /data.')
})

router.get('/data', async (req, res) => {
  let data = []
  data[0] = await scrapeUsdCop('https://es.tradingview.com/symbols/USDCOP/')
  data[1] = await scrapeNyseCib('https://es.tradingview.com/symbols/NYSE-CIB/')
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
