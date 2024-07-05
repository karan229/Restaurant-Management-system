import React from 'react';
import { createRoot } from "react-dom/client";
import Navbar from './routes.jsx';

// render the Navbar component into the root element
createRoot(document.getElementById("root")).render(
  // using this mode to improve error handling
  <React.StrictMode>        
    <Navbar />
  </React.StrictMode>
);