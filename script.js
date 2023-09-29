const API_KEY = 'db6e26b312c514bda8ea5913065b299e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
  const location = document.getElementById('locationInput').value;
  if (!location) {
    showError('Please enter a location.');
    return;
  }

  const units = document.getElementById('unitDropdown').value;

  const url = `${BASE_URL}?q=${location}&units=${units}&appid=${API_KEY}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => showError('Error fetching weather data. Please try again later.'));
}

function displayWeather(data) {
  const temperatureDiv = document.getElementById('temperature');
  const humidityDiv = document.getElementById('humidity');
  const rainDiv = document.getElementById('chance-of-rain');
  const windSpeedDiv = document.getElementById('wind-speed');

  temperatureDiv.textContent = `${data.main.temp} °${getUnitSymbol()}`;
  humidityDiv.textContent = `Humidity: ${data.main.humidity} %`;
  rainDiv.textContent = `Chance of Rain: ${data.rain ? data.rain['1h'] : 0} mm`; // Assuming rain data is available in the API response
  windSpeedDiv.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  // Additional code for displaying other weather information...
}

function getUnitSymbol() {
  const unit = document.getElementById('unitDropdown').value;
  return unit === 'metric' ? 'C' : 'F';
}

function toggleDropdown() {
  const dropdownContent = document.getElementById('unitDropdown');
  dropdownContent.classList.toggle('show');
}

function changeUnit(unit) {
  const dropdownContent = document.getElementById('unitDropdown');
  dropdownContent.classList.remove('show');

  // Set the selected unit
  dropdownContent.value = unit;
}

function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
}
