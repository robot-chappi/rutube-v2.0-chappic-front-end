import { ButtonHTMLAttributes } from 'react'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	isWhite?: boolean
	isBlack?: boolean
	isGrey?: boolean
	isTransparent?: boolean
	isIcon?: boolean
}
