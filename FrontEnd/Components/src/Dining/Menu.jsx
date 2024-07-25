import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import veg from '../../Assets/veg.jpg';
import non from '../../Assets/non.jpg';
import dessert from '../../Assets/dessert.jpg'; 

const MenuPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('veg');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(`selectedItems_${tableId}`)) || [];
    setSelectedItems(savedItems);
  }, [tableId]);

  useEffect(() => {
    if (tableId) {
      localStorage.setItem(`selectedItems_${tableId}`, JSON.stringify(selectedItems));
    }
  }, [selectedItems, tableId]);

  const categories = [
    { id: 'veg', name: 'Veg', img: veg },
    { id: 'nonveg', name: 'Non-Veg', img: non },
    { id: 'dessert', name: 'Dessert', img: dessert },
  ];

  const menuItems = {
    veg: [
      { id: 'veg_1', name: 'Roasted Kaju', price: 10 },
      { id: 'veg_2', name: 'Dal Tadka', price: 8 },
      { id: 'veg_3', name: 'Aloo Gobi', price: 7 },
      { id: 'veg_4', name: 'Palak Paneer', price: 9 },
      { id: 'veg_5', name: 'Rajma Chawal', price: 11 },
    ],
    nonveg: [
      { id: 'nonveg_1', name: 'Chicken Curry', price: 12 },
      { id: 'nonveg_2', name: 'Mutton Biryani', price: 15 },
      { id: 'nonveg_3', name: 'Turkey BLT', price: 13 },
      { id: 'nonveg_4', name: 'Bacon BELT', price: 14 },
      { id: 'nonveg_5', name: 'BBQ Pork', price: 16 },
    ],
    dessert: [
      { id: 'dessert_1', name: 'Chocolate Cake', price: 6 },
      { id: 'dessert_2', name: 'Vanilla Ice Cream', price: 5 },
      { id: 'dessert_3', name: 'Blueberry Pie', price: 7 },
      { id: 'dessert_4', name: 'Cheesecake', price: 8 },
      { id: 'dessert_5', name: 'Date Square', price: 6 },
    ],
  };

  const handleQuantityChange = (item, quantity) => {
    const updatedItems = [...selectedItems];
    const index = updatedItems.findIndex(selectedItem => selectedItem.id === item.id);

    if (index >= 0) {
      if (quantity > 0) {
        updatedItems[index].quantity = quantity;
      } else {
        updatedItems.splice(index, 1);
      }
    } else {
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
    <>
      <div className='menu-container'>
        <div>
          <h1 style={{color:'black', padding:'10px'}}>Menu for Table {tableId}</h1>
        </div>

        <div className="menu-title">
          {categories.map(category => (
            <div key={category.id} className="category-container" onClick={() => setSelectedCategory(category.id)}>
              <img src={category.img} alt={category.name} />
              <div className="category-title">{category.name}</div>
            </div>
          ))}
        </div>

        <div className="menu-list">
          {menuItems[selectedCategory].map(item => {
            const selectedItem = selectedItems.find(
              selectedItem => selectedItem.id === item.id
            );
            const quantity = selectedItem ? selectedItem.quantity : 0;
            return (
              <div key={item.id} className="list">
                <span>{item.name} <br />- ${item.price}</span>
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
    </>
  );
};

export default MenuPage;
