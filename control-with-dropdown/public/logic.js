//On dimension select
function setDimension(type){
  let request = {
    dimension: type
  };
  setUrl(request);

  //updated displayed dimension to selected dimension
  document.getElementById('dropdownMenuButton').textContent=type;
}


async function setUrl(request) {

  // Set Default URL to just be the druid_wikipedia data cube
  let url = 'http://localhost:9095/pivot/d/druid_wikipedia';

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

  // If the dimension was not blank and a url was returned update the url
  if (json.url && request.dimension) {
    url = json.url;
  }
  // Set New Src
  document.getElementById('pivot').src = url;
}
