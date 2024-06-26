import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Message = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      setError(false);
      onLogin(response.data.userType);
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
      setError(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', {
        username,
        email,
        password,
        userType,
      });
      setMessage(response.data.message);
      setError(false);
      onLogin();
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
      setError(true);
    }
  };
  
  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegister}>
          <h3>Create Account</h3>
          <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" name="username" required />
          <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" name="email" required />
          <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" required />
          <Select value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="" disabled>Select user type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
          <button id="btn">Register</button>
          {message && <Message error={error}>{message}</Message>}
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>
          {/* <div className="social-container">
            <a href="#" className="social"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="social"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="social"><i className="fa-brands fa-google"></i></a>
          </div> */}
          <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <a href="#" style={{color: "white"}}>Forgot password? Don't worry we got you!</a>
          <button type="submit">Log In</button>
          {message && <Message error={error}>{message}</Message>}
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Already have an Account? Simply click sign in.</p>
            <button className="ghost" id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>RIMS</h1>
            <p>Enter your credentials and start your journey with us!</p>
            <button className="ghost" id="signUp">Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
