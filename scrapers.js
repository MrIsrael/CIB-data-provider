const puppeteer = require('puppeteer')

async function scrapeUsdCop(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [el] = await page.$x('//*[@id="anchor-page-1"]/div/div[3]/div[1]/div/div/div/div[1]/div[1]/span/text()')
  const txt = await el.getProperty('textContent')
  const usd_cop = await txt.jsonValue()

  console.log({usd_cop})

  browser.close()
}

async function scrapeNyseCib(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [el] = await page.$x('//*[@id="anchor-page-1"]/div/div[3]/div[1]/div/div/div/div[1]/div[1]/span')
  const txt = await el.getProperty('textContent')
  const nyse_cib = await txt.jsonValue()

  console.log({nyse_cib})

  browser.close()
}

scrapeUsdCop('https://es.tradingview.com/symbols/USDCOP/')
scrapeNyseCib('https://es.tradingview.com/symbols/NYSE-CIB/')
