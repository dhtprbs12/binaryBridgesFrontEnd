import React from 'react'
import Player from './player/player'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GlobalStyle from './styles/globalStyle'
import Navigation from './nav'
import Footer from './footer'
import Body from './body'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createContext } from 'react'
import ScriptSuggestion from './scriptSuggestion/scriptSuggestion'
import ScriptCheckout from './payment/scriptCheckout'
import PaymentStatus from './payment/paymentStatus'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ErrorBoundary } from './shared/errorBoundary'
import VideoUpload from './videoUpload'
import stripeApiKey from './stripeApiKey'
import url from './apolloClientUrl'

const stripePromise = loadStripe(stripeApiKey)

const client = new ApolloClient({
	uri: url,
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
