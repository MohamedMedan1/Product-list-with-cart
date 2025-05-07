import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ProductsProvider } from './contexts/ProductsContext'
import { PurchasedProvider } from './contexts/PurchasedContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsProvider>
      <PurchasedProvider>
        <App />
      </PurchasedProvider>
    </ProductsProvider>
  </StrictMode>,
)
