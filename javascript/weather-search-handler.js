
export class SearchHandler {
    /*
    Trida pro obsluhu vyhledani informaci o pocsi ve vyhledavanem meste
    */
    constructor(apiKey, searchButton, inputBox, cities) {
        this.apiKey = apiKey;
        this.searchButton = document.getElementById(searchButton);
        this.inputBox = document.getElementById(inputBox);
        this.cities = cities;

        this.searchButton.addEventListener("click", () => this.searchWeather());
    }

    get_correctCity(result) {
        /*
        Filter nefiltruje dokonale. Napriklad inputu "Jeseník" odpovídá "Jeseník" a zároveň "Jeseník nad Odrou".
        Proto by nastala situace, ze pro input "Jeseník" bychom dostaly data pro "Jeseník nad odrou", kdybychom automaticky brali
        první objekt v poli objektu result.

        Proto existuje tato funkce, ktera z objektu v poli result vybere objekt s kratsim nazvem.
        */
        let resultIndex = 0;
        let letterCount = result[0].name.length;
        for(let i=0;i<result.length;i++) {
            if(result[i].name.length < letterCount) {
                letterCount = result[i].name.length;
                resultIndex = i;
            }
        }
        return resultIndex;
    }
    get_searchObject() {
        /*
        Funkce pro ziskani objektu mesta podle nazvu mesta v hledacku
        */
        let input = this.inputBox.value;
        let result = [];

        result = this.cities.filter(city => {
            return city.name.toLowerCase().includes(input.toLowerCase());
        });
        
        if(result.length > 1) { //pokud existuje vice mest, kde nazev jednoho z mest je prodlouzeni nazvu mesta jineho
            return result[this.get_correctCity(result)];
        }
        return result[0];
    }
    async searchWeather() {
        /*
        Metoda samotne obstarani vyhledani pocasi v danem meste
        */
        let result = this.get_searchObject();
        
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${result.coord.lat}&lon=${result.coord.lon}&appid=12e49942ab49cef19008daf14e55b97e&units=metric`);
        let weatherData = await response.json();
        console.log(weatherData);
    }
}
























