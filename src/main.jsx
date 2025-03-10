import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider } from '@mui/material';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline>


      <App />
    </CssBaseline>

  </StrictMode>,
)
