var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

var API = "https://rickandmortyapi.com/api/character/"

const fetchData = (url_api, callback = () => {}) => {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = _ => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(callback(null, JSON.parse(xhttp.responseText)))
        } else {
          reject(callback(url_api))
        }
      }
    }
    xhttp.open("GET", url_api, true)
    xhttp.send(null)
  })
}

fetchData(API, (error1, data1) => {
  if (error1) console.error(error1)
  console.log("Primer Llamado...")
  return data1
})
  .then(res =>
    fetchData(`${API}${res.results[0].id}`, (error2, data2) => {
      if (error2) console.error(error2)
      console.log("Segundo Llamado...")
      return { data1: res, data2 }
    })
  )
  .then(res =>
    fetchData(res.data2.origin.url, (error3, data3) => {
      if (error3) return console.error(`Error ${error3}`)
      console.log("Tercer Llamado...")
      console.log(`Personajes: ${res.data1.info.count}`)
      console.log(`Primer Personaje: ${res.data2.name}`)
      console.log(`Dimensión: ${data3.dimension}`)
    })
  )
