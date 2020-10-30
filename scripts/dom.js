const api = require('./requests.js');

let spinner = {
  hide: function() {
    document.getElementsByClassName('spinner')[0].style.display = 'none';
    return 0;
  },
  show: function() {
    document.getElementsByClassName('spinner')[0].style.display = 'block';
    return 0;
  }
}

let renderProjects = (projectArray) => {
  for (let i = 0; i < 20; i++) {
    let id = projectArray[i].id;
    let title = projectArray[i].title;
    let user = projectArray[i].user;
    let div = document.createElement('div');
    div.classList.add('project');
    div.classList.add('ripple');
    div.setAttribute('data-projectId', id);
    let img = document.createElement('img');
    img.classList.add('project__img');
    img.setAttribute('src', 'https://cdn2.scratch.mit.edu/get_image/project/' + id + '_480x360.png');
    div.appendChild(img);
    let divTwo = document.createElement('div');
    divTwo.classList.add('project__title');
    divTwo.innerHTML = title + ' by <a href="#">' + user + '</a>';
    div.appendChild(divTwo);
    div.appendChild(document.createElement('mat-ripple'));
    document.getElementById('projects').appendChild(div);
    div.addEventListener('click', (event) => {
      event.preventDefault();
      window.open('https://scratch.mit.edu/projects/' + id);
    })
  }
  spinner.hide();
  return 0;
}

let scrollerInit = (scrollerEl) => {
  let scrollOptions = scrollerEl.childNodes;
  for (let i = 0; i < scrollOptions.length - 1; i++) {
    scrollOptions[i].addEventListener('click', (event) => {
      event.preventDefault();
      if (scrollOptions[i].classList.contains('scroller__link--unselected')) {
        for (let j = 0; j < scrollOptions.length - 1; j++) {
          scrollOptions[j].classList.replace('scroller__link--selected', 'scroller__link--unselected');
        }
        scrollOptions[i].classList.replace('scroller__link--unselected', 'scroller__link--selected');
        projects.destroy();
        if (scrollOptions[i].innerText == 'Featured') {
          spinner.show();
          api.projects.featured(0).then((data) => {
            projects.render(data);
            spinner.hide();
          });
        } else if (scrollOptions[i].innerText == 'Top Loved') {
          spinner.show();
          api.projects.topLoved(0).then((data) => {
            projects.render(data);
            spinner.hide();
          });
        } else if (scrollOptions[i].innerText == 'Trending') {
          spinner.show();
          api.projects.trending(0).then((data) => {
            projects.render(data);
            spinner.hide();
          });
        } else if (scrollOptions[i].innerText == 'Recent') {
          spinner.show();
          api.projects.recent(0).then((data) => {
            projects.render(data);
            spinner.hide();
          });
        } else if (scrollOptions[i].innerText == 'Messages') {
          spinner.show();
          window.open('https://scratch.mit.edu/messages');
          spinner.hide();
        } else {
          spinner.show();
          api.projects.tagged(scrollOptions[i].innerText.toLowerCase(), 0).then((data) => {
            projects.render(data);
            spinner.hide();
          });
        }
      }
    })
  }
}

let projects = {
  render: renderProjects,
  destroy: function() {
    document.getElementById('projects').innerHTML = "";
  }
}

let scroller = {
  init: scrollerInit
}

module.exports = {
  projects: projects,
  spinner: spinner,
  scroller: scroller
};