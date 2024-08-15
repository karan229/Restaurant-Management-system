import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RestoHome from './Components/RestoHome.jsx';
import Home from './Components/Home.jsx';
import Login from "./Components/Login.jsx";
import NavBar from "./Components/Navbar.jsx";
import TopNavBar from "./Components/TopNavBar.jsx";
import Admin from "./Components/Admin.jsx";
import Stock from "./Components/Stock.jsx";
import Order from './Components/Order.jsx';
import RestoNavbar from "./Components/RestoNavbar.jsx";
import Dining from './Components/Dining/Dining.jsx';
import Menu from './Components/Dining/Menu.jsx';
import CheckoutPage from './Components/Dining/Checkout.jsx';
import ConfirmationPage from './Components/Dining/Confirm.jsx';
import OnlineOrder from './Components/OrderOnline/OnlineOrder.jsx';
import AdminInventory from './Components/Dining/AdminInventoryPage.jsx'
import OrderOnlineCart from './Components/OrderOnline/OrderOnlineCart.jsx';
import OrderOnlineCheckout from './Components/OrderOnline/OrderOnlineCheckout.jsx';
import OrderOnlinePayment from './Components/OrderOnline/OrderOnlinePayment.jsx';
import OrderOnlineNavbar from './Components/OrderOnline/OnlineOrderNavbar.jsx';
import RecipePage from "./Components/Dining/Recipe.jsx";
import ManageOrder from './Components/ManageOrder.jsx';

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

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      const storedUserType = localStorage.getItem('userType');
      if (storedUserType) {
        setIsLoggedIn(true);
        setUserType(storedUserType);
    } else {
      setIsLoggedIn(false);
      setUserType('');
    }
  }};

  useEffect(() => {
    checkLoginStatus();
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = (token) => {
    fetch('https://restaurant-management-system-jpbc.onrender.com/secure', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Secure connection') {
          setIsLoggedIn(true);
          setUserType(data.user.userType);
          localStorage.setItem('userType', data.user.userType)
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
          <ConditionalNavBar onLogout={handleLogout} userType={userType}/>
          <ContentContainer>
            <Routes>
              <Route path="/" element={userType==='customer' ? <OnlineOrder /> : <RestoHome onLogout={handleLogout} />} />
              <Route path="/Profile" element={<Admin />} />           
              <Route path="/AdminInventory" element={<AdminInventory />} />
              <Route path="/Stock" element={<Stock />} />
              <Route path="/Order" element={<Order />} />
              <Route path="/Inventory" element={userType === 'admin' ? <Home /> : <Navigate to="/" />} />
              <Route path="/dining" element={<Dining />} />
              <Route path="/menu/:tableId" element={<Menu />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/order-online" element={ userType === 'customer' ? <OnlineOrder />:<Navigate to="/" />} />
              <Route path="/order-cart" element={ userType === 'customer' ? <OrderOnlineCart />:<Navigate to="/" />} />
              <Route path="/order-checkout" element={ userType === 'customer' ? <OrderOnlineCheckout/>:<Navigate to="/" />} />
              <Route path="/order-payment" element={ userType === 'customer' ? <OrderOnlinePayment />:<Navigate to="/" />} />
              <Route path="/Recipe" element={<RecipePage/>} />
              <Route path="/ManageOrder" element = {<ManageOrder/>}/>
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

const ConditionalNavBar = ({ onLogout, userType }) => {
  const location = useLocation();
  
  const showNavBar = ['/Inventory', '/Stock', '/Profile', '/AdminInventory'].includes(location.pathname);
  
  const showTopNavBar = location.pathname === '/' && userType !== 'customer';

  const showOnlineNav = userType === 'customer';


  const showRestoNavbar = location.pathname.startsWith('/Order') || 
                          location.pathname.startsWith('/dining') || 
                          location.pathname.startsWith('/menu') || 
                          location.pathname.startsWith('/checkout');

  return (
    <>
      {showTopNavBar &&<TopNavBar onLogout={onLogout} />}
      {showNavBar && <NavBar onLogout={onLogout} />}
      {showRestoNavbar && <RestoNavbar />}
      {showOnlineNav && userType === 'customer' && <OrderOnlineNavbar onLogout={onLogout}/>}
    </>
  );
};