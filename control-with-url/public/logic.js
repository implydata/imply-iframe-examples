
document.querySelector('#go').addEventListener('click', function(e) {
  let request = {
    'input': document.getElementById('input').value
  };
  let url = 'http://localhost:9095/pivot/d/7ddc63f3f64b0aeb52/Wikipedia'

  fetch('/mkurl', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }).then(function(response) {
    return response.json();
  })
  .then(function(json) {
    if(url){
      url = json.url
    }
  });

  document.getElementById('iframe').src = url;

});
