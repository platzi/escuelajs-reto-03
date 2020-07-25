let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let API = 'https://rickandmortyapi.com/api/character/';

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    const estado = true;
    xhttp.open('GET', url_api, estado);
    xhttp.onreadystatechange = (() => {
      if(xhttp.readyState === 4) {
        (xhttp.status === 200)
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error(`Error ${url_api}`))
      }
    });
    xhttp.send();
  });
}

fetchData(API)
  .then((data) => {
    console.log('Primer Llamado...');
    const personaje = 0;
   //console.error(`Error ${error1}`);
    return fetchData(`${API} ${data.results[personaje].id}`)
  })
  .then((data) => {
    console.log('Segundo Llamado...')
    //console.error(`Error ${error2}`);
    return fetchData(data.origin.url)
  })
  .then((data) => {
    console.log('Tercero Llamado...')
    console.log(`Primer Personaje: ${data.name}`);
    console.log(`Personajes: ${data.info.count}`);
    console.log(`Dimensión: ${data.dimension}`);
    return fetchData(data.origin.url)
    //console.error(`Error ${error3}`);
    //return fetchData(data2.origin.url)
  })
  .catch(error => console.error(error));

// .then(error2, data2) => {
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     fetchData(data2.origin.url, (error3, data3) => {
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log(`Personajes: ${data1.info.count}`);
//       console.log(`Primer Personaje: ${data2.name}`);
//       console.log(`Dimensión: ${data3.dimension}`);
//     });
//   });
// });