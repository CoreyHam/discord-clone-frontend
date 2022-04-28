import React, { useState } from "react"
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../../context/GlobalState";
import jwtDecode from "jwt-decode";

const Login = () => {
  // let navigate = useNavigate();

  const [state, dispatch] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService
      .login(username, password)
      .then(async (resp) => {
        let data = jwtDecode(resp.access)
        await dispatch({
          currentUserToken: resp.access,
          currentUser: data
        })
        // navigate('')
        window.location.reload()
      });
  }

  return (
    <div className="login-bg">
      <div className="c-form">
        <form className="login-container" onSubmit={handleLogin}>
          <h1>Welcome Back!</h1>
          <div className="login-prompt">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              name="username"
              className="login-height"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-prompt">
            <label htmlFor="pass">PASSWORD</label>
            <input
              type="password"
              id="pass"
              name="password"
              minLength="8"
              required
              className="login-height"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot your password?</a>
          </div>
          <input
            className="login-button login-height"
            type="submit"
            value="Login"
            />
            <div>Need an account? <a>Register</a></div>
        </form>
      </div>
    </div>
  )

}

export default Login