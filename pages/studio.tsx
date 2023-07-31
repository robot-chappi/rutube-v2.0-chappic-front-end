import { NextPageAuth } from '@/providers/interfaces/private-route.interface'
import Studio from '@/components/pages/studio/Studio'

const StudioPage: NextPageAuth = () => {
	return <Studio />
}

StudioPage.isOnlyUser = true

export default StudioPage
