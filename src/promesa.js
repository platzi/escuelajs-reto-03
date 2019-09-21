const API = "https://rickandmortyapi.com/api/character/";
//Resolucion del ejercicio 3 con fetch
fetch(API).then(response => {
  console.log("Primer Llamado...");
  return response.json().then(data =>
    fetch(API + data.results[0].id).then(data2 => {
      console.log("Segundo Llamado...");

      return data2.json().then(data3 => {
        return fetch(data3.origin.url).then(data4 => {
          console.log(`Tercero Llamado...`);

          return data4.json().then(data5 => {
            console.log(`Personajes: ${data.info.count}`);
            console.log(`Primer Personaje: ${data3.name}`);
            console.log(`Dimensión: ${data5.dimension}`);
          });
        });
      });
    })
  );
});
