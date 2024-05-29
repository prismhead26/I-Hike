// file for API calls to OpenWeatherMap

const apiKey = "1659a8c1977a91b5deedda1d9206f21e";

export const fetchWeather = async (
  city,
  setWeather,
  setLoading,
  setError,
  setNewCoords
) => {
  setLoading(true);
  setError(null); // Clear previous errors
  setWeather(null); // Clear previous weather data

  const coords = { lat: null, lng: null };

  try {
    // Fetch weather data using OpenWeather API
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );
    const weatherData = await weatherResponse.json();

    const { lon, lat } = weatherData.coord;

    const detailedWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    );
    const detailedWeatherData = await detailedWeatherResponse.json();

    console.log(detailedWeatherData);

    // Map the data to the required format
    const weatherInfo = {
      description: detailedWeatherData.weather[0].description,
      temperature: detailedWeatherData.main.temp,
      humidity: detailedWeatherData.main.humidity,
      windSpeed: detailedWeatherData.wind.speed,
      icon: detailedWeatherData.weather[0].icon,
    };

    setWeather(weatherInfo);
    coords.lat = lat;
    coords.lng = lon;
  } catch (error) {
    console.error("Error fetching data:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
  setNewCoords(coords);
  return {
    coords,
  };
};
