import { FC } from 'react'
import { IPlaylist } from '@/types/playlist.interface'

import styles from './PlaylistInfoSmall.module.scss'
import Image from 'next/image'
import { formatNumberToK } from '@/utils/format-number-to-k'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { GoDotFill } from 'react-icons/go'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'
import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'

dayjs.extend(relativeTime)

interface IPlaylistInfoSmall {
	playlist: IPlaylist
	user?: { id: number; email: string }
	toggleSave?: ({
		playlistId,
		userId
	}: {
		playlistId: number
		userId: number
	}) => void
	isLoading?: boolean
}

const PlaylistInfoSmall: FC<IPlaylistInfoSmall> = ({
	playlist,
	toggleSave,
	user,
	isLoading
}) => {
	return (
		<div className={styles.playlist_info}>
			<div className={styles.image}>
				<Image
					src={playlist.thumbnailPath}
					width={640}
					height={360}
					alt={playlist.name}
				/>
			</div>
			<div className={styles.info}>
				<div className={styles.name}>{playlist.name}</div>
				<div className={styles.description}>{playlist.description}</div>
				<div className={styles.counts}>
					<div>Statistics:</div>
					<div>
						<span>
							<GoDotFill />
						</span>{' '}
						{dayjs(new Date(playlist.createdAt)).fromNow()}
					</div>
					<div>
						<span>
							<GoDotFill />
						</span>
						{formatNumberToK(playlist.saveCount) + ' saved'}
					</div>
					<div>
						<span>
							<GoDotFill />
						</span>
						{formatNumberToK(playlist.videosCount) + ' videos'}
					</div>
				</div>
				<div>
					<ChannelInfoSmall channel={playlist.user} />
				</div>
				{user && user?.id !== playlist.user.id && toggleSave && (
					<div className={styles.actions}>
						<button
							disabled={isLoading}
							onClick={() =>
								toggleSave({ playlistId: playlist.id, userId: user?.id })
							}
						>
							{playlist.saved?.some(item => item.fromUser.id === user.id) ? (
								<>
									<span>Remove</span>
									<IoMdRemoveCircleOutline />
								</>
							) : (
								<>
									<span>Add</span>
									<IoMdAddCircleOutline />
								</>
							)}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default PlaylistInfoSmall
