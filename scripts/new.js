let rawData, scrollOptions = document.getElementById('scroller').childNodes,
  theme = window.localStorage.getItem('theme'),
  root = document.documentElement;
window.addEventListener('load', () => {
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  if (!theme) {
    window.localStorage.setItem('theme', 'light');
    theme = 'light';
  }
  for (let i = 0; i < scrollOptions.length - 1; i++) {
    scrollOptions[i].addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('not-found').display = "none";
      if (scrollOptions[i].classList.contains('unselected')) {
        for (let j = 0; j < scrollOptions.length - 1; j++) {
          scrollOptions[j].classList.replace('selected', 'unselected');
        }
        scrollOptions[i].classList.replace('unselected', 'selected');
        document.getElementById('projects').innerHTML = "";
        if (scrollOptions[i].innerText == 'Featured') {
          document.getElementById('not-found').display = "none";
          getFeaturedProjects(0);
        } else if (scrollOptions[i].innerText == 'Top Loved') {
          document.getElementById('not-found').display = "none";
          getTopLovedProjects(0);
        } else {
          document.getElementById('not-found').style.display = "block";
        }
      }
    })
  }
  getFeaturedProjects(0);
})

let swapTheme = () => {
  if (theme == 'light') {
    theme = 'dark';
    window.localStorage.setItem('theme', 'dark');
    root.style.setProperty('--bg-primary', '#191919');
    root.style.setProperty('--bg-secondary', '#2a2a2a');
    root.style.setProperty('--bg-tertiary', '#2a2a2a');
    root.style.setProperty('--text', '#fff');
    root.style.setProperty('--border', '#2c2c2c');
  } else if (theme == 'dark') {
    theme = 'light';
    window.localStorage.setItem('theme', 'light');
    root.style.setProperty('--bg-primary', '#fff');
    root.style.setProperty('--bg-secondary', '#eeeeee');
    root.style.setProperty('--bg-tertiary', '#000');
    root.style.setProperty('--text', '#000');
    root.style.setProperty('--border', '#ddd');
  }
}

let renderProject = (id, title, user) => {
  let div = document.createElement('div');
  div.classList.add('project');
  div.setAttribute('data-project-id', id);
  let img = document.createElement('img');
  img.setAttribute('src', 'https://cdn2.scratch.mit.edu/get_image/project/' + id + '_480x360.png');
  div.appendChild(img);
  let divTwo = document.createElement('div');
  divTwo.classList.add('project-title');
  divTwo.innerHTML = title + ' by <a href="#">' + user + '</a>';
  div.appendChild(divTwo);
  document.getElementById('projects').appendChild(div);
}

let getFeaturedProjects = (offset) => {
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        renderProject(rawData["community_featured_projects"][i]['id'], rawData["community_featured_projects"][i]['title'].slice(0, 30), rawData["community_featured_projects"][i]['creator']);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
}

let getTopLovedProjects = (offset) => {
  document.getElementsByClassName('spinner')[0].style.display = 'block';
  fetch('https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        renderProject(rawData["community_most_loved_projects"][i]['id'], rawData["community_most_loved_projects"][i]['title'].slice(0, 30), rawData["community_most_loved_projects"][i]['creator']);
      }
      document.getElementsByClassName('spinner')[0].style.display = 'none';
    });
}

document.getElementById('darkModeToggle').addEventListener('click', (event) => {
  event.preventDefault();
  swapTheme();
});