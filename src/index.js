// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();

const fetchData = (url_api, callback) => {
  xhttp.onreadystatechange =  event => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
        callback(null, JSON.parse(xhttp.responseText))
      else return callback(url_api)
    }
  }
  xhttp.open('GET', url_api, true)
  xhttp.send()
}

const onError = error => {
  if (error) {
    return console.log(`Error ${error}`)
  }
}

fetchData(API, (error1, data1) => {
  onError(error1)
  console.log(`Primer Llamado...`)
  fetchData(API + data1.results[0].id, (error2, data2) => {
    onError(error2)
    console.log(`Segundo Llamado...`)
    fetchData(data2.origin.url, (error3, data3) => {
      onError(error3)
      console.log(`Tercero Llamado...`)
      console.log(`Personajes: ${data1.info.count}`)
      console.log(`Primer Personaje: ${data2.name}`)
      console.log(`Dimensión: ${data3.dimension}`)
    })
  })
})