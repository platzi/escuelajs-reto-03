"use strict";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

var fetchData = function fetchData(url_api, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', url_api, true);

  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200) {
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        var error = new Error("Error ".concat(url_api));
        return callback(error, null);
      }
    }
  };

  xhttp.send();
};

fetchData(API, function (error1, data1) {
  if (error1) return console.error(error1);
  console.log('Primer Llamado...');
  fetchData(API + data1.results[0].id, function (error2, data2) {
    if (error2) return console.error(error2);
    console.log('Segundo Llamado...');
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) return console.error(error3);
      console.log("Tercero Llamado...\n      \nPersonajes: ".concat(data1.info.count, "\nPrimer Personaje: ").concat(data2.name, "\nDimensi\xF3n: ").concat(data3.dimension));
    });
  });
});