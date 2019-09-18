var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();
var storage = []


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
  .then(data1 => {
    storage.push(data1);  
    console.log ("Primer Llamado...")
    return fetchData(API+data1.results[0].id)
  })
  .then(data2 =>{
    storage.push(data2)
    console.log ("Segundo Llamado...")
    return fetchData(data2.origin.url)
  })
  .then(data3 =>{
    storage.push(data3)
    console.log("Tercer LLamado...")
    console.log(`Personajes: ${storage[0].info.count}`)
    console.log(`Primer Personaje: ${storage[1].name}`)
    console.log(`Dimension: ${storage[2].dimension}`)
  })
  .catch(Error =>{ 
    console.log("Se ha producido un error...")
  })