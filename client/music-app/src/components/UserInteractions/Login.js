import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { useUpdateUser } from '../../UserContext';


function LogIn() {

    const [LogInDetails, setLogInDetails] = useState({})

    const history = useHistory()
    const updateUser = useUpdateUser()

    const updateDetails = React.useCallback((column, value) => {
        setLogInDetails({
            ...LogInDetails,
            [column]: value
        })
    }, [LogInDetails])


    const LogUserIn = React.useCallback(async (e) => {
        e.preventDefault()
        try {
            const { data: user } = await axios.post(`/user/login`, LogInDetails);
            if (user.name) {
                updateUser(user)
            }
            history.push('/')
        } catch (error) {
            console.log(error.response)
            swal({
                text: error.response,
                icon: "error",
                button: "ok",
            });
        }
    })

    return (
        <>
            <h2 className='LogInTitle'>Log In:</h2>
            <form id='logInForm' onSubmit={(e) => LogUserIn(e)}>
                <div className='LogInEmailRow'>
                    <label className='LogInEmailLabel' htmlFor='LogInEmailInput'>Email:</label>
                    <input onChange={(e) => updateDetails('email', e.target.value)} type='email' className='LogInEmailInput' required placeholder='Email'></input>
                </div>

                <div className='LogInPasswordRow'>
                    <label className='LogInPasswordLabel' htmlFor='LogInPasswordInput'>Password:</label>
                    <input onChange={(e) => updateDetails('password', e.target.value)} type='text' className='LogInPasswordInput' required placeholder='Password'></input>
                </div>

                <div>
                    <button type='submit' className='LogInSubmitButton'>LogIn!</button>
                </div>
            </form>
        </>
    );
}

export default LogIn