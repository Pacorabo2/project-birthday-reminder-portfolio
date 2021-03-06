import React, { useContext, useState } from 'react'
import  { FirebaseContext } from '../Firebase'
import Button from '../Button'
import Loader from '../Loader'
import 'firebase/firestore'

import Swal from 'sweetalert2'
import './style.css'

const Create = (props) => {

  const firebase = useContext(FirebaseContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [fileUrl , setFileUrl] = useState(null)
  const [loader , setLoader] = useState(false)

  // Get today date
  let today = new Date().toISOString().split('T')[0]


  const createFriend = () => {
    firebase.addFriend(firstName, lastName, birthDate, fileUrl)
    setFirstName('')
    setLastName('')
    setBirthDate('')
    props.closeModal()
    Swal.fire(
      `${firstName} a bien été créé(e)`,
      'success'
      )
  }

  

  const onFileChange = async (e) => {
    setLoader(true)
    const file = e.target.files[0]
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
    Swal.fire(
      'Bravo',
      `image ${file.name} téléchargée avec succés`,
      'success');
    setLoader(false)
  }

  // To show Loader untill fileUrl is not null
  const showLoader = loader ? <Loader loadingMsg={"Chargement de la photo, veuillez patienter..."} /> : ""

  // To show Button only if all inputs are implemented
  const btn = firstName === '' || lastName === '' || fileUrl === null ? 
  (<Button 
    disabled={true}
    type="button" 
    buttonStyle="btn--disabled--outline" 
    buttonSize="btn--medium"
  >
    Ajouter
  </Button>) 
  : (<Button onClick={createFriend}
    type="button" 
    buttonStyle="btn--primary--outline" 
    buttonSize="btn--medium"
  >
    Ajouter
  </Button>
  )

  
  
  return (
    <div className="create">
      <h4>Ajoutez un anniversaire</h4>
      {showLoader}
      <div className="form">
        <div className="inputBox">
          <input 
            type="text"
            required="required"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}/>
          <label htmlFor="firstName">Prénom</label>
        </div>
        <div className="inputBox">
          <input 
            type="text"
            required="required"
            value={lastName}
            onChange={e => setLastName(e.target.value)}/>
          <label htmlFor="lastName">Nom</label>
        </div>
          <input 
            type="date"
            placeholder="Date d'anniversaire"
            required="required"
            value={birthDate}
            max={today}
            onChange={e => setBirthDate(e.target.value)}/>
          <input 
            type="file"
            placeholder="Photo de profil"
            required="required"
            onChange={onFileChange}/>
            {btn}
      </div>
    </div>
  )
}

export default Create
