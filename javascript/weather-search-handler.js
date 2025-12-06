
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
    get_searchObject() {
        /*
        Metoda pro ziskani objektu mesta podle nazvu mesta v hledacku
        */
        let input = this.inputBox.value;
        let result = [];

        result = this.cities.filter(city => {
            return city.name.toLowerCase().includes(input.toLowerCase());
        });
        //result je zde pole objektu s jednim objektem, vratime jen ten objekt
        return result[0];
    }
    searchWeather() {
        /*
        Metoda samotne obstarani vyhledani pocasi v danem meste
        */
        //
        let result = this.get_searchObject();
        
        console.log(result.name, result.coord.lat);
         
    }


}
























