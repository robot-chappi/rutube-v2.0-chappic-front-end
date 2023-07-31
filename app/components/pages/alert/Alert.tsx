import { FC } from 'react'
import Layout from '@/components/layout/Layout'

import styles from './Alert.module.scss'
import Link from 'next/link'

const Alert: FC<{
	title: string
	layoutTitle?: string
	description: string
	link: string
	linkText: string
	isPage: boolean
}> = ({ title, layoutTitle, description, link, linkText, isPage }) => {
	return (
		<>
			{isPage ? (
				<Layout title={layoutTitle ? layoutTitle : 'Alert'}>
					<div className={styles.wrapper}>
						<div className={styles.section}>
							<div className={styles.heading}>{title}</div>
							<div className={styles.description}>{description}</div>
							<div className={styles.link}>
								<Link href={link}>
									<a>{linkText}</a>
								</Link>
							</div>
						</div>
					</div>
				</Layout>
			) : (
				<div className={styles.wrapper}>
					<div className={styles.section}>
						<div className={styles.heading}>{title}</div>
						<div className={styles.description}>{description}</div>
						<div className={styles.link}>
							<Link href={link}>
								<a>{linkText}</a>
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Alert
