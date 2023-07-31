import { api } from '@/store/api/api'
import { getCommentUrl } from '../../configs/api.config'
import {
	IComment,
	ICommentDto,
	ICommentUpdateDto
} from '@/types/comment.interface'

export const commentApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllByChannel: builder.query<IComment[], number>({
			query: () => getCommentUrl(),
			providesTags: (result, error, id) => [{ type: 'Comment', id }]
		}),
		createComment: builder.mutation<IComment, ICommentDto>({
			query: body => ({
				url: getCommentUrl(),
				method: 'POST',
				body
			}),
			invalidatesTags: (result, error, { videoId }) => [
				{ type: 'Video', id: videoId }
			]
		}),
		updateComment: builder.mutation<IComment, ICommentUpdateDto>({
			query: ({ videoId, ...body }) => ({
				url: getCommentUrl(),
				method: 'PUT',
				body
			}),
			invalidatesTags: (result, error, { videoId }) => [
				{ type: 'Video', id: videoId }
			]
		}),
		deleteComment: builder.mutation<
			void,
			{ videoId: number; commentId: number }
		>({
			query: ({ commentId }) => ({
				url: getCommentUrl(`/${commentId}`),
				method: 'DELETE'
			}),
			invalidatesTags: (result, error, { videoId }) => [
				{ type: 'Video', id: videoId }
			]
		})
	})
})
