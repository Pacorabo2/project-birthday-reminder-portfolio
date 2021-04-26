import React from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'

import './style.css'

const Login = () => {
  return (
    <div className="container">
      <h2>Connexion</h2>
      <form>
        <div className="formContent">
          <div className="inputBox">
            <input type="email" autoComplete="off" required/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input type="text" autoComplete="off" required/>
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


