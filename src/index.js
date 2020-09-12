//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var API = 'https://rickandmortyapi.com/api/character/';

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/'
// Quito los puntos y comas

/*-------------------------------------------------------------------------*/

// function fetchData(url_api, callback) {
//var xhttp = new XMLHttpRequest();
//   console.log ('fech')
//   xhttp.onreadystatechange = function (event) {
//     if (xhttp.readyState === '4') {
//       console.log (xhttp.status)
//       if (xhttp.status == 200)
//         callback(null, xhttp.responseText);
//       else return callback(url_api);

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
  }
  // xhttp.open('GET', url_api, false);
  // xhttp.send();
  xhttp.open('GET', url_api, false)
  xhttp.send()
  // cambio function por const, transformo la funcion around function  console.log ('fech') probar codigo
  //cambio el '4 a 4
  /*-------------------------------------------------------------------------*/ 
  
}

// fetchData(API, function (error1, data1) {
//   if (error1) return console.error('Error' + ' ' + error1);
fetchData(API, (error1, data1) => {
  if (error1) return console.error(`Error ${error1}`)
  console.log('Primer Llamado...')
  //console.log (data1.info)

  // fetchData(API + data1.results[0].id, function (error2, data2) {
  //   if (error2) return console.error(error1);
  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2) return console.error(error1)
    console.log('Segundo Llamado...')
    // fetchData(data2.origin.url, function (error3, data3) {
    //   if (error3) return console.error(error3);
    fetchData(data2.origin.url, (error3, data3) => {
      if (error3) return console.error(error3)
      console.log('Tercero Llamado...')

      // console.log('Personajes:' + ' ' + data1.info.count);
      // console.log('Primer Personaje:' + ' ' + data2.name);
      // console.log('Dimensión:' + ' ' + data3.dimension);
      console.log(`Personajes: ${data1.info.count}`)
      console.log(`Primer Personaje: ${data2.name}`) 
      console.log(`Dimensión: ${data3.dimension}`) 
    })
  })
})


