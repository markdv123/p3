import React, { useState, useEffect } from 'react'
import { __UpdatePasword } from '../services/UserService'
import { withRouter } from 'react-router-dom'
import TextInput from '../components/TextInput'
import {Button, Icon} from '@material-ui/core'

function UpdatePassword(props) {
    const [email, updateEmail] = useState('')
    const [oldPassword, updateOld] = useState('')
    const [newPassword, updateNew] = useState('')
    

    useEffect(() => {
        console.log(props)
    }, [])
    const handleOld = ({ target }) => {
        updateOld(target.value)
    }
    const handleNew = ({ target }) => {
        updateNew(target.value)
    }


    const handleEmail = ({ target }) => {
        updateEmail(target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(props.currentUser)
            const update = await __UpdatePasword(props.currentUser.email, oldPassword, newPassword)
            console.log(update)
            props.history.push('/profile')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="signup flex-col center">

            <form className="flex-col" onSubmit={handleSubmit}>
                <TextInput
                    placeholder="Enter Old Password"
                    type="password"
                    name="old password"
                    value={oldPassword}
                    onChange={handleOld}
                />
                <TextInput
                    placeholder="Enter New Password"
                    type="password"
                    name="new password"
                    value={newPassword}
                    onChange={handleNew}
                />
                <br />
                <br />
                <Button onClick={handleSubmit} variant="contained" color="primary" endIcon={<Icon>person</Icon>}>
                    Submit
                </Button>
            </form>
        </div>
    )
}
export default withRouter(UpdatePassword)