import React, { useState } from 'react'

import './style.css'

const Modal = ({showModal, children}) => {

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
