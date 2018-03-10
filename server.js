const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const request = require('request');

app.use(express.static(path.join(__dirname, "public")));

app.get('/api/:service', (req, res) => {
  let microservices = {
    'relatedProduct': 'http://localhost:8001/bundle.js',
    'reviewSection': 'http://localhost:8002/bundle.js',
    'productComparison': 'http://localhost:8003/product/:id/bundle.js',
    'itemDetail': 'http://localhost:8004/bundle.js',
  };

  request(microservices[req.params.service], (err, response, body) => {
    if (err) {
      console.log('Microservice request error: ', err);
      res.send(err);
    } else {
      res.send(body);
    }
  });
});

app.use('/product/:id', express.static(path.join(__dirname, "public")))

app.listen(port, () => {
  console.log(`Proxy server listening on http://localhost:${port}`);
});