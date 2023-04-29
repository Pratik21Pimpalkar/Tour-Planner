import '@/styles/globals.css'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import { store } from '@/services/store'
import { AnimatePresence } from 'framer-motion'
export default function App({ Component, pageProps }) {
  return (
    <AnimatePresence>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AnimatePresence>)
}
