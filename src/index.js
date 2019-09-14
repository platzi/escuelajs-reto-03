/* 
.
Sept 14, 2019
escuelajs-reto-03
Arantxa Rosas
Ciudad de México 
Reto 1,2 y 3
.
*/ 

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const url_api = "https://rickandmortyapi.com/api/character/";

const fetchData = ({ method = "GET", url_api, async = false }) => {
  
  const xhttp = new XMLHttpRequest();
  
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      xhttp.readyState === 4 && xhttp.status === 200
        ? resolve(JSON.parse(xhttp.responseText))
        : reject(new Error("Algo salió mal. Intente más tarde."));
    };

    //method, URL, is async?
    xhttp.open(method, url_api, async);
    xhttp.send();
  });
};

const fetchingData = async () => {
  try {
    let resultado1 = await fetchData({ url_api });

    console.log(`Primer Llamado...`);

    let resultado2 = await fetchData({
      url_api: `${url_api}\\${resultado1.results[0].id}`
    });

    console.log(`Segundo Llamado...`);

    let resultado3 = await fetchData({ url_api: resultado2.origin.url });

    console.log(
      `Tercer Llamado...:\n ${resultado1.info.count}\n Primer Personaje: ${resultado2.name} \nDimensión: ${resultado3.dimension}`
    );

  } catch (error) {
    console.error(error);
  }
};

fetchingData();
