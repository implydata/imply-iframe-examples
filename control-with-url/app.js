const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;

// Update API token here
const IMPLY_API_TOKEN = "a4851b4c-ace7-48d9-b36d-be48386a4786";

app.use(express.static('public'));
app.use(express.json());

app.post("/mkurl", async function (req, res) {

  //Add user selected dimension to splits
  let splits =[];
  if(req.body.dimension) {
    splits = [{
      dimension: (String(req.body.dimension).toLocaleLowerCase()),
      sortType: "measure",
      direction: "descending"
    }];
  }

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
          "action": "overlap",
          "exclude": false,
          "values": {
            "elements": [String(req.body.filterValue)]//User Inputs updates filter
          },
          "setType": "STRING",
        }
      ]
    },
    "timezone": "Etc/UTC",
    "splits": splits,
    "pinnedDimensions": [],
    "selectedMeasures": ["count"],
    "settingsVersion": null,
    "visualization": "table"
  };

  // Send request to imply-ui api endpoint
  let response = await axios({
    url: 'http://localhost:9095/api/v1/mkurl',
    method: 'post',
    headers: {
      "x-imply-api-token": IMPLY_API_TOKEN
    },
    data: {
      domain: "http://localhost:9095",
      essence: essence
    }
  });

  // Update and send URL
  let url = response.data.url;
  if (url) {
    res.send({
      url: url
    });
  } else {
    // If no URL return error
    res.status(500).send({
      error: 'could not make url'
    });
  }
});

app.listen(port, () => {
  console.log(`control-with-url example listening on port ${port}!`);
});
