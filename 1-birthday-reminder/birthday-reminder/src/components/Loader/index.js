import React, { Fragment } from 'react'

import './style.css'

const Loader = ({loadingMsg}) => {
  return (
    <Fragment>
      <div className="loader"></div>
      <div className="loaderText">
        <p>{loadingMsg}</p>
      </div>
    </Fragment>
  )
}

export default Loader
