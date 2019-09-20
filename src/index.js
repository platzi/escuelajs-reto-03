const XMLHttpRequest = require(`xmlhttprequest`).XMLHttpRequest

const API = `https://rickandmortyapi.com/api/character/`
const xhttp = new XMLHttpRequest()

function fetchData(url_api) {
    return new Promise ( (resolve, reject) => {
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
                (xhttp.status === 200) ? resolve(JSON.parse(xhttp.responseText)) : reject(url_api)
            }
        }
        xhttp.open(`GET`, url_api, false)
        xhttp.send()
    })
  }

fetchData(API)
    .then( data1 => {
       console.log(`Primer Llamado...`)
       console.log(`Personajes: ${data1.info.count} \n`)
       return fetchData(API + data1.results[1].id)
    })
    .then( data2 => {
        console.log(`Segundo Llamado...`)
        console.log(`Primer Personaje: ${data2.name} \n`)
        return fetchData(data2.origin.url)
    })
    .then( data3 => {
        console.log(`Tercer Llamado...`);
        console.log(`Dimensión: ${data3.dimension} \n`)
    })
    .catch( error => {
        console.log(`Tenemos un error: ${error}`)
    })