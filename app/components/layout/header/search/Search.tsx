import { FC } from 'react'

import styles from './Search.module.scss'
import PlaylistItem from '@/components/ui/playlist-item/PlaylistItem'
import { useSearch } from '@/components/layout/header/search/useSearch'
import VideoItem from '@/components/ui/video-item/VideoItem'
import Heading from '@/components/ui/heading/Heading'

const Search: FC = () => {
	const {
		playlistData,
		videoData,
		handleSearch,
		searchTerm,
		isSuccessPlaylist,
		isSuccessVideo
	} = useSearch()

	return (
		<div className={styles.search_top}>
			<label>
				<input
					type={'text'}
					placeholder={'Поиск...'}
					value={searchTerm}
					onChange={handleSearch}
				/>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={'/img/common/search.svg'} alt={''} />
			</label>
			<div className={styles.wrapper}>
				{isSuccessPlaylist && (
					<div className={styles.wrapper_result}>
						<Heading title={'Плейлисты'} />
						<div className={styles.result}>
							{playlistData?.length ? (
								playlistData.map(playlist => (
									<PlaylistItem isSmall item={playlist} key={playlist.id} />
								))
							) : (
								<div className={'text-white'}>Плейлисты не найдены!</div>
							)}
						</div>
					</div>
				)}
				{isSuccessVideo && (
					<div className={styles.wrapper_result}>
						<Heading title={'Видео'} />
						<div className={styles.result}>
							{videoData?.length ? (
								videoData.map(video => (
									<VideoItem isSmall item={video} key={video.id} />
								))
							) : (
								<div className={'text-white'}>Видео не найдены!</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Search
