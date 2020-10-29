import 'regenerator-runtime/runtime'
const dom = require('./dom.js');
const api = require('./requests.js');
console.log(dom)
console.log(api)
console.log("Scratch Client 4 Mobile");
let scrollerEl = document.getElementById('tagScroller');

document.getElementById('menuButton').addEventListener('click', (event) => {
  event.preventDefault();
});

document.addEventListener('deviceready', windowLoaded);

function windowLoaded() {
  if (device.platform == "Android") {
    window.open = cordova.plugins.browsertab.openUrl;
  }
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
  dom.spinner.show();
  dom.scroller.init(scrollerEl);
  document.getElementById('searchbox').addEventListener('search', function() {
    let searchterm = document.getElementById('searchbox').value;
    window.location.replace('search.html?q=' + searchterm);
  });
  api.projects.featured(0).then((data) => {
    dom.projects.render(data);
  })
}