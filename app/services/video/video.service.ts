import { axiosClassic } from '../../api/axios'
import { getVideoUrl } from '../../configs/api.config'
import { IVideo } from '@/types/video.interface'

export const VideoService = {
	async getAll() {
		return axiosClassic.get<IVideo[]>(getVideoUrl())
	},

	async getMostPopularByViews() {
		return axiosClassic.get<IVideo[]>(getVideoUrl('/most-popular/views'))
	},

	async getMostPopularByLikes() {
		return axiosClassic.get<IVideo[]>(getVideoUrl('/most-popular/likes'))
	}
}
