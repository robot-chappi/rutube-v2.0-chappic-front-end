import { FC } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/store/api/api'
import { useOutside } from '@/hooks/useOutside'
import { useActions } from '@/hooks/useActions'

import styles from './ProfileMenu.module.scss'
import Image from 'next/image'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import Link from 'next/link'
import UploadVideo from '@/components/layout/header/upload-video/UploadVideo'
import CreatePlaylist from '@/components/layout/header/create-playlist/CreatePlaylist'

const ProfileMenu: FC = () => {
	const { user } = useAuth()

	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user
	})

	const { isShow, setIsShow, ref } = useOutside(false)

	const { logout } = useActions()

	if (isLoading) return null

	return (
		<div ref={ref} className={styles.wrapper}>
			<button onClick={() => setIsShow(!isShow)}>
				<Image
					src={data?.avatarPath || ''}
					alt={data?.name}
					width={40}
					height={40}
					priority
				/>
				<span className={styles.name}>{data?.name}</span>
				{isShow ? <GoChevronUp /> : <GoChevronDown />}
			</button>

			{isShow && (
				<div className={styles['profile-menu']}>
					<ul>
						<li>
							<Link href={`/c/${user?.id}`}>
								<a>Мой канал</a>
							</Link>
						</li>
						<li>
							<Link href={'/studio'}>
								<a>В студию</a>
							</Link>
						</li>
						<li>
							<button onClick={logout}>Выйти</button>
						</li>
					</ul>
					<div className={styles.actions}>
						<UploadVideo />
						<CreatePlaylist />
					</div>
				</div>
			)}
		</div>
	)
}

export default ProfileMenu
