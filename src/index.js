//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();


const fetchData = (url_api, callback) => {
  xhttp.onreadystatechange = function (event) {
    //cambiar tipo de dato
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
      //parseo json
      callback(null, JSON.parse(xhttp.responseText));
      
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, true);
  xhttp.send();
};

//template strings + arrow functions
fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error ${erro1}`);
  console.log('Primer Llamado...')

  fetchData(API + data1.results[0].id,  (error2, data2) => {
      if (error2) return console.error(`${error2}`);
      console.log('Segundo Llamado...')
    
    fetchData(data2.origin.url, (error3, data3) => {
          if (error3) return console.error(`${error3}`);
          console.log('Tercer Llamado...')
          console.log(`Personajes ${data1.info.count}`);
          console.log(`Primer Personaje: ${data2.name}`);
          console.log(`Dimensión: ${data3.dimension}`);

        });
      });
    });
