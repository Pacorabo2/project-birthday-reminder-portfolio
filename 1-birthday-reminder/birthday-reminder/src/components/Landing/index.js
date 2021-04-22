import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Landing = () => {
  return (
    <div className="welcomePage">
      <div className="leftBox">
        <Link to="/signup" className="btn-welcome">Inscription</Link>
      </div>
      <div className="rightBox">
        <Link to="/login" className="btn-welcome">Connexion</Link>
      </div>
      
    </div>
  )
}

export default Landing
