import React, { useState, useEffect } from 'react';
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
import RestoNavbar from "./src/RestoNavbar.jsx";
import Dining from './src/Dining/Dining.jsx';
import Menu from './src/Dining/Menu.jsx';
import CheckoutPage from './src/Dining/Checkout.jsx';
import ConfirmationPage from './src/Dining/Confirm.jsx';
import AdminInventory from './src/Dining/AdminInventoryPage.jsx'

const NotFound = () => <h1 style={{ color: 'black' }}>404! Page Not Found</h1>;

const ContentContainer = styled.div`
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
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        setIsLoggedIn(true);
        setUserType(localStorage.getItem('userType') || '');
      } else {
        setIsLoggedIn(false);
        setUserType('');
      }
    };

    checkLoginStatus();

    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = (token) => {
    fetch('http://localhost:8000/secure', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Secure connection') {
          setIsLoggedIn(true);
          setUserType(data.user.userType);
        } else {
          setIsLoggedIn(false);
          clearAuthData();
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        clearAuthData();
      });
  };

  const handleLogin = (token, userType) => {
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    setIsLoggedIn(true);
    setUserType(userType);
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    clearAuthData();
    setIsLoggedIn(false);
    setUserType('');
  };

  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <ConditionalNavBar onLogout={handleLogout} />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<RestoHome onLogout={handleLogout} />} />
              <Route path="/AdminInventory" element={<AdminInventory />} />
              <Route path="/Profile" element={<Admin />} />
              <Route path="/Stock" element={<Stock />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/Inventory" element={userType === 'admin' ? <Home /> : <Navigate to="/" />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/menu/:tableId" element={<Menu />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
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
  const showNavBar = ['/Inventory', '/Stock', '/Profile', '/AdminInventory'].includes(location.pathname);
  const showTopNavBar = location.pathname === '/';
  const showRestoNavbar = location.pathname.startsWith('/Order') || 
                          location.pathname.startsWith('/dining') || 
                          location.pathname.startsWith('/menu') || 
                          location.pathname.startsWith('/checkout');

  return (
    <>
      {showTopNavBar && <TopNavBar onLogout={onLogout} />}
      {showNavBar && <NavBar onLogout={onLogout} />}
      {showRestoNavbar && <RestoNavbar />}
    </>
  );
};