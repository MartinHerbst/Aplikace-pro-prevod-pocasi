
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

        //Otestovani zda uz existuje nadpis, pokud ano, tak se smaze
        if (this.weatherOutput.querySelector("h1") != null) {
            this.weatherOutput.querySelector("h1").remove();
        }

        this.createTextElement("h1",this.weatherOutput, "Počasí ", document.getElementById("input-box"));

        let count = 0;
        let dayIndex = 0;
        for(let i=0;i<weatherData.list.length;i++) {
            if(count == 8) {
                dayIndex++;
                count = 0;
            }
            count++;
            this.createTextElement("p", document.getElementById(this.outputTargets[dayIndex]), weatherData.list[i].dt) 
        }
    }

    createTextElement(elementType, target, payload, source=null) {
        /*
        Metoda pro vytvoreni nadpisu.
        elementType -> jaky element se ma vytvorit
        target -> kde se ma vytvorit
        payload -> samotny text
        source -> volitelny parametr, ktery se pouzije, pokud chceme pripojit cast textu z nejakeho existujiciho zdroje -> napr pouziti nazvu mesta v hledacku
        */
        let h = document.createElement(elementType);
        if(source != null) {
            h.textContent = payload + source.value;
        } else {
            h.textContent = payload;
        }

        target.appendChild(h);

    }
}