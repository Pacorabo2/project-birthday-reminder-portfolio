import React from 'react'

import './style.css'

const Signup = () => {
  return (
    <div className="container">
      <form>
        <h2>Connexion</h2>
        <div className="formContent">
          <div className="inputBox">
            <input type="text"/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input type="text"/>
            <label htmlFor="password">Mot de passe</label>
          </div>
          <button>Connexion</button>
          <div className="linkContainer">
            <p><a href="/login">Nouveau sur Birthday App ? Inscrivez-vous maintenant.</a></p>
            <p><a href="/forgetpassword">Mot de passe oublié? Récupérez-le ici.</a></p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
