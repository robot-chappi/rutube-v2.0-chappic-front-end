import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import styles from './Button.module.scss'
import { IButton } from '@/components/ui/button/interfaces/button.interface'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	isWhite,
	isBlack,
	isGrey,
	isTransparent,
	isIcon,
	...rest
}) => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.white]: isWhite,
				[styles.black]: isBlack,
				[styles.grey]: isGrey,
				[styles.transparent]: isTransparent,
				[styles.icon]: isIcon
			})}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button
