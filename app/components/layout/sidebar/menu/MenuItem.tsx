import { FC } from 'react'
import { IMenuItem } from '@/components/layout/sidebar/menu/interfaces/menu.interface'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Menu.module.scss'
import Image from 'next/image'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter()

	return (
		<li>
			<Link href={item.link}>
				<a className={asPath === item.link ? styles.active : ''}>
					<span className={item.image ? styles.image : ''}>
						{item.icon && <item.icon />}
						{item.image && (
							<Image src={item.image} width={40} height={40} alt={item.title} />
						)}
					</span>
					<b>{item.title}</b>
				</a>
			</Link>
		</li>
	)
}

export default MenuItem
