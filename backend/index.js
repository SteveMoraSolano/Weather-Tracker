const dbController = require('./dbController');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

//Get data of API
app.get('/weather/:lat/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
      const response = await axios.get(url);
      res.json(response.data); 
  } catch (error) {
      res.status(500).json({ error: error.toString() });
  }
});

//Insert data in collection City
app.post('/cities', async(req,res) => {
  try {
    const result = await dbController.insertCity(req.body);
res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
})

//Delete data in collection City
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

//Start Server
app.listen(port, () => {
});
