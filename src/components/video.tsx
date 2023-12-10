import React from 'react'
import ReactPlayer from 'react-player'

const Video = ({ videoFileName }: { videoFileName: string }) => (
	<div className='video-wrapper'>
		<ReactPlayer
			width='100%'
			height='100%'
			controls={true}
			url={`http://localhost:4001/video/${videoFileName}`}
		/>
	</div>
)

export default Video
