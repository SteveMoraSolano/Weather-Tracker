const { MongoClient } = require('mongodb');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create MongoClient instance
let mongoClient = new MongoClient(process.env.MONGO_URI);

module.exports = async function (context, myTimer) {
    try {
        // Ensure MongoDB connection is established
        if (!mongoClient.topology || !mongoClient.topology.s.sessionPool) {
            await mongoClient.connect();
        }

        const db = mongoClient.db(process.env.DBWEATHER);
        const collection = db.collection(process.env.COLLECTIONCITY);
        const cities = await collection.find({}).toArray();
        const weatherConditions = ["Rain", "Drizzle", "Thunderstorm", "Mist", "Fog", "Haze", "Squall", "Tornado"];

        for (const city of cities) {
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.OPENWEATHER_API_KEY}`;
            const response = await axios.get(weatherUrl);
            const weatherData = response.data;

            if (weatherConditions.includes(weatherData.weather[0].main)) {
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL, 
                        pass: process.env.PSW 
                    }
                });

                let mailOptions = {
                    from: process.env.EMAIL, 
                    to: city.email,
                    subject: 'Weather Alert!',
                    html: `
                        <html>
                            <body>
                                <h1>Weather Alert for ${city.name}</h1>
                                <p>${weatherData.weather[0].description} expected with a temperature of ${weatherData.main.temp}°C and humidity of ${weatherData.main.humidity}%.</p>
                                <p>Please take necessary precautions.</p>
                            </body>
                        </html>
                    `
                };

                await transporter.sendMail(mailOptions);
            }
        }
    } catch (error) {
        context.log('An error occurred:', error);
    }
};
