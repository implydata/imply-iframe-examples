const axios = require('axios');

const express = require('express');
const request = require('request-promise-native');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(express.static('public'));

app.use(express.json());

const headers = {
    "Content-Type":"application/json",
    "x-imply-api-token":"1a1b1cf8-fc83-495d-94d9-27f22836b81b"
}
let url;


app.post("/mkurl", function (req, res) {
    const essence = {
        "dataCube": "druid_wikipedia",
        "filter": {
            "clauses": [
                {
                    "dimension": "__time",
                    "dynamic": {
                        "op": "timeRange",
                        "operand": {
                            "op": "ref",
                            "name": "m"
                        },
                        "duration": "P1D",
                        "step": -1
                    }
                },
                {
                    "dimension": "page",
                    "action" : "overlap",
                    "exclude": false,
                    "values": {
                        "elements" : [req.input]
                    },
                    "setType": "STRING",
                }
            ]
        },
        timezone: "Etc/UTC",
        "splits": [],
        "pinnedDimensions": [],
        "settingsVersion" : null,
        "visualization": "totals"
    }

  axios({
      url: 'http://localhost:9095/api/v1/mkurl',
      method: 'post',
      headers: headers,
      data : {"domain": "http://localhost:9095", "essence": essence}
  }).then(function (response) {
      url = response.data.url;
  })
      .catch(function (error) {
      });
  res.send({
    "url": url
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
