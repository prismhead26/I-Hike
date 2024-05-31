import React, { useState } from "react";
import { Input } from "@mui/base";
import { Button } from "@mui/base";
import { fetchWeather } from "../utils/API/openWeatherMap";
import TrailsMap from "../utils/API/googleMaps";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gearRecommendation, setGearRecommendation] = useState("");
  const [newCoords, setNewCoords] = useState({
    lat: 39.997246,
    lng: -105.280243,
  });

  return (
    <main>
      <div className="container my-3">
        <div className="input-container mb-3">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="city-input"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              try {
                await fetchWeather(
                  city,
                  setWeather,
                  setLoading,
                  setError,
                  setNewCoords,
                  setGearRecommendation
                );
              } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
              }
            }}
            className="btn btn-outline-secondary search-button"
          >
            Search
          </Button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          weather && (
            <div className="hike-container text-center">
              <h2 className="weather-city">Weather in {city}</h2>
              <div className="weather-info">
                <p className="weather-description">
                  Description: {weather.description}
                </p>
                <p className="weather-temp">
                  Temperature: {weather.temperature}°F
                </p>
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather Icon"
                />
              </div>
              <section>Gear Recommendation: {gearRecommendation}</section>
              <div className="map-container">
                <TrailsMap coords={newCoords} />
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default Home;
