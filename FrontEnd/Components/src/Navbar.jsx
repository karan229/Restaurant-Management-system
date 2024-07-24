import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  width: 200px;
  height: 100vh;
  color: white;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  border-radius: 10px;
  box-shadow: 20px 20px 60px #90abd9, -20px -20px 60px #c2e7ff;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease;
  z-index: 1;

  @media (min-width: 769px) {
    transform: none;
  }
`;

const NavLink = styled(Link)`
  margin: 50px 0;
  display: block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: white;
  }

  @media (max-width: 768px) {
    margin: 20px 0;
    font-size: 14px;
    width: auto;
  }
`;

const ToggleButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    display: block;
  }
`;

const LogoutButton = styled(NavLink)`
  margin: 50px 0;
`;

const NavBar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <>
      <ToggleButton onClick={handleToggle}>
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} style={{ color: 'black' }}></i>
      </ToggleButton>
      <NavBarContainer $isOpen={isOpen}>
        <NavLink to="/" onClick={handleToggle}>Dashboard</NavLink>
        <NavLink to="/Inventory" onClick={handleToggle}>Home</NavLink>
        <NavLink to="/Stock" onClick={handleToggle}>Stock</NavLink>
        <NavLink to="/Profile" onClick={handleToggle}>Admin</NavLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavBarContainer>
    </>
  );
};

export default NavBar;