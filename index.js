const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const { url, table_body_selector, table_head_selector } = require("./utlis");

const app = express();
const port = 3000;

axios
  .get(url)
  .then(res => {
    getData(res.data);
  })
  .catch(err => {
    err;
  });
function getData(html) {
  const $ = cheerio.load(html);
  let tableData = [];
  let dataObj = {};
  let headerCount = 0;
  let headers = [];
  // stores the table headers
  $(table_head_selector).each((i, elem) => {
    headers.push($(elem).text());
  });
  // stores the table data
  $(table_body_selector).each((i, elem) => {
    if (i % headers.length === 0) {
      i != 0 ? tableData.push(dataObj) : null;
      headerCount = 0;
      dataObj = {};
    }
    dataObj[headers[headerCount++]] = $(elem).text();
  });
  return tableData;
}
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
