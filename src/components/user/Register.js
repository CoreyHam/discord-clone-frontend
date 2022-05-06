import React, { useState } from "react"
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConf: "",
    email: "",
  })

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value
    })
  }


  const handleRegister = (e) => {
    e.preventDefault();
    AuthService.register(user)
      .then(() => {
        navigate("/")
      }
      )
  }

  function handleLogin() {
    navigate("/login")
  }
  return (
    <div className="login-bg">
      <div className="c-form">
        <form onSubmit={handleRegister} className="login-container">
          <h1>Welcome!</h1>
          <div className="login-prompt">
            <label htmlFor="username">Username:</label>
            <input
              className="login-height"
              type="text"
              id="username"
              name="username"
              onChange={(e) => handleChange('username', e.target.value)}
              required
            />
          </div>
          <div className="login-prompt">
            <label htmlFor="email">Email:</label>
            <input
              className="login-height"
              type="text"
              id="email"
              name="email"
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className="login-prompt">
            <label htmlFor="pass">Password (8 characters minimum):</label>
            <input
              className="login-height"
              type="password"
              id="pass"
              name="password"
              minLength="8"
              required
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <div className="login-prompt">
            <label htmlFor="passConf">Confirm Password:</label>
            <input
              className="login-height"
              type="password"
              id="passConf"
              name="password"
              minLength="8"
              required
              onChange={(e) => handleChange('passwordConf', e.target.value)} />
          </div>
          <input
            className="login-button login-height"
            type="submit"
            value="Register"
            disabled={(
              user.password &&
              user.password.length >= 8 &&
              user.password === user.passwordConf &&
              user.email
            ) ? false : true}
          />
          <div>Already have an account? <a href="javascript:" onClick={handleLogin} >Login</a></div>

        </form>
      </div>
    </div>
  )

}

export default Register