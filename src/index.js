var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';
var xhttp = new XMLHttpRequest();



function fetchData(url_api, callback) {
  xhttp.onreadystatechange =  (event) => {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
        callback(null, xhttp.responseText);
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
}

const information = async()=> {
//  try{
  
  let datos1; 
  await fetchData(API,  (error1, data1) => {
    datos1 = JSON.parse(data1);
    return datos1;
  });
    console.log('Primer Llamado...');

  let datos2; 
  await fetchData(API+datos1.results[0].id,  (error1, data2) => {
    datos2 = JSON.parse(data2);
    return datos2;
  });
  console.log('Segundo  Llamado...');
  console.log(datos2)
  // let datos3; 
  // await fetchData(API+datos2.origin.url,  (error1, data3) => {
  //   datos3 = JSON.parse(data3);
  //   return datos3;
  // });
  // console.log(datos3)
  
}

information()

// fetchData(API,  (error1, data1) => {
//   console.log('Primer Llamado...');
//   const dato1 = JSON.parse(data1);

//   fetchData(API + dato1.results[0].id, function (error2, data2) {
//     const dato2 = JSON.parse(data2);
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')

//     fetchData(dato2.origin.url, function (error3, data3) {
//       const dato3 = JSON.parse(data3);
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log('Personajes:' + ' ' + dato1.info.count);
//       console.log('Primer Personaje:' + ' ' + dato2.name);
//       console.log('Dimensión:' + ' ' + dato3.dimension);
//     });
//   });
// })