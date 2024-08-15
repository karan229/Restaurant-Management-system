import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [ItemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [Available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ItemName', ItemName);
    formData.append('quantity', quantity);
    formData.append('Price', Price);
    formData.append('Available', Available);
    formData.append('image', image);

    try {
      await axios.post('https://restaurant-management-system-jpbc.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful');
      alert("Inserted Data successful");
      setItemName('');
      setQuantity('');
      setPrice('');
      setAvailable(true);
      setImage(null);
      
    } catch (err) {
      console.error('Error uploading', err);
    }
  };

  return (
    <div className='Item-Create'>
      <form className='ItemList' onSubmit={handleSubmit}>
        <h1>ADD NEW ITEM</h1>
        <input
          type="text"
          value={ItemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter Item Name"
          required
        />
        <input
          type="number"
          value={quantity}
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
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadForm;
