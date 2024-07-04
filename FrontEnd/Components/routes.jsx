import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RestoHome from './src/RestoHome.jsx';
import Home from './src/Home.jsx';
import Login from "./src/Login.jsx";
import NavBar from "./src/Navbar.jsx";
import TopNavBar from "./src/TopNavBar.jsx";
import Admin from "./src/Admin.jsx";
import Stock from "./src/Stock.jsx";
import Order from './src/Order.jsx';

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

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const loginTime = localStorage.getItem('loginTime');
      if (loggedIn && loginTime) {
        const thirtyMinutes = 30 * 60 * 1000;
        const currentTime = new Date().getTime();
        if (currentTime - parseInt(loginTime) > thirtyMinutes) {
          handleLogout();
        } else {
          localStorage.setItem('loginTime', currentTime.toString());
          setIsLoggedIn(true);
        }
      }
    };

    checkLoginStatus();

    return () => {
      localStorage.removeItem('loginTime');
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    const loginTime = new Date().getTime();
    localStorage.setItem('loginTime', loginTime.toString());
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <ConditionalNavBar onLogout={handleLogout} />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<RestoHome />} />
              <Route path="/Profile" element={<Admin />} />
              <Route path="/Stock" element={<Stock />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/Inventory" element={<Home />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ContentContainer>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

const ConditionalNavBar = ({ onLogout }) => {
  const location = useLocation();
  const showTopNavBar = location.pathname === '/';
  const showNavBar = location.pathname === '/Profile' || location.pathname === '/Stock' || location.pathname === '/Inventory';

  return (
    <>
      {showTopNavBar && <TopNavBar />}
      {showNavBar && <NavBar onLogout={onLogout} />}
    </>
  );
};
