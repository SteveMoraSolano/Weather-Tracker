const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const port = 5000;
const app = express();

app.use(cors());

app.get('/weather/:lat/:lon',async (req,res) => {
    const { lat,lon } = req.params;
    const apiKey = '8c0409feed0b47794bdd6a9abd8a5b90';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    const response = await axios.get(url);

    res.json(response.data)

});

app.listen(port)
