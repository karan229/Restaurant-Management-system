import React from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Home from './src/Home.jsx';
const NotFound = () => <h1>404! Page Not Found</h1>;  // display this when user navigate to other routes

export default function Navbar() {
  return (
    // BrowserRouter and Routes to set up the routing for different pages
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
