import { DOMBuilder } from "./dom-builder.js";
import { WeatherDay } from "./weather-day.js";

export class WeatherRenderer {
    /*
    Ridici trida pro generovani a DOM struktury widgetu pocasi
    */
    constructor (input, weatherOutput, dayCount, unitsType) {
        /**
         * @param {string} input - ID inputu pro vyhledavani
         * @param {string} weatherOutput - ID elementu, ve kterem se struktura vytvori
         * @param {number} dayCount - pocet dni
         * @param {string} unitsType - urceni jednotek - standard(Kelvin)/metric/imperial
         */

        this.input = document.getElementById(input);
        this.weatherOutput = document.getElementById(weatherOutput);
        this.dayCount = dayCount;
        this.unitsType = unitsType;

    }

    renderData(weatherData, defaultCity=null) {
        /*
        Ridici metoda pro vypis udaju o pocasi
        */

        var cityName = this.input.value;
        if(defaultCity) {       //je potreba zvladt nastavit pro defaultni mesto
            cityName = defaultCity;
        }

        const treeList = [];
        for(let i=0; i<this.dayCount; i++) {

            let start = i*((weatherData.list.length)/this.dayCount);
            let end = ((i+1)*((weatherData.list.length)/this.dayCount));
            let chunk = weatherData.list.slice(start, end);

            treeList[i] = this.treeConstructor(cityName, this.dayCount, chunk);
        }

        this.weatherOutput.innerHTML = ""; 
        this.weatherOutput.appendChild(treeList[0]);
        
    }

    treeConstructor(headingContent, dayCount, weatherData) {
        /*
        Metoda pro postaveni DOM stromu - widgetu podle zadanych parametru
        */

        const builder = new DOMBuilder();
        const weatherDay = new WeatherDay(weatherData);
        console.log(weatherData);

        builder.appendHeading("h1", headingContent);

        const wrapper = builder.appendDiv("wrapper");
        builder.setParent(wrapper);

        //------------------------------------------------------------------- innerOne
        const innerOne = builder.appendDiv("inner-one");
        builder.setParent(innerOne);

        const mainInfoWrapper = builder.appendDiv("main-info");
        builder.setParent(mainInfoWrapper);

        builder.appendDiv("main-info-visual");

        const mainInfoData = builder.appendDiv("main-info-data");

        builder.setParent(mainInfoData);
        // doplnit kontent
        console.log(weatherDay.get_time(0));
        builder.appendHeading("h2", weatherDay.get_time(0));
        builder.appendHeading("h2", weatherDay.get_temp(0));

        builder.setParent(innerOne);

        const timeLine = builder.appendDiv("time-line");
        builder.setParent(timeLine);
        for(let i=0;i<((weatherData.length)/dayCount);i++) { //upravit
            let threeHourStep = builder.appendDiv(`step-${i+1}`);
            // doplnit kontent
        }
    
        //------------------------------------------------------------------- innerTwo
        builder.setParent(wrapper);    
        const innerTwo = builder.appendDiv("inner-two");
        builder.setParent(innerTwo);

        for(let i=0;i<dayCount;i++){
            let daySwitch = builder.appendDiv(`day-switch-${i+1}`);
            // doplnit kontent
        }

        builder.setParent(builder.root);
        return builder.root;
    }

    async loadDefaulCity(coord, apiKey) {
        /*
        Pri otevreni stranky se nactou data k tomuto mestu

        Moznost rozsirit o funkcionalitu a pri otevreni stranky nacitat mesto pomoci geolokace
        */
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=${this.unitsType}`);
        let weatherData = await response.json();

        this.renderData(weatherData, weatherData.city.name);

    }
}
