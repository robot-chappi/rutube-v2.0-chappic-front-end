import { FC } from 'react'
import { Controller } from 'react-hook-form'

import FooterForm from '@/components/layout/header/upload-video/upload-video-form/footer-form/FooterForm'
import TogglePublic from '@/components/ui/toggle-public/TogglePublic'
import { useUploadVideoForm } from '@/components/layout/header/upload-video/upload-video-form/useUploadVideoForm'
import VideoInformation from '@/components/layout/header/upload-video/upload-video-form/video-information/VideoInformation'
import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'

import { IMediaResponse } from '@/services/media/interfaces/media.interface'

import styles from '../UploadVideo.module.scss'
import SuccessMessage from '@/components/ui/modal-success-message/SuccessMessage'

const UploadVideoForm: FC<{
	videoId: number
	handleCloseModal: () => void
}> = ({ videoId, handleCloseModal }) => {
	const { form, status, media } = useUploadVideoForm({
		videoId,
		handleCloseModal
	})

	return (
		<form
			onSubmit={form.handleSubmit(form.onSubmit)}
			className='flex flex-wrap'
		>
			{status.isSuccess && (
				<SuccessMessage title={'Видео успешно загружено!'} />
			)}
			{status.isChosen ? (
				<>
					<div className={styles.fields}>
						<Field
							{...form.register('name', {
								required: 'Название обязательно!'
							})}
							placeholder='Name'
							error={form.errors.name}
						/>
						<TextArea
							{...form.register('description', {
								required: 'Описание обязательно!'
							})}
							placeholder='Description'
							error={form.errors.description}
						/>
						<div className='mt-8'>
							<Controller
								control={form.control}
								name='thumbnailPath'
								render={({ field: { onChange } }) => (
									<UploadField
										folder='thumbnails'
										onChange={(value: IMediaResponse) => {
											onChange(value.url)
										}}
									/>
								)}
							/>
						</div>
						<Controller
							control={form.control}
							name='isPublic'
							render={({ field: { onChange, value } }) => (
								<TogglePublic
									clickHandler={() => {
										onChange(!value)
									}}
									isEnabled={!!value}
								/>
							)}
						/>
					</div>
					<div className={styles.info}>
						<VideoInformation
							duration={media.videoDuration}
							setVideoDuration={form.setVideoDuration}
							fileName={media.videoFileName}
							videoId={videoId}
							videoPath={media.videoPath}
							isUploaded={status.isUploaded}
							thumbnailPath={media.thumbnailPath}
						/>
					</div>

					<FooterForm isUploaded={status.isUploaded} percent={status.percent} />
				</>
			) : (
				<div className={styles.uploadScreen}>
					<Controller
						control={form.control}
						name='videoPath'
						render={() => (
							<UploadField
								title='Сначала, загрузи видео 👇'
								folder='videos'
								onChange={media.handleUploadVideo}
								setValue={status.setProgressPercentage}
								setIsChosen={status.setIsChosen}
							/>
						)}
					/>
				</div>
			)}
		</form>
	)
}

export default UploadVideoForm
