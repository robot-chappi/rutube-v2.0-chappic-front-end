import { NextPageAuth } from '@/providers/interfaces/private-route.interface'
import PlaylistEdit from '@/components/pages/playlist-edit/PlaylistEdit'

const PlaylistEditPage: NextPageAuth = () => {
	return <PlaylistEdit />
}

PlaylistEditPage.isOnlyUser = true

export default PlaylistEditPage
