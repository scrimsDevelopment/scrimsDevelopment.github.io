// Replace with your OpenWeatherMap API key
const weatherApiKey = 'your_openweathermap_api_key';
// Replace with your Mapbox API key
const mapboxApiKey = 'your_mapbox_api_key';

function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Medicine%20Hat,Alberta&units=metric&appid=${weatherApiKey}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Update weather information on the page
      document.querySelector('.weather-widget .temperature').textContent = `Temperature: ${data.main.temp}°C`;
      document.querySelector('.weather-widget .wind').textContent = `Wind: ${data.wind.speed} m/s, ${data.wind.deg}°`;
      document.querySelector('.weather-widget .conditions').textContent = `Conditions: ${data.weather[0].description}`;
      document.querySelector('.weather-widget .humidity').textContent = `Humidity: ${data.main.humidity}%`;
      document.querySelector('.weather-widget .visibility').textContent = `Visibility: ${data.visibility} m`;
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function fetchLatLng(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxApiKey}&country=CA&types=address&limit=1`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates;
        document.getElementById('coordinates').textContent = `Latitude: ${coords[1]}, Longitude: ${coords[0]}`;
        document.getElementById('copyCoordinates').style.display = 'block';
      } else {
        document.getElementById('coordinates').textContent = 'Address not found';
        document.getElementById('copyCoordinates').style.display = 'none';
      }
    })
    .catch(error => console.error('Error fetching coordinates:', error));
}

document.getElementById('getLatLong').addEventListener('click', () => {
  const addressInput = document.getElementById('addressInput').value;
  fetchLatLng(addressInput);
});

document.getElementById('copyCoordinates').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('coordinates').textContent)
    .then(() => alert('Coordinates copied to clipboard'))
    .catch(error => console.error('Error copying coordinates:', error));
});

document.getElementById('copyWeather').addEventListener('click', () => {
  const weatherText = Array.from(document.querySelectorAll('.weather-widget p')).map(p => p.textContent).join('\n');
  navigator.clipboard.writeText(weatherText)
    .then(() => alert('Weather copied to clipboard'))
    .catch(error => console.error('Error copying weather:', error));
});

// Fetch weather data when the page loads
fetchWeather();
