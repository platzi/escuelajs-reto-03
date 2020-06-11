const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/'

function fetchData(url_api) {
  const xhttp = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    xhttp.open('GET', url_api)
    xhttp.onreadystatechange = (() => {
      if(xhttp.readyState === 4) {
        if(xhttp.status === 200) {
          resolve(JSON.parse(xhttp.responseText))
        } else {
          reject(new Error('Error:', url_api))
        }
      }
    })
  xhttp.send()
})
}

fetchData(API)
  .then(response => response)
  .then(data => {
    console.log(`personajes: ${data.info.count}`)
    return data.results[0]
  })
  .then(data => {
    console.log(`Primer Personaje ${data.name}`)
    console.log(`Dimension ${data.origin.name}`)  
  })