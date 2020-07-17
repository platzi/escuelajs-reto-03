const fetchData = require('./utils/fetchData.js');

const API = 'https://rickandmortyapi.com/api/character/';



fetchData(API)

  .then( data1 => {
    console.log('Primer Llamado...')
    console.log(`Personajes: ${data1.info.count}`);
    return fetchData(API + data1.results[0].id)
  })
  .then( data2 => {
    console.log('Segundo Llamado...')
    console.log(`Primer Personaje: ${data2.name}`);
    return fetchData(data2.origin.url)
  })
  .then( data3 => {
      console.log('Tercero Llamado...')
      console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(err => console.error(`Error ${err}`))