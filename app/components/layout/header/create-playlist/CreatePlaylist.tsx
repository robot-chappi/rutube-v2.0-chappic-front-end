import { FC, useState } from 'react'
import { playlistApi } from '@/store/api/playlist.api'

import stylesIcon from '../icons-right/IconsRight.module.scss'
import { MdCreate } from 'react-icons/md'
import CreateModal from '@/components/layout/header/create-playlist/CreateModal'

const CreatePlaylist: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [playlistId, setPlaylistId] = useState<number>(0)

	const [createPlaylist, { isLoading }] =
		playlistApi.useCreatePlaylistMutation()

	return (
		<>
			<button
				className={stylesIcon.button}
				disabled={isLoading}
				onClick={() => {
					createPlaylist()
						.unwrap()
						.then(id => {
							setPlaylistId(+id)
							setIsOpen(true)
						})
				}}
			>
				<MdCreate />
			</button>
			<CreateModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				playlistId={playlistId}
			/>
		</>
	)
}

export default CreatePlaylist
