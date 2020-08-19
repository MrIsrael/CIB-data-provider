const puppeteer = require('puppeteer')

module.exports.scrapeUsdCop = async function(url) {
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

module.exports.scrapeNyseCib = async function(url) {
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

// URLs DE ACCESO:
// scrapeUsdCop('https://es.tradingview.com/symbols/USDCOP/')
// scrapeNyseCib('https://es.tradingview.com/symbols/NYSE-CIB/')
