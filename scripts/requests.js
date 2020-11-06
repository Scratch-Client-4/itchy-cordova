// This file is a module that not only handles requests to the Scratch API, but also formats the results into useful data to be rendered by the dom.js module
// All of the functions here are asynchronous because we have to wait until a request is finished to send the result
// Get featured projects - the offset variable is the offset to send to the API endpoint
let getFeaturedProjects = async (offset) => {
  // Define the rawData variable
  let rawData;
  // Define the array of project objects to return
  let toReturn = [];
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to twenty
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    // Once the response has completed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // data is equal to the result of the return statement above
      // Set rawData equal to the response JSON
      rawData = data;
      // Loop through the response project objects
      for (let i = 0; i < 20; i++) {
        // Push an object to the toReturn array
        toReturn.push({
          // Set the id property to the project's ID
          id: rawData["community_featured_projects"][i]['id'],
          // Set the title property to the project's title
          title: rawData["community_featured_projects"][i]['title'],
          // Set the creator property to the project's author
          user: rawData["community_featured_projects"][i]['creator']
        });
      }
    });
  // After all of the above have finished, return the toReturn project array
  return toReturn;
}

// Get top loved projects - the offset variable is the offset to send to the API endpoint
let getTopLovedProjects = async (offset) => {
  // Define the rawData variable
  let rawData;
  // Define the array of project objects to return
  let toReturn = [];
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to twenty
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/proxy/featured?offset=' + offset + '&limit=20')
    // Once the response has completed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // data is equal to the result of the return statement above
      // Set rawData equal to the response JSON
      rawData = data;
      // Loop through the response project objects
      for (let i = 0; i < 20; i++) {
        // Push an object to the toReturn array
        toReturn.push({
          // Set the id property to the project's ID
          id: rawData["community_most_loved_projects"][i]['id'],
          // Set the title property to the project's title
          title: rawData["community_most_loved_projects"][i]['title'],
          // Set the creator property to the project's author
          user: rawData["community_most_loved_projects"][i]['creator']
        });
      }
    });
  // After all of the above have finished, return the toReturn project array
  return toReturn;
}

// Get currently trending projects - the offset variable is the offset to send to the API endpoint
let getTrendingProjects = async (offset) => {
  // Define the rawData variable
  let rawData;
  // Define the array of project objects to return
  let toReturn = [];
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to twenty
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?offset=' + offset + '&limit=20&mode=trending')
    // Once the response has completed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // data is equal to the result of the return statement above
      // Set rawData equal to the response JSON
      rawData = data;
      // Loop through the response project objects
      for (let i = 0; i < 20; i++) {
        // Push an object to the toReturn array
        toReturn.push({
          // Set the id property to the project's ID
          id: rawData[i]['id'],
          // Set the title property to the project's title
          title: rawData[i]['title'],
          // Set the creator property to the project's author
          user: rawData[i]['author']['username']
        });
      }
    });
  // After all of the above have finished, return the toReturn project array
  return toReturn;
}

// Get recently shared projects - the offset variable is the offset to send to the API endpoint
let getRecentProjects = async (offset) => {
  // Define the rawData variable
  let rawData;
  // Define the array of project objects to return
  let toReturn = [];
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to twenty
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?offset=' + offset + '&limit=20&mode=recent')
    // Once the response has completed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // data is equal to the result of the return statement above
      // Set rawData equal to the response JSON
      rawData = data;
      // Loop through the response project objects
      for (let i = 0; i < 20; i++) {
        // Push an object to the toReturn array
        toReturn.push({
          // Set the id property to the project's ID
          id: rawData[i]['id'],
          // Set the title property to the project's title
          title: rawData[i]['title'],
          // Set the creator property to the project's author
          user: rawData[i]['author']['username']
        });
      }
    });
  // After all of the above have finished, return the toReturn project array
  return toReturn;
}

// Get projects of a certain tag - the offset variable is the offset to send to the API endpoint
let getTaggedProjects = async (tag, offset) => {
  // Define the rawData variable
  let rawData;
  // Define the array of project objects to return
  let toReturn = [];
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to twenty
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/explore/projects?q=' + tag + "&offset=" + offset + '&limit=20&mode=trending')
    // Once the response has completed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // data is equal to the result of the return statement above
      // Set rawData equal to the response JSON
      rawData = data;
      // Loop through the response project objects
      for (let i = 0; i < 20; i++) {
        // Push an object to the toReturn array
        toReturn.push({
          // Set the id property to the project's ID
          id: rawData[i]['id'],
          // Set the title property to the project's title
          title: rawData[i]['title'],
          // Set the creator property to the project's author
          user: rawData[i]['author']['username']
        });
      }
    });
  // After all of the above have finished, return the toReturn project array
  return toReturn;
}

// Get search results from Qwant
// The query variable must be a string
let generalSearch = async (query, offset) => {
  // Define the variable to store search result JSON
  let toReturn;
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to ten (the maximum for Qwant)
  await fetch('https://itchy-api.herokuapp.com/api.qwant.com/api/search/web?count=10&q=site:scratch.mit.edu%20' + query + '&t=site:scratch.mit.edu%20' + query + '&f=&offset=' + offset + '&locale=en_us&uiv=4')
    // Once the response has competed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // Set toReturn equal to the returned data
      toReturn = data;
    });
  // Return the toReturn variable
  return toReturn;
}

let getProjectMetadata = async (id) => {
  // Define the rawData variable
  let rawData;
  // Define the project object to return
  let toReturn;
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to twenty
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/projects/' + id)
    // Once the response has completed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // data is equal to the result of the return statement above
      // Set rawData equal to the response JSON
      rawData = data;
      // Define data to return
      toReturn = {
        // Set the id property to the project's ID
        id: rawData['id'],
        // Set the title property to the project's title
        title: rawData['title'],
        // Set the username property to the project's author
        username: rawData['author']['username'],
        // Set the userId property to the project's author
        userId: rawData['author']['id']
      };
    });
  // After all of the above have finished, return the toReturn project object
  return toReturn;
}

let getProjectComments = async (id, username, offset) => {
  // Define the rawData variable
  let rawData;
  // Define the project object to return
  let toReturn;
  // Make an awaiting fetch call to our personal CORS proxy but limit the results to twenty
  await fetch('https://itchy-api.herokuapp.com/api.scratch.mit.edu/users/' + username + '/projects/' + id + '/comments?offset=' + offset + '&limit=20')
    // Once the response has completed
    .then((response) => {
      // Convert the response to JSON
      return response.json();
      // Once the response has been converted
    }).then((data) => {
      // data is equal to the result of the return statement above
      // Set toReturn equal to the data
      toReturn = data;
    });
  // After all of the above have finished, return the toReturn project object
  return toReturn;
}

// Export all functions
module.exports = {
  projects: {
    recent: getRecentProjects,
    tagged: getTaggedProjects,
    trending: getTrendingProjects,
    topLoved: getTopLovedProjects,
    featured: getFeaturedProjects
  },
  search: {
    general: generalSearch
  },
  project: {
    metadata: getProjectMetadata,
    comments: getProjectComments
  }
}