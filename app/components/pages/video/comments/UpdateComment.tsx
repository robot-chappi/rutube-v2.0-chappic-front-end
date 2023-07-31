import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'

import styles from '@/components/layout/header/auth-form/AuthForm.module.scss'
import Field from '@/components/ui/field/Field'

import { ICommentUpdateDto } from '@/types/comment.interface'

import { commentApi } from '@/store/api/comment.api'

const UpdateCommentForm: FC<{
	videoId: number
	commentId: number
	message: string
	setIsOpen: Dispatch<SetStateAction<boolean>>
	isOpen: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}> = ({ videoId, commentId, message, setIsOpen, isOpen, setIsShow }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		setValue
	} = useForm<ICommentUpdateDto>({
		mode: 'onChange'
	})

	const [updateComment, { isLoading }] = commentApi.useUpdateCommentMutation()

	const onSubmit: SubmitHandler<ICommentUpdateDto> = async data => {
		updateComment({ ...data, videoId, commentId })
			.unwrap()
			.then(() => {
				setIsShow(false)
				setIsOpen(!isOpen)
				reset()
			})
	}

	useEffect(() => {
		setValue('message', message)
		setIsShow(false)
	}, [message, setIsShow, setValue])

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={'relative'}>
				<Field
					{...register('message', {
						required: 'Сообщение обязательно!'
					})}
					placeholder='Введите комментарий'
					error={errors.message}
				/>

				<button
					className={'text-xl absolute right-2 top-1.5 text-purple'}
					disabled={isLoading}
				>
					<MdSend />
				</button>
			</div>
		</form>
	)
}

export default UpdateCommentForm
