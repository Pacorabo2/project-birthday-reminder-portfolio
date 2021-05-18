/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext }from 'react'
import { FirebaseContext } from '../Firebase'
import'./style.css'

const Logout = (props) => {

  const firebase = useContext(FirebaseContext)

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if(checked) {
      firebase.signoutUser()
      // signoutUser
    }
  }, [checked, firebase])

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  return (
    <div className="logoutContainer">
      <p className="pseudoContainer">Bienvenue {props.userData.pseudo} !</p>
      <p className="pseudoContainer">Déconnexion</p>
      <label className="switch">
        <input 
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round" data-tip="Déconnexion"></span>
      </label>
    </div>
  )
}

export default Logout
