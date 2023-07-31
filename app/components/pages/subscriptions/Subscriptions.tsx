import { FC } from 'react'
import { api } from '@/store/api/api'
import Layout from '@/components/layout/Layout'
import Menu from '@/components/layout/sidebar/menu/Menu'
import { getChannelLink } from '../../../configs/app.config'

const Subscriptions: FC = () => {
	const { data } = api.useGetProfileQuery(null)
	return (
		<Layout title={'Мои подписки'}>
			<Menu
				title={'Мои подписки'}
				items={
					data?.subscriptions.map(({ toChannel }) => ({
						title: toChannel.name,
						image: toChannel.avatarPath,
						link: getChannelLink(String(toChannel.id))
					})) || []
				}
			/>
		</Layout>
	)
}

export default Subscriptions
