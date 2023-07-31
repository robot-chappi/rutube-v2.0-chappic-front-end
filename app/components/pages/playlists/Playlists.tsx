import { FC } from 'react'
import { IPlaylist } from '@/types/playlist.interface'
import Layout from '@/components/layout/Layout'
import Catalog from '@/components/ui/catalog/Catalog'
import styles from './Playlists.module.scss'

const Playlists: FC<{ playlists: IPlaylist[] }> = ({ playlists }) => {
	return (
		<Layout
			title={'Плейлисты'}
			description={
				'На этой странице расположены все плейлисты нашей платформы!'
			}
		>
			<div className={styles.playlist_section}>
				<Catalog newPlaylists={playlists} title={'Все плейлисты'} />
			</div>
		</Layout>
	)
}

export default Playlists
