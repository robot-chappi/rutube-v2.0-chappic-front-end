import { IMenuItem } from '@/components/layout/sidebar/menu/interfaces/menu.interface'
import { HiChartBar, HiCollection, HiHome, HiStar } from 'react-icons/hi'
import { BsCollectionPlayFill, BsJournalBookmarkFill } from 'react-icons/bs'

export const menu: IMenuItem[] = [
	{
		title: 'Главная',
		icon: HiHome,
		link: '/',
		verified: false
	},
	{
		title: 'Тренды',
		icon: HiChartBar,
		link: '/trending',
		verified: false
	},
	{
		title: 'Коллекции',
		icon: BsJournalBookmarkFill,
		link: '/playlists',
		verified: false
	},
	{
		title: 'Мой канал',
		icon: HiStar,
		link: '/my-channel',
		verified: true
	},
	{
		title: 'Мои подписки',
		icon: HiCollection,
		link: '/subscriptions',
		verified: true
	},
	{
		title: 'Сохраненные',
		icon: BsCollectionPlayFill,
		link: '/saved-playlists',
		verified: true
	}
]
