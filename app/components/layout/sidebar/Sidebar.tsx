import { FC } from 'react'

import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Menu from '@/components/layout/sidebar/menu/Menu'
import { menu } from '@/components/layout/sidebar/menu/menu.data'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'
import { getChannelLink } from '../../../configs/app.config'
import cn from 'classnames'
import { IoMdClose } from 'react-icons/io'
import Button from '@/components/ui/button/Button'

const Sidebar: FC<{
	isOpenSidebar: boolean
	setIsOpenSidebar: (openSidebar: boolean) => void
}> = ({ isOpenSidebar, setIsOpenSidebar }) => {
	const { user } = useAuth()

	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user
	})

	return (
		<aside
			className={cn(styles.sidebar, {
				[styles.open]: isOpenSidebar
			})}
		>
			<div className={styles.wrapper_logo}>
				<Link href={'/'}>
					<a className={styles.logo}>Rutube 2.0</a>
				</Link>
				<Button
					isTransparent={true}
					isIcon={true}
					onClick={() => setIsOpenSidebar(!isOpenSidebar)}
				>
					<IoMdClose />
				</Button>
			</div>
			<Menu title={'Меню'} items={menu} />

			{user && (
				<Menu
					title={'Мои подписки'}
					items={
						data?.subscriptions.map(({ toChannel }) => ({
							image: toChannel.avatarPath,
							title: toChannel.name,
							link: getChannelLink(String(toChannel.id))
						})) || []
					}
				/>
			)}

			<div className={styles.copy}>
				&copy; 2022 RUTUBE 2.0 by Fedoskov Daniil [Chappic]
			</div>
		</aside>
	)
}

export default Sidebar
