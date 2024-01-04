import React, { useContext } from 'react'
import WarningIcon from '@mui/icons-material/Warning'
import '../css/scriptSuggestion.css'
import image from '../assets/images/eBook.png'
import AlreadySubscribed from '../shared/alreadySubscribed'
import { CheckoutContext, UserContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/button'

function ScriptSuggestion() {
	const navigate = useNavigate()
	const [isNoThanks, setIsNoThanks] = React.useState<boolean>(false)
	const { setAmount } = useContext(CheckoutContext)

	function reset() {
		setIsNoThanks(false)
		navigate('/')
	}
	return (
		<div className='script-suggestion-container'>
			<div className='script-suggestion-header'>
				<div>
					<div className='important'>
						<div style={{ display: 'inline-block', marginRight: '10px' }}>
							<WarningIcon
								color='warning'
								style={{
									width: '70px',
									height: '70px',
								}}
							/>
						</div>
						<h1>
							<b>IMPORTANT:</b>
						</h1>
					</div>
					<div className='warning-content'>
						<h1>Before You Watch The 'Algorithm Secret Blackvideo'...</h1>
						<h3>
							You're only going to see this page <u>once</u> (ever), so please
							read every word very carefully. It's really that important...
						</h3>
					</div>
				</div>
			</div>
			<div className='script-suggestion-body'>
				<div className='script-one'>
					<h1>Just Graduated?</h1>
					<p>Just $13.99</p>
					<img src={image} />
					<Button
						onClick={() => {
							setAmount(1399)
							navigate('/script-checkout')
						}}
						text='Buy "Entry Level" script For Just $13.99'
						loading={false}
						style={{
							height: '90px',
							fontSize: '34px',
						}}
					/>
				</div>
				<div className='script-two'>
					<h1>Experienced?</h1>
					<p>Just $23.99</p>
					<img src={image} />
					<Button
						onClick={() => {
							setAmount(2399)
							navigate('/script-checkout')
						}}
						text='Buy "Experienced Level" script For Just $23.99'
						loading={false}
						style={{
							height: '90px',
							fontSize: '34px',
						}}
					/>
				</div>
			</div>
			<div className='no-thanks'>
				<h1 style={{ margin: '70px' }}>
					<u
						onClick={() => setIsNoThanks(!isNoThanks)}
						style={{ cursor: 'pointer' }}
					>
						No Thanks, I Don't Want These Scripts At This Amazing Price - I'll
						Pass At This Time
					</u>
				</h1>
				{isNoThanks && (
					<div className='already-subscribed-container'>
						<div className='already-subscribed-box'>
							<AlreadySubscribed reset={reset} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ScriptSuggestion
