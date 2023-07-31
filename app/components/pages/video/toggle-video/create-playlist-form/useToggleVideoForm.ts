import { SubmitHandler, useForm } from 'react-hook-form'
import { playlistApi } from '@/store/api/playlist.api'
import { IOption } from '@/components/ui/select/interfaces/select.interface'
import { toastr } from 'react-redux-toastr'

interface IUseCreatePlaylistForm {
	handleCloseModal: () => void
	videoId: number
}

export const useToggleVideoForm = ({
	handleCloseModal,
	videoId
}: IUseCreatePlaylistForm) => {
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		reset
	} = useForm<{ playlistOption: IOption }>({ mode: 'onChange' })

	const [togglePlaylist, { isSuccess }] = playlistApi.useToggleVideoMutation()

	const onSubmit: SubmitHandler<{ playlistOption: IOption }> = ({
		playlistOption
	}) => {
		togglePlaylist({ playlistId: Number(playlistOption), videoId })
			.unwrap()
			.then(() => {
				toastr.success('Успешно', 'Действие выполненно успешно!')
				handleCloseModal()
				reset()
			})
	}

	return {
		form: {
			register,
			errors,
			control,
			handleSubmit,
			onSubmit
		},
		status: {
			isSuccess
		}
	}
}
