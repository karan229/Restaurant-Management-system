import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const { tableId, selectedItems: initialItems } = location.state;
  const [selectedItems, setSelectedItems] = useState(initialItems);

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

  return (
    <>
      <div class="checkout-container">
        <div class="title-checkout">
          <h1 style={{color:'black'}}>Total: ${calculateTotal()}</h1>
        </div>
       
        <div class="checkout-list">
        {selectedItems.map((item) => (
          <div key={item.id} class="listedItem">
            <div class="content-list">
              <span>{item.name} </span>
              <span> quantity: {item.quantity} </span>
              <span> price: ${item.price} </span>
            </div>
            <div class="listBtn">
              <span onClick={() => handleAdd(item.id)}>Add</span>
              <span onClick={() => handleRemove(item.id)}>Remove</span>
            </div>
          </div>
           ))}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
