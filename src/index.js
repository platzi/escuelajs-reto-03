let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/'

// convertir arrow functions y template literals


const fetchData = (url_api, callback) => {
  let xhttp = new XMLHttpRequest()
  xhttp.open('GET', url_api, true)
  xhttp.onreadystatechange = (e) => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200){
        callback(null, JSON.parse(xhttp.responseText))
      }
      else {
        const error = new Error(error)
        return callback(url_api)
      } 
    }
  };
  xhttp.open('GET', url_api, false)
  xhttp.send()
};

fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`)
  console.log('Primer Llamado...')
  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2) return console.error(error1)
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3)
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data1.info.count}`)
      console.log(`Primer Personaje: ${data2.name}`) 
      console.log(`Dimensión: ${data3.dimension}`) 
    });
  });
});

//promesa

const fetchData2 = (url_api) => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', url_api, true)
    xhttp.onreadystatechange = (() => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200){
            return resolve(JSON.parse(xhttp.responseText))
        } else {
          reject(new Error('Error ', url_api))
        }
      }
    }) 
    xhttp.send()
  })
}
setTimeout(() => console.log(`


ahora la promesa...


`), 1000)
setTimeout(() => console.log('Primer Llamado...'), 3000)
setTimeout(() => console.log('segundo Llamado...'), 4000)
setTimeout(() => console.log('Tercer Llamado...'), 5000)

fetchData2(API)
.then( data => {
    setTimeout((e) => console.log(`Personajes: ${data.info.count}`), 6000)
    return fetchData2(`${API}${data.results[0].id}`)
})
.then(data => {
    setTimeout((e) => console.log(`Primer Personaje:${data.name}`), 7000)
    return fetchData2(data.origin.url)
})
.then(data => {
    setTimeout((e) => console.log(`Dimensión: ${data.dimension}`), 8000)
    
})
.catch(err => console.log(err))