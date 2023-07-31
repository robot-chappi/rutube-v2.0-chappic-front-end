import { NextPageAuth } from '@/providers/interfaces/private-route.interface'
import VideoEdit from '@/components/pages/video-edit/VideoEdit'

const VideoEditPage: NextPageAuth = () => {
	return <VideoEdit />
}

VideoEditPage.isOnlyUser = true

export default VideoEditPage
