// file for API calls to OpenWeatherMap

const apiKey = import.meta.env.VITE_WEATHER_MAP;

export const fetchWeather = async (
  city,
  setWeather,
  setLoading,
  setError,
  setNewCoords,
  setGearRecommendation
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

    // Map the data to the required format
    const weatherInfo = {
      description: detailedWeatherData.weather[0].description,
      temperature: detailedWeatherData.main.temp,
      humidity: detailedWeatherData.main.humidity,
      windSpeed: detailedWeatherData.wind.speed,
      icon: detailedWeatherData.weather[0].icon,
    };

    setWeather(weatherInfo);

    const recommendGear = (weatherCode) => {
      let recommendation = "";

      if (weatherCode >= 200 && weatherCode < 300) {
        recommendation = "Bring an umbrella and wear waterproof clothing.";
      } else if (weatherCode >= 300 && weatherCode < 600) {
        recommendation = "It might rain. Consider taking a raincoat.";
      } else if (weatherCode >= 600 && weatherCode < 700) {
        recommendation = "It's snowing. Wear warm clothes and boots.";
      } else if (weatherCode >= 700 && weatherCode < 800) {
        recommendation = "Be cautious. The weather is foggy or dusty.";
      } else if (weatherCode === 800) {
        recommendation = "The weather is clear. Enjoy your day!";
      } else if (weatherCode > 800 && weatherCode < 900) {
        recommendation = "It's cloudy. You might want a light jacket.";
      } else {
        recommendation =
          "Weather conditions are unusual. Be prepared for anything.";
      }

      setGearRecommendation(recommendation);
    };

    recommendGear(detailedWeatherData.weather[0].id);

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
