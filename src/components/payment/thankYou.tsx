import React from 'react'
import { useNavigate } from 'react-router-dom'
import AlreadySubscribed from '../shared/alreadySubscribed'
import Button from '../shared/button'
import image from '../assets/images/eBook.png'
import '../css/thankYou.css'

function ThankYou() {
	const navigate = useNavigate()
	const [error, setError] = React.useState<string>()
	const onDocxDownload = async () => {
		try {
			const res = await fetch(
				'http://localhost:4001/download-docx/entry-level-behavior'
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
				<img src={image} />
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
