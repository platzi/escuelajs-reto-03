const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const API = 'https://rickandmortyapi.com/api/character/'
const xhttp = new XMLHttpRequest()

var fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200)
          resolve(JSON.parse(xhttp.responseText))
        else 
          reject(url_api)
      }
    }
    xhttp.open('GET', url_api, true)
    xhttp.send()
  })
}

// fetchData(API)
//   .then(data1 => {
//     console.log('Primer Llamado...')
//     return fetchData(API + data1.results[0].id)
//   })
//   .then(data2 =>{
//     console.log('Segundo Llamado...')
//     return fetchData(data2.origin.url)
//   })
//   .then(data3 =>{
//     console.log('Tercero Llamado...')
//     console.log(`Personajes: ${data1.info.count}`)
//     console.log(`Primer Personaje: ${data2.name}`)
//     console.log(`Dimensión: ${data3.dimension}`)
//   })
//   .catch(()=>console.log("Error"))

async function start() {
  try {
    let data1 = await fetchData(API)
    let data2 = await fetchData(API + data1.results[0].id)
    let data3 = await fetchData(data2.origin.url)
    console.log('Primer Llamado...')
    console.log('Segundo Llamado...')
    console.log('Tercero Llamado...')
    console.log(`Personajes: ${data1.info.count}`)
    console.log(`Primer Personaje: ${data2.name}`)
    console.log(`Dimensión: ${data3.dimension}`)
  } catch (error) {
    console.log(error)
  }
}

start()