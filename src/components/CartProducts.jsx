import CartProductItem from "./CartProductItem"

export default function CartProducts({savedProducts,handleRemoveProduct}) {
    return (
        <ul className="cart-products-box">
            {savedProducts.map((product) => <li key={product.id}>
                <CartProductItem>
                    <div className="cart-product-content">
                            <p>{product.name}</p>
                        <div className="product-description">
                            <span>{product.quantity}x</span>
                            <span>${Number.isInteger(product.price) ? `${product.price}.00`: `${product.price}0`} = ${product.price * product.quantity}</span>
                        </div>
                    </div>
                    <div className="cart-product-btn" onClick={() => handleRemoveProduct(product.id)}>
                        <button>✖</button>
                    </div>
                </CartProductItem>
            </li>)}
        </ul>
    )

}