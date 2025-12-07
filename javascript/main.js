import { Cities }           from "./cities-loader.js";
import { Autocomplete }     from "./autocomplete.js";
import { WeatherSearcher }  from "./weather-searcher.js";
import { WeatherRenderer }    from "./weather-renderer.js";



const weatherRenderer = new WeatherRenderer("#weather-output");
const allCities = new Cities("../city_data/city.list.json");
allCities.loadCities().then(function() {
    //cekani na nacteni mest
    const autocomplete = new Autocomplete("input-box", ".result-box", allCities.cities, weatherRenderer);

    const weatherSearcher = new WeatherSearcher("12e49942ab49cef19008daf14e55b97e", "search-weather-btn", "input-box", allCities.cities);

    //nastaveni call back funkce
    weatherSearcher.weatherDataLoaded = function(weatherData) {
        weatherRenderer.renderData(weatherData);
    }
});



