import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom'
import { useUpdateUser } from '../../UserContext';
import Button from 'react-bootstrap/Button'
import './SignUp.css'



function SignUp(props) {

	const [UserDetails, setUserDetails] = useState({});

	const history = useHistory()
	const updateUser = useUpdateUser()

	const updateDetails = React.useCallback((column, value) => {
		const newDetails = {
			...UserDetails,
			[column]: value
		}
		setUserDetails(newDetails);
	}, [UserDetails])


	const SignUserUp = React.useCallback(async (e) => {
		e.preventDefault()
		try {
			const { data: user } = await axios.post(`/user/signUp`, UserDetails)
			swal({
				text: "Welcome! Acount added successfuly!",
				icon: "success",
				button: "ok",
			});

			if (user.name) {
				updateUser(user)
				history.push('/')
			}
		} catch (error) {
			console.log(error.response)
			swal({
				text: error.response.data,
				icon: "error",
				button: "ok",
			});
		}

	}, [UserDetails])

	return (
		<>
			<form id='SignUpFrom' onSubmit={(e) => SignUserUp(e)}>
				<div className='SignFirstNameRow'>
					<label className='SignFirstNametLabel' htmlFor='SignFirstNameInput'>First Name:</label>
					<input onChange={(e) => updateDetails('firstName', e.target.value)} type='text' className='SignFirstNameInput' required placeholder='First Name'></input>
				</div>
				<div className='SignLastNameRow'>
					<label className='SignLastNameLabel' htmlFor='SignLastNameInput'>Last Name:</label>
					<input onChange={(e) => updateDetails('lastName', e.target.value)} type='text' className='SignLastNameInput' required placeholder='Last Name'></input>
				</div>
				<div className='SignEmailRow'>
					<label className='SignEmailLabel' htmlFor='SignEmailInput'>Email:</label>
					<input onChange={(e) => updateDetails('email', e.target.value)} type='email' className='SignEmailInput' required placeholder='Email'></input>
				</div>
				<div className='SignPasswordRow'>
					<label className='SignPasswordLabel' htmlFor='SignPasswordInput'>Password:</label>
					<input onChange={(e) => updateDetails('password', e.target.value)} type='password' className='SignPasswordInput' required placeholder='Password'></input>
				</div>
				<div className='SignRepeatPasswordRow'>
					<label className='SignRepeatPasswordLabel' htmlFor='SignRepeatPasswordInput'>Repeat Password:</label>
					<input onChange={(e) => updateDetails('repeatPassword', e.target.value)} type='password' className='SignRepeatPasswordInput' required placeholder='Repeat Password'></input>
				</div>
				<div className='SignBirthDateRow'>
					<label className='SignBirthDateLabel' htmlFor='SignBirthDateInput'>Birth Date:</label>
					<input onChange={(e) => updateDetails('birthDate', e.target.value)} type='date' className='SignBirthDateInput' required ></input>
				</div>
				<Button type='submit' variant='success' className='SignSubmitButton'>Sign Up!</Button>
			</form>
		</>
	);
}

export default SignUp