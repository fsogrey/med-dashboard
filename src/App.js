import React, { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getProducts();
      setProducts(res.data);

      const interval = setInterval(async () => {
        const updatedRes = await api.getProducts();
        setProducts(updatedRes.data);
      }, 5000);

      return () => clearInterval(interval);
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
            <th>Type</th>
            <th>Material</th>
            <th>UAE Availability</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.type}</td>
              <td>{p.specs?.material || ''}</td>
              <td>{p.uaeAvailability ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
