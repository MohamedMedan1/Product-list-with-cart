import CartProductItem from "./CartProductItem"
import { formatPrice } from "../utils/formatPrice"
import { useProducts } from "../hooks/useProducts"

export default function CartProducts() {
    const {state, handleRemoveProduct } = useProducts();
    const { purchasedProducts: savedProducts } = state;
    
    return (
        <ul className="cart-products-box">
            {savedProducts.map(({id,name,price,quantity}) => <li key={id}>
                <CartProductItem>
                    <div className="cart-product-content">
                            <p>{name}</p>
                        <div className="product-description">
                            <span>{quantity}x</span>
                            <span>${formatPrice(price)} = ${formatPrice(price * quantity)}</span>
                        </div>
                    </div>
                    <div className="cart-product-btn" onClick={() => handleRemoveProduct(id)}>
                        <button>✖</button>
                    </div>
                </CartProductItem>
            </li>)}
        </ul>
    )

}