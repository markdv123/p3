import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { FormControl, Button, Icon, Grid } from '@material-ui/core'
import TextInput from '../components/TextInput'
import { __RegisterUser } from '../services/UserService'
import Nav from '../components/Nav'

function SignUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)
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

    const handleConfirmPassword = ( { target} ) => {
       setConfirmPassword(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ( password !== confirmPassword ) {
           setPasswordsMatch(false)
           return
        }
        setPasswordsMatch(true)
        try {
            const register = await __RegisterUser(name, email, password)
            console.log(register)
            props.toggleAuthenticated(true, register.user)
            props.history.push('/profile')    
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div>
            <Nav />
            <Grid container justify="center" style={{ margin: '20px' }}>
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
                    <TextInput
                        placeholder="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                    />
                    <br />
                    { passwordsMatch ? <p></p> : <p>Passwords must match</p> }
                    <Button onClick={handleSubmit} variant="contained" color="primary" endIcon={<Icon>person_add</Icon>}>
                        Sign Up
                </Button>

                    {formError ? <p>Account Error</p> : <p></p>}
                </FormControl>
            </Grid>
        </div>
    )
}

export default withRouter(SignUp)