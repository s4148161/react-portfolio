import '../styles/globals.css'
import '../styles/tailwind.css'
import { AppWrapper } from '../context/items-context'
import { SessionProvider } from 'next-auth/react'


function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </SessionProvider>
  )
}

export default MyApp