// Define the runtime for Regenerator-compiled generator and async functions
import 'regenerator-runtime/runtime';
// Import the api object from requests.js
const api = require('./requests.js');
// Import the dom object from dom.js
const dom = require('./dom.js');
let offset = 0;
// Define the function used to get URL parameters - this is external code and does not need to be documented
// The url variable is a string
let getParams = function(url) {
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
// Get the project ID from the URL
let projectId = getParams(window.location.href).id;

document.addEventListener('deviceready', function() {
  if (device.platform == "Android") {
    // Change the window.open function to open a Chrome custom tab via Cordova plugin
    window.open = cordova.plugins.browsertab.openUrl;
  }
  api.project.metadata(projectId).then((data) => {
    let projectTitle = data.title.length > 40 ? data.title.substring(0, 40) + '...' : data.title;
    document.getElementById('projectName').innerText = projectTitle;
    document.getElementById('turboRender').innerHTML = '<iframe id ="turbowarp" src="https://experiments.turbowarp.org/transparent-embeds/embed.html#' + projectId + '?hqpen" allowtransparency="true" frameborder="0" scrolling="no" allowfullscreen></iframe>';
    document.querySelector('.author__pfp').src = 'https://cdn2.scratch.mit.edu/get_image/user/' + data.userId + '_60x60.png';
    document.querySelector('.author__pfp').addEventListener('click', function() {
      window.open('https://scratch.mit.edu/users/' + data.username);
    })
    document.getElementById('authorName').innerText = data.username;
    document.getElementById('authorName').addEventListener('click', function() {
      window.open('https://scratch.mit.edu/users/' + data.username);
    });
    api.project.comments(projectId, data.username, 0).then((comments) => {
      dom.comments(comments);
    })
    document.getElementById('viewMore').addEventListener('click', function(e) {
      e.preventDefault();
      dom.spinner.show();
      offset += 10;
      api.project.comments(projectId, data.username, offset).then((comments) => {
        dom.comments(comments);
      })
      dom.spinner.hide();
    })
    dom.spinner.hide();
  });
});

// Listen for hardware (or native) back button press
// The backbutton event is provided by Cordova
document.addEventListener('backbutton', function() {
  // Return to the app's home screen
  window.location.replace('index.html');
});