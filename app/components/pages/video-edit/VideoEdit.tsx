import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { videoApi } from '@/store/api/video.api'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IVideoDto } from '@/types/video.interface'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/loader/Loader'
import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'
import { IMediaResponse } from '@/services/media/interfaces/media.interface'
import TogglePublic from '@/components/ui/toggle-public/TogglePublic'
import VideoInformation from '@/components/layout/header/upload-video/upload-video-form/video-information/VideoInformation'
import Button from '@/components/ui/button/Button'
import { toastr } from 'react-redux-toastr'
import Alert from '@/components/pages/alert/Alert'
import styles from './VideoEdit.module.scss'

const VideoEdit: FC = () => {
	const { query } = useRouter()
	const videoId = Number(query.id)

	const { data, isLoading, isSuccess } = videoApi.useGetVideoByIdQuery(
		videoId,
		{
			skip: !videoId
		}
	)

	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue,
		getValues
	} = useForm<IVideoDto>({
		mode: 'onChange'
	})

	const [videoDuration, setVideoDuration] = useState<number>(0)

	const handleUploadVideo = (value: IMediaResponse) => {
		setValue('videoPath', value.url)
	}

	useEffect(() => {
		if (!watch('name') && data) {
			setValue('name', data.name)
			setValue('description', data.description)
			setValue('videoPath', data.videoPath)
			setValue('thumbnailPath', data.thumbnailPath)
			setValue('isPublic', data.isPublic)
			setValue('duration', data.duration)
			setVideoDuration(data.duration)
		}
	}, [data, setValue, watch])

	const [updateVideo, { isLoading: isUpdateLoading }] =
		videoApi.useUpdateVideoMutation()

	const { push } = useRouter()

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({
			...data,
			duration: videoDuration,
			id: videoId
		})
			.unwrap()
			.then(() => {
				toastr.success('Статус', 'Видео обновлено!')
				push('/studio')
			})
	}

	return isSuccess ? (
		<Layout title={'Редактирование видео'}>
			<div>
				{isLoading ? (
					<Loader count={5} />
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
							<div className={'mt-8'}>
								<span className={'text-white mb-2 block'}>Видео: </span>
								<Controller
									control={control}
									name={'videoPath'}
									render={() => (
										<UploadField
											folder={'videos'}
											onChange={handleUploadVideo}
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
							<VideoInformation
								duration={videoDuration}
								setVideoDuration={setVideoDuration}
								videoPath={watch('videoPath')}
								videoId={videoId}
								isUploaded
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
			description={'Данного видео не существует, вернитесь на главную страницу'}
			layoutTitle={'Waiting'}
			link={'/'}
			linkText={'Вернуться на главную'}
			isPage={true}
		/>
	)
}

export default VideoEdit
