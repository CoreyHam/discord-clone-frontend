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


function App() {
  let navigate = useNavigate();

  if (localStorage.getItem("user") === null) {
    navigate("/login")
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

