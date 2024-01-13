import React from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/button'

function ScriptPaymentForm({ clientSecret }: { clientSecret: string }) {
	const stripe = useStripe()
	const elements = useElements()
	const navigate = useNavigate()
	const [isProcessingPayment, setIsProcessingPayment] =
		React.useState<boolean>(false)
	const [message, setMessage] = React.useState<string>('')

	const paymentHandler = async () => {
		if (!stripe || !elements) {
			return
		}

		setIsProcessingPayment(true)

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// redirect to route thankyou
				return_url: `${process.env.REACT_APP_HOST}/payment-status`,
			},
		})

		setIsProcessingPayment(false)

		if (error) {
			// This point will only be reached if there is an immediate error when
			// confirming the payment. Show error to your customer (for example, payment
			// details incomplete)
			setMessage(error.message || '')
		} else {
			// unexpected error occurred
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
			setMessage('unexpected error occurred')
		}
	}
	return (
		<div>
			<PaymentElement />
			<Button
				disabled={isProcessingPayment}
				text='Pay'
				onClick={paymentHandler}
				loading={isProcessingPayment}
				style={{
					marginTop: '20px',
					width: '100%',
				}}
			/>
			{!!message && (
				<h1
					style={{
						color: 'red',
						marginTop: '20px',
						fontSize: '500',
					}}
				>
					{message}
				</h1>
			)}
		</div>
	)
}

export default ScriptPaymentForm
