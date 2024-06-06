import React, { useEffect } from 'react';

function Home() {

  const totalSupplies = 26;
  
  const totalRevenue = 64000;

  const todayRevenue = 5000;

  const avgCustomers = 100;
  
  const outOfStockItems = [

    { id: 1, name: 'Item 1', quantity: 1 },
    
    { id: 2, name: 'Item 2', quantity: 2 },
    
    { id: 3, name: 'Item 3', quantity: 1 },

    { id: 4, name: 'Item 4', quantity: 3 }

  ];

  useEffect(() => {
    const rootElement = document.getElementById('root');
    rootElement.classList.add('rootFullWidth');

    return () => {
      rootElement.classList.remove('rootFullWidth');
    };
  }, []);

  return (
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
          <p>${avgCustomers}</p>
        </div>
      </div>
      <div className="outOfStock">
        <h2>Out of Stock</h2>
        <ul>
          {outOfStockItems.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
