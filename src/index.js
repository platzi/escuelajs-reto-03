const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
let xhttp = new XMLHttpRequest();

function fetchData (url_api) 
{
  return new Promise((resolve,reject) => 
  {
    xhttp.onreadystatechange = (event) => 
    {
      if (xhttp.readyState === 4)
      {
        if (xhttp.status == 200)
        {
          resolve(JSON.parse(xhttp.responseText));
        } 
        else 
        {
          reject(url_api);
        }
        
      }
    }
    xhttp.open('GET', url_api, false);
    xhttp.send();
  });
}

fetchData(API)
.then( (data1) => {
  // console.log('Primer Llamado...')
  console.log(`Personajes: ${data1.info.count}`);
  return fetchData( API+data1.results[0].id )
})
.then ( (data2)=> {
  // console.log('Segundo Llamado...')
  console.log(`Primer Personaje: ${data2.name}`);
  return fetchData( data2.origin.url )
})
.then ( (data3) => {
  // console.log('Tercero Llamado...')
  console.log(`Dimensión: ${data3.dimension}`);
})
.catch( (error) => {
  console.error(`Error ${error}`);
});