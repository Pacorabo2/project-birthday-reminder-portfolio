import React from 'react'
import Button from '../Button'
import data from '../../data'

import './style.css'

const index = () => {

  const prsn = data
  
  return (
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
  )
}

export default index
