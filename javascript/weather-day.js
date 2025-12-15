export class WeatherDay {
    constructor(data) {
        /**
         * @param {list} data - pole s udaji o pocasi pro dany den
         */

        this.data = data;
    }

    get_time(index) {
        let date = new Date(this.data[index].dt * 1000);
        return date.toLocaleString(navigator.language);
    }

    get_temp(index) {
        return Math.round(this.data[index].main.temp * 10) / 10;
    }

    get_feelsLike(index) {
        return Math.round(this.data[index].main.feels_like * 10) / 10;
    }

    get_humidity(index) {
        return this.data[index].main.humidity;
    }

    get_tempMin(index) {
        return Math.round(this.data[index].main.temp_min * 10) / 10;
    }

    get_tempMax(index) {
        return Math.round(this.data[index].main.temp_max * 10) / 10;
    }

    get_skyStatus(index) {
        return this.data[index].weather.main;
    }

    get_windSpeed(index) {
        return this.data[index].wind.speed;
    }
}
