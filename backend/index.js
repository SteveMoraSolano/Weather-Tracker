const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT;


app.use(cors());

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

// Iniciar el servidor
app.listen(port, () => {
});
