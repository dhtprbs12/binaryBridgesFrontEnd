import React from 'react'
import Video from './video'
import Playlist from './playList/playList'
import './css/player.css'
import { useParams } from 'react-router'
import Feedback from './feedback'
import useIdleTimeout from './useIdleTimeoutHook'
import LogoutModal from './player/LogoutModal'
import NotAuthorized from './player/notAuthorized'
import { useNavigate } from 'react-router-dom'
import { videosGql } from './query/videos'
import { useQuery } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'

export type VideoProps = {
	id: string
	videoName: string
	fileName: string
	takeaways: string
	duration: string
	sequence: number
}

function Player() {
	const { id: activeVideoId } = useParams()
	const [videosState, setVideosState] = React.useState<VideoProps[]>()
	const [currentVideoState, setCurrentVideoState] = React.useState<VideoProps>()
	const [isAuthorized] = React.useState<boolean>(() => {
		const val = localStorage.getItem('isAuthorized')
		if (val === null) {
			return false
		}
		const parsedVal = JSON.parse(val)
		return parsedVal === 'true'
	})
	const history = useNavigate()
	const [isModalOpen, setIsModalOpen] = React.useState(false)
	const { data, loading, error } = useQuery(videosGql)

	function handleStay() {
		setIsModalOpen(false)
		idleTimer.reset()
	}

	function handleLogout() {
		idleTimer.reset()
		setIsModalOpen(false)
		localStorage.removeItem('isAuthorized')
		history('/')
	}

	function handleIdle() {
		setIsModalOpen(true)
	}

	const { idleTimer } = useIdleTimeout({
		onIdle: handleIdle,
		idleTime: 3600, // 1hr
	})

	React.useEffect(() => {
		if (videosState && isAuthorized) {
			setCurrentVideoState(
				videosState.find(
					(video: { fileName: string | undefined }) =>
						video.fileName === activeVideoId
				)
			)
		}

		if (!videosState && isAuthorized && data) {
			const { videos } = data || {}
			setVideosState(videos as [VideoProps])
			setCurrentVideoState(
				videos.find(
					(video: { fileName: string | undefined }) =>
						video.fileName === activeVideoId
				)
			)
		}
	}, [videosState, isAuthorized, activeVideoId, data])

	if (loading) {
		return (
			<div style={{ left: '45%', top: '50%', position: 'absolute' }}>
				<CircularProgress color='inherit' size={100} />
			</div>
		)
	}

	if (!isAuthorized) {
		return <NotAuthorized />
	}

	if (error) {
		throw new Error(`Error while getting videos: ${error.message}`)
	}

	return (
		<>
			{currentVideoState && videosState ? (
				<div className='player-wrapper'>
					<div className='player-container'>
						<Video videoFileName={currentVideoState.fileName} />
						<Playlist videos={videosState} activeVideo={currentVideoState} />
					</div>
					<Feedback currentVideoState={currentVideoState} />
				</div>
			) : null}
			<LogoutModal
				isModalOpen={isModalOpen}
				handleStay={handleStay}
				handleLogout={handleLogout}
			/>
		</>
	)
}

export default Player
