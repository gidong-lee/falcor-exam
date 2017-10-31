// index.js
var falcor = require('falcor');
var Router = require('falcor-router');
var falcorExpress = require('falcor-express');
var express = require('express');
var app = express();
var ProductService = require('./src/Service/ProductService');
var SellerService = require('./src/Service/SellerService');


var $ref = falcor.Model.ref;
var $atom = falcor.Model.atom;
var $error = falcor.Model.error;

const SERVER_DOMAIN = 'http://localhost:10000';


const productService = new ProductService(SERVER_DOMAIN);
const sellerService = new SellerService(SERVER_DOMAIN);

/*
  Falcor Route를 사용하여 DataSource를 구현한다.
  뒤단 REST API를 호출하여 데이타를 가져와서 형식에 맞게 리턴.
 */
app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  return new Router([
    {
      route: 'productList[{ranges:indexRanges}]["id","name","sellerId","seller"]',
      get: async function (pathSet) {
        const keys = pathSet[2];
        const {from} = pathSet[1][0];

        const results = [];
        const productList = (await productService.getProductList(pathSet)).data;


        productList.forEach((product, index) => {
          keys.forEach(key => {
            /*
              조회값에 Seller가 있고 sellerId가 있는경우 sellerById[sellerId]로 레퍼런스를 걸어준다
             */
            if (!!product.sellerId && key === "seller") {
              product.seller = $ref(["sellerById", product.sellerId]);
            }

            const value = !!product[key] ? product[key] : $error("has no data");

            results.push({
              path: ["productList", from + index, [key]], value
            });
          })

        });
        console.log("productList results", results);

        return results;
      }
    }, {
      route: 'sellerById[{integers:ids}]["id","name","like"]',
      get: async function (pathSet) {
        console.log("sellerById pathSet", pathSet)
        const keys = pathSet[2];
        const ids = pathSet[1];

        const results = [];

        for (const id of ids) {
          const seller = (await sellerService.getSeller(id)).data;

          keys.forEach(key => {
            results.push({path: ["sellerById", id, key], value: seller[key]});
          });
        }

        console.log("sellerById results", results);
        return results;
      }
    }
  ]);
}));


/*

  Falcor Route를 사용하여 DataSource를 구현한다.
 */
app.use('/model2.json', falcorExpress.dataSourceRoute(function (req, res) {
  return new falcor.Model(
    {
      cache: {
        productList: [
          {
            id: 100,
            name: "생수",
            sellerId: 10000,
            seller: $ref("sellerById[10000]")
          },
          {
            id: 200,
            name: "맥스 커피",
            sellerId: 10000,
            seller: $ref("sellerById[10000]")
          },
          {
            id: 300,
            name: "녹차",
            sellerId: 10000,
            seller: $ref("sellerById[20000]")
          },
          {
            id: 400,
            name: "홍차",
            sellerId: 20000,
            seller: $ref("sellerById[20000]")
          }
        ],
        sellerById: {
          "10000": {
            id: 10000,
            name: "물장수",
            like: false
          },
          "20000": {
            id: 20000,
            name: "커피장수",
            like: false
          }
        }
      }
    }
  ).asDataSource();
}));

app.use(express.static('public/falcorPublic'));
var server = app.listen(9000);
