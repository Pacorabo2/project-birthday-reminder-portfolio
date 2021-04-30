/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext }from 'react'
import { FirebaseContext } from '../Firebase'
import'./style.css'

const Logout = () => {

  const firebase = useContext(FirebaseContext)

  const [checked, setChecked] = useState(false);

  console.log(checked);

  useEffect(() => {
    if(checked) {
      console.log("Déconnexion");
      firebase.signoutUser()
      // signoutUser
    }
  }, [checked, firebase])

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input 
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Logout
