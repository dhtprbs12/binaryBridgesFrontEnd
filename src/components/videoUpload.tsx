import React, { useRef } from 'react'
import Button from './shared/button'

function VideoUpload() {
	const [file, setFile] = React.useState<File>()
	const [isUploading, setIsUploading] = React.useState<boolean>(false)
	const [error, setError] = React.useState<string>('')
	const inputFile = useRef<HTMLInputElement>(null)
	const [takeaways, setTakeaways] = React.useState('')
	const [success, setSuccess] = React.useState<string>('')
	const [duration, setDuration] = React.useState<string>('')
	const [fileName, setFileName] = React.useState<string>('')
	const [sequence, setSequence] = React.useState<string>('')

	function hanleOnCommentChange(e: HTMLTextAreaElement) {
		setTakeaways(e.value)
	}

	function onFileHandler(e: EventTarget & HTMLInputElement) {
		if (e.files) {
			const file = e.files[0]
			setFile(file)
		}
	}

	function onDurationHandler(e: HTMLInputElement) {
		setDuration(e.value)
	}

	function onFileNameHandler(e: HTMLInputElement) {
		setFileName(e.value)
	}

	function onSequenceHandler(e: HTMLInputElement) {
		setSequence(e.value)
	}

	function onUploadClick() {
		if (file) {
			setIsUploading(true)
			const formData = new FormData()
			formData.append('file', file)
			formData.append('name', file.name)
			formData.append('fileName', fileName)
			formData.append('takeaways', takeaways)
			formData.append('duration', duration)
			formData.append('sequence', sequence)
			fetch(`${process.env.REACT_APP_EXPRESS_SERVER_URL}/upload-video`, {
				method: 'POST',
				body: formData,
			})
				.then(async (res) => {
					const result = await res.json()
					if (result.result === 'success') {
						setSuccess('Video Successfully Uploaded')
						setError('')
						setFile(undefined)
						setTakeaways('')
						setDuration('')
						setFileName('')
						setSequence('')
						if (inputFile.current) {
							inputFile.current.value = ''
						}
						setTimeout(() => {
							setSuccess('')
						}, 3000)
					}
				})
				.catch((e) => setError(e.message))
				.finally(() => setIsUploading(false))
		}
	}

	if (!!error) {
		throw new Error(
			`Error while uploading video file: ${error}. Please, reach out admin`
		)
	}
	return (
		<div
			className='video-upload-container'
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h1>Video Upload</h1>
			<input
				style={{
					margin: '20px 0',
				}}
				ref={inputFile}
				type='file'
				onChange={({ target }) => onFileHandler(target)}
			/>
			<h2>Video File Name</h2>
			<input
				style={{
					margin: '20px 0',
				}}
				type='text'
				onChange={({ currentTarget }) => onFileNameHandler(currentTarget)}
			/>
			<h2>Video Sequence</h2>
			<input
				style={{
					margin: '20px 0',
				}}
				type='text'
				onChange={({ currentTarget }) => onSequenceHandler(currentTarget)}
			/>
			<h2>Video Duration</h2>
			<input
				style={{
					margin: '20px 0',
				}}
				type='text'
				onChange={({ currentTarget }) => onDurationHandler(currentTarget)}
			/>
			<h2>Key Takeaways</h2>
			<textarea
				style={{
					margin: '20px 0',
				}}
				placeholder='Describe takeaways separated by COMMAS...'
				value={takeaways}
				className='takeaways'
				rows={8}
				onChange={({ currentTarget }) => hanleOnCommentChange(currentTarget)}
			></textarea>
			<Button
				style={{
					margin: 0,
				}}
				loading={isUploading}
				disabled={!file}
				text='UPLOAD'
				onClick={onUploadClick}
			/>
			{!!success && <h1>{success}</h1>}
		</div>
	)
}

export default VideoUpload
