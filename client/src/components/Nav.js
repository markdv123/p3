import React from 'react'
import {Link} from 'react-router-dom'

export default ({authenticated, currentUser}) => {
    return authenticated && currentUser ? (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo"><i className="material-icons" style={{"marginLeft": "10px"}}>public</i>Title</Link>
                <ul id='nav-mobile' className="right hide-on-med-and-down">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/" onClick={() => localStorage.clear()}>Signout</Link></li>
                </ul>
            </div>
        </nav>
    ) : (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo"><i className="material-icons" style={{"marginLeft": "10px"}}>public</i>Title</Link>
                <ul id='nav-mobile' className="right hide-on-med-and-down">
                    <li><Link to="/register">Sign Up</Link></li>
                    <li><Link to="/login">Sign In</Link></li>
                </ul>
            </div>
        </nav>
    )
}