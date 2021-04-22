// Functional import
import React from 'react'
// Components import
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
// Esthetical imports


function App() {
  
  return (
    <main>
      <section className="head-section">
        <Header/>
        <Landing/>
        <Footer/>
      </section>
    </main>
    
  );
}

export default App;
