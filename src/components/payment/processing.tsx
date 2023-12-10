import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

function Processing() {
	return (
		<div
			style={{
				textAlign: 'center',
			}}
		>
			<h1>We Are Processing Your Order...</h1>
			<h3
				style={{
					color: 'red',
				}}
			>
				Please, Do Not Click Back Button...
			</h3>
			<div style={{ left: '45%', top: '50%', position: 'absolute' }}>
				<CircularProgress color='inherit' size={100} />
			</div>
		</div>
	)
}

export default Processing
