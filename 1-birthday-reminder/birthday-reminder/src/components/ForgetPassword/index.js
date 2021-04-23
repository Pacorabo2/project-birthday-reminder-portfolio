import React from 'react'
import Button from "../Button"

import './style.css'

const ForgetPassword = () => {
  return (
    <div className="container" id="forget">
      <h2 id="titleForget">Mot de passe oublié ?</h2>
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
        <p className="simpleLink"><a href="/signup">Retourner sur la page de connexion</a></p>
      </div>
    </div>
  )
}

export default ForgetPassword
