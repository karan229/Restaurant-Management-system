import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UploadForm from './StockPage/Products.jsx';
import ItemList from './StockPage/Itemlist.jsx';

function Stock() {
  const [showForm, setShowForm] = useState(false);

  const handleAddNewClick = () => {
    setShowForm(true);
  };

  const handleStockDataClick = () => {
    setShowForm(false);
  };

  return (
    <div className='stock-main'>
      <nav className='stock-nav'>
        <Link to="#" style={{ color: 'black' }} onClick={handleStockDataClick}>Stock Data</Link>
        <Link to="#" style={{ color: 'black' }} onClick={handleAddNewClick}>Add New</Link>
      </nav>
      <div className="stock-pages">
        {showForm ? <UploadForm /> : <ItemList />}
      </div>
    </div>
  );
}

export default Stock;
