const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const BASE_API = "https://rickandmortyapi.com/api/character/",
  xhr = new XMLHttpRequest();

const fetchData = (url_api, callback) => {
  xhr.open("GET", url_api, false);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        return callback(null, xhr.responseText);
      } else {
        console.log("error!");
      }
    }
  };
  xhr.send();
};

fetchData(BASE_API, (error_one, data_one) => {
  if (error_one) return console.error(`error: ${error_one}`);
  const convertJSON = JSON.parse(data_one),
    idPerson = convertJSON.results[0].id,
    API_PERSON = `${BASE_API}${idPerson}`;

  fetchData(API_PERSON, (error_two, data_two) => {
    if (error_two) return console.error(`error: ${error_two}`);
    const convertJSON2 = JSON.parse(data_two),
      URL_PERSON = convertJSON2.origin.url;

    fetchData(URL_PERSON, (error_three, data_three) => {
      if (error_three) return console.error(`error: ${error_three}`);
      const person = JSON.parse(data_three);
      console.log(`Person: ${person.name}`);
      console.log(`Dimension: ${person.dimension}`);
      console.log(`Planet: ${person.type}`);
    });
  });
});
