// This file is the main initialization file that runs when the application starts
// Define the runtime for Regenerator-compiled generator and async functions
import 'regenerator-runtime/runtime'
// Import the dom object from dom.js
const dom = require('./dom.js');
// Import the api object from requests.js
const api = require('./requests.js');
// Define the element for the tag scroller
let scrollerEl = document.getElementById('tagScroller');
// Listen for clicks on the menu button
document.getElementById('menuButton').addEventListener('click', (event) => {
  // Prevent going to top of page
  event.preventDefault();
});
// Call the windowLoaded function once the device has loaded
// The deviceready event is provided by Cordova
document.addEventListener('deviceready', windowLoaded);

// Define scripts to run on window load
function windowLoaded() {
  // Check if the app is running on Android
  if (device.platform == "Android") {
    // Change the window.open function to open a Chrome custom tab via Cordova plugin
    window.open = cordova.plugins.browsertab.openUrl;
  }
  // Listen for screen orientation changes
  // The orientation object is provided by Cordova
  screen.orientation.addEventListener('change', function() {
    // Call the dom.setOrientation function to fit more or less projects on the screen at a time
    dom.setOrientation();
  })
  // Show the loader
  dom.spinner.show();
  // Hide splash screen
  window.setTimeout(() => {
    navigator.splashscreen.hide();
  }, 200);
  // Initialize the tag scroller
  dom.scroller.init(scrollerEl);
  // Listen for searches (pressing enter while searchbox element is focused)
  document.getElementById('searchbox').addEventListener('search', function() {
    // Set the searchterm variable to the value the user inputted
    let searchterm = document.getElementById('searchbox').value;
    // Go to the search page and add the query as a URL parameter
    window.location.replace('search.html?q=' + searchterm);
  });
  // Get featured projects from the api module
  api.projects.featured(0).then((data) => {
    // Once that has completed, render the projects via the dom module
    dom.projects.render(data);
  });
}