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
    let news = {
      [stockCode]: {},
    };
    let currentDate;
    firstRow.map((e, i) => {
      const newsSplit = e.split(" ");
      let date;
      let time;
      if (newsSplit.length === 2) {
        date = newsSplit[0];
        time = newsSplit[1];
        currentDate = date;
      } else {
        date = currentDate;
        time = newsSplit[0];
      }
      const timeObj = {
        [time]: {
          title: secondrow[i],
          link: rowHref[i],
        },
      };
      news[stockCode][date] = Object.assign(timeObj, news[date]);
    });
    return await news;
  };
  return service;
})();
