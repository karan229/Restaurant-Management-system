import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const TopNavBar = () => {
  return (
    <TopNavBarContainer>
      <NavLink to="/Order">Order</NavLink>
      <NavLink to="/Inventory">Inventory</NavLink>
    </TopNavBarContainer>
  );
};

export default TopNavBar;
