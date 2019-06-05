const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;

// Update API token here
const IMPLY_API_TOKEN = "07d1e9c0-18fb-41e8-909e-0043c8a1e56d";

app.use(express.static('public'));
app.use(express.json());

app.post("/mkurl", async function (req, res) {
  // Set request essence
  const essence = {
    "dashboard": "7c9e",
    "filter": {
      "clauses": [
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
    "selectedMeasures": [],
    "selectedPage": "page",
    "settingsVersion'": 1559765913347
  };

  //Send request to imply-ui api endpoint
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
