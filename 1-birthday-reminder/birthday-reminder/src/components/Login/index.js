import React, { useState } from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'

import './style.css'

const Login = () => {

  // Data definition
  const data = {
    email: "",
    password: "",
  }

  const [loginData, setLoginData] = useState(data)

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.id]: e.target.value})
    // console.log(e.target.value);
  }

  const { email, password } = loginData

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form>
        <div className="formContent">
          <div className="inputBox">
            <input onChange={handleChange} type="email" id="email" value={email} autoComplete="off" required/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} type="text" id="password" value={password} autoComplete="off" required/>
            <label htmlFor="password">Mot de passe</label>
          </div>
          <Button/>
        </div>
      </form>
      <div className="linkContainer">
        <Link to="/signup" className="simpleLink">Nouveau sur Birthday App ? Inscrivez-vous.</Link>
        <br/>
        <Link to="/forgetpassword" className="simpleLink">Mot de passe oublié ?</Link>
      </div>
    </div>
  )
}

export default Login


