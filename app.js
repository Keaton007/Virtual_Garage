const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace with your actual RapidAPI key
const rapidAPIKey = 'YOUR_RAPIDAPI_KEY';

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api', async (req, res) => {
  try {
    const response = await axios.get('https://exampleapi.com/endpoint', {
      headers: {
        'X-RapidAPI-Key': rapidAPIKey,
        'X-RapidAPI-Host': 'exampleapi.com'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API');
  }
});

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await axios.get('https://exampleapi.com/endpoint', {
      headers: {
        'X-RapidAPI-Key': rapidAPIKey,
        'X-RapidAPI-Host': 'exampleapi.com'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
}

// Fetch data from the API
fetchData();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});