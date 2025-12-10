import { DOMBuilder } from "./dom-builder.js";
import { DayWeather } from "./day-weather.js";

export class WeatherRenderer {
    /*
    Ridici trida pro generovani a DOM struktury widgetu pocasi
    */
    constructor (input, weatherOutput, dayCount) {
        /**
         * @param {string} input - ID inputu pro vyhledavani
         * @param {string} weatherOutput - ID elementu, ve kterem se struktura vytvori
         * @param {number} dayCount - pocet dni
         */

        this.input = document.getElementById(input);
        this.weatherOutput = document.getElementById(weatherOutput);
        this.dayCount = dayCount;

        const defaulCity = this.loadDefaulCity(this.dayCount);
        this.weatherOutput.appendChild(defaulCity);

    }

    renderData(weatherData) {
        /*
        Ridici metoda pro vypis udaju o pocasi
        */
        console.log(weatherData.list);
        
        const myTree = this.treeConstructor(this.input.value, this.dayCount, weatherData);
        
        this.weatherOutput.innerHTML = ""; 
        this.weatherOutput.appendChild(myTree);
        
        for(let i=0;i<this.dayCount;i++){
            let start = i*((weatherData.list.length)/this.dayCount);
            let end = ((i+1)*((weatherData.list.length)/this.dayCount));
            let chunk = weatherData.list.slice(start, end);
            this.setWeatherData(`day-${i+1}`, chunk);
        }
    }

    treeConstructor(headingContent, dayCount, weatherData) {
        /*
        Metoda pro postaveni DOM stromu - widgetu podle zadanych parametru
        */


        /**
        Postup pro priste - vygenerovat 5 stromu pro kazdy den zvlast a pri klikani na jine dny mezi nimi prepinat - pridelavat a oddelavat z weather-output
        Tyto stromy dat do jednoho pole a tim prochazet.
        spodni divy se dny - budou mit nastavene listenery na click a tim se budou prepinat.
        */
        const builder = new DOMBuilder();

        builder.appendHeading(headingContent);
        const wrapper = builder.appendDiv("wrapper");
        builder.setParent(wrapper);
        
        const innerOne = builder.appendDiv("inner-one");
        const innerTwo = builder.appendDiv("inner-two");
        
        builder.setParent(innerTwo); 

        for(let i=0;i<dayCount;i++){
            builder.appendDiv(`day-${i+1}`);
        }
        builder.setParent(builder.root);

        return builder.root;
        
    }

    loadDefaulCity(dayCount) {
        /*
        Pri otevreni stranky se nactou data k tomuto mestu

        Moznost rozsirit o funkcionalitu a pri otevreni stranky nacitat mesto pomoci geolokace
        */

        const builder = new DOMBuilder();

        builder.appendHeading("Olomouc");
        const wrapper = builder.appendDiv("wrapper");
        builder.setParent(wrapper);
        
        const innerOne = builder.appendDiv("inner-one");
        const innerTwo = builder.appendDiv("inner-two");
        
        builder.setParent(innerTwo); 

        for(let i=0;i<dayCount;i++){
            builder.appendDiv(`day-${i+1}`);
        }
        builder.setParent(builder.root);

        return builder.root;
    }

    /*
    setWeatherData(target, data) {
        /**
         * Metoda na zapsani jednotlivych dat do prislusneho dne
         * @param {string} target - class name elementu, kde se maji data vypsat
         * @param {list}  data - pole s daty k vypsani
         *
        let test = new DayWeather(data, this.dayCount);
        
          
    }
    */
   
}
