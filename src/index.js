// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/'
var xhttp = new XMLHttpRequest() 

const fetchData = (url_api) => {
  return new Promise ((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          var data = JSON.parse(xhttp.responseText)
          resolve(data)
        } 
        else {
          reject(url_api)
        }
      }
    }
    xhttp.open('GET', url_api, true)
    xhttp.send()
  })
}


const onError = error => {
  if (error) {
    return console.log(`Error ${error}`)
  }
}

var result1, result2
fetchData(API)
  .then( data1 => {
    console.log('Primer Llamado...')
    result1 = data1
    return fetchData(API + data1.results[0].id)
  }) 
  .then( data2 => {
    console.log('Segundo Llamado...')
    result2 = data2
    return fetchData(data2.origin.url)
  })
  .then( data3 => {
    console.log('Tercer Llamado...')
    console.log(`Personajes: ${result1.info.count}`)
    console.log(`Primer Personaje: ${result2.name}`)
    console.log(`DimensiÃ³n: ${data3.dimension}`)
  })
  .catch(onError)
  