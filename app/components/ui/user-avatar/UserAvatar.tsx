import { FC } from 'react'

import styles from './UserAvatar.module.scss'
import { IUser } from '@/types/user.interface'
import Link from 'next/link'

import cn from 'classnames'
import Image from 'next/image'
import { IoIosCheckmarkCircle } from 'react-icons/io'

const UserAvatar: FC<{ user: IUser; isWhite?: boolean }> = ({
	user,
	isWhite
}) => {
	return (
		<Link href={`/c/${user.id}`}>
			<a>
				<span className={cn(styles.avatar, { [styles.white]: isWhite })}>
					<Image
						src={user.avatarPath || ''}
						width={45}
						height={45}
						alt={user.name}
					/>
					{user.isVerified && (
						<span className={styles.isVerified}>
							<IoIosCheckmarkCircle />
						</span>
					)}
				</span>
			</a>
		</Link>
	)
}

export default UserAvatar
