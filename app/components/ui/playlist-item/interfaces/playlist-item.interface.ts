import { IPlaylist } from '@/types/playlist.interface'

export interface IPlaylistItem {
	item: IPlaylist
	isSmall?: boolean
	removeHandler?: (playlistId: number) => void
	isUpdateLink?: boolean
}
