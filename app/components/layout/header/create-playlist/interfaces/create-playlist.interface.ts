import { Dispatch, SetStateAction } from 'react'

export interface ICreateModal {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	playlistId: number
}
