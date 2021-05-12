import React from 'react'

import './style.css'

const UploadFriendModal= ({showUpdateModal, children}) => {

  return (
    showUpdateModal && (
      <div className="modalBackground">
        <h2>UploadFriendModal</h2>
        {children}
      </div>
    )
  )
}

export default UploadFriendModal