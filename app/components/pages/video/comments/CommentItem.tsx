import { FC, useState } from 'react'

import styles from './CommentItem.module.scss'
import { IComment } from '@/types/comment.interface'
import { useOutside } from '@/hooks/useOutside'
import UserAvatar from '@/components/ui/user-avatar/UserAvatar'
import { BiDotsVerticalRounded, BiEdit } from 'react-icons/bi'
import Link from 'next/link'
import { getChannelLink } from '../../../../configs/app.config'
import { useAuth } from '@/hooks/useAuth'
import { AiFillDelete } from 'react-icons/ai'
import { commentApi } from '@/store/api/comment.api'
import UpdateComment from '@/components/pages/video/comments/UpdateComment'

const CommentItem: FC<{ comment: IComment }> = ({ comment }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { user } = useAuth()
	const { isShow, setIsShow, ref } = useOutside(false)

	const [deleteComment, { isLoading }] = commentApi.useDeleteCommentMutation()

	return (
		<div ref={ref} className={styles.comment}>
			{comment.user.avatarPath && <UserAvatar user={comment.user} />}

			<div className={styles.info}>
				<div className={styles.name}>{comment.user.name}</div>
				{isOpen ? (
					<UpdateComment
						commentId={comment.id}
						videoId={comment.video.id}
						message={comment.message}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						setIsShow={setIsShow}
					/>
				) : (
					<div className={styles.message}>{comment.message}</div>
				)}
			</div>
			<div className={styles.list}>
				<button onClick={() => setIsShow(!isShow)}>
					<BiDotsVerticalRounded />
				</button>
				{isShow && (
					<div className={styles.menu}>
						<ul>
							{user?.id === comment.user.id ? (
								<>
									<li>
										<button onClick={() => setIsOpen(!isOpen)}>
											<BiEdit />
										</button>
									</li>
									<li>
										<button
											onClick={() =>
												deleteComment({
													commentId: comment.id,
													videoId: comment.video.id
												}).unwrap()
											}
											disabled={isLoading}
										>
											<AiFillDelete />
										</button>
									</li>
								</>
							) : (
								<li>
									<Link href={getChannelLink(String(comment.user.id))}>
										<a>Канал</a>
									</Link>
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default CommentItem
