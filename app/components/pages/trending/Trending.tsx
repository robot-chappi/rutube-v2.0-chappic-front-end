import { FC } from 'react'
import { IVideo } from '@/types/video.interface'
import Layout from '@/components/layout/Layout'
import Catalog from '@/components/ui/catalog/Catalog'

import styles from './Trending.module.scss'
import { IPlaylist } from '@/types/playlist.interface'

const Trending: FC<{
	topVideosByViews: IVideo[]
	topVideosByLikes: IVideo[]
	topPlaylistsBySaved: IPlaylist[]
}> = ({ topVideosByViews, topVideosByLikes, topPlaylistsBySaved }) => {
	return (
		<Layout
			title={'Тренды'}
			description={
				'Здесь вы найдете самые популярные видео и плейлисты на нашей платформе!'
			}
		>
			<div className={styles.trending_section}>
				<Catalog
					newVideos={topVideosByViews.slice(0, 100)}
					title={'Топ по просмотрам'}
				/>
			</div>
			<div className={styles.trending_section}>
				<Catalog
					newVideos={topVideosByLikes.slice(0, 100)}
					title={'Топ по лайкам'}
				/>
			</div>
			<div className={styles.trending_section}>
				<Catalog
					newPlaylists={topPlaylistsBySaved.slice(0, 50)}
					title={'Популярные плейлисты'}
				/>
			</div>
		</Layout>
	)
}

export default Trending
