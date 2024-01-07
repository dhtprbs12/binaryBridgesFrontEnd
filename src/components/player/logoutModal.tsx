import React from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import '../css/logoutModal.css'
import CircularProgress, {
	CircularProgressProps,
} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function LogoutModal({
	isModalOpen,
	handleStay,
	handleLogout,
}: {
	isModalOpen: boolean
	handleStay: () => void
	handleLogout: () => void
}) {
	const [progress, setProgress] = React.useState(25)

	React.useEffect(() => {
		if (isModalOpen) {
			const timer = setInterval(() => {
				setProgress((prevProgress) => prevProgress - 1)
			}, 1000)
			return () => {
				clearInterval(timer)
			}
		}
	}, [isModalOpen])

	if (progress <= 0) {
		setProgress(25)
		handleLogout()
	}

	return (
		<Modal
			open={isModalOpen}
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<div className='logout-modal'>
				<h1>
					Your session is about to expire. You'll be automatically signed out
					in...
				</h1>
				<CircularProgressWithLabel progress={progress} />
				<p>Do you want to stay signed in?</p>
				<div className='button-group'>
					<Button
						onClick={() => {
							setProgress(25)
							handleStay()
						}}
					>
						Stay
					</Button>
					<Button
						onClick={() => {
							setProgress(25)
							handleLogout()
						}}
					>
						Sign out
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default LogoutModal

function CircularProgressWithLabel(
	props: CircularProgressProps & { progress: number }
) {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<CircularProgress
				variant='determinate'
				value={(25 - props.progress) * 4}
				{...props}
				style={{ width: '70px', height: '70px' }}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant='h1'
					component='div'
					color='text.secondary'
					style={{
						fontSize: '24px',
						fontWeight: '600',
					}}
				>
					{props.progress}
				</Typography>
			</Box>
		</Box>
	)
}
