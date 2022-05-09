import './App.css';
import { Navigate, Outlet } from "react-router-dom";
import { GlobalProvider } from './context/GlobalState';
// import NavBar from './components/NavBar';
import { Nav } from './components/Nav'
import { Sidebar } from './components/Sidebar'
import { Main } from './components/Main'
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useNavigate } from 'react-router-dom';
import AuthService from './services/auth.service';



function App() {
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    navigate('/login');
  }

  if (localStorage.getItem("user") === null) {
    navigate("/login")
  } else {
    return (
      <div className='containerr'>
        <button onClick={handleLogout} className='logout'>logout</button>
        <Nav />
        <Sidebar />
        <Main />
      </div>
    );
  }
}
export default App;

