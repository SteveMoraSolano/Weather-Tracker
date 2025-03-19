const dbController = require('./dbController');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// Axios instance for API calls
const axiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 10000
});

axiosInstance.interceptors.response.use(response => response, error => {
    console.log('Failed to fetch data:', error.message);
    return Promise.reject(error);
});

// Route to get weather data from OpenWeatherMap API
app.get('/weather/:lat/:lon', async (req, res) => {
    const { lat, lon } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await axiosInstance.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Route to insert city data into MongoDB
app.post('/cities', async(req, res) => {
    try {
        const result = await dbController.insertCity(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to delete city data from MongoDB
app.delete('/cities/:id', async (req, res) => {
    try {
        const result = await dbController.deleteCity(req.params.id);
        if (result.deletedCount === 1) {
            res.status(200).send("Successfully deleted one document");
        } else {
            res.status(200).send("No match found. Deleted 0 documents");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

// Start server
app.listen(port, () => {
});
