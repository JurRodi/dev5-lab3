export default class Weather {
    constructor(apiKey) {
        this.apiKey = apiKey;
        
        if (localStorage.getItem('weather') && Date.now() - localStorage.getItem('timestamp') < 600000) {
            const data = JSON.parse(localStorage.getItem('weather'));
            this.displayWeather(data);
        } else {
            this.getLocation();
        }
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    getWeather(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no`;
        
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                localStorage.setItem('weather', JSON.stringify(data));
                localStorage.setItem('timestamp', Date.now());

                this.displayWeather(data);
            });
    }

    displayWeather(data) {
        const temp = data.current.temp_c;
        document.querySelector(".weather__temp").innerHTML = temp + "°C";

        const weather = data.current.condition.text;
        document.querySelector(".weather__summary").innerHTML = weather;

        const icon = data.current.condition.icon;
        const img = document.createElement('img');
        img.src = icon;
        document.querySelector(".weather__icon").appendChild(img);
    }
}