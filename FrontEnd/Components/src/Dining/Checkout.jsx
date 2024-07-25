import React, {useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {

  useEffect(() => {
    const rootElement = document.getElementById("root");
    rootElement.classList.add("rootFullWidth");

    return () => {
      rootElement.classList.remove("rootFullWidth");
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const { tableId, selectedItems: initialItems } = location.state;
  const [selectedItems, setSelectedItems] = useState(initialItems);
  const [email, setEmail] = useState('');

  const handleAdd = (itemId) => {
    const updatedItems = selectedItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setSelectedItems(updatedItems);
  };

  const handleRemove = (itemId) => {
    const updatedItems = selectedItems
      .map((item) =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setSelectedItems(updatedItems);
  };

  const calculateTotal = () => {
    return selectedItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleGenerateBill = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/send-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, tableId, selectedItems }),
      });
  
      if (response.ok) {
        console.log('Bill sent successfully');
        navigate('/confirmation');
      } else {
        console.error('Error sending bill');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="checkout-container">
      <div className="title-checkout">
        <h1>Total: ${calculateTotal()}</h1>
      </div>

      <div className="checkout-list">
        {selectedItems.map((item) => (
          <div key={`${item.id}_${item.category}`} className="listedItem">
            <div className="content-list">
              <span>{item.name} </span>
              <span> quantity: {item.quantity} </span>
              <span> price: ${item.price} </span>
            </div>
            <div className="listBtn">
              <span onClick={() => handleAdd(item.id)}>Add</span>
              <span onClick={() => handleRemove(item.id)}>Remove</span>
            </div>
          </div>
        ))}
      </div>

      <div className="email-bill-container">
        <div className="email-input">
          <label htmlFor="email">Enter your email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="generate-bill">
          <button onClick={handleGenerateBill}>Generate Bill</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;