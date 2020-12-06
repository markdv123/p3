import React, { useState, useEffect} from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import CreateMemory from './pages/CreateMemory'
import EditMemory from './pages/EditMemory'
import Profile from './pages/Profile'

function App() {
  
   return (
    <div className='App'>
    </div>
   )
 }
 export default withRouter(App)
 