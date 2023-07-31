import { IBase } from '@/types/base.interface'
import { ILike, IVideo } from '@/types/video.interface'
import { IPlaylist } from '@/types/playlist.interface'

export interface IUser extends IBase {
	email: string
	name: string
	isVerified?: boolean
	subscribersCount: number
	description: string
	avatarPath: string
	videos?: IVideo[]
	playlists?: IPlaylist[]
	subscriptions: ISubscription[]
	likes?: ILike[]
	savedPlaylists?: ISavedPlaylist[]
}

export interface ISubscription extends IBase {
	toChannel: IUser
}

export interface ISavedPlaylist extends IBase {
	toPlaylist: IPlaylist
	fromUser: IUser
}
