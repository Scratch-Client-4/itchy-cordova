let hrt = require('human-readable-time');
import Vue from 'vue';
let connected = window.navigator.onLine;
let featuredRaw = "";
let featuredParsed = [];
let selectedLink = "";

function openProject() {
  window.location.replace("https://forkphorus.github.io/app.html?id=" + selectedLink);
}
let hello = new Vue({
  el: '#hello',
  data: {
    username: '-Archon-',
    day: hrt(new Date(), '%day%')
  }
});
fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/explore/projects?limit=4')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    featuredRaw = data;
    // featuredRaw = JSON.parse[data];
    for (let i = 0; i < 4; i++) {
      featuredParsed.push([
        [featuredRaw[i]['image']],
        [featuredRaw[i]['title']],
        [featuredRaw[i]['id']]
      ]);
    }
    console.log(featuredParsed);
    let featured = new Vue({
      el: '#featured',
      data() {
        return {
          featured: featuredParsed
        }
      }
    });
  });