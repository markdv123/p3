import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FormControl, Button, Icon } from '@material-ui/core'
import TextInput from '../components/TextInput'
import { __RegisterUser } from '../services/UserService'
import Nav from '../components/Nav'

function SignUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setError] = useState(false)

    useEffect((props) => {
        console.log(props)
    }, [])
    const handleName = ({ target }) => {
        setName(target.value)
    }

    const handleEmail = ({ target }) => {
        setEmail(target.value)
    }

    const handlePassword = ({ target }) => {
        setPassword(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const register = await __RegisterUser(name, email, password)
            console.log(register)
            props.toggleAuthenticated(true, register.user)
            props.history.push('/')    
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div>
            <Nav />
            <FormControl className="flex-col" onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Your Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                />
                <TextInput
                    placeholder="Your Email"
                    name="email"
                    value={email}
                    type="email"
                    onChange={handleEmail}
                />

                <TextInput
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                />
                <br/>
                <Button onClick={handleSubmit} variant="contained" color="primary" endIcon={<Icon>person_add</Icon>}>
                    Sign Up
                </Button>
                    {formError ? <p>Account Error</p> : <p></p>}

            </FormControl>
        </div>
    )
}

export default withRouter(SignUp)