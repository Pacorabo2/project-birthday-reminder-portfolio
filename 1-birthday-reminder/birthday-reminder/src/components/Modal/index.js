import React, { useState } from 'react'
import { RiFolderReceivedLine } from 'react-icons/ri'

import './style.css'

const Modal = ({showModal, children}) => {

  return (
    showModal && (
      <div className="modalBackground">
        {children}
      </div>
    )
  )
}

export default Modal
