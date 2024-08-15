import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton = styled.button`
  margin: 0 20px;
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
  z-index: 1000;
  display: flex;
  top: 0;
  justify-content: space-around;
  padding: 10px;
  position: sticky;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;


const TopNavBar = ({ onLogout }) => {
  return (
    <TopNavBarContainer>
      <NavLink to="/Order">Order</NavLink>
      <NavLink to="/Inventory">Inventory</NavLink>
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    </TopNavBarContainer>
  );
};

export default TopNavBar;
