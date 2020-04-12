// declare variables
let hrt = require('human-readable-time');
import Vue from 'vue';
let connected = window.navigator.onLine;
let featuredRaw = "";
let forYouRaw = "";
let featuredParsed = [];
let lovedParsed = [];
let forYouParsed = [];
let selectedLink = "";
let currentUser = "-Archon-";
let userData, userId;

// define functions
function openProject() {
  window.location.replace("https://forkphorus.github.io/app.html?id=" + selectedLink);
}

function userInfo() {
  document.getElementById("userShade").style.bottom = "0vh";
}

// fetch data
// for user
fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/users/' + currentUser)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    userData = data;
    userId = "41216777";
    let hello = new Vue({
      el: '#hello',
      data: {
        username: currentUser,
        day: hrt(new Date(), '%day%')
      }
    });
  });


// for featured/top loved projects
fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/proxy/featured?limit=6')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    featuredRaw = data;
    for (let i = 0; i < 6; i++) {
      featuredParsed.push([
        ["https:" + featuredRaw["community_featured_projects"][i]['thumbnail_url']],
        [featuredRaw["community_featured_projects"][i]['title']],
        [featuredRaw["community_featured_projects"][i]['id']]
      ]);
    }
    let featured = new Vue({
      el: '#featured',
      data() {
        return {
          featured: featuredParsed
        }
      }
    });
    for (let i = 0; i < 6; i++) {
      lovedParsed.push([
        ["https:" + featuredRaw["community_most_loved_projects"][i]['thumbnail_url']],
        [featuredRaw["community_most_loved_projects"][i]['title']],
        [featuredRaw["community_most_loved_projects"][i]['id']]
      ]);
    }
    let loved = new Vue({
      el: '#toploved',
      data() {
        return {
          toploved: lovedParsed
        }
      }
    });
  });