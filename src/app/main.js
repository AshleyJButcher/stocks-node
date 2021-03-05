const yahooStockPrices = require('yahoo-stock-prices')
const Influx = require('influx');
const fs = require('fs');

let rawdata = fs.readFileSync('info.json');
let Stonk = JSON.parse(rawdata);
const influx = new Influx.InfluxDB('http://192.168.1.237:8086/STONKS')

function myFunc(arg) {
    Stonk.forEach(element => {
        const Symbol = element.Symbol;
        yahooStockPrices.getCurrentPrice(element.Symbol).then((price) => {
            influx.writePoints([
                {
                  measurement: "marketprices",
                  tags: {
                    symbol: element.symbol,
                  },
                  fields: { price: price, symbol: Symbol }
                }
         ]);
        });
    });
    console.log("tick");
    setTimeout(myFunc, 5000);
  }
  
 myFunc();
