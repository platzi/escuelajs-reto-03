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

fetchData(API, async (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`)
  console.log("Primer Llamado...")
  await fetchData(`${API}${data1.results[0].id}`, async (error2, data2) => {
    if (error2) return console.error(`Error ${error2}`)
    console.log("Segundo Llamado...")
    await fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(`Error ${error3}`)
      console.log("Tercero Llamado...")
      console.log(`Personajes: ${data1.info.count}`)
      console.log(`Primer Personaje: ${data2.name}`)
      console.log(`Dimensión: ${data3.dimension}`)
    })
  })
})
