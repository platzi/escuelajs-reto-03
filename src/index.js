//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

    const fetchData = (url_api, data) => {
      return new Promise((resolve, reject)=> {
      xhttp.onreadystatechange = event => {
       
        if (xhttp.readyState === 4) {
          if (xhttp.status == 200){
            resolve({
              response: JSON.parse(xhttp.response),
              dataAnterior: data
            });
        } else {
          reject(errorMessage);
          }
        }
      };
      xhttp.open('GET', url_api, true);
      xhttp.send();
    });
    }
    
    fetchData(API)
      .then(({ response }) => {
        console.log("Primer Llamado...");
        return fetchData(`${API}${response.results[0].id}`, response);
      })
      .then(({ response, dataAnterior }) => {
        console.log("Segundo Llamado...");

        const response2 = {
          ...dataAnterior,
          dataAnterior2: response
        };

        return fetchData(response.origin.url, response2);
      })
      .then(({ response, dataAnterior }) => {
        console.log('Tercer Llamado...')
              console.log(`Personajes ${dataAnterior.info.count}`);
              console.log(`Primer Personaje: ${dataAnterior.dataAnterior2.name}`);
              console.log(`Dimensión: ${response.dimension}`);
      })
      .catch(url => {
        console.log(`Error ${errorMessage}`)
      });
    

      ///// Versión anterior del código.
      /*const fetchData = (url_api, callback) => {
  xhttp.onreadystatechange = function (event) {
    //cambio de tipo de dato en el 4
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200)
      //parseo json
      callback(null, JSON.parse(xhttp.responseText));
      
      else return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, true);
  xhttp.send();
};

// Cambio a template strings + arrow functions
/*fetch(API)
  .then(data1 => console.log('Primer Llamado...'))
  .catch(error1 => console.error(`Error ${erro1}`))
  return fetchData(data1.results[0].id)
    return console.log('Segundo Llamado...')}
  
  //if (error1) return console.error(`Error ${erro1}`);
  

  /*fetchData(API + data1.results[0].id,  (error2, data2) => {
      if (error2) return console.error(`${error2}`);
      console.log('Segundo Llamado...')
    
    fetchData(data2.origin.url, (error3, data3) => {
          if (error3) return console.error(`${error3}`);
          console.log('Tercer Llamado...')
          console.log(`Personajes ${data1.info.count}`);
          console.log(`Primer Personaje: ${data2.name}`);
          console.log(`Dimensión: ${data3.dimension}`);

        });
      });
    });*/