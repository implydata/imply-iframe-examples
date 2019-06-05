// Listen for go button push
let request = {}

document.querySelector('#go').addEventListener('click', function(e) {

  //set request body to be user input
  request.filterValue= document.getElementById('input').value;


  setUrl(request);
});

function setDimension(type){
  request.dimension = type;
  setUrl(request);
  //updated displayed dimension to selected dimension
  document.getElementById('dropdownMenuButton').textContent=type;
}

async function setUrl(request) {

  // Set Default URL to just be the druid_wikipedia data cube
  let url = 'http://localhost:9095/pivot/c/7c9e/New_dashboard';

  // Fetch new Url
  let resp = await fetch('/mkurl', {
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
