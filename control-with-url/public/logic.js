console.log('aaa');
document.querySelector('#go').addEventListener('click', function() {
  console.log('here');
  document.querySelector('iframe').src = "http://localhost:9095/pivot/d/7f939cdefbc5bf95c7/Wikipedia";
});
