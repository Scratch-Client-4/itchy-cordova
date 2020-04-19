// declare variables
let hrt = require('human-readable-time');
import Vue from 'vue';
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
let userShadeOpened = false;
let svStep = 1;
let svAttempt = "";
let svId = "41216777",
  svToken = "31f712f43e78bf5570a7da7f66d59e49897ee7ffb9e6bea5f9a8c080dc570ec9";

if ((!localStorage.getItem("user")) || localStorage.getItem("user") == "user") {
  currentUser = "user";
  let hello = new Vue({
    el: '#hello',
    data: {
      username: currentUser,
      day: hrt(new Date(), '%day%')
    }
  });
} else {
  currentUser = localStorage.getItem("user");
  fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/users/' + currentUser)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      userData = data;
      let hello = new Vue({
        el: '#hello',
        data: {
          username: currentUser,
          day: hrt(new Date(), '%day%')
        }
      });
    });
}
// define functions
function openProject() {
  window.location.replace("https://forkphorus.github.io/app.html?id=" + selectedLink);
}

document.getElementById("homeBtn").addEventListener("click", function() {
  if (userShadeOpened) {
    document.getElementById("userShade").classList.replace("opened-window", "closed-window");
    userShadeOpened = false;
  }
})

document.getElementById("userIcon").addEventListener("click", function() {
  if (!userShadeOpened) {
    document.getElementById("userShade").classList.replace("closed-window", "opened-window");
    userShadeOpened = true;
  } else {
    document.getElementById("userShade").classList.replace("opened-window", "closed-window");
    userShadeOpened = false;
  }
})

function startRegistration(username) {
  let url = 'https://cors-anywhere.herokuapp.com/scratchverifier.ddns.net:8888/verify/' + username;
  fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': "Basic " + btoa(svId + ":" + svToken)
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById('svCode').innerHTML = data["code"] + "<br><br>Copy the code above and paste it on your profile as a comment.  Then click the Verify button again when the comment has posted.";
    });
  document.getElementById('usrNm').value = "";
  document.getElementById('usrNm').placeholder = "verification in progress...";
}

function completeRegistration(username) {
  let url = 'https://cors-anywhere.herokuapp.com/scratchverifier.ddns.net:8888/verify/' + username;
  fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': "Basic " + btoa(svId + ":" + svToken)
      }
    })
    .then((response) => {
      return response.ok;
    })
    .then((data) => {
      console.log(data);
      if (data) {
        document.getElementById('svCode').innerHTML = "All right!  Verifed!";
        localStorage.setItem("user", svAttempt);
        setTimeout(function() {
          window.location.reload();
        }, 2000);
      } else {
        document.getElementById('svCode').innerHTML = "Comment the code again.";
      }
    });
}

document.getElementById('svVerifyBtn').addEventListener("click", function() {
  if (svStep == 1) {
    svAttempt = document.getElementById('usrNm').value;
    startRegistration(svAttempt);
    svStep++;
  } else {
    completeRegistration(svAttempt);
  }
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