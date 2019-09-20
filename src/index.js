const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200) {
        const response = JSON.parse(xhttp.responseText);
        callback(null, response);
      } else {
        return callback(xhttp.status);
      }
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send(null);
}

fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`);
  console.log('Primer Llamado...');

  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...');

    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3);

      console.log('Tercer Llamado...');
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});
