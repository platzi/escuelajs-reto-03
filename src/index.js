var API = "https://rickandmortyapi.com/api/character/";
var xhttp = new XMLHttpRequest();

/**
 * Una abstracción sobre XMLHttpRequest
 * @param {string} url_api La url a solicitar con AJAX
 * @param {function} callback El callback a llamar cuando la solicitud esté completada
 */
function fetchData(url_api, callback) {
  xhttp.onreadystatechange = function(event) {
    console.log("fetchData", {
      responseText: xhttp.responseText,
      xhttp,
      url_api: url_api
    });
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        let response = null;
        let error = null;
        try {
          response = JSON.parse(xhttp.responseText);
        } catch (e) {
          error = e;
          console.error("Failed to parse response", e);
        } finally {
          callback(error, response);
        }
      } else {
        callback(true, null);
      }
    }
  };
  xhttp.open("GET", url_api, false);
  xhttp.send();
}

// fetchData(API, function (error1, data1) {
//   if (error1) return console.error('Error', error1);
//   console.log('Primer Llamado...')
//   fetchData(API + data1.results[0].id, function (error2, data2) {
//     if (error2) return console.error(error1);
//     console.log('Segundo Llamado...')
//     fetchData(data2.origin.url, function (error3, data3) {
//       if (error3) return console.error(error3);
//       console.log('Tercero Llamado...')
//       console.log('Personajes:' + ' ' + data1.info.count);
//       console.log('Primer Personaje:' + ' ' + data2.name);
//       console.log('Dimensión:' + ' ' + data3.dimension);
//     });
//   });
// });

const doFetch = url => fetch(url).then(response => response.json());

/**
 *
 * @param {string} charachterName El nombre del personaje al cual buscar
 */
async function getCharacterInfo(charachterName = "Rick Sanchez") {
  const {
    results = [],
    info = {
      count: 0,
      next: "",
      pages: 0,
      prev: ""
    }
  } = await doFetch(API);
  const charachterObject = results.find(charachter =>
    charachter.name.includes(charachterName)
  );
  if (!charachterObject) {
    throw new Error(`El personaje ${charachterName} no existe en la página 1`);
  }
  const location = await doFetch(charachterObject.location.url);
  return { charachter: charachterObject, location, listingInfo: info };
}

getCharacterInfo()
  .then(({ charachter, location, listingInfo }) => {
    document.write(`Personajes: ${listingInfo.count}<br>`);
    document.write(`Primer Personaje: ${charachter.name}<br>`);
    document.write(`Dimensión: ${location.dimension}<br>`);
  })
  .catch(error => {
    console.error(error);
  });
