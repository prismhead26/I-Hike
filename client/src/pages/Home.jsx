import React, { useState } from 'react';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '1659a8c1977a91b5deedda1d9206f21e';

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Fetch weather data using OpenWeather API
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
      const weatherData = await weatherResponse.json();

      if (weatherData.coord) {
        const { lon, lat } = weatherData.coord;
        const detailedWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
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
      } else {
        setWeather(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter city" 
          />
          <button onClick={handleSearch}>Search</button>
          {loading ? (
            <div>Loading...</div>
          ) : (
            weather && (
              <div>
                <h2>Weather in {city}</h2>
                <p>Description: {weather.description}</p>
                <p>Temperature: {weather.temperature}°F</p>
                <p>Humidity: {weather.humidity}%</p>
                <p>Wind Speed: {weather.windSpeed} MPH</p>
                <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather Icon" />
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
