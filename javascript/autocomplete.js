
export class Autocomplete {
    /*
    Trida zodpovedna za logiku naseptavace
    */
    constructor(inputBox, resultBox , cities) {
        this.inputBox = document.getElementById(inputBox);
        this.resultBox = document.querySelector(resultBox);
        this.cities = cities;

        this.inputBox.addEventListener("keyup", () => this.onkeyUp());
    }

    onkeyUp() {
        /*
        Metoda, ktera se provadi pri psani znaku do inputBox
        */
        let result = []; //pole pro uchovani objektu mest
        let input = this.inputBox.value;

        if(input.length) {
            //filtrace mest podle nazvu, ktere odpovidaji hodnote v naseptavaci
            result = this.cities.filter(city => {
                return city.name.toLowerCase().includes(input.toLowerCase());
            });
        }
        this.display(result.map(city => city.name));
    }

    display(resultNames) {
        /*
        Metoda pro samotne vypsani seznamu vhodnych mest
        */

        this.resultBox.innerHTML = ""; //zresetovani vysledku naseptavace - odstraneni kontentu uvnitr elementu


        //seznam validnich mest jako seznam
        const validCitiesList = document.createElement("ul");

        resultNames.forEach(cityName => {
            //validni mesto jako radek/cast seznamu
            const validCity = document.createElement("li"); 

            //vlozeni nazvu mesta do radku
            validCity.textContent = cityName;

            //kdyz se klikne na tento radek, vlozi se kontent tohoto radku do hledacku a smaze se nabidka naseptavace
            validCity.addEventListener("click", () => {
                this.inputBox.value = cityName;      
                this.resultBox.innerHTML = ""; 
            });

            //pridani validniho mesta do seznamu/vlozeni dalsiho radku do seznamu
            validCitiesList.appendChild(validCity);
        });

        //vlozeni celeho seznamu do elementu
        this.resultBox.appendChild(validCitiesList);
    }
}