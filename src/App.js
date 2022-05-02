import './App.css';
import { Outlet } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
// import NavBar from './components/NavBar';
import { Nav } from './components/Nav'
import { Sidebar } from './components/Sidebar'
import { Main } from './components/Main'
import Login from './components/user/Login';


function App() {
  if (localStorage.getItem("user") === null) {
    return (
      <>
        <Login />
        <Outlet />
      </>
    );
  } else {
    return (
      <div className='containerr'>
        <Nav />
        <Sidebar />
        <Main />
      </div>
    );
  }
}

export default App;

