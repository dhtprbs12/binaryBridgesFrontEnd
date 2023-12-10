import React from 'react'
import CustomModal from './customModal'

type Props = {
	children: React.ReactNode
}

type State = {
	hasError: boolean
	error: string
}

export class ErrorBoundary extends React.Component<Props, State> {
	state = {
		hasError: false,
		error: '',
	}

	static getDerivedStateFromError = () => {
		return { hasError: true }
	}

	componentDidCatch = (error: any) => {
		this.setState({ error })
	}

	handleClose = () => {
		return { hasError: false }
	}

	render() {
		const { hasError, error } = this.state
		const { children } = this.props

		return (
			<>
				<CustomModal
					isOpen={hasError}
					message={error.toString()}
					handleClose={() => {
						this.setState({ hasError: false, error: '' })
					}}
				/>
				{children}
			</>
		)
	}
}
