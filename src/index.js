const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();
debugger
const pomesafetchData = (url_api) => {

  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = function (event) {
      debugger
      console.log(xhttp.readyState)
      if (xhttp.readyState === 4) {
        console.log(xhttp.status)
        if (xhttp.status == 200) {
          console.log(xhttp);
          resolve(JSON.parse(xhttp.responseText));
        }
        else
          reject(url_api);
      }
      else
        reject(url_api);
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();

  });
}

const callData = async () => {

  const dataResult1 = await pomesafetchData(API);
  console.log(dataResult1);
  const dataResultTwo = await pomesafetchData(`${API}${dataResult1.results}`);
  console.log(dataResultTwo);
  const dataResult3 = await pomesafetchData(dataResultTwo.origin.url);
  console.log(dataResult3);
}

callData();


