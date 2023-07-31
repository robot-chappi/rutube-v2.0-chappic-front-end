import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'

import styles from './VideoInformation.module.scss'
import { useVideoInformation } from '@/components/layout/header/upload-video/upload-video-form/video-information/useVideoInformation'

interface IVideoInformation {
	thumbnailPath?: string
	videoPath?: string
	videoId: number
	duration?: number
	fileName?: string
	isUploaded: boolean
	setVideoDuration: Dispatch<SetStateAction<number>>
}

const VideoInformation: FC<IVideoInformation> = ({
	videoId,
	thumbnailPath,
	videoPath,
	fileName,
	duration,
	setVideoDuration,
	isUploaded
}) => {
	const { videoRef } = useVideoInformation({
		setVideoDuration,
		isUploaded,
		videoPath
	})

	return (
		<div className={styles.info}>
			{!thumbnailPath ? (
				<div className={styles.thumbnail}>
					{!isUploaded
						? 'Идет загрузка видео...'
						: 'Ты должен загрузить превью'}
				</div>
			) : (
				<Image
					src={thumbnailPath}
					width={344}
					height={190}
					alt={''}
					layout='responsive'
				/>
			)}
			<div className={styles.details}>
				<div>
					<span>Video link</span>
					<span>
						<Link href={`/v/${videoId}`}>
							<a>http://url/v/{videoId}</a>
						</Link>
					</span>
				</div>
				{fileName && (
					<div>
						<span>Filename</span>
						<span>{fileName}</span>
					</div>
				)}
				{duration && (
					<div>
						<span>Duration</span>
						<span>{duration} min.</span>
					</div>
				)}
				<div>
					{!isUploaded ? (
						'Ожидание видео'
					) : (
						<video
							controls
							ref={videoRef}
							src={videoPath}
							preload={'metadata'}
							width={200}
							height={90}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default VideoInformation
