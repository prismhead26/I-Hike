// file for API calls to OpenWeatherMap

const apiKey = "1659a8c1977a91b5deedda1d9206f21e";

let location = {
  lat: null,
  lng: null,
};

export const fetchWeather = async (city, setWeather, setLoading, setError) => {
  setLoading(true);
  setError(null); // Clear previous errors
  setWeather(null); // Clear previous weather data

  try {
    // Fetch weather data using OpenWeather API
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );
    const weatherData = await weatherResponse.json();

    const { lon, lat } = weatherData.coord;
    location.lat = lat;
    location.lng = lon;

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
  } catch (error) {
    console.error("Error fetching data:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// export location for google maps

export const getLocation = () => {
  return location;
};
