import React from 'react'
import PlaylistHeader from './playListHeader'
import PlaylistItems from './playListItems'
import { VideoProps } from '../player/player'

const Playlist = ({
	videos,
	activeVideo,
}: {
	videos: Array<VideoProps>
	activeVideo: VideoProps
}) => (
	<div className='video-play-list-wrapper'>
		<PlaylistHeader active={activeVideo} total={videos.length} />
		<PlaylistItems videos={videos} active={activeVideo} />
	</div>
)

export default Playlist
