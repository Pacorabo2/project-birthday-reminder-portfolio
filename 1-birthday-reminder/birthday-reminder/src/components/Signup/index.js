import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import Button from '../Button'

import './style.css'

const Signup = (props) => {

  const firebase = useContext(FirebaseContext)

  // Data definition
  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  // State definition with data objet in it
  const [loginData, setLoginData] = useState(data)
  // State définition for error
  const [error, setError] = useState('')

  // Event listener on inputs
  const handleChange = e => {
    setError('')
    setLoginData({...loginData, [e.target.id]: e.target.value})
  }

  // Event listener on Valid form
  const handleSubmit = e => {
    e.preventDefault()
    const { email, password, pseudo } = loginData
    firebase.signupUser(email, password)

    .then(authUser => {
      return firebase.user(authUser.user.uid).set({
        pseudo,
        email
      })
    })

    .then(() => {
      setLoginData({...data})
      // Redirect on "/list"
      props.history.push('/list')
    })
    .catch(error => {
      setError(error)
      setLoginData({...data})
    })
  }

  const { pseudo, email, password, confirmPassword } = loginData

  // Error handler
  const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className="container">
      {errorMsg}
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
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
           <Button />
        </div>
      </form>
      <div className="linkContainer">
        <Link className="simpleLink" to="/login">Déjà inscrit sur Birthday App ? Connectez-vous.</Link>
      </div>
    </div>
  )
}

export default Signup
