import { FC } from 'react'
import { IMenuItem } from '@/components/layout/sidebar/menu/interfaces/menu.interface'
import styles from './Menu.module.scss'
import MenuItem from '@/components/layout/sidebar/menu/MenuItem'
import Line from '@/components/ui/line/Line'
import cn from 'classnames'
import { useAuth } from '@/hooks/useAuth'
import { formatMenuItems } from '@/utils/format-menu-items'

interface IMenu {
	title: string
	items: IMenuItem[]
	isScroll?: boolean
}

const Menu: FC<IMenu> = ({ items, title, isScroll }) => {
	const { user } = useAuth()

	const menuItems = formatMenuItems({ menuItems: items, user })

	return (
		<nav className={styles.mnu_sidebar}>
			<h3>{title}</h3>
			<ul
				className={cn({
					[styles.scroll]: isScroll
				})}
			>
				{menuItems.map(menuItem => (
					<MenuItem item={menuItem} key={menuItem.link} />
				))}
			</ul>
			<Line />
		</nav>
	)
}

export default Menu
