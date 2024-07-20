import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import veg from '../Assets/veg.jpg';
import non from '../Assets/non.jpg';
import dessert from '../Assets/dessert.jpg';

const MenuPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('veg');
  const [selectedItems, setSelectedItems] = useState([]);

  const categories = [
    { id: 'veg', name: 'Veg', img: veg },
    { id: 'nonveg', name: 'Non-Veg', img: non },
    { id: 'dessert', name: 'Dessert', img: dessert },
  ];

  const menuItems = {
    veg: [
      { id: 1, name: 'Roasted Kaju', price: 10 },
      { id: 2, name: 'Dal Tadka', price: 8 },
      { id: 3, name: 'Aloo Gobi', price: 7 },
      { id: 4, name: 'Palak Paneer', price: 9 },
      { id: 5, name: 'Rajma Chawal', price: 11 },
    ],
    nonveg: [
      { id: 1, name: 'Chicken Curry', price: 12 },
      { id: 2, name: 'Mutton Biryani', price: 15 },
      { id: 3, name: 'Turkey BLT', price: 13 },
      { id: 4, name: 'Bacon BELT', price: 14 },
      { id: 5, name: 'BBQ Pork', price: 16 },
    ],
    dessert: [
      { id: 1, name: 'Chocolate Cake', price: 6 },
      { id: 2, name: 'Vanilla Ice Cream', price: 5 },
      { id: 3, name: 'Blueberry Pie', price: 7 },
      { id: 4, name: 'Cheesecake', price: 8 },
      { id: 5, name: 'Date Square', price: 6 },
    ],
  };

  const handleQuantityChange = (item, quantity) => {
    const updatedItems = [...selectedItems];
    const index = updatedItems.findIndex(selectedItem => selectedItem.id === item.id && selectedItem.category === selectedCategory);

    if (index >= 0) {
      if (quantity > 0) {
        updatedItems[index].quantity = quantity;
      } else {
        updatedItems.splice(index, 1);
      }
    } else {
      updatedItems.push({ ...item, quantity, category: selectedCategory });
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
      {/* <navbar/> */}
      <div className='menu-container'>
        <div>
          <h1 style={{color:'black', padding:'10px'}}>Menu for Table {tableId}</h1>
        </div>

        <div className="menu-title">
          {categories.map(category => (
            <div key={category.id} className="category-container" onClick={() => setSelectedCategory(category.id)}>
              <img src={category.img} alt="img" />
              <div className="category-title">{category.name}</div>
            </div>
          ))}
        </div>

        <div className="menu-list">
          {menuItems[selectedCategory].map(item => {
            const selectedItem = selectedItems.find(
              selectedItem => selectedItem.id === item.id && selectedItem.category === selectedCategory
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
