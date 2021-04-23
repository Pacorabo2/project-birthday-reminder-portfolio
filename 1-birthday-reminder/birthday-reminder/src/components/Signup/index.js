import React from 'react'
import Button from '../Button'

import './style.css'

const Signup = () => {
  return (
    <div className="container">
      <form>
        <div className="formContent">
          <h2>Connexion</h2>
          <div className="inputBox">
            <input type="text"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input type="text"/>
            <label htmlFor="password">Mot de passe</label>
          </div>
          <Button/>
          <div className="linkContainer">
            <p className="simpleLink"><a href="/login">Nouveau sur Birthday App ? Inscrivez-vous maintenant.</a></p>
            <p className="simpleLink"><a href="/forgetpassword">Mot de passe oublié? Récupérez-le ici.</a></p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
