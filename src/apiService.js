import axios from 'axios';

//const API_URL1 = process.env.REACT_APP_API_URL;
function getApiBaseUrl() {
    const hostname = window.location.hostname;

    // Ejemplo de cómo manejar diferentes entornos
    if (hostname.includes("localhost")) {
        return "http://localhost:5000";  // URL local para desarrollo
    } else if (hostname.includes("azurecontainer")) {
        // Asume que la API está accesible bajo el mismo hostname en producción
        return `https://${hostname}`;
    } else {
        // Otras configuraciones podrían ir aquí
        return `https://api.${hostname}`; // Generalizando para otros entornos si es necesario
    }
}



const API_URL = getApiBaseUrl();
export const addCityBD = async (cityData) => {
    try {
        const response = await axios.post(`${API_URL}/cities/`, cityData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteCityBD = async (_id) => {
    try {
        await axios.delete(`${API_URL}/cities/${_id}`);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getDataOpenWeather = async (lat,lon) => {
    try{
        const response = await axios.get(`${API_URL}/weather/${lat}/${lon}`)
    return response.data;
    }catch(error){
        throw new Error(error.message);      
    }
}

