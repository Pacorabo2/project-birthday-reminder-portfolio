import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../Firebase'
// import "firebase/storage"

import './style.css'

const Create = () => {

  const firebase = useContext(FirebaseContext)

  // const [friend, setFriend] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [profilePict , setProfilePict] = useState([])

  const createFriend = () => {
  firebase.addFriend(firstName, lastName, birthDate, profilePict)
  setFirstName('')
  setLastName('')
  setBirthDate('')
  setProfilePict([])
  }

  const onFileChange = e => {
    // Get file added
    const file = e.target.files[0]
    // pass file to handleFile
    firebase.handleFile(file)
  }

  return (
    <div className="create">
      <h4>Ajouter un nouvel anniversaire</h4>
      <div className="form">
        <input 
          type="text"
          placeholder="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
        <input 
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}/>
        <input 
          type="date"
          placeholder="Date d'anniversaire"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}/>
        <input 
          type="file"
          placeholder="Photo de profil"
          value={profilePict}
          onChange={onFileChange}/>
          <button
           onClick={createFriend}>Ajouter</button>
      </div>
    </div>
  )
}

export default Create
