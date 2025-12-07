
export class WeatherRenderer {
    /**
    Trida pro vykresleni informaci o predpovedi pocasi
    */
    constructor (weatherOutput) {
        this.weatherOutput = document.querySelector(weatherOutput + " .wrapper");
    }
    renderData(weatherData) {
        /*
        Ridici metoda pro vykresleni dat
        */
        console.log(weatherData);
        this.resetContent();
        this.createHeading();

    }
    createHeading() {
        /*
        Metoda pro vytvoreni nadpisu, nestaci informace o nazvu mesta z weatherData, jelikoz nektera mesta nejsou pojmenovana zcela spravne
        */
        let cityName = document.getElementById("input-box").value;
        let h = document.createElement("h1");
        h.textContent = "Počasí v " + cityName;
        this.weatherOutput.appendChild(h);
    }
    resetContent() {
        this.weatherOutput.innerHTML = "";
    }
}