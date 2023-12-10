import React, { CSSProperties } from 'react'
import '../css/button.css'
import CircularProgress from '@mui/joy/CircularProgress'

type ButtonProps = {
	onClick: () => void
	text: string
	loading: boolean
	disabled?: boolean
	style?: CSSProperties
}

function Button(props: ButtonProps) {
	const { onClick, text, loading, disabled, style } = props
	return (
		<button
			style={style}
			className='custom-button'
			onClick={onClick}
			disabled={disabled}
		>
			{!loading ? (
				text
			) : (
				<CircularProgress size='sm' color='neutral' variant='soft' />
			)}
		</button>
	)
}

export default Button
