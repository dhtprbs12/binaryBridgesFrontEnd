import React from 'react'
import StyledPlaylistHeader from '../styles/styledPlaylistHeader'
import StyledJourney from '../styles/styledJourney'
import { VideoProps } from '../player'

const PlaylistHeader = ({
	active,
	total,
}: {
	active: VideoProps
	total: number
}) => {
	return (
		<StyledPlaylistHeader>
			<p>{active.videoName}</p>
			<StyledJourney>
				{active.sequence} / {total}
			</StyledJourney>
		</StyledPlaylistHeader>
	)
}

export default PlaylistHeader
