
export class WeatherRenderer {
    /*
    Trida pro vykresleni informaci o predpovedi pocasi
    */
    constructor (weatherOutput, dayCount) {
        /**
         * Konstruktor vytvari strukturu DOM pro jednotlive dny
         * @param {string} weatherOutput - ID elementu, ve kterem se struktura vytvori
         * @param {number} dayCount - pocet dni
         */
        this.weatherOutput = weatherOutput;
        this.dayCount = dayCount;

        const heading = document.createElement("h1");
        document.getElementById(this.weatherOutput).prepend(heading);

        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        document.getElementById(weatherOutput).appendChild(wrapper);
        
        for(let i=0;i<dayCount;i++){
            let dayDiv = document.createElement("div");
            dayDiv.classList.add(`day-${i+1}`);
            wrapper.appendChild(dayDiv);
        }
    }
    renderData(weatherData) {
        /*
        Ridici metoda pro vypis udaju o pocasi
        */
        console.log(weatherData.list);
        
        document.getElementById(this.weatherOutput).querySelector("h1").textContent = "Aktuální počasí " + weatherData.city.name;

        for(let i=0;i<this.dayCount;i++){
            let start = i*((weatherData.list.length)/this.dayCount);
            let end = ((i+1)*((weatherData.list.length)/this.dayCount));
            let chunk = weatherData.list.slice(start, end);
            this.setWeatherData(`day-${i+1}`, chunk);
        }
    }

    setWeatherData(target, data) {
        /**
         * Metoda na zapsani jednotlivych dat do prislusneho dne
         * @param {string} target - class name elementu, kde se maji data vypsat
         * @param {list}  data - pole s daty k vypsani
         */

        
          
    }
}




/*
Poznamka pro priste:
Asi by bylo hezci udelat novou tridu, napr expot class dayWeather{}, kterou bych zavolal z setWeatherData, napr const dayOne = new dayWeather(this.setWeatherData(`day-${i+1}`, chunk));
V teto tride bych pak data zinicializoval a udelat gettery, kterymi bych vypisoval data do cilenych dom elementu.
WeatherRendere by mel pouze generovat DOM, ale data o pocasi by uz bral ze trid jednotlivych dni.

*/