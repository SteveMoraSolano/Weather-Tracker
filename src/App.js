import React, { useState,useEffect } from 'react';
import SearchCity from './SearchCity';
import WeatherDisplay from './WeatherDisplay';
import MiniCard from './miniCardWeather';
import EmailModal from './email';
import { addCityBD,deleteCityBD,getDataOpenWeather } from './apiService';
import './css/App.css';
import './css/EmailModal.css';
import './css/card.css';
import './css/minicard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [monitoredCities, setMonitoredCities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [email,setEmail] = useState(localStorage.getItem('email')|| '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const loadedCities = JSON.parse(localStorage.getItem('monitoredCities') || '[]');
    setMonitoredCities(loadedCities);
  }, []);

  const handleSearch = async (lat, lon) => {
    try {
      const encodedLat = encodeURIComponent(lat);
      const encodedLon = encodeURIComponent(lon);
      const result = await getDataOpenWeather(encodedLat,encodedLon);
      setWeatherData(result);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  }

  const handleClear = () => {
    setWeatherData(null);
};
  
const handleMonitorCity = async (weatherData) => {
  const monitoredCities = JSON.parse(localStorage.getItem('monitoredCities') || '[]');
  if (monitoredCities.length >= 3){
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);

  }else if (!email){
    
    setIsModalOpen(true);
  }
  else{

    //Insert LocalStorage 
    const tempId = getDateTimeString();
  const newCities = [...monitoredCities, {
    name: weatherData.name,
    lat: weatherData.coord.lat,
    lon: weatherData.coord.lon,
    _id: tempId,
    weatherData
  }];
  setMonitoredCities(newCities);
  localStorage.setItem('monitoredCities', JSON.stringify(newCities));

  //Insert DB
  const cityData = {
    "cityName": weatherData.name,
    "name": weatherData.name,
    "lat": weatherData.coord.lat,
    "lon": weatherData.coord.lon,
    "email": email
}
  try {

    const result = await addCityBD(cityData);
    const cityId = result.insertedId;

  //Update ID in LocalStorage
  const updatedCities = newCities.map(city =>
    city._id === tempId
      ? { ...city, _id: cityId }
      : city
  );

    setMonitoredCities(updatedCities);
    localStorage.setItem('monitoredCities', JSON.stringify(updatedCities));


  } catch (error) {
    console.error(error);
  }
  }
 
};

const handleDeleteCity = async (data) => {
  const updatedCities = monitoredCities.filter(city => city._id !== data._id);
  setMonitoredCities(updatedCities);
  localStorage.setItem('monitoredCities', JSON.stringify(updatedCities));
  try {
    await deleteCityBD(data._id);
  } catch (error) {
    console.error(error);
  }

};

const handleSelectCity = (city) => {
  setWeatherData(city.weatherData);
};

function getDateTimeString() {
  const now = new Date();
  
  const year = now.getFullYear(); // Año en formato completo (ej: 2024)
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes (0-11, +1 para ajustarlo, padStart asegura dos dígitos)
  const day = String(now.getDate()).padStart(2, '0'); // Día del mes
  const hours = String(now.getHours()).padStart(2, '0'); // Hora (0-23)
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutos
  const seconds = String(now.getSeconds()).padStart(2, '0'); // Segundos opcional
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

  return (
    <div>
        <div className="email-icon" onClick={() => setIsModalOpen(true)}>
        <FontAwesomeIcon icon={faEnvelope} />
        <div className="email-tooltip">  {email || 'No email set'}</div>
      </div>
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={setEmail} />
      <SearchCity onSearch={handleSearch} onClear={handleClear} />
      {weatherData && <WeatherDisplay weatherData={weatherData} onMonitor={handleMonitorCity} />}
      {showAlert && <div style={{
      position: 'absolute',
      top: '10%',
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
