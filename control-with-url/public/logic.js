let request = {}
let view = 'dataCube'
let Defaulturl = 'http://localhost:9095/pivot/d/druid_wikipedia';
let path = '/mkurl-datacube'

// Toggle between dashboard and datacube
function show(show){
  request = {}
  if(show) {
    view = 'dataCube';

    // Set DataCube default Url
    Defaulturl = 'http://localhost:9095/pivot/d/druid_wikipedia';

    path = '/mkurl-datacube'
    document.getElementById('dropDown').style.display = 'block';
    document.getElementById('search').className = 'col-9';
  } else{
    view = 'dashboard'
    path = '/mkurl-dashboard'

    // Set Dashboard default Url
    Defaulturl = 'http://localhost:9095/pivot/c/909c/Example_Dashboard_';

    document.getElementById('dropDown').style.display = 'none';
    document.getElementById('search').className = 'col-12';
  }
  getUrl();
}

function setDimension(type){
  request.dimension = type;
  request.filterValue= document.getElementById('pivot').value;
  getUrl(request);

  // updated displayed dimension to selected dimension
  document.getElementById('dropdownMenuButton').textContent=type;
}

async function getUrl() {
 let url = Defaulturl

  request.filterValue= document.getElementById('input').value;

  // Fetch new Url
  let resp = await fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })

  let json = await resp.json();

  // If the user input was not blank and a url was returned update the url
  if (json.url && (request.filterValue ||request.dimension)){
    url = json.url;
  }

  // Set New Src
  document.getElementById('pivot').src = url;
}
