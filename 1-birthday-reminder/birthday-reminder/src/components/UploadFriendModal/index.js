import React from 'react'

import './style.css'

const UploadFriendModal= ({showUpdateModal, children}) => {

  return (
    showUpdateModal && (
      <div className="modalBackground">
        {children}
      </div>
    )
  )
}

export default UploadFriendModal