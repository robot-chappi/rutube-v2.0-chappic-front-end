import { SubmitHandler, useForm } from 'react-hook-form'
import { IPlaylistDto } from '@/types/playlist.interface'
import { playlistApi } from '@/store/api/playlist.api'

interface IUseCreatePlaylistForm {
	handleCloseModal: () => void
	playlistId: number
}

export const useCreatePlaylistForm = ({
	handleCloseModal,
	playlistId
}: IUseCreatePlaylistForm) => {
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		reset
	} = useForm<IPlaylistDto>({ mode: 'onChange' })

	const [updatePlaylist, { isSuccess }] =
		playlistApi.useUpdatePlaylistMutation()

	const onSubmit: SubmitHandler<IPlaylistDto> = data => {
		updatePlaylist({ ...data, id: playlistId })
			.unwrap()
			.then(() => {
				handleCloseModal()
				reset()
			})
	}

	const thumbnailPath = watch('thumbnailPath')

	return {
		form: {
			register,
			errors,
			control,
			handleSubmit,
			onSubmit
		},
		media: {
			thumbnailPath
		},
		status: {
			isSuccess
		}
	}
}
