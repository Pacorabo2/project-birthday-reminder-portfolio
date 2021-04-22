import React from 'react'

import './style.css'

const Landing = () => {
  return (
    <div className="welcomePage">
      <div className="leftBox">
        <a href="/" className="btn-welcome">Inscription</a>
      </div>
      <div className="rightBox">
        <a href="/" className="btn-welcome">Connexion</a>
      </div>
      
    </div>
  )
}

export default Landing
