import { DOMBuilder } from "./dom-builder.js";
import { DayWeather } from "./day-weather.js";

export class WeatherRenderer {
    /*
    Ridici trida pro generovani a DOM struktury widgetu pocasi
    */
    constructor (weatherOutput, dayCount) {
        /**
         * @param {string} weatherOutput - ID elementu, ve kterem se struktura vytvori
         * @param {number} dayCount - pocet dni
         */

        this.weatherOutput = document.getElementById(weatherOutput);
        this.dayCount = dayCount;

        this.domBuilder = new DOMBuilder();
    }

    renderData(weatherData) {
        /*
        Ridici metoda pro vypis udaju o pocasi
        */
        console.log(weatherData.list);

        this.domBuilder.appendHeading(weatherData.city.name);
        const wrapper = this.domBuilder.appendDiv("wrapper");
        this.domBuilder.setParent(wrapper);
        
        for(let i=0;i<this.dayCount;i++){
            this.domBuilder.appendDiv(`day-${i+1}`);
        }
        this.domBuilder.setParent(this.domBuilder.root);

        this.weatherOutput.appendChild(this.domBuilder.root);
        
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
        let test = new DayWeather(data, this.dayCount);
        
          
    }
}
