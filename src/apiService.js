import axios from 'axios';

function getApiBaseUrl() {
    const hostname = window.location.hostname;

    if (hostname.includes("localhost")) {
        return "http://localhost:5000";  
    } else {
        return `https://${hostname}`;
    }
}

const API_URL = getApiBaseUrl();

export const addCityBD = async (cityData) => {
    try {
        const response = await axios.post(`${API_URL}/cities/`, cityData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add city: ' + error.message);
    }
};

export const deleteCityBD = async (_id) => {
    try {
        await axios.delete(`${API_URL}/cities/${_id}`);
    } catch (error) {
        throw new Error('Failed to delete city: ' + error.message);
    }
};

export const getDataOpenWeather = async (lat, lon) => {
    try {
        const response = await axios.get(`${API_URL}/weather/${lat}/${lon}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get weather data: ' + error.message);
    }
};
