import { FC } from 'react'
import { api } from '@/store/api/api'
import Layout from '@/components/layout/Layout'
import Catalog from '@/components/ui/catalog/Catalog'
import Alert from '@/components/pages/alert/Alert'

const SavedPlaylists: FC = () => {
	const { data } = api.useGetProfileQuery(null)

	const playlists = data?.savedPlaylists?.map(item => item.toPlaylist)

	return (
		<Layout title={'Мои плейлисты'}>
			{playlists?.length !== 0 ? (
				<Catalog newPlaylists={playlists || []} title={'Мои плейлисты'} />
			) : (
				<Alert
					title={'Нет сохраненных плейлистов'}
					description={
						'У вас нет пока что сохраненных плейлистов, вы можете поискать их на странице коллекции'
					}
					link={'/playlists'}
					linkText={'Перейти в коллекции'}
					isPage={false}
				/>
			)}
		</Layout>
	)
}

export default SavedPlaylists
