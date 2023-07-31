import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { playlistApi } from '@/store/api/playlist.api'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IPlaylistDto } from '@/types/playlist.interface'
import { toastr } from 'react-redux-toastr'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/loader/Loader'
import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'
import { IMediaResponse } from '@/services/media/interfaces/media.interface'
import TogglePublic from '@/components/ui/toggle-public/TogglePublic'
import Button from '@/components/ui/button/Button'
import PlaylistInformation from '@/components/layout/header/create-playlist/create-playlist-form/playlist-information/PlaylistInformation'
import Alert from '@/components/pages/alert/Alert'
import styles from './PlaylistEdit.module.scss'

const PlaylistEdit: FC = () => {
	const { query } = useRouter()
	const playlistId = Number(query.id)

	const { data, isLoading, isSuccess } = playlistApi.useGetPlaylistByIdQuery(
		playlistId,
		{
			skip: !playlistId
		}
	)

	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue
	} = useForm<IPlaylistDto>({
		mode: 'onChange'
	})

	useEffect(() => {
		if (!watch('name') && data) {
			setValue('name', data.name)
			setValue('description', data.description)
			setValue('thumbnailPath', data.thumbnailPath)
			setValue('isPublic', data.isPublic)
		}
	}, [data])

	const [updatePlaylist, { isLoading: isUpdateLoading }] =
		playlistApi.useUpdatePlaylistMutation()

	const { push } = useRouter()

	const onSubmit: SubmitHandler<IPlaylistDto> = data => {
		updatePlaylist({ ...data, id: playlistId })
			.unwrap()
			.then(() => {
				toastr.success('Статус', 'Плейлист обновлен!')
				push('/studio')
			})
	}

	return isSuccess ? (
		<Layout title={'Редактирование плейлиста'}>
			<div>
				{isLoading ? (
					<Loader count={4} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<div className={styles.fields}>
							<Field
								{...register('name', {
									required: 'Название обязательно!'
								})}
								placeholder={'Название'}
								error={errors.name}
							/>
							<TextArea
								{...register('description', {
									required: 'Описание обязательно!'
								})}
								placeholder={'Описание'}
								error={errors.description}
							/>
							<div className={'mt-8'}>
								<Controller
									control={control}
									name={'thumbnailPath'}
									render={({ field: { onChange } }) => (
										<UploadField
											folder={'thumbnailPath'}
											onChange={(value: IMediaResponse) => {
												onChange(value.url)
											}}
										/>
									)}
								/>
							</div>
							<Controller
								control={control}
								name={'isPublic'}
								render={({ field: { onChange, value } }) => (
									<TogglePublic
										isEnabled={!!value}
										clickHandler={() => {
											onChange(!value)
										}}
									/>
								)}
							/>
						</div>
						<div className={styles.info}>
							<PlaylistInformation
								playlistId={playlistId}
								thumbnailPath={watch('thumbnailPath')}
							/>
						</div>

						<div className={styles.button}>
							<Button>{isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}</Button>
						</div>
					</form>
				)}
			</div>
		</Layout>
	) : (
		<Alert
			title={'Не существует'}
			description={
				'Данного плейлиста не существует, вернитесь на главную страницу'
			}
			layoutTitle={'Waiting'}
			link={'/'}
			linkText={'Вернуться на главную'}
			isPage={true}
		/>
	)
}

export default PlaylistEdit
