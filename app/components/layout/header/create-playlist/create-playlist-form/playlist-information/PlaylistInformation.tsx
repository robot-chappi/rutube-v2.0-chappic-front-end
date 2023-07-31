import { FC } from 'react'

import styles from './PlaylistInformation.module.scss'
import Image from 'next/image'
import Link from 'next/link'

interface IPlaylistInformation {
	thumbnailPath?: string
	playlistId: number
}

const PlaylistInformation: FC<IPlaylistInformation> = ({
	playlistId,
	thumbnailPath
}) => {
	return (
		<div className={styles.info}>
			{!thumbnailPath ? (
				<div className={styles.thumbnail}>Ты должен загрузить превью</div>
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
					<span>Playlist link</span>
					<span>
						<Link href={`/p/${playlistId}`}>
							<a>http://url/p/{playlistId}</a>
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default PlaylistInformation
