import './App.css'
import ProductsGallery from './components/ProductsGallery'
import Cart from "./components/Cart"
import ConfirmOrder from './components/ConfirmOrder'
import { useProducts } from './hooks/useProducts'

function App() {
  const {state} = useProducts();
  const { isConfirming } = state;

  return (
      <div className='full-page'>
        <ProductsGallery/>
        <Cart/>
      {isConfirming && <ConfirmOrder/> }
      </div>
  )
}

export default App;
