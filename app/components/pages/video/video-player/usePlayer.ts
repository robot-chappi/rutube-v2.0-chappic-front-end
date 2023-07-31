import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { IVideoElement } from '@/components/pages/video/video-player/interfaces/video-player.interface'

export const usePlayer = () => {
	const videoRef = useRef<IVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [videoTime, setVideoTime] = useState<number>(0)
	const [progress, setProgress] = useState<number>(0)

	useEffect(() => {
		const originalDuration = videoRef.current?.duration
		if (originalDuration) setVideoTime(originalDuration)
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play().catch(() => {})
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	const forward = () => {
		if (videoRef.current) videoRef.current.currentTime += 5
	}

	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 5
	}

	const fullScreen = () => {
		const video = videoRef.current
		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100)
		}

		video.addEventListener('timeupdate', updateProgress)

		return () => {
			video.removeEventListener('timeupdate', updateProgress)
		}
	}, [videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'p':
					e.preventDefault()
					toggleVideo()
					break
				case 'f':
					fullScreen()
					break

				default:
					return
			}
		}

		videoRef?.current?.addEventListener('keydown', handleKeyDown)

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			videoRef?.current?.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			toggleVideo,
			fullScreen,
			forward,
			revert,
			status: {
				isPlaying,
				progress,
				currentTime,
				videoTime
			}
		}),
		[currentTime, isPlaying, progress, toggleVideo, videoTime]
	)
}
