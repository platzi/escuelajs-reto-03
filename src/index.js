const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';


function fetchData(url_api) {
  return new Promise( (resolv, reject)=>{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange =  (event) => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200)          
          resolv( JSON.parse( xhttp.responseText) );
        else 
          return reject(url_api);
      }
    };
    xhttp.open('GET', url_api, true);
    xhttp.send();
  })
};


fetchData( API )
  .then( (data) =>{
    console.log('Primer Llamado...')
    let url = API + data.results[0].id;
    return fetchData( url )
  })
  .then( (data)=>{
    console.log('Segundo Llamado...')
    console.log(data)
    let url = data.origin.url
    console.log( url )
    return fetchData( url )
  })
  .then( (data)=>{
    console.log('Tercero Llamado...')
    if( data.info )
      console.log(`Personajes: ${data.info.count}`);
    console.log(`Primer Personaje: ${data.name}`);
    console.log(`Dimensión: ${data.dimension}`);
  })
  .catch( ()=>console.log("error"))
