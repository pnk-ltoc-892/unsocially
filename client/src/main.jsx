import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { ThemeProvider } from './components/ThemeProvider.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme' >
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
  // </StrictMode>
)
