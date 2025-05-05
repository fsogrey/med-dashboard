import React, { useEffect, useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getManufacturers();
        setManufacturers(res.data);

        // Auto-refresh every 5 seconds
        const interval = setInterval(async () => {
          const updatedRes = await api.getManufacturers();
          setManufacturers(updatedRes.data);
        }, 5000);

        return () => clearInterval(interval);
      } catch (err) {
        console.error('Failed to fetch manufacturers:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Medical Equipment Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Sells in UAE</th>
            <th>Certifications</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.country}</td>
              <td>{m.sellsInUAE ? 'Yes' : 'No'}</td>
              <td>{m.certifications?.join(', ') || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
