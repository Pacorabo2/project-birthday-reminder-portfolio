import React, {useState, useContext} from 'react'
import  { FirebaseContext } from '../Firebase'
import 'firebase/firestore'

import './style.css'

const Update = (props) => {

  console.log(props);

  const firebase = useContext(FirebaseContext)

  const [firstName, setFirstName] = useState(props.friendData.firstName)
  const [lastName, setLastName] = useState(props.friendData.lastName)
  const [birthDate, setBirthDate] = useState(props.friendData.birthDate)
  const [friendId, setFriendId] = useState(props.friendData.id)
  const [profilePict , setProfilePict] = useState('') // 
  const [fileUrl , setFileUrl] = useState(props.friendData.fileUrl)

  console.log(props.friendData.id)

  const onFileChange = async (e) => {
    const file = e.target.files[0]
    console.log(file);
    const storageRef = firebase.storage.ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    setFileUrl(await fileRef.getDownloadURL())
    alert(`image ${fileUrl} téléchargée avec succés`);
  }

  const updateFriend = () => { 
    // firebase.revealFriend(firstName, lastName, birthDate, fileUrl, friendId)
    firebase.revealFriend({birthdate: birthDate, fileUrl: fileUrl, fisrtName: firstName, lastName: lastName, friendId})
    props.closeModal()
  }
  
  return (
    <div className="form">
        <input 
          type="text"
          placeholder={props.friendData.firstName} // *
          value={firstName}
          onChange={e => setFirstName(e.target.value)}/>
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
          placeholder={props.friendData.fileUrl} // *
          value={profilePict}
          onChange={onFileChange}/>
          <button onClick={updateFriend}>Ajouter</button> 
      </div>
  )
}

export default Update
