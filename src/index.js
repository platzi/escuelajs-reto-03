const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const API = 'https://rickandmortyapi.com/api/character/'
const xhttp = new XMLHttpRequest()

const fetchDataByPromise = url => {   
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          const response = JSON.parse(xhttp.responseText)
          return resolve(response)
        } else{
          return reject(new Error('Hubo un error :('))
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
    const world = await fetchDataByPromise(url)
    console.log('Segundo llamado...')
    const chapters = await fetchDataByPromise(`${API}${world.results[0].id}`)
    console.log('Tercero Llamado...')
    const characters = await fetchDataByPromise(`${chapters.origin.url}`)
    console.log(`Personajes: ${world.info.count}`)
    console.log(`Primer Personaje: ${chapters.name}`)
    console.log(`Dimensión: ${characters.dimension}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

fetchData(API)