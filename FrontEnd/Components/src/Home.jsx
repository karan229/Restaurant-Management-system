import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Home() {
  const totalSupplies = 26;
  const totalRevenue = 64000;
  const todayRevenue = 5000;
  const avgCustomers = 100;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = () => {
    return axios.get('http://localhost:8000/items')
      .then(response => response.data)
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    !isLoading && (
      <div className="dashboardBox">
        <div className="cards">
          <div className="card">
            <h2>Total Revenue</h2>
            <p>${totalRevenue}</p>
          </div>
          <div className="card">
            <h2>Total Supplies</h2>
            <p>{totalSupplies}</p>
          </div>
          <div className="card">
            <h2>Today's Revenue</h2>
            <p>${todayRevenue}</p>
          </div>
          <div className="card">
            <h2>Average Customers</h2>
            <p>{avgCustomers}</p>
          </div>
        </div>
        <div className="outOfStock">
          <h2>Out of Stock</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id || item._id}>{item.ItemName} <span style={{ float: 'right' }}>Quantity Available: {item.quantity}</span></li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}

export default Home;
