import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { CollectionsProvider } from './context/CollectionsContext.jsx';
import { InventoryProvider } from './context/InventoryContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <InventoryProvider>
          <CollectionsProvider>
            <App />
          </CollectionsProvider>
        </InventoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)