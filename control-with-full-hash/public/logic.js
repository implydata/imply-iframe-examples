let view = 'dataCube'
let Defaulturl = 'http://localhost:9095/pivot/d/wikipedia/Wikipedia';
let splits = []
// Toggle between dashboard and dataCube
function show(show){
  splits = [];

  if(show) {
    view = 'dataCube';

    // Set DataCube default Url
    Defaulturl = 'http://localhost:9095/pivot/d/wikipedia/Wikipedia';

    path = '/mkurl-dataCube'
    document.getElementById('dropDown').style.display = 'block';
    document.getElementById('search').className = 'col-9';
  } else{
    view = 'dashboard'
    path = '/mkurl-dashboard'

    // Set Dashboard default Url
    Defaulturl = 'http://localhost:9095/pivot/c/b4d0/New_dashboard';

    document.getElementById('dropDown').style.display = 'none';
    document.getElementById('search').className = 'col-12';
  }
  document.getElementById('pivot').src = Defaulturl;
}

function setUrl(){
  const message = document.getElementById('input').value;
  let essence = {};
  if(view == 'dataCube') {
    essence = {
      dataCube: 'wikipedia',
      filter: {
        clauses: [
          {
            dimension: '__time',
            dynamic: {
              op: 'timeRange',
              operand: {
                op: 'ref',
                name: 'm'
              },
              duration: 'P1D',
              step: -1
            }
          },
          {
            dimension: 'page',
            action: 'overlap',
            exclude: false,
            values: {
              elements: [message]//User Inputs updates filter
            },
            "setType": "STRING",
          }
        ]
      },
      splits: splits,
      pinnedDimensions: [],
      timezone: 'Etc/UTC',
      selectedMeasures: ["count"]
    };
  } else{
    view = 'dashboard';
    essence = {
      dashboard: 'b4d0',
      filter: {
        clauses: [
          {
            dimension: 'page',
            action: 'overlap',
            exclude: false,
            values: {
              elements: [message],
              setType: 'STRING'
            }
          }
        ]
      },
      timezone: 'Etc/UTC',
      selectedMeasures: [],
      selectedPage: 'page'
    }
  }
  toFullHash(essence);
}

function setDimension(type){
  splits = [{
    dimension: (type.toLocaleLowerCase()),
    sortType: "measure",
    direction: "descending"
  }];

  // updated displayed dimension to selected dimension
  document.getElementById('dropdownMenuButton').textContent=type;
  emit()
}

function setDimension(type){
  splits = [{
    dimension: (type.toLocaleLowerCase()),
    sortType: "measure",
    direction: "descending"
  }];

  // updated displayed dimension to selected dimension
  document.getElementById('dropdownMenuButton').textContent=type;
  setUrl()
}

async function toFullHash(essence) {
  const value = tidyB64(LZString.compressToBase64(JSON.stringify(essence)));
  if( view === 'dataCube'){
    document.getElementById('pivot').src = 'http://localhost:9095/pivot/d/' + value ;
  } else{
    document.getElementById('pivot').src = 'http://localhost:9095/pivot/c/' + value ;
  }

}

function tidyB64(b64) {
  return b64.replace(/\+/g, '-').replace(/\//g, '_');
}
