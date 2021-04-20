// Functional import
import React, { useState } from 'react'
// Data import
import data from './data'
// Component import
import List from './List'
// Esthetical import
import './App.css'

function App() {

  // Definig state with people data file
  const [people, setPeople] = useState(data)
  return <main>
    <section className="container">
      <h3>{people.length} Anniversaire(s) aujourd'hui</h3>
      <List people={people}/>
      <button onClick={()=> setPeople([])}>Valider</button>
    </section>
  </main>
  
}

export default App;
