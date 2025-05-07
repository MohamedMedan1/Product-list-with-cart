import CartProducts from "./CartProducts";
import DeliveryBox from "./DeliveryBox";
import EmptyCart from "./EmptyCart";
import OrderTotal from "./OrderTotal";
import Button from "./Button";
import { useProducts } from "../hooks/useProducts";
import { usePurchased } from "../hooks/usePurchased";

export default function Cart() {
    const { handledConfirmOrder } = useProducts();
    const { purchasedProducts: savedProducts} = usePurchased();
    
    return (
        <div className="cart">
            <h3 className="cart-info">Your Cart ({savedProducts.length})</h3>
            {savedProducts.length > 0 ?
            <>
                <CartProducts/>
                    <OrderTotal/>
                <DeliveryBox />
                <Button className="confirm-Btn" onClickHandler={handledConfirmOrder}>
                    <p>Confirm Order</p>
                </Button>
            </> : <EmptyCart/>}
        </div>
    );
}