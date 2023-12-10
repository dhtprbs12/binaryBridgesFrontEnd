import { Typography, Box, Modal } from '@mui/material'
import Button from './button'

type Props = {
	isOpen: boolean
	message: string
	handleClose: () => void
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

export default function CustomModal(props: Props) {
	const { isOpen, message, handleClose } = props

	return (
		<div>
			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
				style={{
					textAlign: 'center',
				}}
			>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
						color='red'
					>
						CAUTION
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						{message}
					</Typography>
					<Button
						text='CLOSE'
						onClick={handleClose}
						loading={false}
						style={{
							marginTop: '15px',
						}}
					/>
				</Box>
			</Modal>
		</div>
	)
}
