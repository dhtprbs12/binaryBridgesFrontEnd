import React, { useContext } from 'react'
import { VideoProps } from './player'
import { useMutation } from '@apollo/client'
import { createFeedbackGql } from './mutation/createFeedback'
import CheckIcon from '@mui/icons-material/Check'
import GradeIcon from '@mui/icons-material/Grade'
import { UserContext } from '../App'
import Button from './shared/button'

function Feedback({ currentVideoState }: { currentVideoState: VideoProps }) {
	const [feedbackScore, setFeedbackScore] = React.useState('0')
	const [comment, setComment] = React.useState('')
	const [isSubmitted, setIsSubmitted] = React.useState(false)
	const [createFeedback, { loading, error }] = useMutation(createFeedbackGql, {
		onCompleted: () => {
			setIsSubmitted(true)
		},
	})
	const { userEmail } = useContext(UserContext)
	const takeaways = currentVideoState.takeaways.split(', ')
	function hanleOnRatingButtonClick(e: HTMLButtonElement) {
		setFeedbackScore(e.innerHTML)
	}

	async function hanleOnSubmitButtonClick() {
		if (feedbackScore !== '0' && !!comment) {
			await createFeedback({
				variables: {
					email: userEmail,
					videoId: currentVideoState.id,
					rating: feedbackScore,
					comment: comment,
				},
			})
		}
	}

	function hanleOnCommentChange(e: HTMLTextAreaElement) {
		setComment(e.value)
	}

	function reset() {
		setIsSubmitted(false)
		setFeedbackScore('0')
		setComment('')
	}

	if (!!error) {
		throw new Error(
			`Error while creating feedback: ${error.message}. Please, reach out admin`
		)
	}
	return (
		<div className='player-box-wrapper'>
			<div className='player-box-container'>
				<div className='player-box-title'>
					<h1 className='player-box-main-title'>
						{`Key takeaways for ${currentVideoState.videoName}`}
					</h1>
				</div>
				<div className='player-box-key-takeways'>
					<ul>
						{takeaways &&
							takeaways.map((takeway) => (
								<li key={takeway}>
									<i></i>
									<b>{takeway}</b>
									<br />
								</li>
							))}
					</ul>
				</div>
			</div>
			<div className='rating-card'>
				<div
					className='rating-card__front'
					style={{ display: isSubmitted ? 'none' : 'flex' }}
				>
					<div className='rating-card__img'>
						<GradeIcon
							color='warning'
							style={{
								width: '70px',
								height: '70px',
							}}
						/>
					</div>
					<div className='rating-card__content'>
						<h2>How did we do?</h2>
						<p>
							Please let us know how we did with this video. All feedback is
							appreciated to help us improve our offering!
						</p>
					</div>
					<div className='rating-card__ratings'>
						<button
							className={feedbackScore === '1' ? 'active' : ''}
							onClick={({ currentTarget }) => {
								hanleOnRatingButtonClick(currentTarget)
							}}
						>
							1
						</button>
						<button
							className={feedbackScore === '2' ? 'active' : ''}
							onClick={({ currentTarget }) =>
								hanleOnRatingButtonClick(currentTarget)
							}
						>
							2
						</button>
						<button
							className={feedbackScore === '3' ? 'active' : ''}
							onClick={({ currentTarget }) =>
								hanleOnRatingButtonClick(currentTarget)
							}
						>
							3
						</button>
						<button
							className={feedbackScore === '4' ? 'active' : ''}
							onClick={({ currentTarget }) =>
								hanleOnRatingButtonClick(currentTarget)
							}
						>
							4
						</button>
						<button
							className={feedbackScore === '5' ? 'active' : ''}
							onClick={({ currentTarget }) =>
								hanleOnRatingButtonClick(currentTarget)
							}
						>
							5
						</button>
					</div>
					{feedbackScore === '0' && <h3 className='required'>*Required</h3>}
					<h2 className='title_feedback'>Comments / Suggestions?</h2>
					{!comment && <h3 className='required'>*Required</h3>}
					<textarea
						value={comment}
						className='comments'
						rows={8}
						onChange={({ currentTarget }) =>
							hanleOnCommentChange(currentTarget)
						}
					></textarea>
					<Button
						text='Submit'
						onClick={hanleOnSubmitButtonClick}
						loading={loading}
						disabled={feedbackScore === '0' || !comment}
						style={{
							width: '100%',
						}}
					/>
				</div>
				<div
					className='rating-card__back'
					style={{
						display: isSubmitted ? 'flex' : 'none',
					}}
				>
					<div className='rating-card__img'>
						<CheckIcon
							color='success'
							style={{
								width: '100%',
								height: '100%',
							}}
						/>
					</div>
					<div className='rating-card__result'>
						<span className='rating-card__result--value'>{`You selected ${feedbackScore}`}</span>{' '}
						out of 5
					</div>
					<div className='rating-card__content'>
						<h1>Thank you!</h1>
						<p>We appreciate you taking the time to give a rating</p>
						<div className='more-comments' style={{ textAlign: 'center' }}>
							<Button text='More Comments' onClick={reset} loading={false} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feedback
