"use strict";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";
const xhttp = new XMLHttpRequest();

const fetchData = url_api => {
  return new Promise((resolve, reject) => {
    // console.log("Quiero probar que por aquí entra 2");
    xhttp.onreadystatechange = function(event) {
      // console.log("Quiero probar que por aquí entra 3");
      if (xhttp.readyState === 4) {
        if (xhttp.status == 200) {
          resolve(xhttp.responseText);
        } else reject(`El estado de la respuesta es ${xhttp.status}`);
      }
    };
    xhttp.open("GET", url_api, false);
    xhttp.send();
  });
};

const mainPromise = () => {
  fetchData(API)
    .then(data => {
      console.log("Primer Llamado...");
      let dataParse = JSON.parse(data);
      console.log(`Personajes ${dataParse.info.count}`);
      return fetchData(API + dataParse.results[0].id);
    })
    .then(data2 => {
      console.log("Segundo Llamado...");
      let dataParse2 = JSON.parse(data2);
      console.log(`Primer Personaje: ${dataParse2.name}`);
      console.log(dataParse2.origin.url);
      return fetchData(dataParse2.origin.url);
    })
    .then(data3 => {
      console.log("Tercero Llamado...");
      let dataParse3 = JSON.parse(data3);
      console.log(`Dimensión: ${dataParse3.dimension}`);
    })
    .catch(err => {
      console.log(err);
    });
};

mainPromise();
