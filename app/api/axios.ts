import axios from 'axios'
import { getContentType } from '@/utils/api.utils'
import { API_SERVER_URL, API_URL } from '../configs/api.config'
import { IS_PRODUCTION } from '../configs/constants'

export const axiosClassic = axios.create({
	baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
	headers: getContentType()
})
