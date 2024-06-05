import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Home from './src/Home.jsx';
import Login from "./src/Login.jsx";
import NavBar from "./src/Navbar.jsx";
import Admin from "./src/Admin.jsx";
import Stock from "./src/Stock.jsx";


const NotFound = () => <h1>404! Page Not Found</h1>;

const ContentContainer = styled.div`
  margin-left: 200px;
  padding: 20px;

  @media (max-width: 768px) {
    margin: 0;
    margin-top: 50px;
    display: block;
    font-size: 14px;
  }
`;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
     
        <>
          <NavBar />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Profile" element={<Admin />} />
              <Route path="/Stock" element={<Stock />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ContentContainer>
        </>
      
       
    
    </Router>
  );
}
