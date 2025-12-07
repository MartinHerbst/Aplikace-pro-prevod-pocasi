
export class WeatherRenderer {
    /**
    Trida pro vykresleni informaci o predpovedi pocasi
    */
    constructor (weatherOutput) {
        this.weatherOutput = document.querySelector(weatherOutput + " .wrapper");
        this.outputTargets = ["day-one", "day-two", "day-three", "day-four", "day-five"];
    }
    renderData(weatherData) {
        /*
        Ridici metoda pro vykresleni dat
        */
        console.log(weatherData);
        this.resetContent();
        this.createHeading();

        let count = 0;
        let dayIndex = 0;

        for(let i=0;i<weatherData.list.length;i++) {
            count++;
            if(count == 8) {
                dayIndex++;
                count = 0;
            }
            this.printData(this.outputTargets[dayIndex], weatherData.list[i].dt)

        }

    }
    
    printData(element, data) {
        let p = document.createElement("p");
        let target = document.getElementById(element);
        p.textContent = data;
        target.appendChild(p);
    }
        
    createHeading() {
        /*
        Metoda pro vytvoreni nadpisu, nestaci informace o nazvu mesta z weatherData, jelikoz nektera mesta nejsou pojmenovana zcela spravne
        */
        let cityName = document.getElementById("input-box").value;
        let h = document.createElement("h1");
        h.textContent = "Počasí " + cityName;
        this.weatherOutput.appendChild(h);
    }
    resetContent() {
        /*
        Vymazani obsahu
        */
        this.weatherOutput.innerHTML = "";
    }
}