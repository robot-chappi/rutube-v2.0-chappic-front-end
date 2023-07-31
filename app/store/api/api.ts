import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL, getUserUrl } from '../../configs/api.config'
import { TypeRootState } from '@/store/store'
import { IUser } from '@/types/user.interface'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Video', 'Playlist', 'Profile', 'Comment'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as TypeRootState).auth.accessToken

			if (token) headers.set('Authorization', `Bearer ${token}`)

			return headers
		}
	}),
	endpoints: builder => ({
		getProfile: builder.query<IUser, any>({
			query: () => getUserUrl('/profile'),
			providesTags: () => [{ type: 'Profile' }]
		}),
		subscribeToChannel: builder.mutation<boolean, number>({
			query: channelId => ({
				url: getUserUrl(`/subscribe/${channelId}`),
				method: 'PATCH'
			}),
			invalidatesTags: () => [{ type: 'Profile' }]
		})
	})
})
