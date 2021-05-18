import React from 'react'

import './style.css'

const Modal = ({showModal, showUpdateModal, children}) => {

    if (showModal) {
      return (
        <div className="modalBackground">
          {children}
        </div>
      )
    } else if (showUpdateModal) {
      return (
        <div className="modalBackground">
          {children}
        </div>
      )
    }
}

export default Modal
