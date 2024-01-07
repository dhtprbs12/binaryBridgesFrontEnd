import React from 'react'
import './css/contact.css'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import EmailIcon from '@mui/icons-material/Email'
import InstagramIcon from '@mui/icons-material/Instagram'
import { isValidEmail } from './shared/utils'
import { useMutation } from '@apollo/client'
import { createContactGql } from './mutation/createContact'
import Snackbar from '@mui/material/Snackbar'
import { Alert } from '@mui/material'
import Button from './shared/button'

function Contact() {
	const [name, setName] = React.useState<string>('')
	const [email, setEmail] = React.useState<string>('')
	const [message, setMessage] = React.useState('')
	const [noValidEmail, setNoValidEmail] = React.useState<boolean>(false)
	const [isSubmitted, setIsSubmitted] = React.useState(false)
	const [createContact, { loading, error }] = useMutation(createContactGql, {
		onCompleted: () => {
			setIsSubmitted(true)
		},
	})

	React.useEffect(() => {
		window.scrollTo(0, 0)
	})

	function onNameChange(e: HTMLInputElement) {
		setName(e.value)
	}

	function onEmailChange(e: HTMLInputElement) {
		if (e.value.match(isValidEmail)) {
			setNoValidEmail(false)
		} else {
			setNoValidEmail(true)
		}
		setEmail(e.value)
	}

	function hanleOnMessageChange(e: HTMLTextAreaElement) {
		setMessage(e.value)
	}

	function reset() {
		setName('')
		setEmail('')
		setMessage('')
		setNoValidEmail(false)
		setIsSubmitted(false)
	}

	if (!!error) {
		throw new Error(
			`Error while creating contact: ${error.message}. Please, reach out admin`
		)
	}

	return (
		<div>
			<Snackbar
				onClose={reset}
				open={isSubmitted}
				autoHideDuration={3000}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Alert severity='success' sx={{ width: '100%' }}>
					Your message successully sent!
				</Alert>
			</Snackbar>
			<div id='contact'>
				<h1 className='section-header'>Contact</h1>
				<div className='contact-wrapper'>
					<div id='contact-form' className='form-horizontal' role='form'>
						<div className='form-group'>
							<div>
								<input
									type='text'
									className='form-control'
									id='name'
									placeholder='NAME'
									name='name'
									value={name}
									onChange={({ currentTarget }) => onNameChange(currentTarget)}
								/>
								{!name && (
									<h2
										style={{
											marginTop: '10px',
											marginLeft: '20px',
											color: 'red',
											textAlign: 'left',
										}}
									>
										Required
									</h2>
								)}
							</div>
						</div>

						<div className='form-group'>
							<div>
								<input
									type='email'
									className='form-control'
									id='email'
									placeholder='EMAIL'
									name='email'
									value={email}
									onChange={({ currentTarget }) => onEmailChange(currentTarget)}
								/>
								{!email && (
									<h2
										style={{
											marginTop: '10px',
											marginLeft: '20px',
											color: 'red',
											textAlign: 'left',
										}}
									>
										Required
									</h2>
								)}
								{!!email && noValidEmail && (
									<h2
										style={{
											marginTop: '10px',
											marginLeft: '20px',
											color: 'red',
											textAlign: 'left',
										}}
									>
										Provide a valid email
									</h2>
								)}
							</div>
						</div>
						<div className='form-group'>
							<textarea
								className='form-control'
								rows={10}
								placeholder='MESSAGE'
								name='message'
								value={message}
								onChange={({ currentTarget }) =>
									hanleOnMessageChange(currentTarget)
								}
							/>
							{message === '' && (
								<h2
									style={{
										marginTop: '10px',
										marginLeft: '20px',
										color: 'red',
										textAlign: 'left',
									}}
								>
									Required
								</h2>
							)}
						</div>
						<div className='send-button'>
							<Button
								style={{
									marginLeft: '20px',
									width: '400px',
								}}
								text='SEND'
								onClick={async () => {
									await createContact({
										variables: {
											name: name,
											email: email,
											message: message,
										},
									})
								}}
								loading={loading}
								disabled={!email || !name || !message || noValidEmail}
							/>
						</div>
					</div>

					<div className='direct-contact-container'>
						<ul className='contact-list'>
							<li className='list-item'>
								<LocationOnIcon />
								<span className='contact-text place'>
									Los Angeles, California
								</span>
							</li>

							<li className='list-item'>
								<LocalPhoneIcon />
								<span className='contact-text phone'>
									<a href='tel:1-212-555-5555' title='Give me a call'>
										(212) 555-2368
									</a>
								</span>
							</li>

							<li className='list-item'>
								<EmailIcon />
								<span className='contact-text gmail'>
									<a href='mailto:#' title='Send me an email'>
										hitmeup@gmail.com
									</a>
								</span>
							</li>
						</ul>

						<hr />
						<ul className='social-media-list'>
							<li>
								<a href='#' target='_blank' className='contact-icon'>
									<InstagramIcon />
								</a>
							</li>
						</ul>
						<hr />

						<div className='copyright'>&copy; ALL OF THE RIGHTS RESERVED</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contact
