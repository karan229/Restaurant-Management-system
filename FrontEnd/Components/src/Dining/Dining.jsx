import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiningPage = () => {
  const navigate = useNavigate();
  
  const tables = [
    { id: 1, name: 'Table 1' },
    { id: 2, name: 'Table 2' },
    { id: 3, name: 'Table 3' },
    { id: 4, name: 'Table 4' },
    { id: 5, name: 'Table 5' },
  ];

  const handleTableClick = (tableId) => {
    navigate(`/menu/${tableId}`);
  };

  return (
    <div className='table-container'>
      {tables.map(table => (
        <div
          key={table.id}
          className='table'
          onClick={() => handleTableClick(table.id)}
        >
          {table.name}
        </div>
      ))}
    </div>
  );
};

export default DiningPage;
