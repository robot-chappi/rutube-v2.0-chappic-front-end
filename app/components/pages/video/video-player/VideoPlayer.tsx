import { FC } from 'react'

import cn from 'classnames'
import styles from './VideoPlayer.module.scss'
import { usePlayer } from '@/components/pages/video/video-player/usePlayer'
import { IoPause, IoPlay } from 'react-icons/io5'
import { BsFullscreen } from 'react-icons/bs'
import { MdOutlineForward5, MdOutlineReplay5 } from 'react-icons/md'

const VideoPlayer: FC<{ videoPath: string }> = ({ videoPath }) => {
	const { videoRef, toggleVideo, status, fullScreen, forward, revert } =
		usePlayer()

	return (
		<div className={styles.wrapper}>
			<div
				className={cn(styles.buttons, {
					[styles.hide]: status.isPlaying
				})}
			>
				<button onClick={revert}>
					<MdOutlineReplay5 />
				</button>
				<button onClick={forward}>
					<MdOutlineForward5 />
				</button>
			</div>
			<video
				ref={videoRef}
				className={styles.player}
				src={`${videoPath}#t=8`}
				preload={'metadata'}
				onClick={toggleVideo}
			/>
			<div
				className={cn(styles.controls, {
					[styles.hide]: status.isPlaying
				})}
			>
				<button onClick={toggleVideo}>
					{status.isPlaying ? <IoPause /> : <IoPlay />}
				</button>

				<div className={styles.progressBarWrapper}>
					<div
						className={styles.progressBar}
						style={{ width: `${status.progress}%` }}
					/>
				</div>
				<div className={styles.timeControls}>
					<p>
						{Math.floor(status.currentTime / 60) +
							':' +
							('0' + Math.floor(status.currentTime % 60)).slice(-2)}
					</p>
					<p> / </p>
					<p>
						{Math.floor(status.videoTime / 60) +
							':' +
							('0' + Math.floor(status.videoTime % 60)).slice(-2)}
					</p>
				</div>

				<button onClick={fullScreen}>
					<BsFullscreen className={'text-tiny'} />
				</button>
			</div>
		</div>
	)
}

export default VideoPlayer
