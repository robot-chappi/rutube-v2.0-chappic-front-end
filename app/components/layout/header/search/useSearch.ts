import { ChangeEvent, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import { playlistApi } from '@/store/api/playlist.api'
import { videoApi } from '@/store/api/video.api'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { data: playlistData, isSuccess: isSuccessPlaylist } =
		playlistApi.useGetPlaylistsBySearchTermQuery(debounceSearch, {
			skip: !debounceSearch,
			selectFromResult: ({ data, ...rest }) => ({
				data: data?.slice(0, 4),
				...rest
			})
		})

	const { data: videoData, isSuccess: isSuccessVideo } =
		videoApi.useGetVideosBySearchTermQuery(debounceSearch, {
			skip: !debounceSearch,
			selectFromResult: ({ data, ...rest }) => ({
				data: data?.slice(0, 4),
				...rest
			})
		})

	return {
		handleSearch,
		videoData,
		playlistData,
		isSuccessVideo,
		isSuccessPlaylist,
		searchTerm
	}
}
