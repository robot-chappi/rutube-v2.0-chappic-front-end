import { GetStaticProps, NextPage } from 'next'
import { IVideo } from '@/types/video.interface'
import Trending from '@/components/pages/trending/Trending'
import { VideoService } from '@/services/video/video.service'
import { PlaylistService } from '@/services/playlist/playlist.service'
import { IPlaylist } from '@/types/playlist.interface'

const TrendingPage: NextPage<{
	topVideosByViews: IVideo[]
	topVideosByLikes: IVideo[]
	topPlaylistsBySaved: IPlaylist[]
}> = ({ topVideosByViews, topVideosByLikes, topPlaylistsBySaved }) => {
	return (
		<Trending
			topVideosByViews={topVideosByViews}
			topVideosByLikes={topVideosByLikes}
			topPlaylistsBySaved={topPlaylistsBySaved}
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: topVideosByViews } =
			await VideoService.getMostPopularByViews()
		const { data: topVideosByLikes } =
			await VideoService.getMostPopularByLikes()
		const { data: topPlaylistsBySaved } = await PlaylistService.getMostPopular()

		return {
			props: {
				topVideosByViews,
				topVideosByLikes,
				topPlaylistsBySaved
			},
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				topVideosByViews: [],
				topVideosByLikes: [],
				topPlaylistsBySaved: []
			}
		}
	}
}

export default TrendingPage
