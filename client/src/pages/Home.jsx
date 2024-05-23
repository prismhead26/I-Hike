import React, { useState } from 'react';

// needs a lot of work. just a rough outline

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Replace with  actual API call to fetch weather and trails data
      const weatherResponse = await fetch(`/api/weather?city=${city}`);
      const trailsResponse = await fetch(`/api/trails?city=${city}`);
      const weatherData = await weatherResponse.json();
      const trailsData = await trailsResponse.json();
      
      setWeather(weatherData);
      setTrails(trailsData);
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
            <>
              {weather && (
                <div>
                  <h2>Weather in {city}</h2>
                  <p>{weather.description}</p>
                  <p>Temperature: {weather.temperature}°F</p>
                </div>
              )}
              {trails.length > 0 && (
                <div>
                  <h2>Nearby Trails</h2>
                  <ul>
                    {trails.map((trail, index) => (
                      <li key={index}>{trail.name} - {trail.length}mi</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
