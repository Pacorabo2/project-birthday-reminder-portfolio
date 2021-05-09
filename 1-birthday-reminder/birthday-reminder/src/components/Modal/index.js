import React, { useState } from 'react'
import Button from '../Button'

import './style.css'

const Modal = ({showModal, setShowModal, children}) => {

  const [closeModal, setCloseModal] = useState(false)

  const hideModal = e => {
    console.log('hide');
    setCloseModal(!closeModal)
    console.log(closeModal);
  }

  return (
    showModal && (
      <div className="modalBackground">
        {children}
      </div>
    )
  )
}

export default Modal
