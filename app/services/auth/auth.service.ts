import { axiosClassic } from '../../api/axios'
import { IAuthData } from '@/services/auth/auth.helper'
import { getAuthUrl } from '../../configs/api.config'

export const AuthService = {
	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthData>(getAuthUrl('/login'), {
			email,
			password
		})

		return response.data
	},

	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthData>(
			getAuthUrl('/register'),
			{
				email,
				password
			}
		)

		return response.data
	}
}
