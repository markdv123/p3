import React, { useState, useEffect } from 'react'
import { __UpdateName } from '../services/UserService'
import { withRouter } from 'react-router-dom'
import TextInput from '../components/TextInput'
import {Button, Icon} from '@material-ui/core'

function UpdateName(props) {
    const [name, updateName] = useState('')
    const [email, updateEmail] = useState('')
    

    useEffect(() => {
        console.log(props)
    }, [])
    const handleName = ({ target }) => {
        updateName(target.value)
    }

    const handleEmail = ({ target }) => {
        updateEmail(target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(props.currentUser)
            const update = await __UpdateName(props.currentUser.email, name)
            props.history.push('/profile')
            console.log(name)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="signup flex-col center">

            <form className="flex-col" onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Update Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                />

                <br />
                <Button onClick={handleSubmit}  variant="contained" color="primary" endIcon={<Icon>person</Icon>}>
                    Submit
                </Button>
            </form>
        </div>
    )
}
export default withRouter(UpdateName)