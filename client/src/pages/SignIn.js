import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import Nav from '../components/Nav'
import {__LoginUser} from '../services/UserService'

function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setError] = useState(false)

    const handleEmail = ({ target }) => {
        setEmail(target.value)
        setError(false)
    }

    const handlePassword = ({ target }) => {
        setPassword(target.value)
        setError(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const loginData = await __LoginUser(email, password)
            console.log(loginData)
            props.toggleAuthenticated(true, loginData.user)
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div>
            <Nav />
            <div className="signin flex-col center">
                <form className="flex-col" onSubmit={handleSubmit}>
                    <TextInput
                        placeholder='Your Email'
                        name='email'
                        type='email'
                        value={email}
                        onChange={handleEmail}
                    />
                    <TextInput
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                    <button onClick={handleSubmit} className="btn waves-effect waves-light" name="action">Sign In
                        <i className="material-icons left">person</i>
                    </button>
                    {formError ? <p>Error While Logging In</p> : <p></p>}
                </form>
            </div>
        </div>
    )
}

export default SignIn