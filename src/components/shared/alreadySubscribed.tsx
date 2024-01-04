import React, { useContext } from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import '../css/alreadySubscribed.css'
import { verificationGql } from '../query/verfication'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { useLazyQuery } from '@apollo/client'
import Button from './button'
import { isValidEmail } from './utils'

function AlreadySubscribed({
	setActiveTab,
	reset,
}: {
	setActiveTab?: (val: number) => void
	reset: () => void
}) {
	const history = useNavigate()
	const [noValidEmail, setNoValidEmail] = React.useState<boolean>(false)
	const [email, setEmail] = React.useState<string>('')
	const [token, setToken] = React.useState<string>('')
	const { setUserEmail, setUserToken } = useContext(UserContext)
	const [isVerified, setIsVerified] = React.useState<boolean>()
	const [verfication, { loading, error }] = useLazyQuery(verificationGql, {
		onCompleted: (data) => {
			if (data.verification.res === 'existed') {
				localStorage.setItem('isAuthorized', JSON.stringify('true'))
				setIsVerified(true)
				onAccessClick()
			} else {
				localStorage.setItem('isAuthorized', JSON.stringify('false'))
				setIsVerified(false)
			}
		},
	})

	function onInputChange(e: HTMLInputElement) {
		if (e.value.match(isValidEmail)) {
			setNoValidEmail(false)
		} else {
			setNoValidEmail(true)
		}
		setEmail(e.value)
	}

	function onAccessClick() {
		history('/tutorials/2-sum')
		setUserEmail(email || '')
		setUserToken(token || '')
	}

	if (loading) {
		return (
			<div style={{ left: '45%', top: '50%', position: 'absolute' }}>
				<CircularProgress color='inherit' size={100} />
			</div>
		)
	}

	if (error) {
		throw new Error(`Error while verifing user: ${error.message}`)
	}

	return (
		<div className='already-subscribed'>
			{isVerified === false ? (
				<div>
					<div style={{ width: '100px', height: '100px', margin: '0 auto' }}>
						<ErrorOutlineIcon
							color='action'
							style={{
								width: '100%',
								height: '100%',
							}}
						/>
					</div>
					<h1>Ooops!</h1>
					<p>
						<b>
							We are sorry. We can't find an account associated with the
							provided email and token. Please, subscribe if you have not.
						</b>
						<button
							style={{
								marginTop: '30px',
							}}
							className='btn'
							onClick={() => {
								setActiveTab?.(0)
								reset()
							}}
						>
							Subscribe
						</button>
					</p>
				</div>
			) : (
				<div className='free-instant-box'>
					<h1>Free Instant Access!</h1>
					<p>
						<b>
							Provide your email and enter the token we've sent. Have a fun!
						</b>
					</p>
					<div className='email-input-container'>
						<input
							type='text'
							className='input'
							placeholder='Enter the email...'
							onChange={({ currentTarget }) => onInputChange(currentTarget)}
						/>
						{!!email && noValidEmail && (
							<h2
								style={{
									marginTop: '10px',
									color: 'red',
									textAlign: 'left',
								}}
							>
								Provide a valid email
							</h2>
						)}
					</div>
					<div className='token-input-container'>
						<input
							type='text'
							className='token-input'
							placeholder='Enter the token here...'
							onChange={({ currentTarget }) => setToken(currentTarget.value)}
						/>
					</div>
					<div className='button-container'>
						<Button
							text='Access'
							loading={loading}
							disabled={!email || !token}
							onClick={() => {
								if (!!email && !!token) {
									verfication({
										variables: {
											email: email,
											token: token,
										},
									})
								}
							}}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default AlreadySubscribed
