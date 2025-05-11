const apiKey = '8911a55cac27554b3e0706161dbf3fb5'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city === '') {
    alert('Please enter a city name.');
    return;
  }
  getWeather(city);
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found.');
      }
      return response.json();
    })
    .then(data => {
      const weatherDisplay = document.getElementById('weatherDisplay');
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherDisplay.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" />
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
      `;
    })
    .catch(error => {
      alert(error.message);
    });
}
