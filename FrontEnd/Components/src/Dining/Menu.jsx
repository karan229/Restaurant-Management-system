import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");

    return () => {
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/menu');
        const data = await response.json();
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
    const savedItems = JSON.parse(localStorage.getItem(`selectedItems_${tableId}`)) || [];
    setSelectedItems(savedItems);
  }, [tableId]);

  useEffect(() => {
    try {
      if (tableId) {
        localStorage.setItem(`selectedItems_${tableId}`, JSON.stringify(selectedItems));
      }
    } catch (e) {
      console.error('LocalStorage quota exceeded or other error:', e);
    }
  }, [selectedItems, tableId]);

  const handleQuantityChange = (item, quantity) => {
    const updatedItems = [...selectedItems];
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

    setSelectedItems(updatedItems);
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
      <div>
        <h1 style={{ color: 'black', padding: '10px' }}>Menu for Table {tableId}</h1>
      </div>

      <div className="menu-title">
        {categories.map(category => (
          <div
            key={category._id}
            className="category-container"
            onClick={() => setSelectedCategory(category._id)}
          >
            <div className="category-title">{category.name}</div>
            {category.image && (
              <img
                src={`data:${category.image.contentType};base64,${btoa(
                  String.fromCharCode(...new Uint8Array(category.image.data))
                )}`}
                alt={category.name}
                style={{ width: '100px', height: '100px' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="menu-list">
        {categories.find(cat => cat._id === selectedCategory)?.dishes.map(item => {
          const selectedItem = selectedItems.find(selectedItem => selectedItem._id === item._id);
          const quantity = selectedItem ? selectedItem.quantity : 0;
          return (
            <div key={item._id} className="list">
              <span>{item.name} <br />- ${item.price}</span>
              {item.image && (
                <img
                  src={`data:${item.image.contentType};base64,${btoa(
                    String.fromCharCode(...new Uint8Array(item.image.data))
                  )}`}
                  alt={item.name}
                  style={{ width: '100px', height: '100px' }}
                />
              )}
              <div className="button">
                <span onClick={() => handleQuantityChange(item, quantity - 1)} className="minus">-</span>
                <span>{quantity}</span>
                <span onClick={() => handleQuantityChange(item, quantity + 1)} className="plus">+</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="btnCheckout">
        <button className='CheckoutBtn' onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default MenuPage;
