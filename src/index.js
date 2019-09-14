var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = (url_api, callback) => {
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
};

fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`);
  console.log('Primer Llamado...')
  const dataJson = JSON.parse(data1)
  fetchData(API + dataJson.results[0].id, (error2, data2)=> {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...')
    const data2Json = JSON.parse(data2)
    fetchData(data2Json.origin.url, (error3, data3)=> {
      const data3Json = JSON.parse(data3)
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${dataJson.info.count}`)
      console.log(`Primer Personaje: ${data2Json.name}`)
      console.log(`Dimensión: ${data3Json.dimension}`);
    });
  });
});