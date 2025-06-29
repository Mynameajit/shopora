import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductProvider from './context/ProductProvider.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './context/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import CheckoutProvider from './context/CheckoutProvider .jsx'


// ✅ Slick Carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CheckoutProvider>

          <App />
          </CheckoutProvider>
          <Toaster />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>


  </StrictMode>,
)
