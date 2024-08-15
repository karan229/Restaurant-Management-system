import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) rootElement.classList.add('rootFullWidth');

    return () => {
      if (rootElement) rootElement.classList.remove('rootFullWidth');
    };
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('https://restaurant-management-system-jpbc.onrender.com/api/menu');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('Menu data:', data);
        if (Array.isArray(data)) {
          setCategories(data);
          setSelectedCategory(data[0]?._id || '');
        } else {
          console.error('Invalid menu data format:', data);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem(`selectedItems_${tableId}`)) || [];
      setSelectedItems(savedItems);
    } catch (error) {
      console.error('Error loading items from localStorage:', error);
    }
  }, [tableId]);

  useEffect(() => {
    if (tableId) {
      try {
        localStorage.setItem(`selectedItems_${tableId}`, JSON.stringify(selectedItems));
      } catch (error) {
        console.error('Error saving items to localStorage:', error);
      }
    }
  }, [selectedItems, tableId]);

  const handleQuantityChange = (item, quantity) => {
    setSelectedItems(prevItems => {
      const updatedItems = [...prevItems];
      const index = updatedItems.findIndex(selectedItem => selectedItem._id === item._id);

      if (index >= 0) {
        if (quantity > 0) {
          updatedItems[index].quantity = quantity;
        } else {
          updatedItems.splice(index, 1);
        }
      } else if (quantity > 0) {
        updatedItems.push({ ...item, quantity });
      }

      return updatedItems;
    });
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item.');
      return;
    }
    navigate('/checkout', { state: { tableId, selectedItems } });
  };

  return (
    <div className='menu-container'>
      <h1>Menu for Table {tableId}</h1>
      <div className="menu-title">
        {categories.map(category => (
          <div
            key={category._id}
            className={`category-container ${category._id === selectedCategory ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(category._id)}
          >
            <div className="category-title">{category.name}</div>
          </div>
        ))}
      </div>
      <div className="menu-list">
        {categories.find(cat => cat._id === selectedCategory)?.dishes.map(item => (
          <div key={item._id} className="list">
            <span>{item.name} <br />- ${item.price}</span>
            <div className="button">
              <span 
                onClick={() => handleQuantityChange(item, Math.max((selectedItems.find(i => i._id === item._id)?.quantity || 0) - 1, 0))}
                className="minus"
              >
                -
              </span>
              <span>{selectedItems.find(i => i._id === item._id)?.quantity || 0}</span>
              <span 
                onClick={() => handleQuantityChange(item, (selectedItems.find(i => i._id === item._id)?.quantity || 0) + 1)}
                className="plus"
              >
                +
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="btnCheckout">
        <button className='CheckoutBtn' onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default MenuPage;
