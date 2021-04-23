import React, { useState } from 'react'
import Button from '../Button'

import './style.css'

const Signup = () => {

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [loginData, setLoginData] = useState(data)

  const handleChange = (e) => {
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  const { pseudo, email, password, confirmPassword } = loginData

  return (
    <div className="container">
      <h2>Inscription</h2>
      <form>
        <div className="formContent">
          <div className="inputBox">
            <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete="off" required />
            <label htmlFor="pseudo">Pseudo</label>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} value={email} type="email" id="email" autoComplete="off" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} value={password} type="password" id="password" autoComplete="off" required />
            <label htmlFor="password">Mot de Passe</label>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
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
