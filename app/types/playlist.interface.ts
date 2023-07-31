import { IBase } from '@/types/base.interface'
import { ISavedToPlaylist } from '@/types/video.interface'
import { ISavedPlaylist, IUser } from '@/types/user.interface'

export interface IPlaylist extends IBase {
	name: string
	description: string
	thumbnailPath: string
	isPublic: boolean
	videosCount: number
	saveCount: number
	user: IUser
	videos: ISavedToPlaylist[]
	saved: ISavedPlaylist[]
}

export interface IPlaylistDto extends IBase {
	name: string
	isPublic?: boolean
	description: string
	thumbnailPath: string
}
