import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton = styled.button`
  margin: 50px 0;
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const TopNavBarContainer = styled.div`
  width: 100%;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const TopNavBar = ({ onLogout, isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
  };

  const handleNavigation = (path) => {
    if (path === '/Inventory' && !isAdmin) {
      alert('You do not have access to Inventory.');
    } else {
      navigate(path);
    }
  };

  return (
    <TopNavBarContainer>
      <NavLink onClick={() => handleNavigation('/Order')}>Order</NavLink>
      <NavLink onClick={() => handleNavigation('/Inventory')}>Inventory</NavLink>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </TopNavBarContainer>
  );
};

export default TopNavBar;
