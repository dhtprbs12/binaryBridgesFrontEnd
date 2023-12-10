import React from 'react'
import { useNavigate } from 'react-router-dom'

function RequireOtherPayment() {
	const navigate = useNavigate()
	return (
		<div
			style={{
				textAlign: 'center',
				fontSize: '20px',
			}}
		>
			<h1
				style={{
					color: 'red',
				}}
			>
				Sorry, We Couldn't Process The Order...
			</h1>
			<h3>
				Your Card Is <u>Invalid</u>. Please, Use Other Payments...
			</h3>
			<div>
				<button
					style={{
						width: '225px',
						backgroundColor: 'rgb(206, 46, 46)',
						border: 0,
						borderRadius: '10px',
						color: 'white',
						fontSize: '14px',
						fontWeight: 'bold',
						height: '42px',
						margin: '0 auto',
						cursor: 'pointer',
					}}
					onClick={() => navigate('/')}
				>
					Try Other Card
				</button>
			</div>
		</div>
	)
}

export default RequireOtherPayment
