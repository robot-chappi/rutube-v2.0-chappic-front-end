import { FC } from 'react'
import { useCreatePlaylistForm } from '@/components/layout/header/create-playlist/create-playlist-form/useCreatePlaylistForm'
import SuccessMessage from '@/components/ui/modal-success-message/SuccessMessage'
import Field from '@/components/ui/field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import { Controller } from 'react-hook-form'
import UploadField from '@/components/ui/upload-field/UploadField'
import { IMediaResponse } from '@/services/media/interfaces/media.interface'
import TogglePublic from '@/components/ui/toggle-public/TogglePublic'
import PlaylistInformation from '@/components/layout/header/create-playlist/create-playlist-form/playlist-information/PlaylistInformation'
import FooterFormSection from '@/components/ui/footer-form-section/FooterFormSection'

import styles from '../CreatePlaylist.module.scss'

const CreatePlaylistForm: FC<{
	playlistId: number
	handleCloseModal: () => void
}> = ({ playlistId, handleCloseModal }) => {
	const { form, status, media } = useCreatePlaylistForm({
		playlistId,
		handleCloseModal
	})

	return (
		<form
			onSubmit={form.handleSubmit(form.onSubmit)}
			className={'flex flex-wrap'}
		>
			{status.isSuccess && (
				<SuccessMessage title={'Плейлист успешно загружен!'} />
			)}
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
				<PlaylistInformation
					playlistId={playlistId}
					thumbnailPath={media.thumbnailPath}
				/>
			</div>

			<FooterFormSection title={'Сохранить'} />
		</form>
	)
}

export default CreatePlaylistForm
