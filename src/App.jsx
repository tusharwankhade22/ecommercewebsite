import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartDrawer from './components/CartDrawer';
import ProductListPage from './pages/ProductListPage'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar';


function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  return (
    <>
     <CartProvider>
       <BrowserRouter>
          <Navbar onCartClick={handleCartOpen} />
          <CartDrawer open={cartOpen} onClose={handleCartClose} />
          <Routes>
            <Route path='/' element={<ProductListPage/>}/>
          </Routes>
       </BrowserRouter>
     </CartProvider>
    </>
  )
}

export default App
