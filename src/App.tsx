import React from 'react'
import Player from './components/player'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from './components/styles/globalStyle'
import Subscription from './components/subscription'
import Navigation from './components/nav'
import Footer from './components/footer'
import Body from './components/body'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createContext } from 'react'
import ScriptSuggestion from './components/scriptSuggestion/scriptSuggestion'
import ScriptCheckout from './components/payment/scriptCheckout'
import PaymentStatus from './components/payment/paymentStatus'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ErrorBoundary } from './components/shared/errorBoundary'
import VideoUpload from './components/videoUpload'

const stripePromise = loadStripe('pk_test_RTBTQxlT61cJ5uS3h6rc7EOC')

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
})

export const UserContext = createContext({
	userEmail: '',
	setUserEmail: (e: string) => {},
	userToken: '',
	setUserToken: (e: string) => {},
})

export const CheckoutContext = createContext({
	amount: 0,
	setAmount: (e: number) => {},
})

const App = () => {
	const [userEmail, setUserEmail] = React.useState('')
	const [userToken, setUserToken] = React.useState('')
	const [amount, setAmount] = React.useState(0)
	const userContextValue = {
		userEmail,
		setUserEmail,
		userToken,
		setUserToken,
	}
	const checkoutContextValue = {
		amount,
		setAmount,
	}
	return (
		<ErrorBoundary>
			<ApolloProvider client={client}>
				<BrowserRouter>
					<div
						className=''
						style={{
							width: '1170px',
							maxWidth: '100%',
							marginRight: 'auto',
							marginLeft: 'auto',
						}}
					>
						<UserContext.Provider value={userContextValue}>
							<CheckoutContext.Provider value={checkoutContextValue}>
								<Navigation />
								<Routes>
									<Route path='/' element={<Body />} />
									<Route path='/tutorials/:id' element={<Player />} />
									<Route path='/script-offer' element={<ScriptSuggestion />} />
									<Route path='/script-checkout' element={<ScriptCheckout />} />
									<Route path='/video-upload' element={<VideoUpload />} />
									<Route
										path='/payment-status'
										element={
											<Elements stripe={stripePromise}>
												<PaymentStatus />
											</Elements>
										}
									/>
								</Routes>
								<GlobalStyle />
								<Footer />
							</CheckoutContext.Provider>
						</UserContext.Provider>
					</div>
				</BrowserRouter>
			</ApolloProvider>
		</ErrorBoundary>
	)
}

export default App
