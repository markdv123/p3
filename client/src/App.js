import React, { useState, useEffect} from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import UpdateName from './pages/UpdateName'
import UpdatePassword from './pages/UpdatePassword'
import {__CheckSession} from './services/UserService'

function App(props) {
  const [pageLoading, updatePageLoading] = useState(true)
  const [authenticated, updateAuthenticated] = useState(false)
  const [currentUser, updateUser] = useState(null)

  useEffect(()=> {
    updatePageLoading(false)
    verifyTokenValid()
  }, [])

  const toggleAuthenticated = (value, user) => {
    updateAuthenticated(value)
    updateUser(user)
  }

  const verifyTokenValid = async () => {
    const token = localStorage.getItem('token')
    if(token) {
      try {
        const session = await __CheckSession()
        console.log('session', session)
        updateUser(session.user)
        updateAuthenticated(true)
        props.history.push(window.location.pathname)
        //^^this might not be necessary and also might cause problems
        //should test it when we test login and such
      } catch (error) {
        updateUser(null)
        updateAuthenticated(false)
        localStorage.clear()
      }
    }
  }

   return (
    <div className='App'>
      {pageLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Switch>
          <Route 
            exact path="/"
            component={()=> (
              <Home 
                currentUser={currentUser}
                authenticated={authenticated}/>
            )}
          />
          <Route
            path="/updatename"
            component={(props)=> (
              <UpdateName 
                toggleAuthenticated={toggleAuthenticated}
                currentUser={currentUser}
                authenticated={authenticated}/>
            )}
          />
          <Route
            path="/updatepassword"
            component={(props)=> (
              <UpdatePassword 
                toggleAuthenticated={toggleAuthenticated}
                currentUser={currentUser}
                authenticated={authenticated}/>
            )}
          />
          <Route
            path="/register"
            component={(props)=> (
              <SignUp 
                {...props}
                toggleAuthenticated={toggleAuthenticated}
                currentUser={currentUser}
                authenticated={authenticated}/>
            )}
          />
          <Route
            path="/login"
            component={()=> (
              <SignIn 
                toggleAuthenticated={toggleAuthenticated}
                currentUser={currentUser}
                authenticated={authenticated}/>
            )}
          />
          <ProtectedRoute
            authenticated={authenticated}
            path="/profile"
            component={()=> (
              <Profile 
                toggleAuthenticated={toggleAuthenticated}
                currentUser={currentUser}
                authenticated={authenticated}/>
            )}
          />
        </Switch>
      )}
    </div>
   )
 }
 export default withRouter(App)
 