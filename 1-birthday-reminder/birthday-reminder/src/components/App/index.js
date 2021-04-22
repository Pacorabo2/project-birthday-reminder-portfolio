// Functional import
import React, { useState } from 'react'
import data from '../../data'
// Components import
import List from '../List'
import Cake from '../../../src/assets/cake.png'
import Button from '../Button'

function App() {

  // Define the state with the data
  const [people, setPeople] = useState(data)
  
  return (
    <main>
      <section className="container">
        <h3>{people.lenght} birthday today</h3>
        <List people={people}/>
        <Button/>
        {/* <button onClick={() => setPeople([])}>Vider la liste</button> */}
        {/* <img src={Cake} alt=""/> */}
      </section>
    </main>
    
  );
}

export default App;
