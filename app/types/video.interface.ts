import { IBase } from '@/types/base.interface'
import { IUser } from '@/types/user.interface'
import { IComment } from '@/types/comment.interface'
import { IPlaylist } from '@/types/playlist.interface'

export interface IVideo extends IBase {
	name: string
	isPublic: boolean
	views: number
	likesCount: number
	duration: number
	description: string
	videoPath: string
	thumbnailPath: string
	user: IUser
	comments?: IComment[]
	likes?: ILike[]
	savedToPlaylists?: ISavedToPlaylist[]
}

export interface IVideoDto
	extends Pick<
		IVideo,
		| 'id'
		| 'thumbnailPath'
		| 'description'
		| 'name'
		| 'videoPath'
		| 'isPublic'
		| 'duration'
	> {}

export interface ISavedToPlaylist extends IBase {
	fromPlaylist: IPlaylist
	toVideo: IVideo
}

export interface ILike extends IBase {
	fromUser?: IUser
	toVideo?: IVideo
}
