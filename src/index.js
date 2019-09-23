const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const API = "https://rickandmortyapi.com/api/character/"

const fetchData = (url_api = API, data = {}) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          resolve({ response: JSON.parse(xhttp.responseText), data })
        } else {
          reject(`Error to fetch: ${url_api}`)
        }
      }
    }

    xhttp.open("GET", url_api, true)
    xhttp.send(null)
  })
}

fetchData()
  .then(data1 => {
    console.log("Primer Llamado...")
    return fetchData(`${API}${data1.response.results[0].id}`, {
      data1: data1.response
    })
  })
  .then(data2 => {
    console.log("Segundo Llamado...")
    return fetchData(data2.response.origin.url, {
      ...data2.data,
      data2: data2.response
    })
  })
  .then(data3 => {
    console.log("Tercer Llamado...")
    console.log(`Personajes: ${data3.data.data1.info.count}`)
    console.log(`Primer Personaje: ${data3.data.data2.name}`)
    console.log(`Dimensión: ${data3.response.dimension}`)
  })
  .catch(err => console.error(err))
