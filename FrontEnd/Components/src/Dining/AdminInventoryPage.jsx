import React, { useState, useEffect } from 'react';

const AdminInventoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dish');
        const data = await response.json();
        console.log('Dishes fetched:', data);
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
  
    fetchDishes();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/menu');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Invalid menu data format:', data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName) {
      console.error('Category name is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure content type is set for JSON
        },
        body: JSON.stringify({ name: newCategoryName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error creating category');
      setCategories([...categories, data]);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddDish = async () => {
    if (!newDishName || !newDishPrice || !selectedCategory) {
      console.error('All fields are required');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/dish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newDishName,
          price: newDishPrice,
          categoryId: selectedCategory,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error adding dish');
  
      fetchCategories();
  
      setNewDishName('');
      setNewDishPrice('');
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };
  

  const handleDeleteDish = async (dishId) => {
    try {
      await fetch(`http://localhost:8000/api/dish/${dishId}`, {
        method: 'DELETE',
      });
      const updatedCategories = categories.map(category =>
        category._id === selectedCategory
          ? { ...category, dishes: category.dishes.filter(dish => dish._id !== dishId) }
          : category
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const selectedCategoryData = categories.find(category => category._id === selectedCategory);

  return (
    <div className="admin-inventory">
      <h1>Admin Inventory</h1>

      <div className="category-section">
        <h2>Categories</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
        />
        <button onClick={handleAddCategory}>Add Category</button>

        <ul>
          {categories.map(category => (
            <li
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              style={{ cursor: 'pointer', fontWeight: selectedCategory === category._id ? 'bold' : 'normal' }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="dish-section">
        <h2>Dishes</h2>
        {selectedCategory ? (
          <>
            <input
              type="text"
              value={newDishName}
              onChange={(e) => setNewDishName(e.target.value)}
              placeholder="New Dish Name"
            />
            <input
              type="number"
              value={newDishPrice}
              onChange={(e) => setNewDishPrice(e.target.value)}
              placeholder="New Dish Price"
            />
            <button onClick={handleAddDish}>Add Dish</button>

            {selectedCategoryData ? (
              <ul>
                {selectedCategoryData.dishes.map(dish => (
                  <li key={dish._id}>
                    {dish.name} - ${dish.price}
                    <button onClick={() => handleDeleteDish(dish._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No dishes available for this category.</p>
            )}
          </>
        ) : (
          <p>Please select a category to manage dishes.</p>
        )}
      </div>
    </div>
  );
};

export default AdminInventoryPage;
