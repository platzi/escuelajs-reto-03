var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

var fetchData = function(url_api, data) {
  return new Promise(function(resolve, reject) {
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          // If successful
          resolve(xhttp);
        } else {
          // If failed
          reject({
            status: request.status,
            statusJSON: request.statusText
          });
        }
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
};

fetchData(API)
  .then(data => {
    console.log("Primer Llamado...");
    data = JSON.parse(data.responseText);
    console.log(`Personajes: ${data.info.count}`);
    fetchData(API + data.results[0].id).then(data => {
      data = JSON.parse(data.responseText);
      console.log(`Primer Personaje: ${data.name}`);
      fetchData(data.origin.url).then(data => {
        data = JSON.parse(data.responseText);
        console.log(`Dimensión: ${data.dimension}`);
      });
    });
  })
  .catch(function(error) {
    console.log(`Error ${error}`);
  });
