import React, { Fragment, useState } from 'react'
import Button from '../Button'
import Logout from '../Logout'
import data from '../../data'

import './style.css'

const List = () => {

  const [userSession, setUserSession] = useState(null)

  const prsn = data

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Veuillez patienter</p>
    </Fragment>
  ) : (
    <>
    <Logout/>
    <div className="container">
    <h3>{}</h3>
      {prsn.map((person) => {
        const { id, name, age, image } = person;
        return (
          <article key={id} className='person'>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{age} years</p>
            </div>
            
          </article>
          
        );
      })}
      <Button/>
    </div>
    </>
  )
}

export default List
