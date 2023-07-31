import { FC } from 'react'
import SuccessMessage from '@/components/ui/modal-success-message/SuccessMessage'
import { Controller } from 'react-hook-form'
import { useToggleVideoForm } from '@/components/pages/video/toggle-video/create-playlist-form/useToggleVideoForm'
import dynamic from 'next/dynamic'
import { IPlaylist } from '@/types/playlist.interface'
import { IVideo } from '@/types/video.interface'
import ToggleInformation from '@/components/pages/video/toggle-video/create-playlist-form/toggle-information/ToggleInformation'
import { formatSavedPlaylists } from '@/utils/format-saved-playlists'
import Catalog from '@/components/ui/catalog/Catalog'
import FooterFormSection from '@/components/ui/footer-form-section/FooterFormSection'

import styles from '../ToggleVideo.module.scss'

const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false
})

const ToggleVideoForm: FC<{
	playlists: IPlaylist[]
	video: IVideo
	handleCloseModal: () => void
}> = ({ playlists, video, handleCloseModal }) => {
	const { form, status } = useToggleVideoForm({
		videoId: video.id,
		handleCloseModal
	})

	const savedPlaylists = formatSavedPlaylists({ playlists, video })

	const selectPlaylists = playlists.map(item => ({
		value: String(item.id),
		label: item.name
	}))

	return (
		<form onSubmit={form.handleSubmit(form.onSubmit)} className={styles.form}>
			{status.isSuccess && (
				<SuccessMessage title={'Плейлист успешно загружен!'} />
			)}
			<div className={styles.fields}>
				<Controller
					control={form.control}
					name='playlistOption'
					render={({ field, fieldState: { error } }) => (
						<DynamicSelect
							field={field}
							options={selectPlaylists || []}
							placeholder='Выберите плейлист'
							error={error}
						/>
					)}
					rules={{
						required:
							'Пожалуйста выберите плейлист, в который вы хотите сохранить видео!'
					}}
				/>
				<div className={styles.catalog}>
					<Catalog
						isSmallPlaylist={true}
						title={'Сохранено'}
						newPlaylists={(savedPlaylists as IPlaylist[]) || []}
					/>
				</div>
			</div>
			<div className={styles.info}>
				<ToggleInformation video={video} />
			</div>

			<FooterFormSection title={'Подтвердить'} />
		</form>
	)
}

export default ToggleVideoForm
