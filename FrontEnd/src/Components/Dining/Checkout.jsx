  import React, { useEffect, useState } from "react";
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
    const { tableId, selectedItems: initialItems } = location.state || {};
    const [selectedItems, setSelectedItems] = useState(initialItems || []);
    const [email, setEmail] = useState('');
    const [customization, setCustomization] = useState('');
    const [error, setError] = useState('');

    const handleAdd = (itemId) => {
      const updatedItems = selectedItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setSelectedItems(updatedItems);
    };

    const handleRemove = (itemId) => {
      const updatedItems = selectedItems
        .map((item) =>
          item._id === itemId && item.quantity > 0
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
      console.log('Customization details:', customization);
      
      try {
        const response = await fetch('https://restaurant-management-system-jpbc.onrender.com/api/send-bill', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, tableId, selectedItems, customization }),
        });
        
        if (response.ok) {
          console.log('Bill sent successfully');
          navigate('/confirmation');
        } else {
          const errorText = await response.text();
          console.error('Error sending bill:', errorText);
          setError('Error sending bill. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error sending bill. Please try again later.');
      }
    };
    
    

    return (
      <div className="checkout-container">
        <div className="title-checkout">
          <h1>Total: ${calculateTotal()}</h1>
        </div>

        <div className="checkout-list">
          {selectedItems.map((item) => (
            <div key={item._id} className="listedItem">
              <div className="content-list">
                <span>{item.name} </span>
                <span> quantity: {item.quantity} </span>
                <span> price: ${item.price} </span>
              </div>
              <div className="listBtn">
                <span onClick={() => handleAdd(item._id)}>Add</span>
                <span onClick={() => handleRemove(item._id)}>Remove</span>
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

          <div className="customization-input">
            <label htmlFor="customization">Any customization details:</label>
            <textarea
              id="customization"
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              placeholder="Enter any special instructions here..."
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="generate-bill">
            <button onClick={handleGenerateBill}>Generate Bill</button>
          </div>
        </div>
      </div>
    );
  };

  export default CheckoutPage;
