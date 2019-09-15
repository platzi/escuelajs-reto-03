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

const jsonString = (data, param) => {
  const response = JSON.parse(data);
  let searchParam, proxUrl;
  switch (param) {
    case "search_id":
      searchParam = response.results[0].id;
      proxUrl = `${BASE_API}${searchParam}`;
      return { response, proxUrl };
      break;
    case "url_person":
      searchParam = response.origin.url;
      proxUrl = searchParam;
      return { data, proxUrl };
      break;
    case "finally_info":
      return {
        name: response.name,
        type: response.type,
        dimension: response.dimension
      };
    default:
      return null;
  }
};

const errorFunction = () => {
  return `error: ${error_log}`;
};

fetchData(BASE_API, (error_one, data_one) => {
  if (error_one) errorFunction(error_one);
  const res = jsonString(data_one, "search_id");

  fetchData(res.proxUrl, (error_two, data_two) => {
    if (error_two) errorFunction(error_two);
    const res2 = jsonString(data_two, "url_person");

    fetchData(res2.proxUrl, (error_three, data_three) => {
      if (error_three) errorFunction(error_three);
      const res3 = jsonString(data_three, "finally_info");
      console.log(res3);
    });
  });
});
