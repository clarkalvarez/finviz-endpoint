const { initializeBrowser } = require("./initializeBrowser");

module.exports = (function () {
  const service = {};
  service.stockInfo = async function (stockCode) {
    const [browser, page] = await initializeBrowser(stockCode);

    let stockDetails = await page.evaluate(() => {
      const marketCap = Array.from(
        document.querySelectorAll(
          ".snapshot-table2 tbody tr:nth-child(2) td:nth-child(2) b"
        )
      ).map((x) => x.textContent.trim())[0];

      const prevClose = Array.from(
        document.querySelectorAll(
          ".snapshot-table2 tbody tr:nth-child(10) td:nth-child(12) b"
        )
      ).map((x) => x.textContent.trim())[0];

      const avgVolume = Array.from(
        document.querySelectorAll(
          ".snapshot-table2 tbody tr:nth-child(11) td:nth-child(10) b"
        )
      ).map((x) => x.textContent.trim())[0];

      const price = Array.from(
        document.querySelectorAll(
          ".snapshot-table2 tbody tr:nth-child(11) td:nth-child(12) b"
        )
      ).map((x) => x.textContent.trim())[0];

      const volume = Array.from(
        document.querySelectorAll(
          ".snapshot-table2 tbody tr:nth-child(12) td:nth-child(10) b"
        )
      ).map((x) => x.textContent.trim())[0];

      const change = Array.from(
        document.querySelectorAll(
          ".snapshot-table2 tbody tr:nth-child(12) td:nth-child(12) b"
        )
      ).map((x) => x.textContent.trim())[0];

      const changeColor = document.querySelector(
        ".snapshot-table2 tbody tr:nth-child(12) td:nth-child(12) b span"
      ).classList;

      return {
        marketcap: {
          value: marketCap,
        },
        prevClose: {
          value: prevClose,
        },
        avgVolume: {
          value: avgVolume,
        },
        price: {
          value: price,
        },
        volume: {
          value: volume,
        },
        change: {
          value: change,
        },
        changeColor: {
          value: changeColor,
        },
      };
    });

    //get image chart
    const chart = await page.$(".interactive-chart");
    const imageChart = await chart.screenshot({ encoding: "base64" });
    stockDetails["image"] = { value: imageChart };

    await browser.close();
    return stockDetails;
  };
  return service;
})();
