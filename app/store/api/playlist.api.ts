import { IPlaylist, IPlaylistDto } from '@/types/playlist.interface'

import { api } from '@/store/api/api'
import { getPlaylistUrl } from '../../configs/api.config'

export const playlistApi = api.injectEndpoints({
	endpoints: builder => ({
		getPlaylistsBySearchTerm: builder.query<IPlaylist[], string>({
			query: searchTerm => ({ url: getPlaylistUrl(), params: { searchTerm } })
		}),
		getPlaylistById: builder.query<IPlaylist, number>({
			query: id => getPlaylistUrl(`/${id}`),
			providesTags: (result, error, id) => [{ type: 'Playlist', id }]
		}),
		getPlaylistPrivate: builder.query<IPlaylist, number>({
			query: id => getPlaylistUrl(`/get-private/${id}`),
			providesTags: (result, error, id) => [{ type: 'Playlist', id }]
		}),
		createPlaylist: builder.mutation<string, void>({
			query: () => ({
				url: getPlaylistUrl(),
				method: 'POST'
			}),
			invalidatesTags: () => [{ type: 'Profile' }]
		}),
		updatePlaylist: builder.mutation<IPlaylist, IPlaylistDto>({
			query: ({ id, ...body }) => ({
				url: getPlaylistUrl(`/${id}`),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { id }) => [
				{ type: 'Playlist', id },
				{ type: 'Profile' }
			]
		}),
		updateSaved: builder.mutation<
			IPlaylist,
			{ playlistId: number; userId: number }
		>({
			query: ({ playlistId }) => ({
				url: getPlaylistUrl(`/update-saved/${playlistId}`),
				method: 'PUT'
			}),
			invalidatesTags: (result, error, { playlistId, userId }) => [
				{ type: 'Playlist', playlistId },
				{
					type: 'Profile',
					userId
				}
			]
		}),
		toggleVideo: builder.mutation<
			IPlaylist,
			{ playlistId: number; videoId: number }
		>({
			query: ({ playlistId, videoId }) => ({
				url: getPlaylistUrl('/toggle-video'),
				params: { playlistId, videoId },
				method: 'PUT'
			}),
			invalidatesTags: (result, error, { playlistId, videoId }) => [
				{ type: 'Playlist', playlistId },
				{ type: 'Video', videoId }
			]
		}),
		deletePlaylist: builder.mutation<void, number>({
			query: id => ({
				url: getPlaylistUrl(`/${id}`),
				method: 'DELETE'
			}),
			invalidatesTags: () => [{ type: 'Playlist' }, { type: 'Profile' }]
		})
	})
})
