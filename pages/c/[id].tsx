import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { UserService } from '@/services/user/user.service'
import { IChannel } from '@/components/pages/channel/interfaces/channel.interface'
import Channel from '@/components/pages/channel/Channel'
import { IUser } from '@/types/user.interface'
import Alert from '@/components/pages/alert/Alert'

const ChannelPage: NextPage<IChannel> = ({ channel }) => {
	return channel.id ? (
		<Channel channel={channel} />
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

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: users } = await UserService.getAll()
		const paths = users.map(user => ({
			params: {
				id: String(user.id)
			}
		}))

		return {
			paths,
			fallback: 'blocking'
		}
	} catch (e) {
		return {
			paths: [],
			fallback: false
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: channel } = await UserService.getUser(Number(params?.id))

		return {
			props: {
				channel
			} as IChannel,
			revalidate: 60
		}
	} catch (e) {
		return {
			props: {
				channel: {} as IUser
			} as IChannel
		}
	}
}
export default ChannelPage
