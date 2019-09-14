var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise(function (resolve, reject) {
    xhttp.onreadystatechange = function (event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200)
          resolve(JSON.parse(xhttp.responseText));
        else reject (url_api);
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
   })
}

/* fetchData(API, function (error1, data1) {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...')
  fetchData(API + data1.results[1].id, function (error2, data2) {
    if (error2) return console.error(error1);
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) return console.error(error3);
      console.log('Tercero Llamado...')
      console.log('Personajes:' + ' ' + data1.info.count);
      console.log('Primer Personaje:' + ' ' + data2.name);
      console.log('Dimensión:' + ' ' + data3.dimension);
    });
  });
}); */

fetchData(API)
  .then(data => {
    console.log("Primer Llamado...");
    dato1 = data;
    return fetchData(`${API}${data.results[0].id}`);
  })
  .then(data => {
    console.log("Segundo Llamado...");
    dato2 = data;
    return fetchData(data.origin.url);
  })
  .then(data => {
    console.log("Tercero Llamado...");
    console.log("Personajes:" + " " + dato1.info.count);
    console.log("Primer Personaje:" + " " + dato2.name);
    console.log("Dimensión:" + " " + data.dimension);
  })
  .catch(err => {
    console.log(err);
  });

  async function fetchDato () {
    try{
      let data1 = await fetchData(API);
      let data2 = await fetchData(API + data1.results[0].id);
      let data3 = await fetchData(data2.origin.url);
      console.log("Tercero Llamado...");
      console.log("Personajes:" + " " + data1.info.count);
      console.log("Primer Personaje:" + " " + data2.name);
      console.log("Dimensión:" + " " + data3.dimension);
    } catch(error){
      errorCallback(error);
    }
  }
