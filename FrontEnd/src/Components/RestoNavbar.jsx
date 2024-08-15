import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.div`
  height: 60px;
  display: flex;
  background: linear-gradient(to left, #415881, #1d3b91);
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  position: fixed;
  padding: 0 20px;
  top: 0;
  align-items: center;
  z-index: 1;
`;

const NavLinksRestaurant = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    top: 60px;
    flex-direction: column;
    width: 100%;
    left: 0;
    position: absolute;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    background: linear-gradient(to left, #415881, #1d3b91);
  }
`;

const NavLinkRestaurant = styled(Link)`
  padding: 10px 20px;
  margin: 0 15px;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
  -webkit-backdrop-filter: blur(16px) saturate(180%);

  &:hover {
    color: white;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
    width: 100%;
  }
`;

const BtnToggle = styled.button`
  border: none;
  display: none;
  background-color: transparent;
  color: white;
  font-size: 24px;
  z-index: 2;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const RestoNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar>
        <h2 style={{ margin: "0" }}>Restaurant Dashboard</h2>
        
        <BtnToggle onClick={handleToggle}>
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </BtnToggle>
        
        <NavLinksRestaurant isOpen={isOpen}>
          
          <NavLinkRestaurant to="/" onClick={handleToggle}>
            Home
          </NavLinkRestaurant>
          
          <NavLinkRestaurant to="/dining" onClick={handleToggle}>
            Dining
          </NavLinkRestaurant>
          
          <NavLinkRestaurant to="/menu" onClick={handleToggle}>
            Menu
          </NavLinkRestaurant>
        
        </NavLinksRestaurant>
      
      </NavBar>
    </>
  );
};

export default RestoNavbar;
