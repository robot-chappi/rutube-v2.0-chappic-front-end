import { TextareaHTMLAttributes } from 'react'

import { IFieldProps } from '@/components/ui/field/interfaces/field.interface'

type TypeInputPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
	IFieldProps

export interface ITextArea extends TypeInputPropsField {}
