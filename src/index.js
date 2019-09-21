const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = "https://rickandmortyapi.com/api/character/";

// ***************************** CALLBACK HELL

const fetchData1 = (url_api, callback) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200) callback(null, JSON.parse(xhttp.responseText));
      else return callback(url_api);
    }
  };
  xhttp.open("GET", url_api, true);
  xhttp.send();
};

fetchData1(API, function(error1, data1) {
  if (error1) return console.error(`Error ${error1}`);
  console.log("Primer Llamado...");
  fetchData1(API + data1.results[0].id, function(error2, data2) {
    if (error2) return console.error(error1);
    console.log("Segundo Llamado...");
    fetchData1(data2.origin.url, function(error3, data3) {
      if (error3) return console.error(error3);
      console.log("Tercero Llamado...");
      console.log("***************************** CALLBACK HELL");
      console.log(`Personajes: ${data1.info.count}`);
      console.log(`Primer Personaje: ${data2.name}`);
      console.log(`Dimensión: ${data3.dimension}`);
      console.log("\n");
    });
  });
});
// // ***************************** PROMESAS

const fetchData2 = url_api => {
  const xhttp = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function(event) {
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) return resolve(JSON.parse(xhttp.responseText));
        else return reject(url_api);
      }
    };
    xhttp.open("GET", url_api, true);
    xhttp.send(null);
  });
};

let results = {};

fetchData2(API)
  .then(data1 => {
    results.data1 = data1;
    console.log("Primer Llamado...");
    return fetchData2(API + data1.results[0].id);
  })
  .then(data2 => {
    results.data2 = data2;
    console.log("Segundo Llamado...");
    return fetchData2(data2.origin.url);
  })
  .then(data3 => {
    console.log("Tercero Llamado...");
    console.log("***************************** PROMESAS");
    console.log(`Personajes: ${results.data1.info.count}`);
    console.log(`Primer Personaje: ${results.data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
    console.log("\n");
  })
  .catch(error => {
    console.log("Error");
    console.error(error);
  });

// // ***************************** ASYNC AWAIT
const asyncAwait = async () => {
  try {
    console.log("calling");
    const data1 = await fetchData2(API);
    const data2 = await fetchData2(API + data1.results[0].id);
    const data3 = await fetchData2(data2.origin.url);

    console.log("***************************** ASYNC AWAIT");
    console.log(`Personajes: ${results.data1.info.count}`);
    console.log(`Primer Personaje: ${results.data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
};

asyncAwait();
