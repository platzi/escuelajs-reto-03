"use strict";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var API = 'https://rickandmortyapi.com/api/character/';

var fetchData = function fetchData(url_api) {
  return new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4) {
        xhttp.status == 200 ? resolve(JSON.parse(xhttp.responseText)) : reject(new Error("Error ".concat(url_api)));
      }
    };

    xhttp.send();
  });
};

fetchData(API).then(function (data) {
  console.log("\n    Primer Llamado...\n    Segundo Llamado...\n    Tercer Llamado...\n\n    Personajes: ".concat(data.info.count));
  return fetchData("".concat(API).concat(data.results[0].id));
}).then(function (data) {
  console.log(" \n    Primer Personaje: ".concat(data.name));
  return fetchData(data.origin.url);
}).then(function (data) {
  console.log("\n    Dimensi\xF3n: ".concat(data.dimension));
})["catch"](function (err) {
  return console.error(err);
});