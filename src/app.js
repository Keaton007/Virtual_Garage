import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [make, setMake] = useState('Toyota');
  const [year, setYear] = useState(2020);
  const [vehicleType, setVehicleType] = useState('Passenger Car');
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${vehicleType}?format=json`);
        setModels(response.data.Results);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    }

    fetchModels();
  }, [make, year, vehicleType]);

  return (
    <div>
      <h1>Vehicle Models</h1>
      <div>
        <label>
          Make:
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Vehicle Type:
          <input type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} />
        </label>
      </div>
      <div>
        <h2>Models:</h2>
        <ul>
          {models.map((model) => (
            <li key={model.Model_ID}>{model.Model_Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;