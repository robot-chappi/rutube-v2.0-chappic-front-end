import { Dispatch, SetStateAction } from 'react'
import { IPlaylist } from '@/types/playlist.interface'
import { IVideo } from '@/types/video.interface'

export interface IToggleModal {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	video: IVideo
	playlists: IPlaylist[]
}
