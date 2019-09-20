const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const xhttp = new XMLHttpRequest()
const API = 'https://rickandmortyapi.com/api/character/'

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      // Verifica que Ready state es igual a DOM. Dom === 4
      if (xhttp.readyState === 4) {
        //Verifica que el status del servidor este correcto.
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText))
        } else reject(url_api)
      }
    }
    xhttp.open('GET', url_api, false)
    xhttp.send()
  })
}

const onError = (err) => {
  console.log(`Ha ocurrido un error ${err}`)
}

fetchData(API)
  .then(data1 => {
    console.log(`Primer Llamado...`)
    console.log(`      Personajes: ${data1.info.count}`)
    return fetchData(API + data1.results[0].id)
  }).then((data2) => {
    console.log(`Segundo Llamado...`)
    console.log(`Personaje: ${data2.name}`)
    return fetchData(data2.origin.url)
  }).then((data3) => {
    console.log(`Tercer Llamado...`)
    console.log(`Dimensión: ${data3.dimension}`)
  })
  .catch(onError)
