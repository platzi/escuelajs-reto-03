var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();




const fetchData = url_api => {
  return new Promise((resolve, reject) => {
      xhttp.onreadystatechange =  event => {
        if (xhttp.readyState === 4) {
          if (xhttp.status == 200)
            resolve(JSON.parse(xhttp.responseText));
          else reject(url_api);
        }
      };
      xhttp.open('GET', url_api, false);
      xhttp.send();
  })
}

fetchData(API)
  .then((data1)=> {
    console.log ("Primer Llamado...")
    id=data1
    return fetchData(API+data1.results[0].id)
  })
  .then((data2) =>{
    console.log ("Segundo Llamado...")
    nombre=data2
    return fetchData(data2.origin.url)
  })
  .then((data3) =>{
    console.log('Tercero Llamado...')
    console.log('Personajes:' + ' ' + id.info.count);
    console.log('Primer Personaje:' + ' ' + nombre.name);
    console.log('Dimensión:' + ' ' + data3.dimension);
  })
  .catch((err)=>{
    console.log(err.message)
})