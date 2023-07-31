import { FC } from 'react'
import { api } from '@/store/api/api'
import { videoApi } from '@/store/api/video.api'
import { playlistApi } from '@/store/api/playlist.api'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/loader/Loader'
import Catalog from '@/components/ui/catalog/Catalog'

const Studio: FC = () => {
	const { data, isLoading } = api.useGetProfileQuery(null)
	const [removeVideo] = videoApi.useDeleteVideoMutation()
	const [removePlaylist] = playlistApi.useDeletePlaylistMutation()

	const videos = data?.videos
	const playlists = data?.playlists

	return (
		<Layout title={'Студия'}>
			<div>
				{isLoading ? (
					<Loader count={5} />
				) : videos?.length ? (
					<Catalog
						newVideos={videos}
						removeHandler={removeVideo}
						isUpdateLink
					/>
				) : (
					<p>Видео не найдены!</p>
				)}
			</div>
			<div className={'mt-3'}>
				{isLoading ? (
					<Loader count={5} />
				) : videos?.length ? (
					<Catalog
						newPlaylists={playlists}
						removeHandler={removePlaylist}
						isUpdateLink
						title={'Мои плейлисты'}
					/>
				) : (
					<p>Плейлисты не найдены!</p>
				)}
			</div>
		</Layout>
	)
}

export default Studio
