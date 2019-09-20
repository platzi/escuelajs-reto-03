const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';

const fetchData = url_api => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) resolve(xhttp.responseText)
        else return reject(url_api);
      }
    }
    xhttp.open('GET', url_api, true);
    xhttp.send();
  })
};

fetchData(API)
.then(res => {
  const ID = JSON.parse(res).results[0].id
  console.log(`Personajes ${JSON.parse(res).info.count}`);
  return fetchData(`${API}${ID}`)
})
.then(res => {
  const URL = JSON.parse(res).origin.url
  console.log(`Primer Personaje ${JSON.parse(res).name}`)
  return fetchData(URL)
})
.then(res => {
  const DIMENSION = JSON.parse(res).dimension
  console.log(`Dimensión ${DIMENSION}`);
})
.catch(error => console.log('Hubo un error'))


// const fetchData = (url_api, callback) => {
  
//   xhttp.onreadystatechange = event => {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status == 200) callback(null, xhttp.responseText);
//       else return callback(url_api);
//     }
//   };
//   xhttp.open('GET', url_api, false);
//   xhttp.send();
// };

// fetchData(API, function (error1, data1) {
//   const PARSE_DATA_ONE = JSON.parse(data1)
//   if (error1) return console.error('Error' + ' ' + error1);
//   console.log('Primer Llamado...')
//   // console.log(PARSE_DATA)
//   fetchData(`${API}${PARSE_DATA_ONE.results[0].id}`, (error2, data2) => {
//     const PARSE_DATA_TWO = JSON.parse(data2)
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     fetchData(PARSE_DATA_TWO.origin.url, (error3, data3) => {
//       const PARSE_DATA_THREE = JSON.parse(data3)
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log(`Personajes ${PARSE_DATA_ONE.info.count}`);
//       console.log(`Primer Personaje ${PARSE_DATA_TWO.name}`);
//       console.log(`Dimensión ${PARSE_DATA_THREE.dimension}`);
//     });
//   });
// });