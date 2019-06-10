const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;

// Update API token here
const IMPLY_API_TOKEN = "b2c9b5cd-84c6-4219-9556-8eef5e52a5fb";

app.use(express.static('public'));
app.use(express.json());

// Get url for datacube view
app.post("/mkurl-datacube", async function (req, res) {

  //Add user selected dimension to splits
  let splits =[];
  if(req.body.dimension) {
    splits = [{
      dimension: (String(req.body.dimension).toLocaleLowerCase()),
      sortType: "measure",
      direction: "descending"
    }];
  }

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
        }
      ]
    },
    "timezone": "Etc/UTC",
    "splits": splits,
    "pinnedDimensions": [],
    "selectedMeasures": ["count"],
    "settingsVersion": null,
    "visualization": req.body.dimension ? "table": "totals"
  };

  //Use user input to add a page filter
  if(req.body.filterValue){
    essence.filter.clauses.push({
      "dimension": "page",
      "action": "overlap",
      "exclude": false,
      "values": {
        "elements": [String(req.body.filterValue)]//User Inputs updates filter
      },
      "setType": "STRING",
    });
  }

  // Send request to imply-ui api endpoint
  let response;
  try{
    response = await axios({
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
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: 'could not make url'
    });
    return
  }

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

// Get url for dashboard view
app.post("/mkurl-dashboard", async function (req, res) {
  // Set request essence
  const essence = {
    "dashboard": "909c",
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
    "selectedPage": "page"
  };

  //Send request to imply-ui api endpoint
  let response;
  try {
    response = await axios({
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
  } catch (e) {
    console.error(e);
    res.status(500).send({
      error: 'could not make url'
    });
    return
  }


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
