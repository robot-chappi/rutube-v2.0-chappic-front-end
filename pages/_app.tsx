import '../app/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import ReduxToastrLib from 'react-redux-toastr'
import NextProgressBar from 'nextjs-progressbar'
import AuthProvider from '@/providers/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/interfaces/private-route.interface'
import { QueryClient, QueryClientProvider } from 'react-query'

type TypeAppProps = AppProps & TypeComponentAuthFields

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: TypeAppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<NextProgressBar
				color={'#FF7652'}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={null}>
					<AuthProvider Component={Component}>
						<Component {...pageProps} />
						<ReduxToastrLib
							newestOnTop={false}
							preventDuplicates
							progressBar
							closeOnToastrClick
							timeOut={4000}
							transitionIn={'fadeIn'}
							transitionOut={'fadeOut'}
						/>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

export default MyApp
