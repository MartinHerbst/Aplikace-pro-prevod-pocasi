import { Cities } from "./cities-loader.js";
import { Autocomplete } from "./autocomplete.js";
import { SearchHandler } from "./weather-search-handler.js";




const allCities = new Cities("../city_data/city.list.json");
allCities.loadCities().then(function() {
    //cekani na nacteni mest
    const autocomplete = new Autocomplete("input-box", ".result-box", allCities.cities);

    
    const searchHandler = new SearchHandler("12e49942ab49cef19008daf14e55b97e", "search-weather-btn", "input-box", allCities.cities);
});


//console.log(await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=50.083328&lon=14.46667&appid=12e49942ab49cef19008daf14e55b97e"));