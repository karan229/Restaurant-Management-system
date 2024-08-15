import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateItem = ({ item, onUpdate, onCancel }) => {
  const [ItemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [Available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (item) {
      setItemName(item.ItemName || '');
      setQuantity(item.quantity || '');
      setPrice(item.Price || '');
      setAvailable(item.Available || true); 
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ItemName', ItemName);
    formData.append('quantity', quantity);
    formData.append('Price', Price);
    formData.append('Available', Available);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`https://restaurant-management-system-jpbc.onrender.com/api/items/${item._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ItemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Enter Item Name"
        required
      />
      <input
        type="number"
        value={quantity || 0}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter Quantity"
        required
      />
      <input
        type="number"
        value={Price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price"
        required
      />
      <select
        value={Available}
        onChange={(e) => setAvailable(e.target.value === 'true')}
      >
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <div>
        <button type="submit">Update</button>
        <button type="button" style={{ background: 'red' }} onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default UpdateItem;

