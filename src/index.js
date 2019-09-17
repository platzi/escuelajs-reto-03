/* var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; // Linea comentada para correr en navegador desde index.html */

var API = 'https://rickandmortyapi.com/api/character/';

const fetchData = url_api => {
  let xhttp = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText))
        } else {
          reject(url_api)
        }
      }
    }
    xhttp.open('GET', url_api, true)
    xhttp.send()
  })
}

var data = []

const urlError = url_api => console.log(`Ocurrio un error al consultar ${url_api}`);

fetchData(API)
  .then(data1 => {
    console.log('Primer Llamado...')
    data.push(data1)
    return fetchData(`${API}${data1.results[0].id}`)
  })
  .then(data2 => {
    console.log('Segundo Llamado...')
    data.push(data2)
    return fetchData(data2.origin.url)
  })
  .then(data3 => {
    console.log('Tercer Llamado...')
    data.push(data3)
    console.log(`Personajes: ${data[0].info.count}`)
    console.log(`Primer personaje: ${data[1].name}`)
    console.log(`Dimensión: ${data[2].dimension}`)
  })
  .catch(urlError)