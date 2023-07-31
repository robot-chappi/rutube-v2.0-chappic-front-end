import { FC, PropsWithChildren, useState } from 'react'
import Head from 'next/head'

import styles from './Layout.module.scss'
import Sidebar from '@/components/layout/sidebar/Sidebar'
import Header from '@/components/layout/header/Header'
import { useRouter } from 'next/router'
import { siteName, titleMerge } from '../../configs/seo.config'
import { onlyText } from '@/utils/clearText'

const Layout: FC<
	PropsWithChildren<{ title: string; description?: string }>
> = ({ title, description, children }) => {
	const { asPath } = useRouter()
	const currentUrl = `${process.env.APP_URL}${asPath}`

	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false)

	return (
		<>
			<Head>
				<title itemProp={'headline'}>{titleMerge(title)}</title>

				{description ? (
					<>
						<meta
							itemProp='description'
							name='description'
							content={onlyText(description, 152)}
						/>
						<link rel='canonical' href={currentUrl} />
						<meta property='og:locale' content='en' />
						<meta property='og:title' content={titleMerge(title)} />
						<meta property='og:url' content={currentUrl} />
						<meta property='og:image' content={'/favicon.svg'} />
						<meta property='og:site_name' content={siteName} />
						<meta
							property='og:description'
							content={onlyText(description, 197)}
						/>
					</>
				) : (
					<meta name='robots' content='noindex, nofollow' />
				)}
			</Head>
			<main className={styles.main}>
				<Sidebar
					isOpenSidebar={isOpenSidebar}
					setIsOpenSidebar={setIsOpenSidebar}
				/>
				<section className={styles.content}>
					<Header
						isOpenSidebar={isOpenSidebar}
						setIsOpenSidebar={setIsOpenSidebar}
					/>
					<div className={styles.wrapper}>{children}</div>
				</section>
			</main>
		</>
	)
}

export default Layout
