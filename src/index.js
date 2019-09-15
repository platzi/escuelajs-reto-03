/* eslint-disable no-console */
const { XMLHttpRequest } = require('xmlhttprequest');

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (urlApi) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState !== 4) return;
      if (xhttp.status >= 200 && xhttp.status < 300) {
        resolve(xhttp.responseText);
      } else {
        reject(xhttp.status);
      }
    };
    xhttp.open('GET', urlApi, false);
    xhttp.send();
  });
};

async function obtenerPersonajes() {
  try {
    let data1 = await fetchData(API);
    console.log('Primer Llamado...');
    data1 = JSON.parse(data1);
    let data2 = await fetchData(`${API}${data1.results[0].id}`);
    console.log('Segundo Llamado...');
    data2 = JSON.parse(data2);
    let data3 = await fetchData(`${data2.origin.url}`);
    data3 = JSON.parse(data3);
    console.log('Tercero Llamado...');
    console.log(`Personajes:  ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    console.log(error);
  }
}

obtenerPersonajes();
