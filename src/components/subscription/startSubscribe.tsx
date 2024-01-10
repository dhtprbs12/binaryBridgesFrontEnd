import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Button from '../shared/button'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function StartSubscribe({
	onInputChange,
	onSubscribeClick,
	setActiveTab,
	isSubscribed,
	reset,
	loading,
	email,
	noValidEmail,
}: {
	onInputChange: (e: HTMLInputElement) => void
	onSubscribeClick: () => void
	setActiveTab: (val: number) => void
	isSubscribed: boolean
	reset: () => void
	loading: boolean
	email: string
	noValidEmail: boolean
}) {
	const history = useNavigate()
	return (
		<div className='start-subscribe'>
			<Snackbar
				onClose={() => {
					history('/script-offer')
					reset()
				}}
				open={isSubscribed}
				autoHideDuration={3000}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Alert severity='success' sx={{ width: '100%' }}>
					The token successully sent to you email!
				</Alert>
			</Snackbar>
			<div>
				<h1>Free Instant Access!</h1>
				<p>
					<b>
						Enter your best email below and I'll send a token to let you access
						free "The Algorithm Secrets Black Tutorials!"
					</b>
				</p>
				<div className='form-control'>
					<input
						value={email}
						type='text'
						className='input'
						placeholder='Enter e-mail adress...'
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
					<div className='button-container'>
						<Button
							text='Subscribe'
							loading={loading}
							disabled={loading || !email || noValidEmail || isSubscribed}
							onClick={onSubscribeClick}
						/>
					</div>
				</div>
			</div>
			{/* {isSubscribed ? (
				<div>
					<div
						style={{ display: 'inline-block', width: '100px', height: '100px' }}
					>
						<CheckCircleOutlineIcon
							color='success'
							style={{
								width: '100%',
								height: '100%',
							}}
						/>
					</div>
					<h1>Token Sent!</h1>
					<p>
						<b>
							Thanks for subscribing us! We've sent the token to your best
							email. Please, check the email to get the token. Then, click the
							button below.
						</b>
					</p>
					<button
						className='btn'
						onClick={() => {
							setActiveTab(1)
							reset()
						}}
					>
						Enter Token
					</button>
				</div>
			) : (
				<div>
					<h1>Free Instant Access!</h1>
					<p>
						<b>
							Enter your best email below and I'll let you watch advanced
							tutorials of algorithm, the "The Algorithm Secrets Black
							Tutorials!"
						</b>
					</p>
					<div className='form-control'>
						<input
							value={email}
							type='text'
							className='input'
							placeholder='Enter e-mail adress...'
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
						<div className='button-container'>
							<Button
								text='Subscribe'
								loading={loading}
								disabled={loading || !email || noValidEmail}
								onClick={onSubscribeClick}
							/>
						</div>
					</div>
				</div>
			)} */}
		</div>
	)
}

export default StartSubscribe
