const axios = require("axios");

const URL = "https://api.weatherapi.com/v1/current.json";

async function fetchWeather(location) {
  return await axios({
    url: URL,
    method: "get",
    params: {
      q: location,
      key: process.env.WEATHER_API_KEY,
    },
    responseType: "json",
  })
    .then((response) => {
      const city = response.data.location.name;
      const country = response.data.location.country;
      const locationName = `${city}, ${country}`;

      const weatherData = {
        date: response.data.current.last_updated,
        temperatureC: response.data.current.temp_c,
        //   condition: response.data.condition.filter('text'),
        windSpeed: response.data.current.wind_kph,
        humidity: response.data.current.humidity,
        feelsLikeC: response.data.current.feelslike_c,
        cloud: response.data.current.cloud,
      };

      return {
        locationName,
        weatherData,
      };
    })
    .catch((error) => {
      console.error(error);
      throw new Error(`Error fetching forecast for ${locationName}.`);
    });
}

module.exports = {
  fetchWeather,
};
