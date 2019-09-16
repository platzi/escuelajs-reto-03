const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require('node-fetch');

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchDataPromise = url => {   
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          const response = JSON.parse(xhttp.responseText)
          return resolve(response)
        } else {
          return reject(new Error('Ups, algo salio mal' + console.log(reject)))
        } 
      }
    }
    xhttp.responseType = 'json'
    xhttp.open('GET', url, false)
    xhttp.send()
	})
}

const fetchData = async url => {
  try {
    console.log('Primer llamado...')
    const mundo = await fetchDataPromise(url)

    console.log('Segundo llamado...')
    const capitulos = await fetchDataPromise(`${API}${mundo.results[0].id}`)

    console.log('Tercero Llamado...')
    const personajes = await fetchDataPromise(`${capitulos.origin.url}`)

    console.log(`Personajes: ${mundo.info.count}`)
    console.log(`Primer Personaje: ${capitulos.name}`)
    console.log(`Dimensión: ${personajes.dimension}`)

    } catch (error) {
    console.log(error.text)
  }
}

fetchData(API)