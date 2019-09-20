const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";

const fetchData = ({ method = "GET", urlApi = API }) => {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = event => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject(request.status);
        }
      }
    };
    request.open(method, urlApi, false);
    request.send();
  });
};

// Third Version -> async await with try + catch
const getData = async () => {
  try {
    let data1 = await fetchData({});
    let id = data1.results[0].id;
    let data2 = await fetchData({ urlApi: `${API}/${id}` });
    let url = data2.origin.url;
    let data3 = await fetchData({ urlApi: url });
    console.log(`Total de Personajes: ${data1.info.count}`);
    console.log(`Primer Personaje: ${data2.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

getData();

// Second Version -> then + catch
// fetchData({})
//   .then(res => {
//     // console.log(res);
//     console.log(`Total de Personajes: ${res.info.count}`);
//     return res.results[0].id;
//   })
//   .then(id => {
//     fetchData({ urlApi: `${API}/${id}` })
//       .then(res2 => {
//         // console.log(res2);
//         console.log(`Primer Personaje: ${res2.name}`);
//         return res2.origin.url;
//       })
//       .then(url => {
//         fetchData({ urlApi: url })
//           .then(res3 => {
//             // console.log(res3)
//             console.log(`Dimensión: ${res3.dimension}`);
//           })
//           .catch(err => console.error(err));
//       })
//       .catch(err => console.error(err));
//   })
//   .catch(err => console.error(`Error: ${err}`));

// First Version -> Callback Hell
// fetchData(API, function(error1, data1) {
//   if (error1) {
//     return console.error(`Error ${error1}`);
//   } else {
//     console.log("Primer Llamado...");
//   }
//   fetchData(API + data1.results[0].id, function(error2, data2) {
//     if (error2) {
//       return console.error(error1);
//     } else {
//       console.log("Segundo Llamado...");
//     }
//     fetchData(data2.origin.url, function(error3, data3) {
//       if (error3) {
//         return console.error(error3);
//       } else {
//         console.log("Tercero Llamado...");
//         // console.log("Personajes:" + " " + data1.info.count);
//         console.log(`Personajes: ${data1.info.count}`);
//         // console.log("Primer Personaje:" + " " + data2.name);
//         console.log(`Primer Personaje: ${data2.name}`);
//         // console.log("Dimensión:" + " " + data3.dimension);
//         console.log(`Dimensión: ${data3.dimension}`);
//       }
//     });
//   });
// });
