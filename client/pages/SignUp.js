import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextInput from '../components/TextInput'
import { __RegisterUser } from '../services/UserServices'
import Nav from '../components/Nav'

function SignUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        console.log(props)
    }, [])
    const handleName = ({ target }) => {
        setName(target.value)
    }

    const handleEmail = ({ target }) => {
        handleEmail(target.value)
    }

    const handlePassword = ({ target }) => {
        handlePassword(target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const register = await __RegisterUser(name, email, password)
            console.log(register)
            props.history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Nav />
            <div className="signup flex-col center">

                <form className="flex-col" onSubmit={handleSubmit}>
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
                </form>
            </div>
        </div>
    )
}