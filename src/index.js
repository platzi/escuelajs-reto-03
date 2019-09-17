const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const XHttps = new XMLHttpRequest()

const API = 'https://rickandmortyapi.com/api/character/'
const RESULTS_NUMB = 0

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    XHttps.onreadystatechange = (event) => {
      if (XHttps.readyState === 4) {
        if (XHttps.status == 200) resolve(JSON.parse(XHttps.responseText))
        else reject(`Error URL: ${url_api}`)
      }
    }
    XHttps.open('GET', url_api, false)
    XHttps.send()
  })
}

fetchData(API)
.then(r => {
  console.info(`Personajes: ${r.info.count}`)
  return fetchData(`${API}${r.results[RESULTS_NUMB].id}`)
})
.then(r => {
  console.info(`Personaje No. ${r.id}: ${r.name}`)
  return fetchData(r.origin.url)
})
.then(r => {console.info(`Dimensión: ${r.dimension}`)})
.catch(e => {console.error(e)})
