import React, { useState } from "react";
import { Input } from "@mui/base";
import { Button } from "@mui/base";

import { fetchWeather } from "../utils/API/openWeatherMap";

import { fetchHikingTrails } from "../utils/API/googleMaps";

// import { getLocation } from "../utils/API/openWeatherMap";

const Home = () => {
  // use state to store the city name
  const [city, setCity] = useState("");
  // use state to store the weather data
  const [weather, setWeather] = useState(null);
  // use state to store loading state
  const [loading, setLoading] = useState(false);
  // use state to store error
  const [error, setError] = useState(null);

  // console.log(getLocation());

  // set state to store trails
  const [trails, setTrails] = useState(null);

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
            onClick={() => {
              fetchWeather(city, setWeather, setLoading, setError);
              fetchHikingTrails(setTrails, setLoading, setError);
            }}
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
