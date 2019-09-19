const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const URL_BASE = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();


function fetchData(url_api, callback) {
  
  xhttp.onreadystatechange = event => {

    if (xhttp.readyState === 4) {

      if (xhttp.status === 200){
    
        let response = JSON.parse(xhttp.responseText)
        return callback(null, response);
      }
      else{
    
        return callback(url_api);
      }
    }
  }
  xhttp.open('GET', url_api, true);
  xhttp.send();
}

const getCharacters = url => {

  return new Promise((resolve, reject)=> {
    
    try{
      fetchData(url,function (error, data){
        resolve(data)
      })
    }
    catch(url){
      reject(url)
    }
  })
}

let url_request = URL_BASE;


const onErr = url => console.log(`An error has happened in ${url}`)

getCharacters(url_request)
.then(function(data){
  
  console.log(`First Request...`)
  console.log(`# Characters: ${data.info.count}`)
  console.log(`---------------------------------`)
  url_request = URL_BASE + data.results[0].id
  return getCharacters(url_request)
})
.then(function(data){
  console.log(`Second Request...`)
  console.log(`First character: ${data.name}`)
  console.log(`---------------------------------`)
  url_request = data.origin.url
  return getCharacters(url_request)
})
.then(function(data){
  console.log(`Third Request...`)
  console.log(`Dimension: ${data.dimension}`)
  console.log(`---------------------------------`)
})
.catch(onErr)