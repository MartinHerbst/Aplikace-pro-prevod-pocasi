

class Cities {
    /*
    Trida zodpovedna za nacitany dat z json souboru
    */
    constructor(cityData) {
        this.cityData = cityData;
        this.cities = [];
    }

    async loadCities() {
        const response = await fetch(this.cityData);
        this.cities = await response.json();

        return this.cities;
    }
}



class Autocomplete {
    /*
    Trida zodpovedna za logiku naseptavace
    */
    constructor(inputBox, resultBox , allCities) {
        this.inputBox = document.getElementById(inputBox);
        this.resultBox = document.querySelector(resultBox);
        this.allCities = allCities;

        this.inputBox.addEventListener("keyup", () => this.onkeyUp());
    }

    onkeyUp() {
        /*
        Funkce, ktera se vola pri psani znaku do inputBox
        */
        let result = []; //pole pro uchovani nazvu mest
        let input = this.inputBox.value;

        if(input.length) {
            //filtrace mest podle nazvu, ktere odpovidaji hodnote v naseptavaci
            result = this.allCities.filter(city => {
                return city.name.toLowerCase().includes(input.toLowerCase());
            });

            //nakonec se ulozi jen nazvy mest, ne cele objekty
            result = result.map(city => city.name);

            this.display(result);
        }
    }

    display(result) {
        /*
        Funkce pro samotne vypsani seznamu vhodnych mest
        */

        this.resultBox.innerHTML = ""; //zresetovani vysledku naseptavace - odstraneni kontentu uvnitr elementu

        //seznam validnich mest jako seznam
        const validCitiesList = document.createElement("ul");

        result.forEach(cityName => {
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


const allCities = new Cities("../city_data/city.list.json");
allCities.loadCities().then(function() {
    //cekani na nacteni mest
    const autocomplete = new Autocomplete("input-box", ".result-box", allCities.cities);
});