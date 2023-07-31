import { FC, useState } from 'react'
import { useOutside } from '@/hooks/useOutside'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthFields } from '@/components/layout/header/auth-form/interfaces/auth-form.interface'

import styles from './AuthForm.module.scss'
import stylesIcon from '../icons-right/IconsRight.module.scss'
import { FaUserCircle } from 'react-icons/fa'
import Field from '@/components/ui/field/Field'
import { validEmail } from '@/components/layout/header/auth-form/auth.valid'
import Button from '@/components/ui/button/Button'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

const AuthForm: FC = () => {
	const { ref, setIsShow, isShow } = useOutside(false)

	const [type, setType] = useState<'login' | 'register'>('login')

	const { login, register: registerAction } = useActions()

	const { isLoading } = useAuth()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IAuthFields>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthFields> = data => {
		if (type === 'login') login(data)
		else if (type === 'register') registerAction(data)
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			<button className={stylesIcon.button} onClick={() => setIsShow(!isShow)}>
				<FaUserCircle fill={'#A4A4A4'} />
			</button>

			{isShow && (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Field
						{...register('email', {
							required: 'Email обязателен!',
							pattern: {
								value: validEmail,
								message: 'Не валидный Email!'
							}
						})}
						placeholder={'Email'}
						error={errors.email}
					/>
					<Field
						{...register('password', {
							required: 'Пароль обязателен!',
							minLength: {
								value: 6,
								message: 'Мин. длина пароля - 6 символов'
							}
						})}
						placeholder={'Пароль'}
						error={errors.password}
						type={'password'}
					/>

					<div className={'mt-5 mb-1 text-center'}>
						<Button onClick={() => setType('login')} disabled={isLoading}>
							Войти
						</Button>
					</div>
					<button
						className={styles.register}
						onClick={() => setType('register')}
						disabled={isLoading}
					>
						Регистрация
					</button>
				</form>
			)}
		</div>
	)
}

export default AuthForm
