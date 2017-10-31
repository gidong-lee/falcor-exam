// index.js
var falcor = require('falcor');
var express = require('express');
var FalcorHttpDatasource = require("falcor-http-datasource");
var app = express();


const FALCOR_SERVER_DOMAIN = 'http://localhost:9000';

var model = new falcor.Model({
  source: new FalcorHttpDatasource(`${FALCOR_SERVER_DOMAIN}/model.json`)
});


app.get('/productList.json', function (req, res) {
  const path = 'productList[0..1]["name", "id","sellerId", "seller"]["name", "like"]';
  model.get(path).then(function (respsone) {
    console.log(respsone);
    res.send(respsone.json);
  });
});


app.get('/productList2.json', function (req, res) {
  const path = 'productList[0..3]["name", "id","sellerId", "seller"]["name", "like"]';

  model.get(path).then(function (respsone) {
    res.send(respsone.json);
  });
});

app.use(express.static('public/compositePublic'));
var server = app.listen(8000);