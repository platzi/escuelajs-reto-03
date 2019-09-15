const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function () {

//       console.log(xhttp.readyState)
      if (xhttp.readyState === 4) {
//         console.log(xhttp.status)
        if (xhttp.status == 200) {
//           console.log(xhttp);
          resolve(JSON.parse(xhttp.responseText));
        }
        else
          reject(url_api);
      }
      else
        reject(url_api);
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();

  });
}

const getData = async () => {

  const dataResult1 = await fetchData(API);
//   console.log('infomración juan: ' + dataResult1.results[0].id);
   const dataResultTwo = await fetchData(`${API}${dataResult1.results[0].id}`);
  // console.log('infomración juan: ' + dataResult1.results[0].id);
//   console.log(dataResultTwo);
  const dataResult3 = await fetchData(dataResultTwo.origin.url);

      console.log('Tercero Llamado...')
      console.log('Personajes:' + ' ' + dataResult1.info.count);
      console.log('Primer Personaje:' + ' ' + dataResultTwo.name);
      console.log('Dimensión:' + ' ' + dataResult3.dimension);
}

getData();