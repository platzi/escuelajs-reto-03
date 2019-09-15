const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api, callback) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = (event) => {
    // console.log('state-->', xhttp.readyState);
    if (xhttp.readyState === 4) {
      // console.log('Status-->', xhttp.status);
      if (xhttp.status == 200){
        // console.log('-->',JSON.parse(xhttp.responseText));
        callback(null, JSON.parse(xhttp.responseText));
      }
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, true);
  xhttp.send();
};

fetchData(API, (error1, data1) => {
  // console.log('data1',JSON.parse(data1));
  if (error1) return console.error(`Error ${error1}`);
  console.log('Primer Llamado...')
  // console.log('--->',data1.results);
  fetchData(`${API}${data1.results[0].id}`, (error2, data2) => {
    if (error2) return console.error(error2);
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
    });
  });
});