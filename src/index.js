var XMLHttpRequest = require(`xmlhttprequest`).XMLHttpRequest;

var API = `https://rickandmortyapi.com/api/character/`;
var xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200)
          resolve(JSON.parse(xhttp.responseText));
        else return reject(url_api);
      }
    };
    xhttp.open(`GET`, url_api, false);
    xhttp.send();
  })
};

let data1;
let data2;
let data3;

function onError() {
  console.log('Error');
}

fetchData(API)
  .then(data => {
    data1 = data;
    console.log(`Primer llamado...`);
    return fetchData(`${API}${data.results[0].id}`);
  })
  .then(data => {
    data2 = data;
    console.log(`Segundo llamado...`);
    return fetchData(`${data.origin.url}`);
  })
  .then(data => {
    data3 = data;
    console.log(`Tercer llamado...`)
    console.log(`Personajes: ${data1.info.count}`);
    console.log(`Primer personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(onError)