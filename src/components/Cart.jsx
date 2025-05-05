import CartProducts from "./CartProducts";
import DeliveryBox from "./DeliveryBox";
import EmptyCart from "./EmptyCart";
import OrderTotal from "./OrderTotal";
import Button from "./Button";

export default function Cart({ savedProducts, handleRemoveProduct,handledConfirmOrder }) {
    const sumOfCart = savedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
    return (
        <div className="cart">
            <h3 className="cart-info">Your Cart ({savedProducts.length})</h3>
            {savedProducts.length > 0 ?
            <>
                <CartProducts savedProducts={savedProducts} handleRemoveProduct={handleRemoveProduct} />
                    <OrderTotal sumOfCart={sumOfCart} />
                <DeliveryBox />
                <Button className="confirm-Btn" onClickHandler={handledConfirmOrder}>
                    <p>Confirm Order</p>
                </Button>
                </> : <EmptyCart/>}
        </div>
    );
}