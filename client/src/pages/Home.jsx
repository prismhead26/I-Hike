import React, { useEffect, useState } from "react";
import { Input } from "@mui/base";
import { Button } from "@mui/base";

import { Link } from "react-router-dom";

import { fetchWeather } from "../utils/API/openWeatherMap";

import { useGoogleMaps } from "../hooks/useGoogleMaps";

import TrailsList from "../components/TrailsList";

const Home = () => {
  // use state to store the city name
  const [city, setCity] = useState("");
  // use state to store the weather data
  const [weather, setWeather] = useState(null);
  // use state to store loading state
  const [loading, setLoading] = useState(false);
  // use state to store error
  const [error, setError] = useState(null);
  const [newCoords, setNewCoords] = useState({
    lat: 39.997246,
    lng: -105.280243,
  });

  const { trails, googleMap } = useGoogleMaps(newCoords);
  console.log("trails...", trails);

  //  use effect to keep location in sync with google maps
  // useEffect(() => {
  //   console.log("hello ....");
  //   const loadTrails = () => {
  //     if (newLat && newLng) {
  //       FetchHikingTrails(setTrails, setLoading, setError, newLat, newLng);
  //     }
  //   };

  //   loadTrails();
  // }, [newLat, newLng]);

  // create test trail
  const trail = {
    placeId: "ChIJ88_pHgHsa4cR9lKp4yqutgQ",
    latitude: 39.997246,
    longitude: -105.280243,
    location: { lat: 39.997246, lng: -105.280243 },
    name: "Enchanted Mesa Trail",
    description: "Enchanted Mesa Trail is a trail in Colorado, USA",
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
            onClick={async () => {
              console.log("button clicked");
              try {
                const { coords } = await fetchWeather(
                  city,
                  setWeather,
                  setLoading,
                  setError,
                  setNewCoords
                );
                // console.log("coords...", coords);
              } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
              }
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
          trails && <TrailsList trails={trails} />
        )}
        {/* test trail */}
        <div>
          <h1>{trail.name}</h1>
          <p>{trail.description}</p>
          {/* pass in trail data to link to access on trails page */}
          <Link to={{ pathname: `/trail/${trail.placeId}`, state: trail }}>
            <Button variant="contained" color="primary">
              View Trail
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;

// <p>Humidity: {weather.humidity}%</p>
// <p>Wind Speed: {weather.windSpeed} MPH</p>
