import React from 'react';

function MiniCard({city,onDelete,onClick}){

    function kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(2); // Redondea a dos decimales
      }
      const temperatureCelsius = kelvinToCelsius(city.weatherData.main.temp);
    return (
        <div className="mini-card" onClick={onClick}>
          <img src={`http://openweathermap.org/img/wn/${city.weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" className="mini-weather-icon" />
          <div className="mini-weather-info">
            <h4>{city.name}</h4>
            <p>{temperatureCelsius}°C</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onDelete(city); }} className="delete-button">
            <i className="fas fa-trash"></i>
          </button>
        </div>
      );
    }
    

export default MiniCard;