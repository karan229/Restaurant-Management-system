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

const LogoutButton = styled.button`
  background-color: #f44;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #c33;
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