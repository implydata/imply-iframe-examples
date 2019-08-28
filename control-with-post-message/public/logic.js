let data = {}
let view = 'dataCube'
let name = 'wikipedia'
let splits = [];
let url = 'http://localhost:9095/pivot/d/wikipedia/Wikipedia';

// Toggle between dashboard and dataCube
function show(show){
  request = {}
  if(show) {
    view = 'dataCube';

    // Set DataCube default Url
    url = 'http://localhost:9095/pivot/d/wikipedia/Wikipedia';
    name = 'wikipedia'
    document.getElementById('dropDown').style.display = 'block';
    document.getElementById('search').className = 'col-9';
  } else{
    view= 'dashboard'

    // Set Dashboard default Url
    url = 'http://localhost:9095/pivot/c/b4d0/New_dashboard';
    name = 'b4d0'

    document.getElementById('dropDown').style.display = 'none';
    document.getElementById('search').className = 'col-12';
  }
  sendPostMessage();
}

function setDimension(type){
  splits = [{
    dimension: (type.toLocaleLowerCase()),
    sortType: "measure",
    direction: "descending"
  }];

  // updated displayed dimension to selected dimension
  document.getElementById('drop-down-menu-button').textContent=type;
  sendPostMessage();
}

function sendPostMessage() {
  let essence ;
  let message = document.getElementById('input').value;
  if(data.view == 'dataCube'){
    essence = {
      "dataCube": "wikipedia",
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
              "elements": [message]//User Inputs updates filter
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
        "visualization":  splits.length ? "table":"totals"
    }
  } else {
     essence = {
      "dashboard": "b4d0",
      "filter": {
        "clauses": [
          {
            "dimension": "page",
            "action": "overlap",
            "exclude": false,
            "values": {
              "elements": [message]//User Inputs updates filter
            },
            "setType": "STRING",
          }
        ]
      },
      "timezone": "Etc/UTC",
      "selectedMeasures": [],
      "selectedPage": "page"
  }

}
  data= {
    view: view,
    url: url,
    name: name,
    action: 'changeEssence',
    parameters: essence
  }


  // Set New Src
  document.getElementById('pivot').contentWindow.postMessage(data, data.url);
}


