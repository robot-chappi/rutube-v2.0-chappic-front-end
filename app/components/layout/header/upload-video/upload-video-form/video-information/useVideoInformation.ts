import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { IVideoElement } from '@/components/pages/video/video-player/interfaces/video-player.interface'

export const useVideoInformation = ({
	setVideoDuration,
	isUploaded,
	videoPath
}: {
	setVideoDuration: Dispatch<SetStateAction<number>>
	isUploaded: boolean
	videoPath: string | undefined
}) => {
	const videoRef = useRef<IVideoElement>(null)

	useEffect(() => {
		const handler = setTimeout(() => {
			if (videoRef.current) {
				setVideoDuration(Math.floor(videoRef.current?.duration / 60))
			}
		}, 500)

		return () => {
			clearTimeout(handler)
		}
	}, [isUploaded, setVideoDuration, videoPath])

	return {
		videoRef
	}
}
