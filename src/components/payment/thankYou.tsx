import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlreadySubscribed from '../shared/alreadySubscribed'
import Button from '../shared/button'
import freshman from '../assets/images/freshman-cover.png'
import experience from '../assets/images/experience-cover.png'
import '../css/thankYou.css'
import { CheckoutContext } from '../App'

function ThankYou() {
	const navigate = useNavigate()
	const [error, setError] = React.useState<string>()
	const { amount } = useContext(CheckoutContext)
	const onDocxDownload = async () => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_EXPRESS_SERVER_URL}/download-docx/entry-level-behavior`
			)
			if (res.ok) {
				res.blob().then((blob) => {
					let url = window.URL.createObjectURL(blob)
					let a = document.createElement('a')
					a.href = url
					a.download = 'entry-level-behavior-script.docx'
					a.click()
				})
			} else {
				throw new Error(res.statusText)
			}
		} catch (e: any) {
			setError(e.message)
		}
	}

	if (!!error) {
		throw new Error(
			`Error while downloading docx file: ${error}. Please, reach out admin`
		)
	}
	return (
		<div className='thank-you-container'>
			<h1>
				Congrats! Your Order Was Successfully Purchased. Please, Click The
				Download Button.
			</h1>
			<div className='download-container'>
				<img
					className='thank-you-image'
					src={amount === 1399 ? freshman : experience}
				/>
				<Button text='DOWNLOAD' loading={false} onClick={onDocxDownload} />
			</div>
			<h1>Now, Time To Crack the Algorigthm Secret Tutorials..</h1>
			<h3>Please, Provide The Email and Token We've Sent Your Email..</h3>
			<div className='thank-you-sign-in'>
				<div className='already-subscribed'>
					<AlreadySubscribed reset={() => navigate('/')} />
				</div>
			</div>
		</div>
	)
}

export default ThankYou
