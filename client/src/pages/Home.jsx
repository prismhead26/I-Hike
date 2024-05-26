import React, { useState } from "react";
import { Input } from "@mui/base";
import { Button } from "@mui/base";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "1659a8c1977a91b5deedda1d9206f21e";

  const handleSearch = async () => {
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

  return (
    <main>
      <div className="container my-3 flex items-center">
        <div className="input-group mb-3">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="form-control"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className="btn btn-outline-secondary"
          >
            Search
          </Button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          weather && (
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <h2 className="weather-city">Weather in {city}</h2>
                </div>
                <div className="col">
                  <p className="weather-description">
                    Description: {weather.description}
                  </p>
                </div>
                <div className="col">
                  <p className="weather-temp">
                    Temperature: {weather.temperature}°F
                  </p>
                </div>
                <div className="col">
                  <img
                    className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="Weather Icon"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Home;

// <p>Humidity: {weather.humidity}%</p>
// <p>Wind Speed: {weather.windSpeed} MPH</p>
