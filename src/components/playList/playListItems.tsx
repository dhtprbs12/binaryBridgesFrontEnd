import React from 'react'
import PlaylistItem from './playListItem'
import StyledPlaylistitems from '../styles/styledPlayListItems'
import { VideoProps } from '../player'

const Playlistitems = ({
	videos,
	active,
}: {
	videos: Array<VideoProps>
	active: VideoProps
}) => (
	<StyledPlaylistitems>
		{videos.map((video) => (
			<PlaylistItem
				key={video.id}
				video={video}
				active={video.id === active.id}
				played={false}
			/>
		))}
	</StyledPlaylistitems>
)

export default Playlistitems
