const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchDataPromesa = url => {
  // const fetchData = (url_api, callback) => {
    return new Promise ((resolve,reject)=>{
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
          if (xhttp.status == 200){
            var respuesta = JSON.parse(xhttp.responseText);
            /*"respuesta" es la variable que recibe la solicitud
               en String y se le parsea la respuesta a JSON*/
            return resolve(respuesta);
          }
          else{
            return reject( new Error('404 Error'));
          } 
          //console.log(respuesta);
        }
      };
      xhttp.responseType = 'json'
      xhttp.open('GET', url, false);
      xhttp.send();
    })

  }



//fetchData (API, (error1, data1) => {
const fetchData = async url => {
  try {
    console.log('Primer Llamado...')
    //console.log(xhttp);
    const dato1 = await fetchDataPromesa(url); 
    console.log(`se tienen ${dato1.info.count} personajes`)
    
    //fetchData(API + datos1.results[0].id, function (error2, data2) {
      
    //console.log('Segundo Llamado...')
    for(let i=0; i<=dato1.info.count; i++){
      const dato2 = await fetchDataPromesa(`${API}${dato1.results[i].id}`);
      console.log(`nombre: ${dato2.name}`);
  
  
        
        //console.log('Tercer Llamado...')
        const dato3 = await fetchDataPromesa(dato2.origin.url)
        console.log (`De la dimensión: ${dato3.dimension}`);
        console.log('');
        console.log('');
        

    }

      
      //const datos2 = await fetchDataPromesa(`${API}${datos1.results[0].id}`);
      //console.log(datos2.name);
      //data2 = JSON.parse(data2);

     //const datos2 = await fetchDataPromesa(`${url}${datos1.results[0].name}`);

     /* //console.log(datos2)
      //fetchData(datos2.origin.url, function (error3, data3) {
        datos3 = JSON.parse(data3);
        const datos3 = await fetchDataPromesa(data3)
        console.log(`Personajes:     ${datos1.info.count}`);
        console.log(`Primer Personaje:  ${datos2.name}`);
        console.log(`Dimensión:   ${datos3.dimension}`);
      */
      } catch (error) {
    console.log(error)
    throw error
  }
}
fetchData(API); 
  
