import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useContext } from 'react'
import eBook from '../assets/images/eBook.png'
import ScriptPaymentForm from './scriptPaymentForm'
import '../css/scriptCheckout.css'
import { useNavigate, useNavigationType } from 'react-router-dom'
import { paymentIntent } from './payment-util'
import { CheckoutContext } from '../App'
import Skeleton from '@mui/material/Skeleton'

const stripePromise = loadStripe('pk_test_RTBTQxlT61cJ5uS3h6rc7EOC')

function getAmount(amount: number) {
	return amount === 1399 ? 13.99 : 23.99
}

function ScriptCheckout() {
	const [clientSecret, setClientSecret] = React.useState<string>('')
	const { amount } = useContext(CheckoutContext)
	const navigate = useNavigate()
	const navigateType = useNavigationType()

	React.useEffect(() => {
		if (navigateType === 'POP') {
			// if user trying to click back button after payment succeeded
			navigate('/')
		} else {
			if (!stripePromise || !clientSecret) {
				console.log('either stripePromise or clientSecret is null')
			}
		}
	}, [clientSecret, navigate])

	React.useEffect(() => {
		if (amount > 0) {
			try {
				paymentIntent(
					'http://localhost:4001/create-payment-intent',
					amount
				).then((secret) => setClientSecret(secret))
			} catch (e) {
				console.log(e)
			}
		}
	}, [amount])

	return (
		<div className='script-checkout-container'>
			<div className='script-product'>
				<img src={eBook} />
				<p>
					<u>Entry Level Script</u>
				</p>
			</div>
			<div className='checkout-form'>
				<h5 className=''>Checkout</h5>
				<div className='total'>
					<div>Total:</div>
					<div>${getAmount(amount)}</div>
				</div>
				{!clientSecret && (
					<>
						<Skeleton animation='pulse' height={30} />
						<Skeleton animation='wave' height={30} />
						<Skeleton animation='pulse' height={30} />
						<Skeleton animation='wave' height={30} />
						<Skeleton animation='pulse' height={30} />
						<Skeleton animation='wave' height={30} />
					</>
				)}
				{clientSecret && (
					<Elements
						stripe={stripePromise}
						options={{
							clientSecret: clientSecret,
						}}
					>
						<ScriptPaymentForm clientSecret={clientSecret} />
					</Elements>
				)}
			</div>
		</div>
	)
}

export default ScriptCheckout
