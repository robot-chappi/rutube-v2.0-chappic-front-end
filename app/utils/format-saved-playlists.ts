import { IPlaylist } from '@/types/playlist.interface'
import { IVideo } from '@/types/video.interface'

export const formatSavedPlaylists = ({
	playlists,
	video
}: {
	playlists: IPlaylist[]
	video: IVideo
}) => {
	let alreadySavedInPlaylists = playlists?.map(playlist => {
		return video.savedToPlaylists?.find(
			videoPlaylist => playlist.id === videoPlaylist.fromPlaylist.id
		)
	})
	alreadySavedInPlaylists = alreadySavedInPlaylists?.filter(
		item => item !== undefined
	)

	return alreadySavedInPlaylists.map(item => item?.fromPlaylist)
}
