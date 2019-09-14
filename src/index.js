const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const API = 'https://rickandmortyapi.com/api/character/'

const fetchData = endpoint => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      resolve(JSON.parse(xhr.responseText))
    })
    xhr.addEventListener('error', () => {
      reject(new Error(xhr.statusText))
    })
    xhr.open('GET', endpoint, false)
    xhr.send()
  })
}

const request = async () => {
  try {
    const data1 = await fetchData(API)
    const data2 = await fetchData(API + data1.results[0].id)
    const data3 = await fetchData(data2.origin.url)

    console.log(`Personajes: ${data1.info.count}`)
    console.log(`primer personaje: ${data2.name}`)
    console.log(`Dimensión: ${data3.dimension}`)
  } catch (error) {
    console.error('Ocurrío un error', error)
  }
}

request()