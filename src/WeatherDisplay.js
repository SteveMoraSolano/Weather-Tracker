import React from "react";

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2); // Redondea a dos decimales
}

function WeatherDisplay({ weatherData, onMonitor }) {
  if (!weatherData || !weatherData.main) {
    return <div>Loading or no weather data available...</div>;
  }

  const temperatureCelsius = kelvinToCelsius(weatherData.main.temp);
  const feelsLikeCelsius = kelvinToCelsius(weatherData.main.feels_like);
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  const sunriseTime = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();


  return (
    <div className="weather-container">
       <button onClick={() => onMonitor(weatherData)} className="monitor-button">
        <i className="fas fa-map-pin"></i>
      </button>
        <img src={iconUrl} alt={weatherData.weather[0].description} className="weather-icon" />
       
        <div className="weather-header">Clima en {weatherData.name}, {weatherData.sys.country}</div>
        <div className="weather-stats">
        <div><span className="weather-label">Temperatura:</span><span className="weather-value">{temperatureCelsius}°C</span></div>
                <div><span className="weather-label">Sensación térmica:</span><span className="weather-value">{feelsLikeCelsius}°C</span></div>
                <div><span className="weather-label">Humedad:</span><span className="weather-value">{weatherData.main.humidity}%</span></div>
                <div><span className="weather-label">Presión:</span><span className="weather-value">{weatherData.main.pressure} hPa</span></div>
                <div><span className="weather-label">Visibilidad:</span><span className="weather-value">{weatherData.visibility / 1000} km</span></div>
                <div><span className="weather-label">Viento:</span><span className="weather-value">{weatherData.wind.speed} km/h, dirección {weatherData.wind.deg}°</span></div>
                <div><span className="weather-label">Descripción:</span><span className="weather-value">{weatherData.weather[0].description}</span></div>
            </div>
            <div className="weather-footer">
                <div><span className="weather-label">Amanecer:</span><span className="weather-value">{sunriseTime}</span></div>
                <div><span className="weather-label">Atardecer:</span><span className="weather-value">{sunsetTime}</span></div>
        </div>
    </div>
);
}

export default WeatherDisplay;
