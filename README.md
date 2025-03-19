🌦️ Weather Tracker - Real-Time Weather Monitoring & Alerts

📌 Project Overview

Weather Tracker is a web application that allows users to track real-time weather updates for their selected cities. It also integrates an automated alert system that notifies users via email if extreme weather conditions (like rain or storms) are detected in their monitored locations.

This project was developed as part of my preparation for the AZ-204: Developing Solutions for Microsoft Azure certification. It focuses on implementing Azure compute solutions, covering:

- Azure Container Registry (ACR)

- Azure Container Instance (ACI)

- Azure Container Apps

- Azure App Service Web Apps

- Azure Functions

This project is deployed on Azure using multiple cloud services such as:

- Azure App Service → Hosting the web application
- Azure Functions → Periodically checks weather conditions and triggers email alerts
- Azure Cosmos DB → Database for user data and monitored cities
- Azure Maps API → Location search and weather data retrieval
- Azure Container Registry (ACR) → Storing Docker images for the app
- Azure Container Instance (ACI) → Running the containers for development/testing
- Azure Container Apps → Dockerized deployment in production

🚀 Features

✅ Search and select cities using Azure Maps API
✅ View real-time weather updates from OpenWeather API
✅ Monitor up to 3 cities and receive email alerts for extreme weather conditions
✅ Backend powered by Node.js & Express
✅ Frontend built with React.js
✅ Azure Functions automatically checks the weather at regular intervals and notifies users when conditions change
✅ Deployed using Docker & Azure Container Apps

🛠️ Technologies Used

- Frontend: React.js, Axios, CSS

- Backend: Node.js, Express.js, MongoDB (Cosmos DB API)

- Database: Azure Cosmos DB (MongoDB API)

- Cloud Services: Azure App Service, Azure Functions, Azure Maps, Azure Container Instance (ACI), Azure Container Apps

- Infrastructure: Docker, Azure Container Registry (ACR), Azure Monitor