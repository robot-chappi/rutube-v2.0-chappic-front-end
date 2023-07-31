import { FC } from 'react'

import styles from './ToggleInformation.module.scss'
import Image from 'next/image'
import { IVideo } from '@/types/video.interface'

interface IVideoInformation {
	video: IVideo
}

const ToggleInformation: FC<IVideoInformation> = ({ video }) => {
	return (
		<div className={styles.info}>
			<Image
				src={video.thumbnailPath}
				width={344}
				height={190}
				alt={''}
				layout='responsive'
			/>
			<div className={styles.details}>
				<div>
					<span>{video.name}</span>
					<span>{video.description}</span>
				</div>
			</div>
		</div>
	)
}

export default ToggleInformation
