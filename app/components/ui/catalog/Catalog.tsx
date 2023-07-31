import { FC } from 'react'

import VideoItem from '@/components/ui/video-item/VideoItem'

import { IVideo } from '@/types/video.interface'

import styles from './Catalog.module.scss'
import Heading from '@/components/ui/heading/Heading'
import { IPlaylist } from '@/types/playlist.interface'
import PlaylistItem from '@/components/ui/playlist-item/PlaylistItem'

const Catalog: FC<{
	newVideos?: IVideo[]
	newPlaylists?: IPlaylist[]
	removeHandler?: (videoId: number) => void
	isUpdateLink?: boolean
	isSmallPlaylist?: boolean
	isSmallVideo?: boolean
	title?: string
}> = ({
	newVideos,
	newPlaylists,
	isSmallPlaylist,
	isSmallVideo,
	removeHandler,
	isUpdateLink,
	title
}) => {
	return (
		<div className={styles.recommended}>
			<div className={styles.top_block}>
				<Heading
					title={title ? title : removeHandler ? 'Мои видео' : 'Рекомендации'}
				/>
			</div>

			<div className={styles.catalog}>
				{newVideos &&
					newVideos.map(video => (
						<VideoItem
							item={video}
							key={video.id}
							isSmall={isSmallVideo}
							removeHandler={removeHandler}
							isUpdateLink={isUpdateLink}
						/>
					))}
				{newPlaylists &&
					newPlaylists.map(playlist => (
						<PlaylistItem
							item={playlist}
							key={playlist.id}
							isSmall={isSmallPlaylist}
							removeHandler={removeHandler}
							isUpdateLink={isUpdateLink}
						/>
					))}
			</div>
		</div>
	)
}

export default Catalog
