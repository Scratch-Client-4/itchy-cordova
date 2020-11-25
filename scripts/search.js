// This file is the initialization file that runs when the search page is opened
// Define the runtime for Regenerator-compiled generator and async functions
import 'regenerator-runtime/runtime'
// Import the dom object from dom.js
const dom = require('./dom.js');
// Import the api object from requests.js
const api = require('./requests.js');
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

// Call the windowLoaded function once the device has loaded
// The deviceready event is provided by Cordova
document.addEventListener('deviceready', windowLoaded);

// Define scripts to run on window load
function windowLoaded() {
  api.search.general(getParams(window.location.href).q, 0).then((response) => {
    dom.renderSearch(response);
  });
  // Listen for screen orientation changes
  // The orientation object is provided by Cordova
  screen.orientation.addEventListener('change', function() {
    dom.setOrientation();
  })
  document.getElementById('searchbox').addEventListener('search', function() {
    let searchterm = document.getElementById('searchbox').value;
    window.location.replace('search.html?q=' + searchterm);
  });
}

// Listen for hardware (or native) back button press
// The backbutton event is provided by Cordova
document.addEventListener('backbutton', function() {
  // Return to the app's home screen
  window.location.replace('index.html');
});