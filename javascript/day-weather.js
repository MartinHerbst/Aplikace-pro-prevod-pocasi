export class DayWeather {
    constructor(data, dayCount) {
        /**
         * @param {list} data - pole s udaji o pocasi pro dany den
         * @param {number} dayCount - pocet dni
         */
        this.data = data;
        this.dayCount = dayCount;
    }

    get_time(index) {
        return this.data[index].dt_txt;
    }

    get_temp(index) {
        return this.data[index].main.temp;
    }

    get_feelsLike(index) {
        return this.data[index].main.feels_like;
    }

    get_humidity(index) {
        return this.data[index].main.humidity;
    }

    get_tempMin(index) {
        return this.data[index].main.temp_min;
    }

    get_tempMax(index) {
        return this.data[index].main.temp_max;
    }

    get_skyStatus(index) {
        return this.data[index].weather.main;
    }

    get_windSpeed(index) {
        return this.data[index].wind.speed;
    }
}
