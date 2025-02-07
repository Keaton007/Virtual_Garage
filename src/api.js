const axios = require('axios');

async function getModelsForMakeYearVehicleType(make, year, vehicleType) {
  try {
    const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${vehicleType}?format=json`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

// Example usage
const make = 'Toyota'; // Replace with a valid make
const year = 2020; // Replace with a valid year
const vehicleType = 'Passenger Car'; // Replace with a valid vehicle type
getModelsForMakeYearVehicleType(make, year, vehicleType);