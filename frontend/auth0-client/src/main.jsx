import { createRoot } from 'react-dom/client'
import './index.css'
import { env } from './config/environment'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import { store } from './store/store'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App/> 
    </Provider>
    </GoogleOAuthProvider>
)
