const API = "https://rickandmortyapi.com/api/character/";

const personajesTotales = document.getElementById("personajes");
const personajeIMG = document.getElementById("perImg");
const personajeNombre = document.getElementById("perName");
const personajeDimension = document.getElementById("perDimension");

const fecthAsincrono = async api_url => {
  try {
    const res = await fetch(api_url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/*
  Aquí Leonidas me explico como podría mejorar mi código y lo implemente,
  también añadi código para mostrar en el navegador la información
*/

const buscarPersonajes = async () => {
  const personajes = await fecthAsincrono(API);
  console.log("Primer Llamado...");
  console.log("Segundo Llamado...");
  console.log("Tercer Llamado...");

  const total = personajes.info.count;
  const per = personajes.results[0];
  const dimURL = per.origin.url;

  console.log(`Personajes: ${total}`);
  personajesTotales.textContent = total;
  console.log(`Primer Personaje: ${per.name}`);
  personajeNombre.textContent = per.name;
  console.log(`Imagen del personaje: ${per.image}`);
  personajeIMG.setAttribute("src", per.image);

  const dim = await fecthAsincrono(dimURL);

  console.log(`Dimensión: ${dim.dimension}`);
  personajeDimension.textContent = dim.dimension;
};
buscarPersonajes();

/*
  Aquí agrege la solución a la tercera parte del reto,
  opte por usar fetch y creé la funcion fetchAsincrono()
*/

// fecthAsincrono(API)
//   .then(data => {
//     console.log("Primer Llamado...");
//     return data;
//   })
//   .then(data => {
//     console.log("Segundo Llamado...");
//     return data;
//   })
//   .then(data => {
//     console.log("Tercero Llamado...");

//     const per = data.results[0];
//     const dim = per.origin.url;
//     console.log(`Personajes: ${data.info.count}`);
//     console.log(`Primer Personaje: ${per.name}`);
//     console.log(`Imagen del personaje: ${per.image}`);

//     fecthAsincrono(dim).then(dim => {
//       console.log(`Dimensión: ${dim.dimension}`);
//     });
//   });

// const fetchData = (url_api, callback) => {
//   xhttp.onreadystatechange = event => {
//     if (xhttp.readyState === 4) {
//       if (xhttp.status == 200) {
//         callback(null, xhttp.responseText);
//       } else {
//         return callback(url_api);
//       }
//     }
//   };
//   xhttp.open("GET", url_api, false);
//   xhttp.send();
// };

/*
  Aquí soluciones la primera y segunda parte del reto,
  donde corregí los errores y pase el codigo a ES6
*/

// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const xhttp = new XMLHttpRequest();

// fetchData(API, (error1, data1) => {
//   if (error1) {
//     return console.error(`Error ${error1}`);
//   }
//   const result = JSON.parse(data1);

//   console.log("Primer Llamado...");
//   fetchData(API + result.results[0].id, (error2, data2) => {
//     if (error2) {
//       return console.error(error1);
//     }
//     const result2 = JSON.parse(data2);
//     console.log("Segundo Llamado...");
//     fetchData(result2.origin.url, (error3, data3) => {
//       if (error3) {
//         return console.error(error3);
//       }
//       const result3 = JSON.parse(data3);
//       console.log("Tercero Llamado...");
//       console.log(`Personajes: ${result.info.count}`);
//       console.log(`Primer Personaje: ${result2.name}`);
//       console.log(`Imagen del personaje: ${result2.image}`);
//       console.log(`Dimensión: ${result3.dimension}`);
//     });
//   });
// });
