import { FC } from 'react'
import { useRouter } from 'next/router'
import cn from 'classnames'
import styles from './PlaylistItem.module.scss'
import { BiEdit, BiTrash } from 'react-icons/bi'
import Image from 'next/image'
import UserAvatar from '@/components/ui/user-avatar/UserAvatar'
import Link from 'next/link'
import { IPlaylistItem } from '@/components/ui/playlist-item/interfaces/playlist-item.interface'
import PlaylistStatistics from '@/components/ui/playlist-item/PlaylistStatistics'

const PlaylistItem: FC<IPlaylistItem> = ({
	item,
	isSmall,
	removeHandler,
	isUpdateLink
}) => {
	const { push } = useRouter()

	return (
		<div
			className={cn(styles.playlist_item, {
				[styles.small]: isSmall
			})}
		>
			{!!removeHandler && (
				<button
					className={'absolute bottom-14 right-3 z-10'}
					onClick={() => removeHandler(item.id)}
				>
					<BiTrash className={'text-lg text-red-700'} />
				</button>
			)}
			{isUpdateLink && (
				<button
					className={'absolute bottom-14 right-11 z-10'}
					onClick={() => push(`/playlist/edit/${item.id}`)}
				>
					<BiEdit className={'text-lg text-blue-600'} />
				</button>
			)}

			<div className={styles.thumbnail}>
				{item.thumbnailPath && (
					<Image
						src={item.thumbnailPath}
						alt={item.name}
						width={185}
						height={103}
						layout={'responsive'}
						priority
					/>
				)}
				{item?.user?.avatarPath && (
					<div className={'absolute right-3 -bottom-7'}>
						<UserAvatar user={item.user} />
					</div>
				)}
			</div>

			<div className={styles.information}>
				{!isSmall && <div className={styles.author}>{item.user?.name}</div>}
				<Link href={`/p/${item.id}`}>
					<a className={styles.name}>{item.name}</a>
				</Link>
				<PlaylistStatistics
					saveCount={item.saveCount}
					videosCount={item.videosCount}
					createdAt={!isSmall ? item.createdAt : undefined}
				/>
			</div>
		</div>
	)
}

export default PlaylistItem
