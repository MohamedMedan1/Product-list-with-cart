import CartProducts from "./CartProducts";
import DeliveryBox from "./DeliveryBox";
import EmptyCart from "./EmptyCart";
import OrderTotal from "./OrderTotal";
import Button from "./Button";
import { useProducts } from "../hooks/useProducts";

export default function Cart() {
    const { state,handledConfirmOrder } = useProducts();
    const { purchasedProducts: savedProducts } = state;
    
    return (
        <div className="cart">
            <h3 className="cart-info">Your Cart ({savedProducts.length})</h3>
            {savedProducts.length > 0 ?
            <>
                <CartProducts />
                <OrderTotal/>
                <DeliveryBox />
                <Button className="confirm-Btn" onClickHandler={handledConfirmOrder}>
                    <p>Confirm Order</p>
                </Button>
            </> : <EmptyCart/>}
        </div>
    );
}