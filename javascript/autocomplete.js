
//Nacteni mest
/* ************************************************************* */
async function loadCities() {
    /*
    Funkce ktera nacte data z json souboru do promenne cities
    */
  const response = await fetch("../weather_data/city.list.json")
  const cities = await response.json();
  console.log("Města načtena:", cities.length);
  return cities;
}
let allCities = [];
loadCities().then(cities => {
    allCities = cities;
});
/* ************************************************************* */



//Filtrovani vysledku podle vstupu
/* ************************************************************* */
const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box"); 

inputBox.onkeyup = function() {
    /*
    Funkce, ktera reaguje na vstup, podle ktere filtruje odpovidajici vysledky
    */
    let result = [];
    let input = inputBox.value;

    if(input.length){
        
        result = allCities.filter(city => {
            return city.name.toLowerCase().includes(input.toLowerCase()); //obsahuje jmeno mesta nas input? + osetreni case sensitive
        });
        result = result.map(city => city.name); //chceme jen nazvy mest, ne cele objekty
    }
    //Pole vhodnych nazvu mest posilan na vykresleni do naseptavace
    display(result);
};
/* ************************************************************* */



//Vykresleni vysledku naseptavace
/* ************************************************************* */
function display(result){
    /*
    Funkce pro vykresleni naseptavace s jednim argumentem result,
    ktery je pole validnich nazvu mest
    */

    resultBox.innerHTML = ""; //zresetovani vysledku naseptavace - odstraneni kontentu uvnitr elementu

    //seznam valiodnich mest jako seznam
    const validCitiesList = document.createElement("ul");

    result.forEach(cityName => {
        //validni mesto jako radek/cast seznamu
        const validCity = document.createElement("li"); 

        //vlozeni nazvu mesta do radku
        validCity.textContent = cityName;

        //kdyz se klikne na tento radek, vlozi se kontent tohoto radku do hledacku a smaze se naseptavac
        validCity.addEventListener("click", function() {
            inputBox.value = cityName;      
            resultBox.innerHTML = ""; 
        });

        //pridani validniho mesta do seznamu/vlozeni dalsiho radku do seznamu
        validCitiesList.appendChild(validCity);
    });

    //vlozeni celeho seznamu do elementu
    resultBox.appendChild(validCitiesList);
}
/* ************************************************************* */
