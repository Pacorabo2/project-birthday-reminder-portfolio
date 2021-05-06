import React, { Fragment, useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import Button from '../Button'
import Logout from '../Logout'
import Create from '../Create'
import data from '../../data'

import './style.css'

const List = props => {


  const firebase = useContext(FirebaseContext)

  const [userSession, setUserSession] = useState(null)

  const [userData, setUserData] = useState({})

  useEffect(() => {

    let listener = firebase.auth.onAuthStateChanged(user => {
       user ? setUserSession(user) : props.history.push('/')
    })
    if(!!userSession) {
      firebase.user(userSession.uid)
      .get()
      .then(doc => {
        if (doc && doc.exists) {
          const myData = doc.data()
          setUserData(myData)
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
    
    return () => {
      listener()
    }
  },[userSession])

  const prsn = data


  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Veuillez patienter</p>
    </Fragment>
  ) : (
    <>
    <Logout userData={userData} />
    <Create />
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
