import { FC, useState } from 'react'

import ToggleModal from '@/components/pages/video/toggle-video/ToggleModal'
import { IPlaylist } from '@/types/playlist.interface'
import { AiFillFolderAdd } from 'react-icons/ai'
import { IVideo } from '@/types/video.interface'
import Button from '@/components/ui/button/Button'

const ToggleVideo: FC<{
	video: IVideo
	playlists: IPlaylist[]
}> = ({ video, playlists }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<>
			<Button isWhite={true} onClick={() => setIsOpen(true)}>
				<AiFillFolderAdd />
			</Button>
			<ToggleModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				video={video}
				playlists={playlists}
			/>
		</>
	)
}

export default ToggleVideo
