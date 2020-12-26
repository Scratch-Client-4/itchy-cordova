// Define the runtime for Regenerator-compiled generator and async functions
import 'regenerator-runtime/runtime';
// Import the api object from requests.js
const api = require('./requests.js');
// Import the dom object from dom.js
const dom = require('./dom.js');
// Vibrant gets the primary color from an image
var Vibrant = require('node-vibrant');
const replaceAll = require('string.prototype.replaceall');
/*
String.prototype.replaceAll = function(oldStr, newStr) {
  const regex = new RegExp(`/${oldStr}/g`);
  return this.replace(regex, newStr);
} */
// Define original comment offset
let commentoffset = 0;
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

function unescapeHTML(html) {
  var div = document.createElement("DIV");
  div.innerHTML = html;
  return ("innerText" in div) ? div.innerText : div.textContent; // IE | FF
}
// Get the project ID from the URL
let username = getParams(window.location.href).u;

document.addEventListener('deviceready', function() {
  if (device.platform == "Android") {
    // Change the window.open function to open a Chrome custom tab via Cordova plugin
    window.open = cordova.plugins.browsertab.openUrl;
  }
  api.user.metadata(username).then((data) => {
    let id = data.id;
    let v = Vibrant.from(`https://itchy-api.herokuapp.com/cdn2.scratch.mit.edu/get_image/user/${id}_60x60.png`)
      .getPalette()
      .then((palette) => {
        document.querySelector('.top').style.backgroundColor = palette.Vibrant.hex;
        document.querySelector('#userName').style.color = palette.Vibrant.getTitleTextColor();
        document.querySelector('.user__pfp').style.border = `solid 3px ${palette.LightVibrant.hex}`;
        document.querySelectorAll('.user-about__box').forEach((item) => {
          item.style.border = `solid 3px ${palette.DarkMuted.hex + '90'}`;
        })
        document.querySelector('.user__name').innerText = username;
        document.querySelector('.user__pfp').src = `https://cdn2.scratch.mit.edu/get_image/user/${id}_60x60.png`;
        document.querySelector('.user__pfp').src = `https://cdn2.scratch.mit.edu/get_image/user/${id}_60x60.png`;
        let bioText = replaceAll(replaceAll(data.profile.bio, '\n', '--NEWLINE--').replace(/\s+/g, ' '), '--NEWLINE--', '<br>\n').trim();
        let statusText = replaceAll(replaceAll(data.profile.status, '\n', '--NEWLINE--').replace(/\s+/g, ' '), '--NEWLINE--', '<br>\n').trim();
        bioText = dom.makeLinks(bioText);
        statusText = dom.makeLinks(statusText);
        document.querySelector('#bio').innerHTML = bioText;
        document.querySelector('#status').innerHTML = statusText;
      });
  })
  /*
   api.project.comments(projectId, 0).then((comments) => {
     dom.comments(comments);
   })
   document.getElementById('viewMore').addEventListener('click', function(e) {
     e.preventDefault();
     dom.spinner.show();
     offset += 10;
     api.project.comments(projectId, offset).then((comments) => {
       dom.comments(comments);
     })
     dom.spinner.hide();
   }) */
  document.getElementById('toggleComments').addEventListener('click', function() {
    let slider = document.getElementById('slider');
    if (slider.classList.contains('slideout--out')) {
      slider.classList.replace('slideout--out', 'slideout--in');
      document.querySelector('.fab__icon').src = './asset/icon-close.svg';
    } else {
      slider.classList.replace('slideout--in', 'slideout--out');
      document.querySelector('.fab__icon').src = './asset/icon-comment.svg';
    }
  });
  api.user.comments(username).then((data) => {
    dom.comments(data);
  })
  dom.spinner.hide();
});

// Listen for hardware (or native) back button press
// The backbutton event is provided by Cordova
document.addEventListener('backbutton', function() {
  // Return to the app's home screen
  window.location.replace('index.html');
});