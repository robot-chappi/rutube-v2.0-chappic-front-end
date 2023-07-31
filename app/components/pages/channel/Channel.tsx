import { FC } from 'react'
import { IChannel } from '@/components/pages/channel/interfaces/channel.interface'
import Layout from '@/components/layout/Layout'

import styles from './Channel.module.scss'
import Catalog from '@/components/ui/catalog/Catalog'
import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'
import Alert from '@/components/pages/alert/Alert'

const Channel: FC<IChannel> = ({ channel }) => {
	return channel.id ? (
		<Layout title={channel.name} description={channel.description}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<ChannelInfoSmall channel={channel} />
					<SubscribeButton channelIdForSubscribe={channel.id} />
				</div>
				<article className={styles.description}>{channel.description}</article>
			</div>
			<Catalog newVideos={channel.videos || []} />
		</Layout>
	) : (
		<Alert
			title={'Не существует'}
			description={
				'Данного канала не существует, вернитесь на главную страницу'
			}
			layoutTitle={'Waiting'}
			link={'/'}
			linkText={'Вернуться на главную'}
			isPage={true}
		/>
	)
}

export default Channel
