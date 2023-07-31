import { FC, PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { TypeComponentAuthFields } from '@/providers/interfaces/private-route.interface'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
	ssr: false
})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyUser },
	children
}) => {
	return !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	)
}

export default AuthProvider
