import React, { useState } from 'react';
import NavBar from '../Navbar.jsx';

const recipes = [
  {
    id: 1,
    title: 'Classic Vanilla Cake Recipe',
    steps: [
      'Preheat the oven to 350°F (175°C).',
      'Mix flour, sugar, and baking powder.',
      'Add eggs, milk, and vanilla extract.',
      'Pour the mixture into a baking pan.',
      'Bake for 30 minutes or until golden brown.',
    ],
    // Reference for video - https://www.youtube.com/embed/qtlhdIfojmc?si=bQfN2ujwc7WGnPCp
    videoUrl: 'https://www.youtube.com/embed/qtlhdIfojmc?si=bQfN2ujwc7WGnPCp',
  },
  {
    id: 2,
    title: 'How to make chicken curry',
    steps: [
      'Season the chicken with salt and pepper.',
      'Heat oil in a pan over medium heat.',
      'Cook the chicken for 7-8 minutes on each side.',
      'Serve hot with your favorite sides.',
    ],
    // Reference for video - https://www.youtube.com/embed/jwyge5daKUQ?si=nNYHTN-sw2skZwMo
    videoUrl: 'https://www.youtube.com/embed/jwyge5daKUQ?si=nNYHTN-sw2skZwMo',
  },
  {
    id: 3,
    title: 'Spaghetti Carbonara',
    steps: [
      'Cook spaghetti according to package instructions.',
      'In a pan, cook bacon until crispy.',
      'Mix eggs, cheese, and black pepper in a bowl.',
      'Combine cooked spaghetti with bacon.',
      'Add the egg mixture and stir until creamy.',
    ],
    // Reference for video - https://www.youtube.com/embed/4F1JcvnsBRc?si=8PBbtqmTzxr3hLXT
    videoUrl: 'https://www.youtube.com/embed/4F1JcvnsBRc?si=8PBbtqmTzxr3hLXT',
  },
  {
    id: 4,
    title: 'Classic Pancakes',
    steps: [
      'Mix flour, sugar, baking powder, and salt in a bowl.',
      'In another bowl, whisk milk, egg, and melted butter.',
      'Combine both mixtures and stir until smooth.',
      'Pour batter onto a hot griddle and cook until bubbles form.',
      'Flip and cook until golden brown.',
    ],
    // Reference for video - https://www.youtube.com/embed/NCMKedZvnyI?si=b8wOv3KabUJ94IwJ
    videoUrl: 'https://www.youtube.com/embed/NCMKedZvnyI?si=b8wOv3KabUJ94IwJ',
  },
  {
    id: 5,
    title: 'Chicken Stir-Fry',
    steps: [
      'Cut chicken into strips and season with soy sauce.',
      'Stir-fry chicken in a hot pan with oil.',
      'Add vegetables and cook until tender.',
      'Add more soy sauce and serve over rice.',
    ],
    // Reference for video - https://www.youtube.com/embed/5dybdeTylz0?si=D9cv3NxwgnedNd-1
    videoUrl: 'https://www.youtube.com/embed/5dybdeTylz0?si=D9cv3NxwgnedNd-1',
  },
  {
    id: 6,
    title: 'Vegetable Soup',
    steps: [
      'Sauté onions and garlic in a pot.',
      'Add chopped vegetables and cook for a few minutes.',
      'Pour in vegetable broth and bring to a boil.',
      'Simmer until vegetables are tender.',
      'Season with salt, pepper, and herbs.',
    ],
    // Reference for video - https://www.youtube.com/embed/SE-DptWxDKw?si=6NVBbhKxbfFiOI1V
    videoUrl: 'https://www.youtube.com/embed/SE-DptWxDKw?si=6NVBbhKxbfFiOI1V',
  },
  {
    id: 7,
    title: 'Beef Tacos',
    steps: [
      'Cook ground beef with taco seasoning.',
      'Warm taco shells in the oven.',
      'Fill shells with beef, cheese, lettuce, and tomatoes.',
      'Top with sour cream and salsa.',
    ],
    // Reference for video - https://www.youtube.com/embed/hdjlaEBIYI4?si=iqEdfNVTFBaqNhXV
    videoUrl: 'https://www.youtube.com/embed/hdjlaEBIYI4?si=iqEdfNVTFBaqNhXV',
  },
  {
    id: 8,
    title: 'Caesar Salad',
    steps: [
      'Chop romaine lettuce and place in a bowl.',
      'Add Caesar dressing and toss to coat.',
      'Top with croutons and parmesan cheese.',
    ],
    // Reference for video - https://www.youtube.com/embed/a4Z2x0sPq3A?si=_3OQSNODqEH7tyB_
    videoUrl: 'https://www.youtube.com/embed/a4Z2x0sPq3A?si=_3OQSNODqEH7tyB_',
  },
  {
    id: 9,
    title: 'Lasagna',
    steps: [
      'Cook lasagna noodles according to package instructions.',
      'In a pan, cook ground beef with onions and garlic.',
      'Mix with tomato sauce and spices.',
      'Layer noodles, meat sauce, and cheese in a baking dish.',
      'Bake until bubbly and golden brown.',
    ],
    // Reference for video - https://www.youtube.com/embed/VkQajdYciW0?si=uqd8BGognYQINDnN
    videoUrl: 'https://www.youtube.com/embed/VkQajdYciW0?si=uqd8BGognYQINDnN',
  },
  {
    id: 10,
    title: 'Apple Pie',
    steps: [
      'Prepare pie crust and line a pie dish.',
      'Mix sliced apples with sugar, cinnamon, and flour.',
      'Pour apple mixture into the crust.',
      'Top with another crust and crimp edges.',
      'Bake until the crust is golden and the filling is bubbly.',
    ],
    // Reference for video - https://www.youtube.com/embed/VkQajdYciW0?si=uqd8BGognYQINDnN
    videoUrl: 'https://www.youtube.com/embed/rIIYB-cg26s?si=5b5BeBohX3xCAoGx',
  },
  {
    id: 11,
    title: 'Mango Smoothie',
    steps: [
      'Blend mango chunks with yogurt and honey.',
      'Add ice and blend until smooth.',
      'Serve chilled.',
    ],
    // Reference for video - https://www.youtube.com/embed/kv9Qux0IEno?si=S76US7LbZuVigIxm
    videoUrl: 'https://www.youtube.com/embed/kv9Qux0IEno?si=S76US7LbZuVigIxm',
  },
];

const RecipePage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const selectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (

    <div className="page">

      <NavBar onLogout={() => alert('Logged out')} />
      <div className="sidebar">
        <h2 style={{color:"black"}}>Recipes</h2>
        <ul className="recipe-list">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <button onClick={() => selectRecipe(recipe)} className="recipe-button">
                {recipe.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {selectedRecipe ? (
          <>
            <h2  style={{color:"black"}}>{selectedRecipe.title}</h2>
            <ol className="steps-list">
              {selectedRecipe.steps.map((step, index) => (
                <li key={index} className="step-item">{step}</li>
              ))}
            </ol>
            <div className="video-container">
              <iframe
                src={selectedRecipe.videoUrl}
                title={selectedRecipe.title}
                className="video"
                allowFullScreen
              />
            </div>
          </>
        ) : (
          <p  style={{color:"black"}}>Please select a recipe to see the details.</p>
        )}
      </div>
    </div>
  );
};

export default RecipePage;