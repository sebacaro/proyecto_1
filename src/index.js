
import 'whatwg-fetch';
import { ApiRequest } from './dataRequest';

function createRow(currencyName, data) { //usando "template string"
  return `
    <tr>
      <td>${currencyName}</td>
      <td>${data['15m']}</td>
      <td>${data.buy}</td>
      <td>${data.last}</td>
      <td>${data.sell}</td>
      <td>${data.symbol}</td>
    </tr>
  `;
}

function createTable(responseData){
    const tableData = JSON.parse(responseData);

    console.log(tableData);

    //comienzo prueba

    //identifico lo que necesito
    const tableRow = document.querySelector('table thead tr');
    const tableColumn = '<th>Currency</th><th>15m</th><th>Last</th><th>Buy</th><th>Sell</th><th>Symbol</th>';
    const searchForm = document.querySelector('#search-form');

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const searchInput = event.target.querySelector('input');
      console.log(searchInput.value);
      //tarea: con este texto tengo que acceder a la tabla. Crear una función que sea capaz de buscar el contenido en la tabla y solo buscar la info en la columna de currency en el primer td.
      //tips: un buen selector para encontrar las columnas seria tr td:nth-child(1)
      //utilizar querySelectorAll para que me encuentre todo
      //al string del texto se le puede aplicar la función .toUpperCase()
      //tengo que buscar todo el tr
      // evalucación: deviolver el tr donde esta el texto buscado y si no se encuentra el texto imprimir "texto no encontrado"
      //tengo que uar for comparar el valor e imprimir en consola
      //cuando ocupe querySelectorAll luego tengo que ocupar .parentElement

    });






    //inserto la data de tableColumn al tableRow
    tableRow.innerHTML = tableColumn;

    //en tableBody busco con un metodo a table y tbody y creo una variable tabledataHtml para concatenar el resto de la información
    const tableBody = document.querySelector('table tbody');
    let tabledataHtml = '';

    //se crea una constante en donde se le pasa un metodo que busque todo los objetos en tableData
    const currencyNames = Object.keys(tableData);

    //console.log(currencyNames);

      //['USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD']

    //se crea el for en donde i es = a 0  y si es mayor que currencyNames (constante creada para llamar la tableData, le asignamos la propiedad length, luego le decimos que el ciclo sea incremental)
    for(let i = 0; i < currencyNames.length; i++ ){

      // creamos una constante que se llama currencyName para asiganrle la variable de arriva currencyNames con [i] variable entre parentesis
      const currencyName = currencyNames[i]

      // se arma la tabla partiendo por la tabla general se le suma y continua += se crea la fila concatenada
      // llamado a la función
      tabledataHtml += createRow(currencyName, tableData[currencyName]);

    }

    tableBody.innerHTML = tabledataHtml;


    }


    //fin prueba


    //Parte 1 Tarea
    //Implementar código para crear la tabla basada en la data acá
    //No olvidar agregar el código HTML necesario en el archivo index.html


/*
Ayuda 1:
En este trozo de código estamos ejecutando la petición al servidor, obteniendo la respuesta
con los datos necesarios. Una vez ocurrido esto, le decimos
a la función "apiRequest" que "luego que" (then)
ocurra lo que tenga que suceder con la petición al servidor ejecute la función "createTable"
*/
ApiRequest()
    .then(createTable);