import { FC } from 'react'
import cn from 'classnames'
import styles from './SubscribeButton.module.scss'
import { BsPersonPlusFill } from 'react-icons/bs'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'

const SubscribeButton: FC<{ channelIdForSubscribe: number }> = ({
	channelIdForSubscribe
}) => {
	const { user } = useAuth()

	const { data: profile } = api.useGetProfileQuery(null, {
		skip: !user
	})

	const [subscribe, { isLoading, data }] = api.useSubscribeToChannelMutation()

	if (user?.id === channelIdForSubscribe) return null

	const isSubscribed =
		profile?.subscriptions?.some(
			sub => sub.toChannel.id === channelIdForSubscribe
		) || !!data

	return user ? (
		<button
			className={cn(styles.button, {
				[styles.subscribed]: isSubscribed
			})}
			onClick={() => subscribe(channelIdForSubscribe).unwrap()}
			disabled={isLoading}
		>
			<BsPersonPlusFill />
			{isSubscribed ? 'Уже подписан' : 'Подписаться'}
		</button>
	) : (
		<button className={cn(styles.button)}>
			<BsPersonPlusFill />
			Авторизуйтесь
		</button>
	)
}

export default SubscribeButton
