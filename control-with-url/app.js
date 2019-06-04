const axios = require('axios');
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post("/mkurl", async function (req, res) {

  // Set request headers
  const headers = {
    "Content-Type":"application/json",
    // Update Api token here
    "x-imply-api-token":"1a1b1cf8-fc83-495d-94d9-27f22836b81b"
  };

  // Set request essence
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
            //User Inputs updates filter
            "elements" : [String(req.body.input)]
          },
          "setType": "STRING",
        }
      ]
    },
    "timezone": "Etc/UTC",
    "splits": [],
    "pinnedDimensions": [],
    "selectedMeasures": ["count"],
    "settingsVersion" : null,
    "visualization": "totals"
  }

  // Send request to imply-ui api endpoint
  let response = await axios({
    url: 'http://localhost:9095/api/v1/mkurl',
    method: 'post',
    headers: headers,
    data : {"domain": "http://localhost:9095", "essence": essence}
  })

  // Update and send Url
  let url = response.data.url;
  if (url) {
    res.send({
      "url": url
    });
  }
  // If no url return error
  else {
    res.status(500).send({
      error: 'could not make url'
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
