import React, { useState }from 'react'
import'./style.css'

const Logout = () => {

  const [checked, setChecked] = useState(false);

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input 
          type="checkbox"
          checked={checked}
        />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Logout
