import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5555/user/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      Cookies.set('token', token);
      setUserInfo(user);
      Cookies.set('displayName', user.displayName);

      console.log('Login successful:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {errorMessage && (
        <Typography variant="body1" align="center" color="error">
          {errorMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
      <br />

      Don't have an account? <a href="/register">Create Account</a>
    </Container>
  );
};

export default LoginForm;
