const { MongoClient } = require('mongodb');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async function (context, myTimer) {
    const mongoClient = new MongoClient(process.env.MONGO_URI);

    try {
        await mongoClient.connect();

        const db = mongoClient.db(process.env.DBWEATHER);
        const collection = db.collection(process.env.COLLECTIONCITY);
        const cities = await collection.find({}).toArray();
        const WeatherConditions = ["Rain", "Drizzle", "Thunderstorm", "Mist", "Fog", "Haze", "Squall", "Tornado"];

        for (const city of cities) {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.OPENWEATHER_API_KEY}`);
            const weatherData = response.data;


            if (WeatherConditions.includes(weatherData.weather[0].main)) {

                const weatherData = response.data;
                const weatherCondition = weatherData.weather[0].main;
                const weatherDescription = weatherData.weather[0].description;
                const temperature = weatherData.main.temp;
                const humidity = weatherData.main.humidity;
                
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
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    .header { background: #007bff; color: white; padding: 10px; text-align: center; }
                    .content { padding: 20px; }
                    .footer { background: #f0f0f0; padding: 10px; text-align: center; }
                    .weather-info { font-size: 16px; color: #333; }
                    .highlight { font-weight: bold; color: #007bff; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Weather Alert!</h1>
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p><span class="highlight">${city.name}</span> is expected to experience <span class="highlight">${weatherCondition}</span> today with the following details:</p>
                    <div class="weather-info">
                        <ul>
                            <li>Condition: ${weatherDescription}</li>
                            <li>Temperature: ${temperature}°C</li>
                            <li>Humidity: ${humidity}%</li>
                        </ul>
                    </div>
                    <p>Please take the necessary precautions and stay safe!</p>
                </div>
                <div class="footer">
                    <p>Thank you for using our Weather Tracker service.</p>
                </div>
            </body>
        </html>
    ` 
                };

                await transporter.sendMail(mailOptions);
            }
        }
    } catch (error) {
        context.log('Ocurrió un error:', error);
    } finally {
        await mongoClient.close();
    }
};
