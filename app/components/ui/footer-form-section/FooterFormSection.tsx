import { FC } from 'react'

import styles from './FooterFormSection.module.scss'
import Button from '@/components/ui/button/Button'

const FooterFormSection: FC<{ title: string }> = ({ title }) => {
	return (
		<div className={styles.footer}>
			<div></div>
			<div>
				<Button>{title}</Button>
			</div>
		</div>
	)
}

export default FooterFormSection
