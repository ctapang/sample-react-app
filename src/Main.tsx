import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './Reducers.ts'
import theme from './Theme.tsx'
import App from './App.tsx'

// This is the root or main render routine.
// Author: C. Tapang
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
  </StrictMode>,
)
