const express = require("express");
const { news } = require("./news");
const { stockInfo } = require("./stockInfo");
const app = express();
const PORT = 3000;

app.get("/news", async (req, res) => {
  const stockCode = req.query.stockCode;
  const response = await news(stockCode);
  res.send(response);
});

app.get("/stockInfo", async (req, res) => {
  const stockCode = req.query.stockCode;
  const response = await stockInfo(stockCode);
  res.send(response);
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
