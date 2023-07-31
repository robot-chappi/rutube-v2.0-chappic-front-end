import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { Options } from 'react-select'

export interface IOption {
	value: string
	label: string
}

export interface ISelect {
	options: Options<IOption>
	isMulti?: boolean
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	placeholder: string
	error?: FieldError | undefined
}
