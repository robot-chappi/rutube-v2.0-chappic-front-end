import { FC, useEffect } from 'react'
import styles from './Video.module.scss'
import cn from 'classnames'
import Layout from '@/components/layout/Layout'
import VideoPlayer from '@/components/pages/video/video-player/VideoPlayer'
import { useRouter } from 'next/router'
import { IVideo } from '@/types/video.interface'
import { videoApi } from '@/store/api/video.api'
import Comments from '@/components/pages/video/comments/Comments'
import VideoDetail from '@/components/pages/video/video-detail/VideoDetail'
import Alert from '@/components/pages/alert/Alert'

const Video: FC = () => {
	const { query, asPath } = useRouter()

	const { data: video = {} as IVideo, isSuccess } =
		videoApi.useGetVideoByIdQuery(Number(query.id), {
			skip: !query?.id
		})

	const [updateViews] = videoApi.useUpdateViewsMutation()

	useEffect(() => {
		if (query.id) updateViews(Number(query.id))
	}, [query.id, updateViews])

	return isSuccess ? (
		<Layout title={video.name} description={video.description}>
			<div className={styles.layout}>
				<VideoPlayer videoPath={video.videoPath} />
				<div className={styles.hidden_comments}>
					<Comments videoId={video.id} comments={video.comments || []} />
				</div>
			</div>
			<div className={cn(styles.layout, 'mt-7')}>
				<VideoDetail path={asPath} video={video} />
				<div className={styles.hidden_block}></div>
			</div>
			<div className={styles.block_comments}>
				<Comments videoId={video.id} comments={video.comments || []} />
			</div>
		</Layout>
	) : (
		<Alert
			title={'Не существует'}
			description={'Данного видео не существует, вернитесь на главную страницу'}
			layoutTitle={'Waiting'}
			link={'/'}
			linkText={'Вернуться на главную'}
			isPage={true}
		/>
	)
}

export default Video
