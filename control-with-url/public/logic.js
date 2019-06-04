// Listen for go button push
document.querySelector('#go').addEventListener('click', function(e) {

  //set request body to be user input
  let request = {
    'input': document.getElementById('input').value
  };

  setUrl(request);
});

async function setUrl(request) {
  // Set Default Url
  let url = 'http://localhost:9095/pivot/d/7ddc63f3f64b0aeb52/Wikipedia';

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
  if (json.url && request.input) {
    url = json.url
  }
  // Set New Src
  document.getElementById('pivot').src = url;
}
