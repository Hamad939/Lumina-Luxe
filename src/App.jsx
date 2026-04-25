import { useState } from 'react'
import Navbar from './components/Navbar'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import { products } from './data/storeData'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [cartItems, setCartItems] = useState([])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, nextQuantity) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: nextQuantity } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleMenuNavigate = (sectionId) => {
    setCurrentPage('home')
    setIsMenuOpen(false)

    window.requestAnimationFrame(() => {
      const element = document.getElementById(sectionId)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  const handleBuyNow = (product) => {
    addToCart(product)
    setCurrentPage('checkout')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const featuredProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)]">
      <div className="bg-mesh fixed inset-0 -z-10" aria-hidden="true" />

      <Navbar
        cartCount={cartCount}
        currentPage={currentPage}
        onCartClick={() => handleNavigate('checkout')}
        onMenuToggle={() => setIsMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        currentPage={currentPage}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigate}
      />

      {currentPage === 'home' ? (
        <HomePage
          products={featuredProducts}
          onAddToCart={addToCart}
          onBuyNow={handleBuyNow}
          onShopNow={() => handleNavigate('checkout')}
        />
      ) : (
        <CheckoutPage
          cartItems={cartItems}
          onBackHome={() => handleNavigate('home')}
          onClearCart={clearCart}
          onUpdateQuantity={updateQuantity}
        />
      )}

      <Footer />
    </div>
  )
}

export default App
