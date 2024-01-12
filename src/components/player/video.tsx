import React from 'react'
import ReactPlayer from 'react-player'

const Video = ({ videoFileName }: { videoFileName: string }) => (
	<div className='video-wrapper'>
		<ReactPlayer
			width='100%'
			height='100%'
			controls={true}
			url={`${process.env.REACT_APP_EXPRESS_SERVER_URL}/video/${videoFileName}`}
		/>
	</div>
)

export default Video
