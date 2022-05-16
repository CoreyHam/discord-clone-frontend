import './App.css';
import React from 'react';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Nav } from './components/Nav'
import { Sidebar } from './components/Sidebar'
import { Main } from './components/Main'
import AuthService from './services/auth.service';



function App() {
  let navigate = useNavigate();
  const loggedInUser = localStorage.getItem('user');

  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    navigate('/login');
  }

  if (loggedInUser) {
    return (
      <div className='containerr'>
        <button onClick={handleLogout} className='logout'>logout</button>
        <Nav />
        <Sidebar />
        <Main />
      </div>
    );
  } else {
    return (
        <Navigate to='/login' />
  );}
}

export default App;