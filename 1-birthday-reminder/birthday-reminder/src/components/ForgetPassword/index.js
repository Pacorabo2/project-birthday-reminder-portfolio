import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import Button from "../Button"

import './style.css'

const ForgetPassword = props => {

  const firebase = useContext(FirebaseContext)

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    firebase.passwordReset(email)
    .then(() => {
      setError(null)
      setSuccess(`Un mail contenant la procédure de récupération de mot de passe vient de vous être envoyé à l'adresse ${email}. Veuillez le consulter.`)
      setEmail('')
      setTimeout(() => {
        props.history.push('/login')
      }, 5000)
    })
    .catch(error => {
      setError(error);
      setEmail('')
    })
  }


  return (
    <div className="container" id="forget">
      <h2 id="titleForget">Mot de passe oublié ?</h2>
      <form onSubmit={handleSubmit}>
        <div className="formContent">

          {success && <span className="successMsg">{success}</span>}

          {error && <span className="errorMsg">{error.message}</span>}

          <div className="inputBox">
            <input type="email" onChange={e => setEmail(e.target.value)} value={email} autoComplete="off" required/>
            <label htmlFor="email">Email</label>
          </div>
          <Button/>
        </div>
      </form>
      <div className="linkContainer">
        <p className="simpleLink"><Link to="/signup">Retourner sur la page de connexion</Link></p>
      </div>
    </div>
  )
}

export default ForgetPassword
