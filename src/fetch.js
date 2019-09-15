const app = (function() {
  let API = "https://rickandmortyapi.com/api/character/";
  const fetchData = API => {
    return new Promise(function(resolve, reject) {
      try {
        fetch(API)
          .then(data => data.json())
          .then(dataJSON => {
            resolve(dataJSON);
          })
          .catch();
      } catch (error) {
        reject(error);
      }
    });
  };

  fetchData(API)
    .then(function(dataJSON) {
      console.log("Primer Llamado...");
      console.log("Personajes:" + " " + dataJSON.info.count);
      console.log("Primer Personaje:" + " " + dataJSON.results[0].name);
      return fetchData((API = dataJSON.results[0].origin.url));
    })
    .then(function(res) {
      console.log("Segundo Llamado...");
      console.log(res.dimension);
    })
    .catch(function(e) {
      console.log(e);
    });
})();
