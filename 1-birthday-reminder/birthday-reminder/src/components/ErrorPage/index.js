import React from 'react'

import Oups from '../../assets/404.png'
import './style.css'

const ErrorPage = () => {
  return (
    <div className="error">
      <img src={Oups} alt=""/>
    </div>
  )
}

export default ErrorPage
