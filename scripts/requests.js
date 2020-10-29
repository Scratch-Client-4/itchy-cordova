let returnMe = () => {
  return "hey"
}

let getFeaturedProjects = async (offset) => {
  let rawData;
  let toReturn = [];
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    .then((response) => {
      return response.json();
    }).then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        toReturn.push({
          id: rawData["community_featured_projects"][i]['id'],
          title: rawData["community_featured_projects"][i]['title'],
          user: rawData["community_featured_projects"][i]['creator']
        });
      }
    });
  return toReturn;
}

let getTopLovedProjects = async (offset) => {
  let rawData;
  let toReturn = [];
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        toReturn.push({
          id: rawData["community_most_loved_projects"][i]['id'],
          title: rawData["community_most_loved_projects"][i]['title'],
          user: rawData["community_most_loved_projects"][i]['creator']
        });
      }
    });
  return toReturn;
}

let getTrendingProjects = async (offset) => {
  let rawData;
  let toReturn = [];
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?offset=' + offset + '&limit=20&mode=trending')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        toReturn.push({
          id: rawData[i]['id'],
          title: rawData[i]['title'],
          user: rawData[i]['author']['username']
        });
      }
    });
  return toReturn;
}

let getRecentProjects = async (offset) => {
  let rawData;
  let toReturn = [];
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?offset=' + offset + '&limit=20&mode=recent')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        toReturn.push({
          id: rawData[i]['id'],
          title: rawData[i]['title'],
          user: rawData[i]['author']['username']
        });
      }
    });
  return toReturn;
}

let getTaggedProjects = async (tag, offset) => {
  let rawData;
  let toReturn = [];
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?q=' + tag + "&offset=" + offset + '&limit=20&mode=trending')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rawData = data;
      for (let i = 0; i < 20; i++) {
        toReturn.push({
          id: rawData[i]['id'],
          title: rawData[i]['title'],
          user: rawData[i]['author']['username']
        });
      }
    });
  return toReturn;
}

module.exports = {
  projects: {
    recent: getRecentProjects,
    tagged: getTaggedProjects,
    trending: getTrendingProjects,
    topLoved: getTopLovedProjects,
    featured: getFeaturedProjects
  },
  test: returnMe
}