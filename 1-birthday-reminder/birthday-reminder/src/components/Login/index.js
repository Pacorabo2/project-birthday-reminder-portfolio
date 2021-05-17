import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import Button from '../Button'
import { Link } from 'react-router-dom'

import './style.css'

const Login = (props) => {

  // Firebase context
  const firebase = useContext(FirebaseContext)

  // Data definition
  const data = {
    email: "",
    password: "",
  }

  const [loginData, setLoginData] = useState(data)
  // State définition for error
  const [error, setError] = useState('')

  const handleChange = e => {
    setError('')
    setLoginData({...loginData, [e.target.id]: e.target.value})
    // console.log(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    
    const { email, password } = loginData
    firebase.loginUser(email, password)
    .then( user => {
      setLoginData({...data})
      props.history.push('/list')
    })
    .catch( error => {
      setError(error)
      setLoginData({...data})
    })
  }

  const { email, password } = loginData

  // Error handler
  const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className="container">
      {errorMsg}
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="formContent">
          <div className="inputBox">
            <input onChange={handleChange} type="email" id="email" value={email} autoComplete="off" required/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputBox">
            <input onChange={handleChange} type="text" id="password" value={password} autoComplete="off" required/>
            <label htmlFor="password">Mot de passe</label>
          </div>
          <div className="footer">
            <Button className="btnSubmit"
            buttonStyle="btn--primary--outline"
            buttonSize="btn--medium"
            >Se connecter</Button>
          </div>
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


