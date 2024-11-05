import React, { useState,useEffect } from 'react';
import SearchCity from './SearchCity';
import WeatherDisplay from './WeatherDisplay';
import MiniCard from './miniCardWeather';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [monitoredCities, setMonitoredCities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const loadedCities = JSON.parse(localStorage.getItem('monitoredCities') || '[]');
    setMonitoredCities(loadedCities);
  }, []);

  const handleSearch = async (lat, lon) => {
    try {
      const encodedLat = encodeURIComponent(lat);
      const encodedLon = encodeURIComponent(lon);
      const response = await axios.get(`http://localhost:5000/weather/${encodedLat}/${encodedLon}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  }

  const handleClear = () => {
    setWeatherData(null);
};
  
const handleMonitorCity = (weatherData) => {
  const monitoredCities = JSON.parse(localStorage.getItem('monitoredCities') || '[]');
  if (monitoredCities.length >= 3){
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);

  }else{
    const newCities = [...monitoredCities, {
      name: weatherData.name,
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
      weatherData
    }];
    setMonitoredCities(newCities);
    localStorage.setItem('monitoredCities', JSON.stringify(newCities));
  }
 
};

const handleDeleteCity = (name) => {
  const updatedCities = monitoredCities.filter(city => city.name !== name);
  setMonitoredCities(updatedCities);
  localStorage.setItem('monitoredCities', JSON.stringify(updatedCities));
};

const handleSelectCity = (city) => {
  setWeatherData(city.weatherData);
};

  // return (
  //   <div>
  //      <SearchCity onSearch={handleSearch} onClear={handleClear} />
  //      {weatherData && <WeatherDisplay weatherData={weatherData} onMonitor={handleMonitorCity} />}
  //   </div>
  // );
  return (
    <div>
      <SearchCity onSearch={handleSearch} onClear={handleClear} />
      {weatherData && <WeatherDisplay weatherData={weatherData} onMonitor={handleMonitorCity} />}
      {showAlert && <div style={{
      position: 'absolute',
      top: '10%', // Adjust based on your layout
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(255, 0, 0, 0.8)',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: 1000
    }}>
      You cannot monitor more than 3 cities.
    </div>}
      <div className="monitored-cities">
        {monitoredCities.map((city, index) => (
          <MiniCard key={index} city={city} onDelete={handleDeleteCity} onClick={() => handleSelectCity(city)} />
        ))}
      </div>
    </div>
  );
}

export default App;
