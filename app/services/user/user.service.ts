import { axiosClassic } from '../../api/axios'
import { getUserUrl } from '../../configs/api.config'
import { IUser } from '@/types/user.interface'

export const UserService = {
	async getAll() {
		return axiosClassic.get<IUser[]>(getUserUrl())
	},

	async getUser(id: number) {
		return axiosClassic.get<IUser>(getUserUrl(`/by-id/${id}`))
	}
}
