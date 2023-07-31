import { GetStaticProps, NextPage } from 'next'
import { PlaylistService } from '@/services/playlist/playlist.service'
import Playlists from '@/components/pages/playlists/Playlists'
import { IPlaylist } from '@/types/playlist.interface'

const PlaylistsPage: NextPage<{ playlists: IPlaylist[] }> = ({ playlists }) => {
	return <Playlists playlists={playlists} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: playlists } = await PlaylistService.getAll()

		return {
			props: {
				playlists
			},
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				playlists: []
			}
		}
	}
}

export default PlaylistsPage
