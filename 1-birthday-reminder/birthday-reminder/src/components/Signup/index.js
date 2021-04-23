import React from 'react'
import Button from '../Button'

import './style.css'

const Signup = () => {
  return (
    <div className="container">
      <h2>Inscription</h2>
      <form>
        <div className="formContent">
          <div className="inputBox">
            <input type="text" id="pseudo" autoComplete="off" required />
            <label htmlFor="pseudo">Pseudo</label>
          </div>
          <div className="inputBox">
            <input type="email" id="email" autoComplete="off" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input type="password" id="password" autoComplete="off" required />
            <label htmlFor="password">Mot de Passe</label>
          </div>
          <div className="inputBox">
            <input type="password" id="confirmPassword" autoComplete="off" required />
            <label htmlFor="password">Confirmez le mot de Passe</label>
          </div>
          <Button/>
        </div>
      </form>
      <div className="linkContainer">
        <p className="simpleLink"><a href="/login">Déjà inscrit sur Birthday App ? Connectez-vous.</a></p>
      </div>
    </div>
  )
}

export default Signup
