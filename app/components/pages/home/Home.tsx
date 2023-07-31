import { FC } from 'react'
import Layout from '@/components/layout/Layout'
import Discover from '@/components/pages/home/discover/Discover'
import Catalog from '@/components/ui/catalog/Catalog'
import { IHome } from '@/components/pages/home/interfaces/home.interface'

const Home: FC<IHome> = ({ newVideos, topVideo, randomVideo }) => {
	return (
		<Layout
			title={'Видеохостинг'}
			description={
				'Домашняя страница лучшей видеохостинг-платформы Rutube v2.0! Смотри, создавай, реализуйся!'
			}
		>
			<Discover topVideo={topVideo} randomVideo={randomVideo} />
			<Catalog newVideos={newVideos} />
		</Layout>
	)
}

export default Home
