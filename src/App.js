import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav } from './Components/Nav';
import { Sidebar } from './Components/Sidebar';
import { Main } from './Components/Main';

function App() {
  return (
    <div className='container'>
      <Nav />
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
