import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from './PlaylistItem.module.scss'
import { formatNumberToK } from '@/utils/format-number-to-k'

interface IPlaylistStatistics {
	saveCount: number
	videosCount: number
	createdAt?: string
}

dayjs.extend(relativeTime)

const PlaylistStatistics: FC<IPlaylistStatistics> = ({
	saveCount,
	videosCount,
	createdAt
}) => {
	return (
		<div className={styles.number_info}>
			<div className={styles.count}>{formatNumberToK(saveCount)} saved</div>
			<div className={'mx-2'}>|</div>
			<div className={styles.count}>{formatNumberToK(videosCount)} videos</div>
			{!!createdAt && (
				<>
					<div className={'mx-2'}>|</div>
					<div className={styles.date}>
						{dayjs(new Date(createdAt)).fromNow()}
					</div>
				</>
			)}
		</div>
	)
}

export default PlaylistStatistics
