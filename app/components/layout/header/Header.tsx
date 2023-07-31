import Search from '@/components/layout/header/search/Search'
import { FC } from 'react'

import styles from './Header.module.scss'
import IconsRight from '@/components/layout/header/icons-right/IconsRight'
import Button from '@/components/ui/button/Button'
import { BsList } from 'react-icons/bs'

const Header: FC<{
	isOpenSidebar: boolean
	setIsOpenSidebar: (openSidebar: boolean) => void
}> = ({ isOpenSidebar, setIsOpenSidebar }) => {
	return (
		<header className={styles.header}>
			<Button
				onClick={() => setIsOpenSidebar(!isOpenSidebar)}
				isTransparent={true}
				isIcon={true}
			>
				<BsList />
			</Button>
			<Search />
			<IconsRight />
		</header>
	)
}

export default Header
