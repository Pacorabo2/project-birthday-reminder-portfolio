import React from 'react'

import './style.css'

const UploadFriendModal= ({showModal, children}) => {

  return (
    showModal && (
      <div className="modalBackground">
        {children}
      </div>
    )
  )
}

export default UploadFriendModal