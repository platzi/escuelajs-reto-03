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

/*
fetchData(API, (error1, data1) => {
  if (error1) return console.error('Error' + ' ' + error1);
  console.log('Primer Llamado...')
  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2) return console.error(error1);
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
*/