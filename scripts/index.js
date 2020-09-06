console.log("Scratch Client 4 Mobile");

let scrollOptions = document.getElementById('tagScroller').childNodes,
  root = document.documentElement;

let setTheme = (toSwap) => {
  if (toSwap == 'dark') {
    window.localStorage.setItem('theme', 'dark');
    root.style.setProperty('--bg-primary', '#191919');
    root.style.setProperty('--bg-secondary', '#2a2a2a');
    root.style.setProperty('--bg-tertiary', '#2a2a2a');
    root.style.setProperty('--text', '#fff');
    root.style.setProperty('--border', '#2c2c2c');
  } else if (toSwap == 'light') {
    window.localStorage.setItem('theme', 'light');
    root.style.setProperty('--bg-primary', '#fff');
    root.style.setProperty('--bg-secondary', '#eeeeee');
    root.style.setProperty('--bg-tertiary', '#000');
    root.style.setProperty('--text', '#000');
    root.style.setProperty('--border', '#ddd');
  } else {
    return 1;
  }
}

let renderProject = (id, title, user) => {
  let div = document.createElement('div');
  div.classList.add('project');
  div.setAttribute('data-projectId', id);
  let img = document.createElement('img');
  img.setAttribute('src', 'https://cdn2.scratch.mit.edu/get_image/project/' + id + '_480x360.png');
  div.appendChild(img);
  let divTwo = document.createElement('div');
  divTwo.classList.add('project-title');
  divTwo.innerHTML = title + ' by <a href="#">' + user + '</a>';
  div.appendChild(divTwo);
  document.getElementById('projects').appendChild(div);
  div.addEventListener('click', (event) => {
    event.preventDefault();
    cordova.plugins.browsertab.openUrl('https://scratch.mit.edu/projects/' + id);
  })
}

let getFeaturedProjects = (offset) => {
  let rawData;
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        renderProject(rawData["community_featured_projects"][i]['id'], rawData["community_featured_projects"][i]['title'], rawData["community_featured_projects"][i]['creator']);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
}

let getTopLovedProjects = (offset) => {
  let rawData;
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        renderProject(rawData["community_most_loved_projects"][i]['id'], rawData["community_most_loved_projects"][i]['title'], rawData["community_most_loved_projects"][i]['creator']);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
}

let getTrendingProjects = (offset) => {
  let rawData;
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?offset=' + offset + '&limit=20&mode=trending')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        renderProject(rawData[i]['id'], rawData[i]['title'], rawData[i]['author']['username']);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
}

let getRecentProjects = (offset) => {
  let rawData;
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?offset=' + offset + '&limit=20&mode=recent')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        renderProject(rawData[i]['id'], rawData[i]['title'], rawData[i]['author']['username']);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
}

let getTaggedProjects = (tag, offset) => {
  let rawData;
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?q=' + tag + "&offset=" + offset + '&limit=20&mode=trending')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        renderProject(rawData[i]['id'], rawData[i]['title'], rawData[i]['author']['username']);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
}

document.getElementById('menuButton').addEventListener('click', (event) => {
  event.preventDefault();
});

document.addEventListener('deviceready', windowLoaded);

function windowLoaded() {
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  }
  for (let i = 0; i < scrollOptions.length - 1; i++) {
    scrollOptions[i].addEventListener('click', (event) => {
      event.preventDefault();
      if (scrollOptions[i].classList.contains('unselected')) {
        for (let j = 0; j < scrollOptions.length - 1; j++) {
          scrollOptions[j].classList.replace('selected', 'unselected');
        }
        scrollOptions[i].classList.replace('unselected', 'selected');
        document.getElementById('projects').innerHTML = "";
        if (scrollOptions[i].innerText == 'Featured') {
          getFeaturedProjects(0);
        } else if (scrollOptions[i].innerText == 'Top Loved') {
          getTopLovedProjects(0);
        } else if (scrollOptions[i].innerText == 'Trending') {
          getTrendingProjects(0);
        } else if (scrollOptions[i].innerText == 'Recent') {
          getRecentProjects(0);
        } else {
          getTaggedProjects(scrollOptions[i].innerText.toLowerCase(), 0)
        }
      }
    })
  }
  document.getElementById('searchbox').addEventListener('search', function() {
    let searchterm = document.getElementById('searchbox').value;
    window.location.replace('search.html?q=' + searchterm);
  });
  getFeaturedProjects(0);
}