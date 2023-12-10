import React from 'react'
import AlreadySubscribed from '../alreadySubscribed'
import { useStripe } from '@stripe/react-stripe-js'
import Processing from './processing'
import RequireOtherPayment from './requireOtherPayment'
import ThankYou from './thankYou'
import Other from './other'

enum PaymentStatusEnum {
	Succeed = 'SUCCEED',
	Processing = 'PROCESSING',
	Require_Other_Payment = 'REQUIRE_OTHER_PAYMENT',
	Other = 'OTHER',
}

function PaymentStatus() {
	const stripe = useStripe()
	const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatusEnum>()
	React.useEffect(() => {
		if (!stripe) {
			return
		}
		// Retrieve the "payment_intent_client_secret" query parameter appended to
		// your return_url by Stripe.js
		const clientSecret: any = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		)

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }: any) => {
				switch (paymentIntent.status) {
					case 'succeeded':
						// redirect to success page
						setPaymentStatus(PaymentStatusEnum.Succeed)
						break

					case 'processing':
						setPaymentStatus(PaymentStatusEnum.Processing)
						break

					case 'requires_payment_method':
						// Redirect your user back to your payment page to attempt collecting
						// payment again
						setPaymentStatus(PaymentStatusEnum.Require_Other_Payment)
						break

					default:
						setPaymentStatus(PaymentStatusEnum.Other)
						break
				}
			})
			.catch((e) => {
				throw new Error(`Error while retrieving payment intent: ${e}`)
			})
	}, [stripe])
	if (!paymentStatus) {
		return <Processing />
	}

	if (paymentStatus === PaymentStatusEnum.Require_Other_Payment) {
		return <RequireOtherPayment />
	}

	if (paymentStatus === PaymentStatusEnum.Processing) {
		return <Processing />
	}

	if (paymentStatus === PaymentStatusEnum.Other) {
		return <Other />
	}
	return <ThankYou />
}

export default PaymentStatus
