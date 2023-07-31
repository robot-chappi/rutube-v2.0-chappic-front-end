import type { GetStaticProps, NextPage } from 'next'
import Home from '@/components/pages/home/Home'
import { IHome } from '@/components/pages/home/interfaces/home.interface'
import { IVideo } from '@/types/video.interface'
import { VideoService } from '@/services/video/video.service'

import shuffle from 'lodash/shuffle'

const HomePage: NextPage<IHome> = props => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: newVideos } = await VideoService.getAll()
		const { data: topVideos } = await VideoService.getMostPopularByViews()

		return {
			props: {
				newVideos,
				topVideo: topVideos[0],
				randomVideo:
					shuffle(newVideos.filter(v => v.id !== topVideos[0].id))[0] ||
					({} as IVideo)
			} as IHome,
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				newVideos: [],
				topVideo: {} as IVideo,
				randomVideo: {} as IVideo
			} as IHome
		}
	}
}
export default HomePage
