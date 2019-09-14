const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api) {

  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200)
          resolve(JSON.parse(xhttp.responseText));
        else
          return reject(url_api);
      }
    };
    xhttp.open('GET', url_api, true);
    xhttp.send();
  });
};


fetchData(API)
  .then( (data)=>{
    console.log('Primer Llamado...')
    let url = API + data.results[0].id;
    return fetchData( url )
  })
  .then( (data2)=>{
    console.log('Segundo Llamado...')
    let url =  data2.origin.url

    console.log(url)

    return fetchData(url)
  })
  .then( (data3)=>{
    console.log('Tercero Llamado...')
    if (data3.info)
    console.log('Personajes:' + ' ' + data3.info.count);
    console.log('Primer Personaje:' + ' ' + data3.name);
    console.log('Dimensión:' + ' ' + data3.dimension);
  })
  .catch( ()=> console.log("error"))