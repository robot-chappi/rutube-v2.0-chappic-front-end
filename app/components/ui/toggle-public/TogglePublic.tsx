import { Switch } from '@headlessui/react'
import cn from 'classnames'
import { FC } from 'react'

import { ITogglePublic } from '@/components/ui/toggle-public/interfaces/toggle-public.interface'

import styles from './TogglePublic.module.scss'

const TogglePublic: FC<ITogglePublic> = ({ isEnabled, clickHandler }) => {
	return (
		<div className={styles.wrapper}>
			<Switch
				checked={isEnabled}
				onChange={clickHandler}
				className={cn(styles.switch, {
					'bg-primary bg-opacity-80': isEnabled,
					'bg-gray-200': !isEnabled
				})}
			>
				<span
					className={cn(styles.point, {
						'translate-x-6': isEnabled,
						'translate-x-1': !isEnabled
					})}
				/>
			</Switch>
			<span onClick={clickHandler}>Публичное?</span>
		</div>
	)
}

export default TogglePublic
