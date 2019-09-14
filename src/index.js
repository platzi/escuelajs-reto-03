var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var API            = 'https://rickandmortyapi.com/api/character/'
var xhttp          = new XMLHttpRequest()


fetchData = (url_api, callback) => {
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState == '4') {
      if (xhttp.status == 200)
        callback(null, JSON.parse(xhttp.responseText))
      else
        return callback(url_api);
    }
  };
  xhttp.open('GET', url_api, false)
  xhttp.send()
}
// De momento no se como traducir esto a promesas o asyn await
fetchData(API, (error1, data1) => {
  if (error1)
    return console.error(`Error1: ${error1}`)
  console.log('Primer Llamado...')
  fetchData(API + data1.results[0].id, (error2, data2) => {
    if (error2)
      return console.error(`Error 2: ${error2}`)
    console.log('Segundo Llamado...')
    fetchData(data2.origin.url, (error3, data3) => {
      if (error3)
        return console.error(`Error 3: ${error3}`)
      console.log('Tercero Llamado...')
      console.log(`Personajes: ${data1.info.count}`)
      console.log(`Primer personaje: ${data2.name}`)
      console.log(`Dimension: ${data3.dimension}`)
    });
  });
});