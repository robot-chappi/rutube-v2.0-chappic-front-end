import { NextPageAuth } from '@/providers/interfaces/private-route.interface'
import Subscriptions from '@/components/pages/subscriptions/Subscriptions'

const MySubscriptionsPage: NextPageAuth = () => {
	return <Subscriptions />
}

MySubscriptionsPage.isOnlyUser = true

export default MySubscriptionsPage
