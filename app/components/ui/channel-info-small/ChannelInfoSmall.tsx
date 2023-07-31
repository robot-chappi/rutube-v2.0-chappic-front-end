import { FC } from 'react'

import styles from './ChannelInfoSmall.module.scss'
import { IUser } from '@/types/user.interface'
import UserAvatar from '@/components/ui/user-avatar/UserAvatar'
import { formatNumberToK } from '@/utils/format-number-to-k'

const ChannelInfoSmall: FC<{ channel: IUser; message?: string }> = ({
	channel,
	message
}) => {
	return (
		<div className={styles.profile_info}>
			{channel.avatarPath && <UserAvatar user={channel} />}

			<div className={styles.info}>
				<div className={styles.name}>{channel.name}</div>
				<div className={styles.subscribers_count}>
					{message ||
						formatNumberToK(channel.subscribersCount) + ' subscribers'}
				</div>
			</div>
		</div>
	)
}

export default ChannelInfoSmall
