// Functional import
import React, { useState } from 'react'
import data from './data'
// Components import
import List from './components/List'

function App() {

  // Define the state with the data
  const [people, setPeople] = useState(data)
  
  return (
    <main>
      <section className="container">
        <h3>{people.lenght} birthday today</h3>
        <List people={people}/>
        <button onClick={() => setPeople([])}>Vider la liste</button>
      </section>
    </main>
    
  );
}

export default App;
