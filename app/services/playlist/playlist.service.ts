import { axiosClassic } from '../../api/axios'
import { getPlaylistUrl } from '../../configs/api.config'
import { IPlaylist } from '@/types/playlist.interface'

export const PlaylistService = {
	async getAll() {
		return axiosClassic.get<IPlaylist[]>(getPlaylistUrl())
	},

	async getPlaylist(id: number) {
		return axiosClassic.get<IPlaylist>(getPlaylistUrl(`/${id}`))
	},

	async getMostPopular() {
		return axiosClassic.get<IPlaylist[]>(getPlaylistUrl('/most-popular/saved'))
	}
}
