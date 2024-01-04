import React, { useContext } from 'react'
import image from '../assets/images/eBook.png'
import rightArrow from '../assets/images/fast-forward.gif'
import '../css/subscription.css'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { startSubscribeGql } from '../mutation/startSubscribe'

import StartSubscribe from './startSubscribe'
import AlreadySubscribed from '../shared/alreadySubscribed'
import { isValidEmail } from '../shared/utils'

function Subscription() {
	const history = useNavigate()
	const [email, setEmail] = React.useState<string>('')
	const [noValidEmail, setNoValidEmail] = React.useState<boolean>(false)
	const [activeTab, setActiveTab] = React.useState<number>(0)
	const [isSubscribed, setIsSubscribed] = React.useState(false)

	const [startSubscribe, { error: mutationError, loading: mutationLoading }] =
		useMutation(startSubscribeGql, {
			onCompleted: (res) => {
				if (res.startSubscribe.success) {
					setIsSubscribed(true)
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

	async function onSubscribeClick() {
		history('/script-offer')
		await startSubscribe({
			variables: {
				email: email?.trim(),
			},
		})
	}

	function reset() {
		setIsSubscribed(false)
	}

	if (mutationError) {
		throw new Error(`Error while subscribng: ${mutationError.message}`)
	}
	return (
		<div className='subscription-container'>
			<div className='subscription-body'>
				<div className='subscription-body-image'>
					<img src={image} alt='eBook.png' />
				</div>
				<div className='subscription-body-next'>
					<img src={rightArrow} alt='rightArrow' height={300} />
				</div>
				<div className='subscription-body-form'>
					<div className='box'>
						<div className='form-header fc'>
							<ul className='tab-group'>
								<li
									className={`tab ${
										activeTab === 0 ? 'active' : ''
									} start-subscribe-text`}
								>
									<a onClick={() => setActiveTab(0)}>Start Subscribe</a>
								</li>
								<li className={`tab ${activeTab === 1 ? 'active' : ''}`}>
									<a onClick={() => setActiveTab(1)}>Already Subscribed?</a>
								</li>
							</ul>
						</div>
						{activeTab === 0 ? (
							<StartSubscribe
								onInputChange={onInputChange}
								onSubscribeClick={onSubscribeClick}
								setActiveTab={setActiveTab}
								isSubscribed={isSubscribed}
								loading={mutationLoading}
								reset={reset}
								email={email}
								noValidEmail={noValidEmail}
							/>
						) : (
							<AlreadySubscribed setActiveTab={setActiveTab} reset={reset} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Subscription
