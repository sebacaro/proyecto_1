
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

function creatOption(currencyName) {
  return `<option value="${currencyName}">${currencyName}</option>`
}

// función que pinta la row

function onChange(event) {
  const select = event.target;
  const selectedIndex = select.selectedIndex;
  const optionSelected = select.options[selectedIndex];
  const currencyNameSelected = optionSelected.getAttribute('value');
  const tableRows = document.querySelectorAll('table tbody tr');

  for(let i = 0; i < tableRows.length; i++ ) {

    const actualRow =  tableRows[i];
    const currencyName = actualRow.querySelector('td').textContent;
    //const rowCurrencySelect = actualRow.classList.contains('.row__currency--selected');

    // actualRow.classList.contains
    // actualRow.classList.add
    // actualRow.classList.remove

    const selectClass = 'row__currency--selected';

    if (currencyName === currencyNameSelected) {
      actualRow.classList.add(selectClass);
    }

    else if (actualRow.classList.contains(selectClass)) {
      actualRow.classList.remove(selectClass);
    }

  }

}

function createTable(responseData){
    const tableData = JSON.parse(responseData);

    console.log(tableData);

    //comienzo prueba

    //identifico lo que necesito
    const tableRow = document.querySelector('table thead tr');
    const tableColumn = '<th>Currency</th><th>15m</th><th>Last</th><th>Buy</th><th>Sell</th><th>Symbol</th>';


    //inserto la data de tableColumn al tableRow
    tableRow.innerHTML = tableColumn;

    //en tableBody busco con un metodo a table y tbody y creo una variable tabledataHtml para concatenar el resto de la información
    const tableBody = document.querySelector('table tbody');
    let tabledataHtml = '';

    const select = document.querySelector('.home__select--currency');
    let optionHtml = '<option>TODOS</option>';



    //se crea una constante en donde se le pasa un metodo que busque todo los objetos en tableData
    const currencyNames = Object.keys(tableData);

    //console.log(currencyNames);

      //['USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'DKK', 'EUR', 'GBP', 'HKD', 'INR', 'ISK', 'JPY', 'KRW', 'NZD', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TWD']

    //se crea el for en donde i es = a 0  y si es mayor que currencyNames (constante creada para llamar la tableData, le asignamos la propiedad length, luego le decimos que el ciclo sea incremental)

    for(let i = 0; i < currencyNames.length; i++ ){

      // creamos una constante que se llama currencyName para asiganrle la variable de arriva currencyNames con [i] variable entre parentesis
      const currencyName = currencyNames[i]

     optionHtml += creatOption(currencyName);

      // se arma la tabla partiendo por la tabla general se le suma y continua += se crea la fila concatenada
      // llamado a la función
      tabledataHtml += createRow(currencyName, tableData[currencyName]);

    }

    select.innerHTML = optionHtml;

    tableBody.innerHTML = tabledataHtml;

    //Vamos a escuchar el evento "change" del select

    select.addEventListener('change', onChange);

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
