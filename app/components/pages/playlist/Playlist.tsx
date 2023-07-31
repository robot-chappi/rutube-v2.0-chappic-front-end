import { FC } from 'react'
import Layout from '@/components/layout/Layout'

import styles from './Playlist.module.scss'
import PlaylistInfoSmall from '@/components/ui/playlist-info-small/PlaylistInfoSmall'
import Catalog from '@/components/ui/catalog/Catalog'
import { useAuth } from '@/hooks/useAuth'
import { playlistApi } from '@/store/api/playlist.api'
import { useRouter } from 'next/router'
import { IPlaylist } from '@/types/playlist.interface'
import Alert from '@/components/pages/alert/Alert'

const Playlist: FC = () => {
	const { query } = useRouter()
	const { user } = useAuth()

	const { data: playlist = {} as IPlaylist, isSuccess } =
		playlistApi.useGetPlaylistByIdQuery(Number(query.id), {
			skip: !query?.id
		})

	const [updateSaved, { isLoading }] = playlistApi.useUpdateSavedMutation()

	const videos = playlist?.videos?.map(item => item.toVideo)

	return isSuccess ? (
		<Layout title={playlist.name} description={playlist.description}>
			<div className={styles.wrapper}>
				<PlaylistInfoSmall
					toggleSave={updateSaved}
					isLoading={isLoading}
					user={user || undefined}
					playlist={playlist}
				/>
			</div>
			<Catalog newVideos={videos || []} title={'Видео'} />
		</Layout>
	) : (
		<Alert
			title={'Не существует'}
			description={
				'Данного плейлиста не существует, вернитесь на главную страницу'
			}
			layoutTitle={'Waiting'}
			link={'/'}
			linkText={'Вернуться на главную'}
			isPage={true}
		/>
	)
}

export default Playlist
