var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var API = 'https://rickandmortyapi.com/api/character/'
var xhttp = new XMLHttpRequest()
let personajes,primer_personaje,dimension_personaje
const existError = error => console.log(`Error: ${error}`)

/*FUNCION FECTHDATA CREA Y RETORNA LOS RESULTADOS DE LA PROMESA*/
const fetchData = url_api => {
  return new Promise((resolve, reject) => {
  xhttp.onreadystatechange = event => {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200)
        resolve(JSON.parse(xhttp.responseText))
      else return reject(url_api)
    }
  };
  xhttp.open('GET', url_api, false)
  xhttp.send()
})
}

/*OBTENEMOS RESULTADOS DE PROMESA*/
fetchData(API)
  .then(data1 => {
    console.log(`Primer Llamado...`)
    personajes=data1
    return fetchData(API + personajes.results[0].id)
  })
  .then(data2 => {
    console.log(`Segundo Llamado...`)
    primer_personaje=data2
    return fetchData(primer_personaje.origin.url)
  })
  .then(data3 => {
    dimension_personaje=data3
    console.log(`Tercer Llamado...`)
    console.log(`Total Personajes: ${personajes.info.count}`)
    console.log(`Nombre Primer Personaje: ${primer_personaje.name}`)
    console.log(`Dimensión: ${dimension_personaje.dimension}`)
  })
  .catch(existError)
