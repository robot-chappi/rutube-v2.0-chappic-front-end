import { IVideo, IVideoDto } from '@/types/video.interface'

import { api } from '@/store/api/api'
import { getVideoUrl } from '../../configs/api.config'

export const videoApi = api.injectEndpoints({
	endpoints: builder => ({
		getVideosBySearchTerm: builder.query<IVideo[], string>({
			query: searchTerm => ({ url: getVideoUrl(), params: { searchTerm } })
		}),
		getVideoById: builder.query<IVideo, number>({
			query: id => getVideoUrl(`/${id}`),
			providesTags: (result, error, id) => [{ type: 'Video', id }]
		}),
		getVideoPrivate: builder.query<IVideo, number>({
			query: id => getVideoUrl(`/get-private/${id}`),
			providesTags: (result, error, id) => [{ type: 'Video', id }]
		}),
		createVideo: builder.mutation<string, void>({
			query: () => ({
				url: getVideoUrl(),
				method: 'POST'
			}),
			invalidatesTags: () => [{ type: 'Profile' }]
		}),
		updateVideo: builder.mutation<IVideo, IVideoDto>({
			query: ({ id, ...body }) => ({
				url: getVideoUrl(`/${id}`),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Video', id },
				{ type: 'Profile' }
			]
		}),
		updateViews: builder.mutation<IVideo, number>({
			query: id => ({
				url: getVideoUrl(`/update-views/${id}`),
				method: 'PUT'
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Video', id }]
		}),
		updateLikes: builder.mutation<IVideo, number>({
			query: id => ({
				url: getVideoUrl(`/update-likes/${id}`),
				method: 'PUT'
			}),
			invalidatesTags: (result, error, id) => [{ type: 'Video', id }]
		}),
		deleteVideo: builder.mutation<void, number>({
			query: id => ({
				url: getVideoUrl(`/${id}`),
				method: 'DELETE'
			}),
			invalidatesTags: () => [{ type: 'Video' }, { type: 'Profile' }]
		})
	})
})
