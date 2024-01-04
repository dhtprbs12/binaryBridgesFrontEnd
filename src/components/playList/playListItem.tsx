import React from 'react'
import StyledPlaylistItem from '../styles/styledPlayListItem'
import { Link } from 'react-router-dom'
import { VideoProps } from '../player/player'

const PlaylistItem = ({
	video,
	active,
	played,
}: {
	video: VideoProps
	active?: boolean
	played?: boolean
}) => (
	<StyledPlaylistItem $active={active} $played={played}>
		<div className='wbn-player__video-nr'>{video.sequence}</div>
		<div className='wbn-player__video-name'>
			<Link to={{ pathname: `/tutorials/${video.id}` }}>{video.fileName}</Link>
		</div>
		<div className='wbn-player__video-time'>{video.duration}</div>
	</StyledPlaylistItem>
)

export default PlaylistItem
