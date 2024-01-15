import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=008c232615f3432ebdd190049232206&q=${location}`;  
    axios.get(apiUrl)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <>
      <Heading />
      <input type="text" placeholder="Unesite zeljenu lokaciju"  onChange={handleInputChange} />
      <button onClick={handleSearch}>🔍</button>
      <WeatherDisplay weatherData={weatherData} />
    </>
  );
}

function Heading() {
  return (
    <h1>Weather in</h1>
  );
}

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div>
      {weatherData ? (
        <div>
          <h2>{weatherData.current.temp_c}°C</h2>
          <p>{weatherData.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default App;
