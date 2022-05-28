const { initializeBrowser } = require("./initializeBrowser");

module.exports = (function () {
  const service = {};
  service.news = async function (stockCode) {
    const [browser, page] = await initializeBrowser(stockCode);

    const firstRow = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("#news-table tbody tr td:first-child")
      ).map((x) => x.textContent.trim());
    });

    const secondrow = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("#news-table tbody tr td:nth-child(2)")
      ).map((x) => x.textContent.trim());
    });

    const rowHref = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(
          "#news-table tbody tr td:nth-child(2) .news-link-container .news-link-left a[href]"
        )
      ).map((a) => a.getAttribute("href"));
    });

    await browser.close();

    const news = firstRow.map((e, i) => [e, secondrow[i], rowHref[i]]);
    return await news;
  };
  return service;
})();
