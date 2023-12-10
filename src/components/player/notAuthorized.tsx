import React from 'react'
import { useNavigate } from 'react-router-dom'
import DangerousIcon from '@mui/icons-material/Dangerous'

function NotAuthorized() {
	const history = useNavigate()
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				fontSize: 'x-large',
				flexDirection: 'column',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '50px',
				}}
			>
				<DangerousIcon
					color='action'
					style={{
						width: '150px',
						height: '150px',
					}}
				/>
			</div>
			<div>
				<h1>
					You are not authorized to watch tutorials. Please, subscribe or sign
					in.
				</h1>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<button
					style={{
						backgroundColor: 'rgb(206, 46, 46)',
						borderRadius: '10px',
						color: 'white',
						outline: 'none',
						border: 0,
						fontWeight: 600,
						cursor: 'pointer',
						transition: 'all 300ms linear',
						width: '300px',
						fontSize: 'x-large',
						height: '42px',
					}}
					onClick={() => history('/')}
				>
					Subscribe
				</button>
			</div>
		</div>
	)
}

export default NotAuthorized
