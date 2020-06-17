var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  var xhttp = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200)
          resolve(JSON.parse(xhttp.responseText));
        else return reject(url_api);
      }
    };
    xhttp.send();
  });
}

fetchData(API)
  .then(response => {
    console.log(`${response.info.count}`);
    return fetchData(`${API}${response.results[0].id}`);
  })
  .then(response => {
    console.log(response.name)
    return fetchData(`${response.origin.url}`)
  })
  .then(response => console.log(response.dimension))
  .catch(err => console.log(err));