const puppeteer = require("puppeteer");

module.exports = (function () {
  const service = {};

  service.initializeBrowser = async function (stockCode) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await Promise.all([
      page.setExtraHTTPHeaders({
        "Accept-Language": "en",
      }),
      page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
      ),
      page.setDefaultNavigationTimeout(0),
      page.goto(`https://finviz.com/quote.ashx?t=${stockCode}`, {
        waitUntil: "networkidle0",
      }),
    ]);

    return [browser, page];
  };
  return service;
})();
