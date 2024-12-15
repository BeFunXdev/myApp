'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { Router } from 'next/router'
import { PropsWithChildren, useState } from 'react'

// const npConfig = {
// 	method: 'localStorage',
// 	allowList: {
// 		user: []
// 	}
// }

// const progress = new ProgressBar({
// 	size: 5,
// 	color: '#FF7A00',
// 	className: 'bar-of-progress',
// 	delay: 100
// })
//
// Router.events.on('routeChangeStart', progress.start)
// Router.events.on('routeChangeComplete', progress.finish)
// Router.events.on('routeChangeError', progress.finish)

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			{children}
			{/*<ReactQueryDevtools initialIsOpen={false} />*/}
		</QueryClientProvider>
	)
}
