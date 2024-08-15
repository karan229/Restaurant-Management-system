import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-container">
      <h1>Thank you for your order!</h1>
      <button onClick={handleGoHome}>Go to Home Page</button>
    </div>
  );
};

export default ConfirmationPage;
