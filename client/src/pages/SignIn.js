import React, { useState } from 'react'
import { FormControl, Button, Icon, Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import TextInput from '../components/TextInput'
import Nav from '../components/Nav'
import { __LoginUser } from '../services/UserService'

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
            props.toggleAuthenticated(true, loginData.user)
            props.history.push('/profile')
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div>
            <Nav />
            <Grid container justify="center" style={{margin: '20px'}}>
                <FormControl className="flex-col" onSubmit={handleSubmit}>
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
                    <br />
                    <Button onClick={handleSubmit} variant="contained" color="primary" endIcon={<Icon>person</Icon>}>
                        Sign In
                    </Button>
                    {formError ? <p>Error While Logging In</p> : <p></p>}
                </FormControl>
            </Grid>
        </div>
    )
}

export default withRouter(SignIn)