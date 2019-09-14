const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (url_api)=> {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function (e) {
      if (xhttp.readyState === 4 && xhttp.status === 200)
        resolve(JSON.parse(xhttp.responseText));
      else
        reject(new Error('Sorry something went wrong, please try again later.'))
    };
    xhttp.open('GET', url_api, true);
    xhttp.send();
  });
};

const exec = async () => {
  try {
    let res1 =  await fetchData(API);
    let res2 =  await fetchData(`${API}\\${res1.results[0].id}`);
    let res3 =  await fetchData(res2.origin.url);
    console.log(`Personajes: ${res1.info.count}\nPrimer Personaje: ${res2.name}\nDimensión: ${res3['dimension']}`);
  } catch (e) {
    console.log(e);
  }
};

exec();
