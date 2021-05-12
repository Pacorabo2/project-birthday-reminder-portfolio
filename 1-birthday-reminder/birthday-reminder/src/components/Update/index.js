import React, {useState} from 'react'

import './style.css'

const Update = (props) => {
  

  const [firstName, setFirstName] = useState(props.friendData.firstName)
  const [lastName, setLastName] = useState(props.friendData.lastName)
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate)
  const [profilePict , setProfilePict] = useState('')
  const [fileUrl , setFileUrl] = useState('')


  const firstNameChange = (e) => {
    setFirstName('')
    setFirstName(e.target.value)
  }

  const lastNameChange = (e) => {
    setLastName('')
    setLastName(e.target.value)
  }

  const birthDateChange = e => {
    setBirthDate(null)
    setBirthDate(e.target.value)
  }

  const profilePictChange = e => {
    setProfilePict('')
    setProfilePict(e.target.value)
  }
  
  return (
    <div className="form">
        <input 
          type="text"
          placeholder={props.friendData.firstName} // *
          value={firstName}
          onChange={firstNameChange}/>
        <input 
          type="text"
          placeholder={props.friendData.lastName} // *
          value={lastName}
          onChange={e => setLastName(e.target.value)}/>
        <input 
          type="date"
          placeholder={props.friendData.birthDate} // *
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}/>
        <input 
          type="file"
          placeholder="Photo de profil" // *
          value={profilePict}
          onChange={setProfilePict}/>
          <button
           onClick="#">Ajouter</button> 
      </div>
  )
}

export default Update
