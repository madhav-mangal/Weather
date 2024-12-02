const apiKey = '2aaff691b5892e7da1954bcae4be7a50';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a city name!');
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    locationElement.textContent = 'Loading...';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
    document.body.style.backgroundImage = ''; // Reset background

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message || 'City not found');
            }
            const temperature = Math.round(data.main.temp);
            const weatherDescription = data.weather[0].description;

            locationElement.textContent = data.name;
            temperatureElement.textContent = `${temperature}°C`;
            descriptionElement.textContent = weatherDescription;

            updateBackground(temperature);
        })
        .catch(error => {
            locationElement.textContent = 'Error';
            temperatureElement.textContent = '';
            descriptionElement.textContent = 'Unable to fetch weather.';
            console.error('Error fetching weather data:', error);
        });
}


function updateBackground(temperature) {
    clearPreviousAnimations();
    if (temperature <= 10) {
        document.body.style.backgroundImage = "url('https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2023/08/shutterstock_166718984_Hero.jpg?w=1250&h=1120&crop=1')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.backgroundColor = 'blue'
        addAnimation('snowflake-animation');

    } else if (temperature >= 25) {
        document.body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1681437096361-c5f1e29d6997?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3VtbWVyJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundColor = 'red'
        addAnimation('sun-animation');
    } else {
        document.body.style.backgroundImage = "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/cloudy-and-foggy-weather-in-the-mountains-free-photo.jpeg?w=2210&quality=70')";
        document.body.style.backgroundSize = 'fill';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundColor = 'green'
        addAnimation('leaf-animation');
    }
}

function clearPreviousAnimations() {
    const animations = document.querySelectorAll('.animation');
    animations.forEach(animation => animation.remove());
}
function addAnimation(type) {
    const animationElement = document.createElement('div');
    animationElement.classList.add('animation', type);
    document.body.appendChild(animationElement);
}