// Functional import
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Components import
import ErrorPage from '../ErrorPage'
import Footer from '../Footer'
import ForgetPassword from '../ForgetPassword'
import Header from '../Header'
import Landing from '../Landing'
import List from '../List'
import Login from '../Login'
import Signup from '../Signup'
// Esthetical imports


function App() {
  
  return (
    <Router>
      <Header/>

      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/list" component={List}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/forgetpassword" component={ForgetPassword}/>
        <Route path="*" component={ErrorPage}/>
      </Switch>
      
      <Footer/>
    </Router>
    
  );
}

export default App;
