import { FC } from 'react'

import styles from './VideoDetail.module.scss'
import { IVideo } from '@/types/video.interface'
import { videoApi } from '@/store/api/video.api'
import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri'
import { IoEyeSharp } from 'react-icons/io5'
import { formatNumberToK } from '@/utils/format-number-to-k'
import { HiCalendar } from 'react-icons/hi'
import dayjs from 'dayjs'
import { useAuth } from '@/hooks/useAuth'
import cn from 'classnames'
import { IUser } from '@/types/user.interface'
import ToggleVideo from '@/components/pages/video/toggle-video/ToggleVideo'
import { api } from '@/store/api/api'
import Button from '@/components/ui/button/Button'
import { IoMdShare, IoMdThumbsUp } from 'react-icons/io'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import * as process from 'process'

const VideoDetail: FC<{ video: IVideo; path: string }> = ({ video, path }) => {
	const { user } = useAuth()
	const [updateLike, { isLoading: isLikeLoading }] =
		videoApi.useUpdateLikesMutation()

	const { data: profile = {} as IUser } = api.useGetProfileQuery(user?.id, {
		skip: !user?.id
	})

	const isLiked = video?.likes?.some(like => like.fromUser?.id === user?.id)

	const { isCopied, handleCopy } = useCopyToClipboard(3000)

	return (
		<div className={styles.detail}>
			<div className={styles.wrapper_left}>
				<ChannelInfoSmall channel={video.user || ({} as IUser)} />
				<h1>{video.name}</h1>
				<article className={styles.article}>{video.description}</article>
			</div>
			<div className={styles.wrapper_right}>
				<div className={styles.wrapper_buttons}>
					{video.user?.id && (
						<SubscribeButton channelIdForSubscribe={video.user.id} />
					)}
					{profile.id ? (
						<button
							className={cn(styles.likeButton, {
								[styles.likedButton]: isLiked
							})}
							disabled={isLikeLoading}
							onClick={() => updateLike(video.id)}
						>
							{isLiked ? <RiHeart2Fill /> : <RiHeart2Line />}
							Like
						</button>
					) : (
						<div></div>
					)}
				</div>

				<div className={styles.number_info}>
					<div>
						<IoEyeSharp />
						<span>{formatNumberToK(video.views)} views</span>
					</div>
					<div>
						<RiHeart2Fill />
						<span>{formatNumberToK(video.likesCount)} likes</span>
					</div>
					<div>
						<HiCalendar />
						<span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
					</div>
					<div className={styles.wrapper_second_buttons}>
						<Button
							isGrey={true}
							onClick={() =>
								handleCopy({
									text: `${video.name} | Смотреть: ${
										process.env.APP_URL + path
									}`,
									textSuccess: 'Вы успешно скопировали ссылку на видео!',
									textError: 'Вы не можете скопировать ссылку на это видео!'
								})
							}
						>
							{isCopied ? <IoMdThumbsUp /> : <IoMdShare />}
						</Button>
						{profile.playlists && (
							<ToggleVideo video={video} playlists={profile.playlists} />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoDetail
