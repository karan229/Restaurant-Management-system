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
  transform: ${(props) => (props.$isopen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease;
  z-index: 1;

  @media (min-width: 769px) {
    transform: translateX(0); /* Ensure it's visible on larger screens */
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

const ToggleButton = styled.a`
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: black;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavBar = ({ onLogout }) => {
  const [isopen, setisopen] = useState(false);

  const handleToggle = () => {
    setisopen(!isopen);
  };

  return (
    <>
      <ToggleButton onClick={handleToggle}>
        <i className={`fas ${isopen ? 'fa-times' : 'fa-bars'}`}></i>
      </ToggleButton>
      <NavBarContainer $isopen={isopen}>
        <h2 style={{ marginTop: '50px' }}>Dashboard</h2>
        <NavLink to="/" onClick={handleToggle}>Home</NavLink>
        <NavLink to="/Stock" onClick={handleToggle}>Stock</NavLink>
        <NavLink to="/Profile" onClick={handleToggle}>Admin</NavLink>
        <NavLink onClick={onLogout}>Logout</NavLink>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
