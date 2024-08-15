import React, { useState, useEffect } from 'react';

const AdminInventoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishImage, setNewDishImage] = useState(null);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('https://restaurant-management-system-jpbc.onrender.com/api/dish');
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
      const response = await fetch('https://restaurant-management-system-jpbc.onrender.com/api/menu');
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
      const response = await fetch('https://restaurant-management-system-jpbc.onrender.com/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

    const formData = new FormData();
    formData.append('name', newDishName);
    formData.append('price', newDishPrice);
    formData.append('categoryId', selectedCategory);
    if (newDishImage) formData.append('image', newDishImage);

    try {
      const response = await fetch('https://restaurant-management-system-jpbc.onrender.com/api/dish', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error adding dish');
  
      fetchCategories();
  
      setNewDishName('');
      setNewDishPrice('');
      setNewDishImage(null);

      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  const handleDeleteDish = async (dishId) => {
    try {
      await fetch(`https://restaurant-management-system-jpbc.onrender.com/api/dish/${dishId}`, {
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

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`https://restaurant-management-system-jpbc.onrender.com/api/category/${categoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error deleting category');
      }
      setCategories(categories.filter(category => category._id !== categoryId));
      setSelectedCategory('');
    } catch (error) {
      console.error('Error deleting category:', error);
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
          className="input-field"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
        />
        <button onClick={handleAddCategory}>Add Category</button>

        <ul className="category-list">
          {categories.map(category => (
            <li
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`category-item ${selectedCategory === category._id ? 'selected' : ''}`}
            >
              {category.name}
              <button onClick={() => handleDeleteCategory(category._id)} className="delete-category-button">Delete</button>
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
              className="input-field"
              value={newDishName}
              onChange={(e) => setNewDishName(e.target.value)}
              placeholder="New Dish Name"
            />
            <input
              type="number"
              className="input-field"
              value={newDishPrice}
              onChange={(e) => setNewDishPrice(e.target.value)}
              placeholder="New Dish Price"
            />
            <input
              type="file"
              className="input-field"
              onChange={(e) => setNewDishImage(e.target.files[0])} // File input for image
            />
            <button onClick={handleAddDish}>Add Dish</button>

            {selectedCategoryData ? (
              <ul>
                {selectedCategoryData.dishes.map(dish => (
                  <li key={dish._id}>
                    {dish.name} - ${dish.price}
                    {dish.image && <img src={`https://restaurant-management-system-jpbc.onrender.com${dish.image}`} alt={dish.name} width="100" />} {/* Display image */}
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

      <style jsx>{`
        .admin-inventory {
          padding: 20px;
          font-family: Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        h1, h2 {
          margin-bottom: 10px;
        }

        .category-section, .dish-section {
          margin-bottom: 20px;
          overflow-y: auto;
        }

        .input-field {
          width: calc(100% - 22px);
          padding: 10px;
          margin: 5px 0;
          box-sizing: border-box;
        }

        .file-input {
          margin: 5px 0;
        }

        .category-list {
          list-style: none;
          padding: 0;
        }

        .category-item {
          padding: 10px;
          cursor: pointer;
          border: 1px solid #ddd;
          margin-bottom: 5px;
          border-radius: 4px;
          transition: background-color 0.3s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-item.selected {
          background-color: #f0f0f0;
          font-weight: bold;
        }

        .category-item:hover {
          background-color: #e0e0e0;
        }

        .delete-category-button {
          margin-left: 10px;
          padding: 5px;
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-category-button:hover {
          background-color: #c82333;
        }

        ul {
          padding: 0;
          list-style: none;
        }

        li {
          margin-bottom: 10px;
        }

        button {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }

        img {
          margin-left: 10px;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default AdminInventoryPage;
