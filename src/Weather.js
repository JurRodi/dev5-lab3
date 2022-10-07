export default class Weather {
    constructor(apiKey) {
        this.apiKey = apiKey;
        
        if (localStorage.getItem('weather') && Date.now() - localStorage.getItem('timestamp') < 600000) {
            const data = JSON.parse(localStorage.getItem('weather'));
            this.displayWeather(data);
        } else {
            this.getLocation();
        }
        document.querySelector('h1').addEventListener('click', () => {
            document.querySelector('#app').innerHTML = '';
            this.newDisplay();
        });
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

    newDisplay() {
        const div1 = document.createElement('div');
        div1.classList.add('bg__img', 'div1');
        const div2 = document.createElement('div');
        div2.classList.add('bg__img', 'div2');
        const div3 = document.createElement('div');
        div3.classList.add('bg__img', 'div3');
        document.querySelector('#app').appendChild(div1);
        document.querySelector('#app').appendChild(div2);
        document.querySelector('#app').appendChild(div3);
    }
}