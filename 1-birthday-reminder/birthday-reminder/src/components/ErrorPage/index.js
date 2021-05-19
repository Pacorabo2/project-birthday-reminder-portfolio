import React from 'react'

import Oups from '../../assets/404.png'
import './style.css'

const ErrorPage = () => {
  return (
    <div className="error">
      <img src={Oups} alt=""/>
      <p><a href="/">Revenir sur la page d'accueil</a></p>
    </div>
  )
}

export default ErrorPage
