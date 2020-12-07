import React from 'react';
import Nav from '../components/Nav'
import {Link} from 'react-router-dom'

const Home = (props) => {
   return (
       <div >
            <Nav />
            <div style={{textAlign:"center"}}>
                <h1>Welcome to [title redacted]</h1>
                <p style={{maxWidth:"820px", margin: "0 auto"}}>[title redacted] is a wonderful new app designed to help users visually keep track of precious memories on a global map! In your profile page, a personal, interactive map will appear. Click on it to create a new memory pin. Over time, you can see your map fill up with all of the chosen memories from your life!</p>
                {/* <Link to="/register" style={{margin:"5px"}} className="btn waves-effect waves-light" name="action">Get Started
                    <i className="material-icons left">person_add</i>
                </Link>
                <br />
                <Link to="/login" style={{margin:"5px"}} className="btn waves-effect waves-light" name="action">Sign In
                    <i className="material-icons left">person</i>
                </Link> */}
            </div>
        </div>
   )
}

export default Home