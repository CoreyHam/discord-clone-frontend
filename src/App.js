import React, { useState, useEffect } from 'react';
import './App.css';
import { Nav } from './Components/Nav';
import { Sidebar } from './Components/Sidebar';
import { Main } from './Components/Main';
import { Login } from './Components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState()

    useEffect(() => {
        setLoggedIn(false)
    }, []);

    function clickHandler() {
        setLoggedIn(true)
    }

    function inputCheck(e) {
      console.log(e.target.value)
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))
  {
    e.target.className = 'login-height green'
    return (true)
  }
    console.log("You have entered an invalid email address!")
    e.target.className = 'login-height red'
    return (false)

    }

  if (loggedIn === true) {
    return (
      <div className='container'>
        <Nav />
        <Sidebar />
        <Main />
      </div>
    );
  }

  else {
    return (
      <div className='login-bg'>
          <div className='login-container'>
              <h1>Welcome back!</h1>
              <div className='login-prompt'>
                  <h4>EMAIL</h4>
                  <input onInput={inputCheck} className={"login-height "}></input>
              </div>
              <div className='login-prompt'>
                  <h4>PASSWORD</h4>
                  <input type="password" className="login-height"></input>
                  <a href="#">Forgot your password?</a>
              </div>
              <button onClick={clickHandler} className="login-button login-height">Login</button>
              <h4>Need an account? <a href="#">Register</a></h4>
          </div>
      </div>
  );
  }
}

export default App;
