import React, { useEffect, useState } from "react";
import { Input } from "@mui/base";
import { Button } from "@mui/base";

import { Link } from "react-router-dom";

import { fetchWeather } from "../utils/API/openWeatherMap";

import { fetchHikingTrails } from "../utils/API/googleMaps";

const Home = () => {
  // use state to store the city name
  const [city, setCity] = useState("");
  // use state to store the weather data
  const [weather, setWeather] = useState(null);
  // use state to store loading state
  const [loading, setLoading] = useState(false);
  // use state to store error
  const [error, setError] = useState(null);

  // set state to store trails
  const [trails, setTrails] = useState(null);

  const [newLat, setNewLat] = useState(null);
  const [newLng, setNewLng] = useState(null);

  //  use effect to keep location in sync with google maps
  useEffect(() => {
    if (newLat && newLng) {
      fetchHikingTrails(setTrails, setLoading, setError, newLat, newLng);
    }
  }, [newLat, newLng]);

  // create test trail
  const trail = {
    placeId: "ChIJrTLr-GyuEmsRBfy61i59si0",
    latitude: 37.7749295,
    longitude: -122.4194155,
    name: "San Francisco",
    description: "San Francisco is a city in California, USA",
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
            onClick={() => {
              fetchWeather(
                city,
                setWeather,
                setLoading,
                setError,
                setNewLat,
                setNewLng
              );
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
        {loading ? (
          <div>Loading...</div>
        ) : (
          trails &&
          trails.map((trail, index) => (
            <div key={index}>
              <p>{trail.name}</p>
              <p>{trail.rating}</p>
              <p>{trail.address}</p>
            </div>
          ))
        )}
        {/* test trail */}
        <div>
          <h1>{trail.name}</h1>
          <p>{trail.description}</p>
          <Link to={`/trail/${trail.placeId}`}>View Trail</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;

// <p>Humidity: {weather.humidity}%</p>
// <p>Wind Speed: {weather.windSpeed} MPH</p>
