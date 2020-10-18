var getParams = function(url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

document.addEventListener('deviceready', windowLoaded);

function windowLoaded() {
  fetch('https://cors-anywhere.herokuapp.com/api.qwant.com/api/search/web?count=10&q=site:scratch.mit.edu%20' + getParams(window.location.href).q + '&t=site:scratch.mit.edu%20' + getParams(window.location.href).q + '&f=&offset=0&locale=en_us&uiv=4')
    .then(response => response.json())
    .then(data => {
      for (let j = 0; j < 10; j++) {
        let result = document.createElement('div');
        result.classList.add('result');
        result.classList.add('ripple');
        let resultTitle = document.createElement('h4');
        resultTitle.innerHTML = data.data.result.items[j].title;
        result.appendChild(resultTitle);
        let ripple = document.createElement('mat-ripple');
        result.appendChild(ripple);
        result.addEventListener('click', function() {
          cordova.plugins.browsertab.openUrl(data.data.result.items[j].url);
        });
        document.getElementById('results').appendChild(result);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
  screen.orientation.addEventListener('change', function() {
    console.log('orientation changed');
    if (screen.orientation.type.includes('landscape')) {
      document.getElementById('projects').style.gridTemplateColumns = "auto auto";
      document.getElementById('projects').style.gridColumnGap = "3%";
    } else if (screen.orientation.type.includes('portrait')) {
      document.getElementById('projects').style.gridTemplateColumns = "auto";
      document.getElementById('projects').style.gridColumnGap = "0";
    }
  })
  document.getElementById('searchbox').addEventListener('search', function() {
    let searchterm = document.getElementById('searchbox').value;
    window.location.replace('search.html?q=' + searchterm);
  });
}

document.addEventListener('backbutton', function() {
  window.location.replace('index.html');
});