let request = {}

//Toggle between dashboard and datacube
function show(shown, hidden){
  request ={};
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
}

//When the go button is pressed set request bodt to user input and make the correct request fo the active view
function getUrl(id ){
  if(id === 'dashboard'){
    //set request body to be user input
    request.filterValue= document.getElementById('input-dashboard').value;
    setDashboardUrl(request);
  } else{
    //set request body to be user input
    request.filterValue= document.getElementById('input-datacube').value;
    setDatacubeUrl(request);
  }

}

function setDimension(type){
  request.dimension = type;
  request.filterValue= document.getElementById('input-datacube').value;
  setDatacubeUrl(request);
  //updated displayed dimension to selected dimension
  document.getElementById('dropdownMenuButton').textContent=type;
}

//getUrl for datacube view
async function setDatacubeUrl(request) {

  // Set Default URL to just be the druid_wikipedia data cube
  let url = 'http://localhost:9095/pivot/d/druid_wikipedia';

  // Fetch new Url
  let resp = await fetch('/mkurl-datacube', {
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
  document.getElementById('pivot-datacube').src = url;
}

//getUrl for Dashboard view
async function setDashboardUrl(request) {

  // Set Default URL to just be the druid_wikipedia data cube
  let url = 'http://localhost:9095/pivot/c/7c9e/New_dashboard';

  // Fetch new Url
  let resp = await fetch('/mkurl-dashboard', {
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
  document.getElementById('pivot-dashboard').src = url;
}
