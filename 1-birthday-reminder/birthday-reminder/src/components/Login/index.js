import React from 'react'
import Button from '../Button'

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
        <p className="simpleLink"><a href="/login">Nouveau sur Birthday App ? Inscrivez-vous maintenant.</a></p>
        <p className="simpleLink"><a href="/forgetpassword">Mot de passe oublié ?</a></p>
      </div>
    </div>
    
  )
}

export default Login


