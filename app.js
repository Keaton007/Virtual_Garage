const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace with your actual RapidAPI key
const rapidAPIKey = '421a6b9842msh3d81bc17117d5b9p1ba8d4jsn5f737e292945';

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});