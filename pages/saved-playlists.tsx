import { NextPageAuth } from '@/providers/interfaces/private-route.interface'
import SavedPlaylists from '@/components/pages/saved-playlists/SavedPlaylists'

const SavedPlaylistsPage: NextPageAuth = () => {
	return <SavedPlaylists />
}

SavedPlaylistsPage.isOnlyUser = true

export default SavedPlaylistsPage
