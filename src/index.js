//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';


// function fetchData(url_api, callback) {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function (event) {
//     if (xhttp.readyState == '4') {
//       if (xhttp.status == 200)
//         callback(null, xhttp.responseText);
//       else return callback(url_api);
//     }
//   };
//   xhttp.open('GET', url_api, true);
//   xhttp.send();
// };

// fetchData(API, function (error1, data1) {
//    if (error1) return console.error(`Error ${error1}`);
//    console.log('Primer Llamado...')
//   data1=JSON.parse(data1);
//   fetchData(`${API} ${data1.results[0].id}`, function (error2, data2) {
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     data2=JSON.parse(data2);
//     fetchData(data2.origin.url, function (error3, data3) {
//       if (error3) return console.error(error3);
//       data3=JSON.parse(data3);
//       console.log('Tercero Llamado...')
//       console.log(`Personajes: ${data1.info.count}`);
//       console.log(`Primer Personaje: ${data2.name}`);
//       console.log(`Dimensión: ${data3.dimension}`);
//     });
//   });
// });
//const opts = {crossDomain: true}


function fetchData(url_api){
  var xhttp = new XMLHttpRequest();
  return new Promise((resolve, reject)=>  {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(xhttp.responseText)
        } else {
          reject(url_api)
        }
      }
    }
    xhttp.open('GET', url_api, true)
    xhttp.send()
  })
}

//Variable que va guardando los arreglos de data
var allData = []
fetchData(API)
    .then(data1 => {
      console.log('Primer Llamado...')
      data1=JSON.parse(data1);
      allData.push(data1)
      //devolvemos tmbien una promesa
      return fetchData(`${API} ${data1.results[0].id}`)
    })
    .then(data2 => {
        console.log('Segundo Llamado...')
        data2=JSON.parse(data2);
        allData.push(data2)
        //devolvemos tmbien una promesa
        return fetchData(data2.origin.url)
    })
    .then(data3 => {
      data3=JSON.parse(data3);
      allData.push(data3)
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${allData[0].info.count}`);
      console.log(`Primer Personaje: ${allData[1].name}`);
      console.log(`Dimensión: ${allData[2].dimension}`);
    })
    .catch() 
    
    function onError(){
      console.log(`Sucedió un error al obtener la información`)
  }