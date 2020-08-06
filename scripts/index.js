// declare variables
// let hrt = require('human-readable-time');
import Vue from 'vue';
import ClipboardJS from 'clipboard';
let connected = window.navigator.onLine;
let featuredRaw = "";
let forYouRaw = "";
let favoritesRaw = "";
let featuredParsed = [];
let lovedParsed = [];
let forYouParsed = [];
let favoritesParsed = [];
let selectedLink = "";
let currentUser = "";
let userData, userId;
let favsOffset = 0;
let project;
let userShadeOpened = false;
let projectOpened = false;
let svStep = 1;
let svAttempt = "";
let svId = "41216777",
  svToken = "65321affe91b322f8adff5fe6f8b2c565840920c10492b03a4886a27da54f485";

// define functions

// this function turns a date object into the day's name
function toDay(dateObject) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = dateObject;
  var dayName = days[d.getDay()];
  return dayName;
}

// this function opens a project in the shade
module.exports.openProject = function openProject(projectId) {
  // set the project opened status
  projectOpened = true;
  // bring up the shade with SCSS
  document.getElementById("projectShade").classList.replace("closed-window", "opened-window");
  // fetch relevant information
  fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/projects/' + projectId)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // build project embed
      document.getElementById("projectFrame").src = "https://forkphorus.github.io/app.html?id=" + projectId;
      // display project information
      project = new Vue({
        el: '#projectShade',
        data: {
          projectName: data["title"],
          description: data["description"],
          creator: data["author"],
          // calculate width and height of player
          width: window.innerWidth,
          height: window.innerWidth * 0.73
        }
      });
    });
}

// this gets user information if the user is signed in (SV)
if ((!localStorage.getItem("user")) || localStorage.getItem("user") == "user") {
  // if user is not signed in
  // set greeter addressee to 'user'
  currentUser = "user";
  // display the templated hello message
  let hello = new Vue({
    el: '#hello',
    data: {
      username: currentUser,
      // get the date to display in readble time (hrt)
      day: toDay(new Date())
    }
  });
} else {
  // if user is signed in
  // set greeter addressee to their Scratch username
  currentUser = localStorage.getItem("user");
  // fetch their information, this will be useful in the future
  fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/users/' + currentUser)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      userData = data;
      /* let hello = new Vue({
        el: '#hello',
        data: {
          username: currentUser,
          // get the date to display in readable time (hrt)
          day: hrt(new Date(), '%day%')
        }
      }); */
    });
}

// this detects if the home button is clicked
document.getElementById("homeBtn").addEventListener("click", function() {
  // if the project shade is opened
  if (projectOpened) {
    // set the project shade status to closed
    projectOpened = false;
    // destroy the project's Vue instance
    project.$destroy();
    // set the project variable to null, just in case
    project = null;
    // reset Vue templating
    document.getElementsByClassName("project-title")[0].innerText = "{{ projectName }}";
    document.getElementsByClassName("desc")[0].innerText = "{{ description }}";
    document.getElementById("projectFrame").src = " ";
    // slide down shade with SCSS
    document.getElementById("projectShade").classList.replace("opened-window", "closed-window");
  }
  // if the user shade is opened
  if (userShadeOpened) {
    // slide down shade with SCSS
    document.getElementById("userShade").classList.replace("opened-window", "closed-window");
    // set the user shade status to closed
    userShadeOpened = false;
  }
})

// this detects if the user shade is opened
document.getElementById("userIcon").addEventListener("click", function() {
  // if the shade is not opened
  if (!userShadeOpened) {
    // open the shade with SCSS
    document.getElementById("userShade").classList.replace("closed-window", "opened-window");
    // set the user shade status to opened
    userShadeOpened = true;
    // if the shade is open
  } else {
    // close the shade with SCSS
    // note: perhaps this is redundant as we already have the home button.  Suggest removing?
    document.getElementById("userShade").classList.replace("opened-window", "closed-window");
    // set the user shade status to closed
    userShadeOpened = false;
  }
})

// this function handles starting registration with scratchverifier (SV)
function startRegistration(username) {
  // send a PUT request to the SV servers to verify
  let url = 'https://cors-anywhere.herokuapp.com/scratchverifier.ddns.net:8888/verify/' + username;
  fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        // enforce authorization with btoa encryption
        'Authorization': "Basic " + btoa(svId + ":" + svToken)
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      new ClipboardJS('#svCopyBtn');
      // display the scratchverifier code to the user
      document.getElementById('svCopyBtn').setAttribute("data-clipboard-text", data["code"]);
      document.getElementById('svCopyBtn').style.display = "block";
      document.getElementById('svAdvisory').style.display = "block";
    });
  // clear the input value
  document.getElementById('usrNm').value = "";
  // inform the user that verification is in progress
  document.getElementById('usrNm').placeholder = "verification in progress...";
}

// this function handles finishing registration with scratchverifier (SV)
function completeRegistration(username) {
  // send a POST request to the SV servers to verify
  let url = 'https://cors-anywhere.herokuapp.com/scratchverifier.ddns.net:8888/verify/' + username;
  fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        // enforce authorization with btoa encryption
        'Authorization': "Basic " + btoa(svId + ":" + svToken)
      }
    })
    .then((response) => {
      return response.ok;
    })
    .then((data) => {
      // if the response is okay, verification succeeded
      if (data) {
        // tell the user that verification succeeded
        document.getElementById('svCode').innerHTML = "All right!  Verifed!";
        // store the username in localStorage for later use
        localStorage.setItem("user", svAttempt);
        // wait a second and reload the application to display the username
        setTimeout(function() {
          window.location.reload();
        }, 2000);
        // if the response was not okay, verification failed
      } else {
        // tell the user to try again.
        document.getElementById('svAdvisory').innerHTML = "Comment the code again.<br>";
      }
    });
}

// this detects if a user starts or finishes registration
document.getElementById('svVerifyBtn').addEventListener("click", function() {
  // if the user is starting registration
  if (svStep == 1) {
    // set the username to verify from field value
    svAttempt = document.getElementById('usrNm').value;
    // call the startRegistration function with the username as input
    startRegistration(svAttempt);
    // go to the next step of registration and wait
    svStep++;
    // if the user is finishing registration
  } else {
    // call the completeRegistration function with the username as input
    completeRegistration(svAttempt);
  }
});

// for featured/top loved projects
// this code needs documentation!  Please comment and make a PR to help!
fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/proxy/featured?limit=6')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    featuredRaw = data;
    for (let i = 0; i < 6; i++) {
      featuredParsed.push([
        ["https:" + featuredRaw["community_featured_projects"][i]['thumbnail_url']],
        [featuredRaw["community_featured_projects"][i]['title'].slice(0, 25)],
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
        [featuredRaw["community_most_loved_projects"][i]['title'].slice(0, 25)],
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
/* The code below is for getting favorite projects of a user, but is currently in alpha.
if ((localStorage.getItem("user")) || !(localStorage.getItem("user") == "user")) {
  while ((JSON.stringify(favoritesRaw) != "[]") || (favsOffset < 4)) {
    fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/users/' + currentUser + '/favorites?offset=' + favsOffset)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        favoritesRaw = data;
        favsOffset++;
      });
  }
  for (let i = 0; i < 6; i++) {
    favoritesParsed.push([
      [favoritesRaw[i]['image']],
      [favoritesRaw[i]['title']],
      [favoritesRaw[i]['id']]
    ]);
  }
  let featured = new Vue({
    el: '#favorites',
    data() {
      return {
        favorites: favoritesParsed
      }
    }
  });
}
*/